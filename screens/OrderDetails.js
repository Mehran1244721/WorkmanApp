import { View, Text , SafeAreaView , TouchableOpacity , StyleSheet , Alert } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const OrderDetails = () => {

const navigation = useNavigation();



const onPressHandler1 = () =>{
    /* Send Notification to user that order is accepted or rejected */


    Alert.alert('Order' , 'The Order is Accepted !!!');
    navigation.goBack();
}


const onPressHandler2 = ()=>{
    /* Send Failure Notification to user regarding order */

    Alert.alert('Order' , 'The Order is Rejected by You !!!');
    navigation.goBack();
}



  return (
    <SafeAreaView>
     <View style = {styles.mainView}>
        
      <Text style = {styles.text}>Order Details</Text>
      <Text style = {styles.text}>Location : PRC CHOWK </Text>
      <Text style = {styles.text}>Name : Mehran Khan</Text>
      <Text style = {styles.text}>Phone Number : 03161244721</Text>
     </View>
     <View style = {styles.secView}>
      <TouchableOpacity style = {styles.btn1} onPress={onPressHandler1}  > 
        <Text>Accept Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.btn2} onPress={onPressHandler2}>
        <Text>Reject Order</Text>
      </TouchableOpacity>
     </View>
    </SafeAreaView>
  )
}

export default OrderDetails;

const styles = StyleSheet.create({
   mainView : {
    backgroundColor : 'yellow' , 
    margin : 10,
    padding : 20 , 
    alignItems : 'center'
   } , 
   text : {
    fontWeight : 'bold'
   } , 
   secView : {
    backgroundColor : 'orange' , 
    padding : 20 , 
    marginTop : 59 , 
    flexDirection : 'row' , 
    justifyContent : 'space-around'
   } , 
   btn1 : {
    backgroundColor : 'green' , 
    padding : 20 , 
    borderRadius : 30
   },
   btn2 : {
    backgroundColor : 'red',
    padding  : 20,
    borderRadius : 30
   }
})