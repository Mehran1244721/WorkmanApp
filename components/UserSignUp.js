import { View,Text, TextInput , StyleSheet, Button, TouchableOpacity, SafeAreaView , Alert } from 'react-native'
import React , {useContext, useState} from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import axios, { Axios } from 'axios';
import { AuthContext } from '../store/auth-context';



const UserSignUp = () => {

  const navigation = useNavigation();

const authCtx =   useContext(AuthContext);

    const [signUp , setSignUp] = useState(false);
    const [login , setLogin]  = useState(true);
    const [username , setUsername] = useState('');
    const [name , setName]  = useState('');
    const [email , setEmail]  = useState('');
    const [password , setPassword]  = useState('');
    const [phone , setPhone]  = useState('');
    const [isAuthenticated , setIsAuthenticated] = useState(false);
    const [data , setData] = useState([]);
    const [errors , setErrors] = useState({});



    const validateEmail = (email) => {
      // Regular expression to validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  

    const formValidation = ()=>{
   
      const errors = {};
  
      if(name.trim()===''){
        errors.name = 'Name is Required';
      }
      if(email.trim()===''){
        errors.email = 'Email is Required';
      }else if(!validateEmail(email)){
        errors.email = 'Invalid Email Format';
      }
  
      if(password.trim()===''){
        errors.password = 'Password is Required';
      }
   
  
      if(phone.trim()===''){
        errors.phone = 'Phone No is Required';
      }
      
  
      setErrors(errors);
  
      return Object.keys(errors).length === 0;
  
     }


  const  loginFormValidation = () =>{

    const errors = {};

    if(email.trim()===''){
      errors.email = 'Email is Required';
    }else if(!validateEmail(email)){
      errors.email = 'Invalid Email Format';
    }
    
    
    if(password.trim()===''){
      errors.password = 'Password is Required';
    }


    
    setErrors(errors);
  
    return Object.keys(errors).length === 0;
 
     }



 async function signupHandler  ( ){

    setSignUp(true);
    setLogin(false);
    setIsAuthenticated(true);
    formValidation();

   const response =  await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuFt4ULn0qRU2KpGb-6CZrZhq-vPrG87k',
      {
       displayName: name, 
       email : email , 
       password : password , 
       returnSecureToken : true
      } 
 
     );

     const token = response.data.idToken;
     const userId = response.data.localId;
     const UserName = response.data.displayName;

     authCtx.authenticate(token);
     authCtx.setUserNameFunc(UserName);
     authCtx.setUserIdftn(userId);

     const userData = {
      userId : userId,
      name1: name,
       email1 : email,
     phone1: phone
    };
    console.log(userData);

    const userDetail = {
      name : name, 
      email : email , 
      phone : phone , 

    };


    authCtx.saveUserDetails(userDetail);
   


 const response2 = await  axios.post('https://workman-e7694-default-rtdb.firebaseio.com/users.json' , userData);

    setIsAuthenticated(false);
    setEmail('');
    setName('');
    setPassword('');
    setPhone('');
   navigation.navigate('Tab');
  
  //  console.log(phone);
  }
  const signupHandler2 = () =>{
    setSignUp(true);
    setLogin(false);
  } 

  async function loginHandler() {


 //  const {name} = authCtx.userDetails;

    setLogin(true);
    setSignUp(false);

    loginFormValidation();

 //   console.log(name);


  try {
    const response =  await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuFt4ULn0qRU2KpGb-6CZrZhq-vPrG87k',{
      email : email ,
      password : password , 
      returnSecureToken : true
    });
 

    const token = response.data.idToken;
    const userId = response.data.localId;



    const userDataResponse = await axios.get('https://workman-e7694-default-rtdb.firebaseio.com/users.json');
    const userData = userDataResponse.data;

    if (userData) {
      const userIds = Object.keys(userData);
      const currentUser = userIds.find(id => userData[id].userId === userId);

      if (currentUser) {
        const updatedName = userData[currentUser].name1;
        authCtx.setUserNameFunc(updatedName);
        console.log('Updated Name:', updatedName);
        // Update the name in the context if needed: authCtx.setUserNameFunc(updatedName);
      }
    }


    authCtx.authenticate(token);
    authCtx.setUserIdftn(userId);
  //  authCtx.setUserNameFunc(userName3);
    navigation.navigate('Tab');
  }catch(err){
    console.log(err);
   Alert.alert('Authentication Failed' , 'Check Your Credentials');
  }

  

  
    
   console.log(email);
    console.log(password);

  }

  return (
    <SafeAreaView>
    <View>
     <TouchableOpacity style = {styles.arrow} onPress={()=> navigation.goBack()}>   
    <AntDesign name="arrowleft" size={24} color="black" />
    </TouchableOpacity>
    </View>
    <View style = {styles.container}>
      <MaterialIcons name="account-circle" size={80} style = {styles.acc} color="black" />
      <Text style = {styles.userText}>User Account</Text>
      <TextInput style ={styles.input} placeholder='Email' onChangeText={text => setEmail(text)} value={email}></TextInput>
    {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
     { signUp && 
     <TextInput style = {styles.input} placeholder='Full Name' onChangeText={text=> setName(text)} value={name}  ></TextInput>}
     {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
   {/*  { signUp &&   <TextInput  style = {styles.input} placeholder='Email'onChangeText={text=> setEmail(text)} value={email} ></TextInput> } */}
      <TextInput  style = {styles.input} placeholder='Password'   secureTextEntry={true} onChangeText={text=> setPassword(text)} value={password} ></TextInput>
      {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
    {signUp &&   <TextInput  style = {styles.input} placeholder='Phone No' onChangeText={text => setPhone(text)} value={phone} keyboardType='phone-pad'></TextInput> }
    {errors.phone && <Text style={{ color: 'red' }}>{errors.phone}</Text>} 

  {login &&    <TouchableOpacity style = {styles.btn} onPress={loginHandler}>
        <Text style = {styles.signbtn}>
            Login 
        </Text>
      </TouchableOpacity>
}
      
      <View style = {styles.signContainer}>

      
      {!signUp && <Text style = {styles.or}>Doesnot have account?</Text>}
      
   {login &&    <TouchableOpacity onPress={signupHandler2}>
        <Text style = {styles.sb} >Sign Up</Text>
      </TouchableOpacity>}
      </View>

  { signUp &&    <TouchableOpacity style = {styles.btn} onPress={signupHandler}>
        <Text style = {styles.signbtn}>Register</Text>
      </TouchableOpacity>
  }
     {/*  { 
      
      login &&
      <>
      
      <Text style = {styles.or}>or</Text>
      <Text style = {styles.using}>Continue With</Text>

      <View style = {styles.icons}>
        <TouchableOpacity style = {styles.to}>
      <AntDesign name="google" size={40} color="#1a73e8" />
      </TouchableOpacity >
      </View>
      </>
} */}

    </View>
    </SafeAreaView>
  )
}

export default UserSignUp;

const styles = StyleSheet.create({
    signContainer : {
         flexDirection : 'row' , 
         marginTop : 20 , 
         marginLeft : 40
    },
    sb : {
      color : 'blue' , 
      textDecorationLine : 'underline',
      marginTop : 10
    },
    userText : {
        fontWeight : 'bold' , 
        fontSize : 20 , 
        textAlign : 'center' , 
        padding : 10
    },
    to : {
        padding : 10
    },
    icons : {
        flexDirection : 'row' , 
        padding : 10 , 
        margin : 15 , 
        justifyContent : 'center' , 
        marginTop : 40
    },
    
    btn : {
        borderRadius : 10,
        marginTop : 20, 
        padding : 10,
        textAlign : 'center',
        backgroundColor : '#Afd9e8',
        fontSize : 40,
        fontWeight : 'bold',
        
        alignItems : 'center' , 
        width : 330
    },
    signbtn : {
      fontSize : 15 , 
      fontWeight : 'bold'
    },
    or : {
        fontSize : 15 ,
        textAlign : 'center',  
        marginRight : 10 , 
        marginTop : 10
    },
    using : {
       fontSize : 12 , 
       textAlign : 'center' , 
       marginTop : 30
    },
   container : {
    marginTop : 80,
    justifyContent: 'center',
    paddingHorizontal: 20,
   } , 
   acc : {
    textAlign : 'center',
    marginTop  : -20
   },
   input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius : 10,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});