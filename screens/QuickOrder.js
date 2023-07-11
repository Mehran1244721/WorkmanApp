import { View, Text , SafeAreaView , TouchableOpacity , StyleSheet , Alert } from 'react-native'
import React , {useContext, useState , useEffect} from 'react'
import { TextInput } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { Axios } from 'axios';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { registerForPushNotificationsAsync, getExpoPushTokenAsync, sendPushNotificationAsync } from 'expo-notifications';



const QuickOrder = ({route}) => {

  const navigation = useNavigation();

    const [address , setAddress] = useState('');
    const [phone , setPhone]  = useState('');
    const [error , setError] = useState(false);
    const AuthCtx = useContext(AuthContext);

    const userId = AuthCtx.userId;
    const skill = route.params.title;
    const name = AuthCtx.userName;

/* useEffect(()=>{

  registerForPushNotificationsAsync();

},[]) */


   // console.log(skill);
   // console.log(userId);


    const orderData = {
       userId : userId,
       userName: name,
       address : address,
       phone : phone,
       category : skill
    }

async  function onPressHandler(){

   if(address.trim()==='' || phone.trim()===''){
    setError(true);
    Alert.alert('Error' , 'Input is Required');
   }


    try{
      const response2 = await  axios.post('https://workman-e7694-default-rtdb.firebaseio.com/orders.json' , orderData);
      navigation.navigate('Tab');

      /* const { data: expoPushToken } = await getExpoPushTokenAsync();
      
      const notification = {
        to: expoPushToken,
        title: 'Order Notification',
        body: 'Your order has been placed successfully!',
        data: {}, // Additional data to send with the notification
      };


      await sendPushNotificationAsync(notification); */



    } 
  
    catch(err){
      
    }
   
  
     
    


}   

const addressInputChangeHandler = (text) =>{
   setAddress(text);
   setError(false);
};

const phoneChangeHandler = (text) =>{
  setPhone(text);
  setError(false);
}




  return (
    <SafeAreaView>
    <View style = {styles.mainContainer}>
      <Text style = {styles.address}>Enter Your Address Below</Text>
      <TextInput style = {styles.input}   placeholder = 'Address' onChangeText={addressInputChangeHandler} value = {address}></TextInput>
      <Text style = {styles.phone}>Enter Phone Number</Text>
      <TextInput style = {styles.input}  placeholder = 'Phone' onChangeText = {phoneChangeHandler} value = {phone}  keyboardType='phone-pad'></TextInput>
      <TouchableOpacity  style = {styles.orderBtn}  onPress = {onPressHandler}>
        <Text>Order Now</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default QuickOrder;

const styles = StyleSheet.create({
  mainContainer : {
    borderColor : 'red' , 
    borderWidth : 2 , 
    alignItems : 'center' , 
    marginTop : 100 , 
    padding : 20,
    height : 400
  } , 
  address : {
   
  },
  input : {
    borderColor : 'black',
    borderWidth : 1 , 
    width : 200 , 
    margin : 10 , 
    padding : 10 , 
    borderRadius : 10 , 
    marginBottom : 50
  },
  phone : {},
  orderBtn : {
    borderColor : 'red' , 
    borderWidth : 1 , 
    padding : 20 , 
    borderRadius : 20 , 
    backgroundColor : 'skyblue'

  },

})