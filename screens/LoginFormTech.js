import { View, Text , StyleSheet } from 'react-native'
import React , {useEffect , useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import UserSignUp from '../components/UserSignUp';
import WorkerSignUp from '../components/WorkerSignUp';
import NetInfo from '@react-native-community/netinfo';
const LoginFormTech = ({route}) => {

  const navigation = useNavigation();
  const { isWorker , isUser} = route.params;
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);


  if (!isConnected) {
    return (
      <SafeAreaView>
        <View style={styles.noInternetContainer}>
          <Text style={styles.noInternetText}>No internet connection</Text>
        </View>
      </SafeAreaView>
    );
  }





  return (
    <View>
      { isWorker && 
      <WorkerSignUp></WorkerSignUp>
}
    {
      isUser &&
      <UserSignUp></UserSignUp>
    }

    </View>
  )
}

export default LoginFormTech;


const styles = StyleSheet.create({
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