import { View, Text ,TouchableOpacity , StyleSheet } from 'react-native'
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const CategoryCard = ({title , icon}) => {

  const navigation = useNavigation();


 const onPressHandler = () =>{
      navigation.navigate('ServiceDetail' , {title,icon});
 }

  return (
    <View>
      <TouchableOpacity  onPress={onPressHandler} style = {styles.card} >
      
      
      <View >

      


        <MaterialIcons style = {styles.icon}  name={icon} size={50} color="black" /> 
      </View>
      <Text style = {styles.title}>{title}</Text>  
        
        </TouchableOpacity>  
      
    </View>
  )
}

export default CategoryCard;

const styles = StyleSheet.create({
   title :{
    textAlign : 'center' , 
    marginTop : 10
   },
  icon : {
    marginLeft : 16 , 
    textAlign : 'center' , 
  
  },
    card : {
        padding : 5 , 
        margin : 5 ,
        width : 110,
        borderRadius : 10, 
        borderWidth : 2 ,
        height : 100, 
        borderColor : 'black',
        backgroundColor : '#98baeb'
    }
})