import { View, Text, SafeAreaView, StyleSheet,Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React , {useState ,useEffect, useContext} from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import Swiper from 'react-native-swiper';
import { Picker } from '@react-native-picker/picker';
import CategoryCard from '../components/CategoryCard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../store/auth-context';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Tab = createBottomTabNavigator();



const images = [
    require('../assets/p1.jpg'),
    require('../assets/p2.jpg'),
    require('../assets/p3.jpg'),
    require('../assets/p4.jpg'),
    require('../assets/p5.jpg'),
    require('../assets/p6.jpg'),
    require('../assets/p7.jpg'),
];




const HomeScreen = () => {



  const navigation = useNavigation();
  const AuthCtx = useContext(AuthContext);
    const [pickedCity , setPickedCity] = useState('');
    const [pickedLocation , setPickedLocation] = useState('');
    const [isConnected, setIsConnected] = useState(true);
  //  const [isUser , setIsUser] = useState(true);
    const [data1 , setData] = useState([]);



    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);


    useEffect(()=>{

    fetchDataById();   
  

    },[fetchDataById]);


    const fetchDataById = async () => {
      try {
        const response = await axios.get('https://workman-e7694-default-rtdb.firebaseio.com/users.json');
    
        const data1 = response.data;

        const userId = AuthCtx.userId;


        if(data1 === null){
      //    console.log('No Orders Found');
          setData([]);
        }else{
          const userData = Object.entries(data1).reduce((acc, [key, value]) => {
            if (value.userId === userId) {
              acc.push({ orderId: key, ...value });
            }
            return acc;
          }, []);
        
           setData(userData);
      }
       /*  setOrders(data); */
        // Process the data here
       // console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  



   const optionChangeHandler = (val) =>{
        setPickedCity(val);
    }
   
    const locationChangeHandler = (val) =>{
        setPickedLocation(val);
    }
   
    const data = [
      {id : 1 ,  title : 'Plumber' , icon : 'plumbing'  },
      {id : 2 ,  title : 'AC Tech'  , icon : 'room-preferences'  },
      {id : 3 ,  title : 'Carpenter'  , icon : 'carpenter'  },
      {id : 4 ,  title : 'Labour'  , icon : 'supervised-user-circle'  },
      {id : 5 ,  title : 'Mechanic'  , icon : 'work-outline'  },
      {id : 6 ,  title : 'Electrician'  , icon : 'electrical-services'  },
      {id : 7 ,  title : 'Hardware Eng'  , icon : 'hardware'  },
      {id : 8 ,  title : 'Cleaner'  , icon : 'cleaning-services'  },
      {id : 9 ,  title : 'Mason'  , icon : 'home'  },
      {id : 10 ,  title : 'Gardener' , icon : 'spa'  },
      {id : 11,  title : 'Driver'  , icon : 'directions-car'  },
      
     ];
     
    const renderItem = ({ item }) => (
      <View>
        <CategoryCard title = {item.title} icon = {item.icon}></CategoryCard>
      </View>
    );
    const userName = AuthCtx.userName;

   const onPressHandlerProfile = () =>{
   // setIsUser(true);
    //console.log(isUser);
    navigation.navigate('Profile', { isUser: true, isWorker: false , data1 });
   }


    

   //const {name} = AuthCtx.userDetails;
   // console.log(name);

   if (!isConnected) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.noInternetContainer}>
          <Text style={styles.noInternetText}>No internet connection</Text>
        </View>
      </SafeAreaView>
    );
  }





  return (
    <SafeAreaView style = {styles.safe}>
   {/* Portion : 01 Navbar on Home Screen */}
     <View style = {styles.navbar}>
     <MaterialIcons name="work" size={24} color="black" /><Text style = {styles.wm}>WorkMan</Text>
    
    <TouchableOpacity>
        <Ionicons name="notifications" size={24} color="blue" />
        </TouchableOpacity>
     </View>
     <TouchableOpacity onPress={onPressHandlerProfile}>
     <View style = {styles.user}> 
     <FontAwesome style = {styles.icon1} name="user-circle-o" size={24} color="black" /><Text style  = {styles.hello}>{userName}</Text>
       
     </View>
     </TouchableOpacity>

     {/* SlideShow of Images  */}

     <View style = {styles.imagesContainer}>
     <Swiper loop={true} autoplay={true}>
        {images.map((image, index) => (
          <View key={index}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </Swiper>
     </View>

     {/* Location Picker in Mardan */}

     <View style = {styles.LocationPicker}>
       <Picker selectedValue={pickedCity}
        onValueChange={optionChangeHandler}
        style={styles.picker}>
         <Picker.Item label="Mardan" value="Mardan" />
         
         
        
        </Picker> 
        
     </View>

     {/* List of Services Offered */}

     <View >

      
      <FlatList style = {styles.serviceContainer} data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}  numColumns = {3}>
      </FlatList>
      
     </View>

     {/* Bottom Tab NAvigator  */}
     <View>
       
     </View>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({

safe : {
  backgroundColor : '#d2e1f7'
}

  ,  serviceContainer  : {
        
        marginTop : 100 , 
        /* borderColor : 'black' , 
        borderWidth : 2 , */ 
        width : 400 , 
        height : 400 ,
        backgroundColor : '#d2e1f7',
        padding : 10 , 
        
        
    },
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
      },
    
    
    services : {
        //flexDirection : 'row',
        marginTop : 200 , 
        //margin : 10 ,
        padding : 10 , 
        margin : 'auto'
    },
   navbar : {
    padding  : 10 , 
    backgroundColor : 'white',
    borderRadius : 10,
    margin : 10 , 
    flexDirection : 'row' , 
    justifyContent : 'space-between'
   } , 
   wm : {
    fontSize : 20 , 
    fontWeight : 'bold' , 
    color : 'blue',
    marginRight : 130
   } , 
   hello : {
     
    marginTop : 10 , 
    fontWeight : 'bold'
   } , 
   imagesContainer : {  
    width : 400,
    height : 200,
   } , 
   image : {
    width : '100%' , 
    height : '100%'
   },
   picker : {
        width: 190,
        height: 20,
        ...Platform.select({
            ios: {
              // iOS-specific style
              shadowOpacity: 0,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 0,
              backgroundColor: 'transparent',
            }, 
           }),

      
   },
   pickerItem : {
    textShadowColor: 'transparent',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 0,
   },
   LocationPicker : {
    marginTop : -80,
    flexDirection : 'row' , 
    marginLeft : 90
   },
   icon1 : {
    marginTop : 5 ,
    marginRight : 10  
   } , 
   user : {
    flexDirection : 'row' , 
    justifyContent : 'center',
    padding : 3, 
    borderColor : 'black' , 
    borderWidth : 1 , 
    width : 200 , 
    borderRadius : 30 , 
    marginLeft : 80 , 
    marginBottom : 5 , 
    backgroundColor : 'white' , 
    marginTop : -8
   },
   noInternetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noInternetText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})