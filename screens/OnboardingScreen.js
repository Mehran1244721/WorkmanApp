import { View, Text , SafeAreaView ,StyleSheet  } from 'react-native'
import React , {useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native';


const OnboardingScreen = () => {

  const navigation = useNavigation();



  useEffect(()=>{

   setTimeout(()=>{

    navigation.navigate('StartingScreen');

   },5000)

  },[])



  const onPressHandler = () =>{
    navigation.navigate('StartingScreen');
  }

  return (
    <SafeAreaView style = {styles.safe}>
    <View>
    <Text style = {styles.text}>WorkMan</Text>
      <MaterialIcons style = {styles.bagicon} name='work' size={60} color='black'></MaterialIcons>
    <Text style = {styles.text1}>Welcome to Workman</Text>
    <Text style = {styles.text1}>You Can Easily Hire Your Service Here</Text>
    <Text style = {styles.text1}>OR</Text>
    <Text style = {styles.text1}>You Can Easily Sell Your Service Here</Text>
    <TouchableOpacity style = {styles.btn}  onPress = {onPressHandler}>
        <Text>Press to Continue</Text>
    </TouchableOpacity>

    </View>
    </SafeAreaView>
  )
}

export default OnboardingScreen;

const styles = StyleSheet.create({

    safe : {
        backgroundColor : '#dff2e4',
        height : 900
    },
    text : {
        alignItems : 'center', 
        marginTop : 150 , 
        textAlign : 'center' , 
        fontWeight : 'bold' , 
        fontSize : 40
    },
    text1 : {
        alignItems : 'center', 
        marginTop : 50 , 
        textAlign : 'center' , 
        fontWeight : 'bold' , 
        fontSize : 15
    },
    bagicon : {
        alignItems : 'center' , 
        textAlign : 'center',
        marginTop : 20
    },
    btn : {
        backgroundColor : '#a2dbd8',
        padding : 10 , 
        width : 150 , 
        alignItems : 'center' , 
        marginLeft : 100 , 
        marginTop : 30 , 
        borderRadius : 20
    }
})