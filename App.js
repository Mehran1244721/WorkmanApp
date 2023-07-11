import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartingScreen from './screens/StartingScreen';
import LoginFormTech from './screens/LoginFormTech';
import HomeScreen from './screens/HomeScreen';
import OrderService from './screens/OrderService';
import AccountSetting from './screens/AccountSetting';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ServiceDetails from './screens/ServiceDetails';
import WokrerHome from './screens/WokrerHome';
import WorkerOrders from './screens/WorkerOrders';
import Setting from './screens/Setting';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingTools from './screens/SettingTools';
import { useNavigation } from '@react-navigation/native';
import QuickOrder from './screens/QuickOrder';
import OrderDetails from './screens/OrderDetails';
const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import OnboardingScreen from './screens/OnboardingScreen';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import WorkerInfo from './screens/WorkerInfo';
import Profile from './screens/Profile';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
export default function App() {


  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const Auth = useContext(AuthContext);





  // useEffect(() => {
  //   // Check if expoPushToken is not null before setting it in AuthContext

  //   Auth.setDeviceToken(expoPushToken);
  //   //console.log(skill);

  // }, []);
  const AuthenticatedScreens = () => {

    const authCtx = useContext(AuthContext);


    return <stack.Navigator>
      <stack.Screen name='Tab2' component={TabNavigator2} options={{ headerShown: false }} ></stack.Screen>
      <stack.Screen name='Tab' component={TabNavigator} options={{ headerShown: false }}></stack.Screen>


      <stack.Screen name='ServiceDetail' component={ServiceDetails} options={{ headerShown: false }}></stack.Screen>
      <stack.Screen name='Profile' component={Profile}></stack.Screen>
      <stack.Screen name='settingTools' component={SettingTools} options={{ presentation: 'modal', headerShown: false }}></stack.Screen>
      <stack.Screen name='WorkerInfo' component={WorkerInfo} options={{ presentation: 'modal' }}></stack.Screen>
      <stack.Screen name='quickOrder' component={QuickOrder} options={{ presentation: 'modal' }}></stack.Screen>
      <stack.Screen name='OrderDetails' component={OrderDetails} options={{ presentation: 'modal' }}></stack.Screen>
    </stack.Navigator>
  }

  /*  const WorkerAuthenticatedScreens = ()=>{

    return <stack.Navigator>
        <stack.Screen name='Tab2' component={TabNavigator2} options={{headerShown : false}} ></stack.Screen>
    </stack.Navigator>
  } */

  const StackNavigator = () => {
    return <stack.Navigator>
      <stack.Screen name="OnBoarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <stack.Screen name="StartingScreen" component={StartingScreen} options={{ headerShown: false }} />
      <stack.Screen name='TechLogin' component={LoginFormTech} options={{ headerShown: false }} ></stack.Screen>
      {/* <stack.Screen name='Home' component={HomeScreen} options={{headerShown : false}}></stack.Screen> */}

    </stack.Navigator>
  };

  const TabNavigator = () => {
    return <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} options={{
        headerShown: false, tabBarIcon: ({ color }) => (
          <Entypo name="home" size={24} color="black" />
        ),
      }}></Tab.Screen>
      <Tab.Screen name='Order Service' component={OrderService} options={{
        headerShown: false, tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="golf-cart" size={24} color="black" />
        ),
      }}></Tab.Screen>
      <Tab.Screen name='AccountSetting' component={AccountSetting} options={{
        headerShown: false, tabBarIcon: ({ color }) => (
          <Fontisto name="player-settings" size={24} color="black" />
        ),
      }}></Tab.Screen>
    </Tab.Navigator>
  }

  const TabNavigator2 = () => {

    return <Tab.Navigator>
      <Tab.Screen name='Home' component={WokrerHome} options={{
        headerShown: false, tabBarIcon: ({ color }) => (
          <Entypo name="home" size={24} color="black" />

        ),
      }}></Tab.Screen>
      <Tab.Screen name='Orders' component={WorkerOrders} options={{
        headerShown: false, tabBarIcon: ({ color }) => (

          <MaterialCommunityIcons name="golf-cart" size={24} color="black" />
        ),
      }}  ></Tab.Screen>
      <Tab.Screen name='Settings' component={Setting} options={{
        headerShown: false, tabBarIcon: ({ color }) => (
          <Fontisto name="player-settings" size={24} color="black" />
        ),
      }}></Tab.Screen>

    </Tab.Navigator>
  }


  function Navigation() {

    const authCtx = useContext(AuthContext);
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => {
        console.log("useffect", token); setExpoPushToken(token);
        authCtx.setDeviceToken(expoPushToken);


      }).catch(e => console.log(e));

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

    return (
      <NavigationContainer>
        {!authCtx.isAuthenticated && <StackNavigator />}
        {authCtx.isAuthenticated && <AuthenticatedScreens />}
        {/*   { authCtx.isAuthenticated &&  authCtx.skill &&  <WorkerAuthenticatedScreens />}  */}

      </NavigationContainer>
    )
  }


  return (
    <>
      <StatusBar style='dark'></StatusBar>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
