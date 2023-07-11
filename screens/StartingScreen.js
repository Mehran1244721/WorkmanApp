import { View, Text , StyleSheet, TouchableOpacity } from 'react-native';

import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';




const StartingScreen = () => {
    const [isWorker , setisWorker] = useState(true);
    const [isUser , setIsUser] = useState(true);
    const navigation = useNavigation();


  const touchHandler1 = () =>{
    setIsUser(true);
    navigation.navigate('TechLogin' , {isUser});

  }
  const touchHandler2 = () =>{
    setisWorker(true);
    navigation.navigate('TechLogin' , {isWorker});

  }

    return (
    <View style = {styles.safe}>
      <Text style = {styles.text}>WorkMan</Text>
      <MaterialIcons style = {styles.bagicon} name='work' size={60} color='black'></MaterialIcons>

      <View style = {styles.touchArea}>
        <TouchableOpacity style = {styles.t1} onPress={touchHandler1}>
        <MaterialIcons style = {styles.pS} name="person-search" size={55} color="black" /><Text style = {styles.text1}>I Want to Hire</Text>
            <Text style = {styles.smalltxt}>Labour or Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.t2} onPress={touchHandler2}>
        <FontAwesome5  style = {styles.uc} name="user-cog" size={40} color="black" /><Text style = {styles.text1}>I Want to Work</Text>
            <Text style = {styles.smalltxt}>Register as a Labour</Text>
        </TouchableOpacity>

      </View>

      <View style = {styles.icon2}>
      <MaterialCommunityIcons name="screw-round-top" size={40} color="black" />
      </View>
    </View>
  )
}

export default StartingScreen;

const styles = StyleSheet.create({
    icon2 : {
        alignItems : 'center' , 
        marginTop : 100 , 
        backgroundColor : '#d7dbd8' , 
        borderRadius : 100 , 
        width : 60 , 
        padding : 10 , 
        marginLeft : 150
    }
    ,
    pS : {
        margin : 5 , 
        marginHorizontal : 5 , 
        marginRight : 18
    },
    uc : {
        margin : 5 , 
    }
    ,
    t1 : {
        margin : 10 , 
        marginBottom : 40,
        marginTop : 30,
        backgroundColor : '#d7dbd8',
        borderRadius : 12,
        padding : 20,
        flexDirection : 'row'
    },
    t2 : {
        margin : 10 ,
        marginBottom : 30, 
        backgroundColor : '#d7dbd8',
        borderRadius : 12,
        padding : 20,
        flexDirection : 'row'
    },
    text1 : {
      fontWeight : 'bold' , 
      fontSize : 20 , 
      
    },
    smalltxt : {
        marginTop : 30 , 
        marginRight : 15
    },
     touchArea : {
        backgroundColor : 'white' , 
        color : 'white' , 
        marginTop : 60 , 
        alignItems : 'center',
     }

    ,
    text : {
        alignItems : 'center', 
        marginTop : 150 , 
        textAlign : 'center' , 
        fontWeight : 'bold' , 
        fontSize : 30
    },
    bagicon : {
        alignItems : 'center' , 
        textAlign : 'center',
        marginTop : 20
    } , 
    safe : {
      backgroundColor : '#d8e3e2' , 
      height : 900
    }
})