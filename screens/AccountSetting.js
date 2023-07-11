import { SafeAreaView , View, Text , TouchableOpacity , StyleSheet } from 'react-native'
import React , {useState , useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons'; 



const AccountSetting = () => {

const navigation = useNavigation();
  


 const [name , setName] = useState(null);
 const [phone , setPhone] = useState(false);
 const [terms , setTerms] = useState(false);
 const [about , setAbout] = useState(false);
 const [logout , setLogout] = useState(false);


 
 const nameHandler= ()=>{
  setName(true);
  navigation.navigate('settingTools' , {name});
 }

 const phoneHandler = () =>{
  setPhone(true);
  navigation.navigate('settingTools' , {phone});
 }

 const termsHandler = () =>{
  setTerms(true);
  navigation.navigate('settingTools' , {terms});
 }

 const aboutHandler = () =>{
  setAbout(true);

  navigation.navigate('settingTools' , {about});
 }
 const logoutHandler = () =>{
  setLogout(true);
  navigation.navigate('settingTools' , {logout});
 }




  return (
    <SafeAreaView style = {styles.safe}>
    <View style = {styles.mainContainer} >
      <View style = {styles.iconCont}>
      <Text style = {styles.txt}>Account Settings</Text><Fontisto  style = {styles.icon} name="player-settings" size={24} color="black" />
      </View>
      
      <TouchableOpacity style = {styles.inputs} onPress = {nameHandler} >
        <Text style = {styles.allTxt}>Change Profile Name</Text>
      </TouchableOpacity >
      <TouchableOpacity style = {styles.inputs} onPress = {phoneHandler}  >
        <Text style = {styles.allTxt}>Change Phone Number</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.inputs} onPress = {termsHandler} >
        <Text style = {styles.allTxt}>Terms and Condition</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.inputs} onPress = {aboutHandler} >
        <Text style = {styles.allTxt}>
          About Us
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.inputs} onPress = {logoutHandler}>
        <Text style = {styles.allTxt}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default AccountSetting;

const styles = StyleSheet.create({

   safe : {
    backgroundColor : '#d0fcc5'
   }

  ,mainContainer : {
     backgroundColor : '#d0fcc5' , 
     height : 700
  } , 
  inputs : {
  
    width : 400, 
    backgroundColor : 'white', 
    padding : 30,
    borderBottomColor : 'black' , 
    borderBottomWidth : 1
  } , 
  txt : {
    fontWeight : 'bold' , 
    textAlign : 'center' , 
    marginTop : 30 ,
    fontSize : 25 
  } ,
  iconCont : {
    flexDirection : 'row' , 
    padding : 20 , 
    margin : 10 , 
    justifyContent : 'center' , 
    backgroundColor : '#d3edda' , 
    height : 130,
    borderRadius : 30
  } ,
  icon : {
    marginTop : 34 , 
    marginLeft : 20
  } , 
  allTxt : {
    fontWeight : 'bold' , 
    textAlign : 'center',
    marginRight : 30 , 
    fontSize : 15
  }

});