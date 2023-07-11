import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const WorkerInfo = ({ route }) => {



  const navigation = useNavigation();
  const AuthCtx = useContext(AuthContext);


  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);





  const { order } = route.params;

  const { name1, Location, skill, phone1, id } = order;



  const addressInputChangeHandler = (text) => {
    setAddress(text);
    setError(false);
  };

  const phoneChangeHandler = (text) => {
    setPhone(text);
    setError(false);
  }



  const orderData = {
    WorkerName: name1,
    UserId: AuthCtx.userId,
    UserName: AuthCtx.userName,
    WorkerId: id,
    address: Location,
    category: skill,
    WorkerPhone: phone1,
    phone: phone,
    deviceToken : AuthCtx.deviceToken || ""
  }

  async function onPressHandler() {

    if (address.trim() === '' || phone.trim() === '') {
      setError(true);
      Alert.alert('Error', 'Input is Required');
    }


    try {
      const response2 = await axios.post('https://workman-e7694-default-rtdb.firebaseio.com/orders.json', orderData);
      
     /*  fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'ExponentPushToken[cwpq_NNlNWgkZp4NW9X3Hb]',
          title: 'hello',
          body: 'world',
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response:', data);
          // Handle the response data as needed
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle the error
        }); */
      
        Alert.alert('Order Successful');

      /* const { data: expoPushToken } = await getExpoPushTokenAsync();
      
      const notification = {
        to: expoPushToken,
        title: 'Order Notification',
        body: 'Your order has been placed successfully!',
        data: {}, // Additional data to send with the notification
      };
 
 
      await sendPushNotificationAsync(notification); */



    }

    catch (err) {

    }






  }







  return (
    <SafeAreaView style={styles.safe} >
      <Text style={styles.text1}>Worker Details</Text>
      <View style={styles.mainContainer}>


        <Text style={styles.text2}>Name Of Worker : {name1}</Text>
        <Text style={styles.text2}>Location Of Worker: {Location}</Text>
        <Text style={styles.text2}>The Service Of Worker : {skill}</Text>
        <Text style={styles.text2}>The Phone No : {phone1}</Text>


      </View>
      <View style={styles.mainContainer2}>
        <Text style={styles.address}>Enter Your Address Below</Text>
        <TextInput style={styles.input} placeholder='Address' onChangeText={addressInputChangeHandler} value={address}></TextInput>
        <Text style={styles.phone}>Enter Phone Number</Text>
        <TextInput style={styles.input} placeholder='Phone' onChangeText={phoneChangeHandler} value={phone} keyboardType='phone-pad'></TextInput>

      </View>

      <TouchableOpacity style={styles.btn} onPress={onPressHandler}>
        <Text style={styles.btnText}>Order Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )


}

export default WorkerInfo;

const styles = StyleSheet.create({
  text1: {
    fontWeight: 'bold',
    textAlign: 'center',

    fontSize: 20,
    backgroundColor: 'white',
    padding: 30,
  },
  text2: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 16
  }
  ,
  safe: {
    backgroundColor: '#e6edf7',
    height: 800
  },
  mainContainer: {
    marginLeft: 10,
    marginTop: 80,
    margin: 10,
    backgroundColor: '#e8e9eb'
  },
  btn: {
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#aacaf2',
    padding: 18,
    width: 150,
    textAlign: 'center',
    borderRadius: 20,
    marginLeft: 100
  },
  mainContainer2: {
    borderColor: 'red',
    borderWidth: 2,
    alignItems: 'center',
    padding: 20,
    height: 200
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: 200,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },


})