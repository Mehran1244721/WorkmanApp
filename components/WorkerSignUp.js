import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Image, Alert, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios, { Axios } from 'axios';
import { AuthContext } from '../store/auth-context';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
const WorkerSignUp = () => {

  const authCtx = useContext(AuthContext);

  const navigation = useNavigation();
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedImage2, setSelectedImage2] = useState();
  const [hasPermission, setHasPermission] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState({});
  const [WorkerName, setWorkerName] = useState('');
  const [WorkerSkill, setWorkerSkill] = useState('');


  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(galleryStatus.status === 'granted');

    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.canceled) {
      setSelectedImage(result.uri);
    }

    if (hasPermission === false) {
      return <Text>No Access to Internal Storage</Text>
    }
  }
  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.canceled) {
      setSelectedImage2(result.uri);
    }

    if (hasPermission === false) {
      return <Text>No Access to Internal Storage</Text>
    }
  }


  const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };



  const loginFormValidation = () => {
    const errors = {};
    if (email.trim() === '') {
      errors.email = 'Email is Required';
    } else if (!validateEmail(email)) {
      errors.email = 'Invalid Email Format';
    }

    if (password.trim() === '') {
      errors.password = 'Password is Required';
    }


    setErrors(errors);

    return Object.keys(errors).length === 0;
  }


  const formValidation = () => {

    const errors = {};

    if (name.trim() === '') {
      errors.name = 'Name is Required';
    }
    if (email.trim() === '') {
      errors.email = 'Email is Required';
    } else if (!validateEmail(email)) {
      errors.email = 'Invalid Email Format';
    }

    if (password.trim() === '') {
      errors.password = 'Password is Required';
    }

    if (skill.trim() === '') {
      errors.skill = 'Skill is Required';
    }

    if (location.trim() === '') {
      errors.location = 'Location is Required';
    }
    if (phone.trim() === '') {
      errors.phone = 'Phone No is Required';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;

  }

  async function signupHandler() {


    setSignUp(true);
    setLogin(false);
    setIsAuthenticated(true);
    formValidation();
    //  console.log(name);
    const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuFt4ULn0qRU2KpGb-6CZrZhq-vPrG87k',
      {
        displayName: name,
        email: email,
        password: password,
        returnSecureToken: true
      }

    );

    const token = response.data.idToken;
    const userId = response.data.localId;
    authCtx.authenticate(token);
    authCtx.setSkillHandler(skill);
    authCtx.setWorkerNameFunc(name);
    authCtx.setUserIdftn(userId);

    setWorkerName(name);
    setWorkerSkill(skill);
    //  const WorkerName  = name;
    //  const WorkerSkill = skill;


    const workerData = {
      id: userId,
      name1: name,
      email1: email,
      password1: password,
      phone1: phone,
      cnicfront: selectedImage,
      cnicback: selectedImage2,
      skill: skill,
      Location: location,
      deviceToken: authCtx.deviceToken,
    }


    const response2 = await axios.post('https://workman-e7694-default-rtdb.firebaseio.com/workers.json', workerData);

    setIsAuthenticated(false);
    /*   setName('');
      setEmail('');
      setPassword('');
      setSkill('');
      setLocation('');
      setPhone('');
      setSelectedImage('');
      setSelectedImage2(''); */

    setSignUp(false);
    //  console.log(phone);
  }
  const signupHandler2 = () => {
    setSignUp(true);
    setLogin(false);
  }

  console.log(WorkerSkill);

  // const nameLogin = name;
  //  const skillLogin = skill;


  //  console.log(WorkerName);



  async function loginHandler() {
    setLogin(true);
    setSignUp(false);
    loginFormValidation();

    //const workerSkillAuth = authCtx.skill;


    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuFt4ULn0qRU2KpGb-6CZrZhq-vPrG87k', {
        email: email,
        password: password,
        returnSecureToken: true
      })

      const token = response.data.idToken;
      const userid = response.data.localId;
      const displayName = response.data.displayName;
      console.log(displayName);

      const userDataResponse = await axios.get('https://workman-e7694-default-rtdb.firebaseio.com/workers.json');
      const userData = userDataResponse.data;

      if (userData) {
        const userIds = Object.keys(userData);
        const currentUser = userIds.find(id => userData[id].id === userid);

        console.log(currentUser);

        if (currentUser) {
          const WorkerSkill = userData[currentUser].skill;
          authCtx.setSkillHandler(WorkerSkill);
          console.log('The Skill is :', WorkerSkill);
          // Update the name in the context if needed: authCtx.setUserNameFunc(updatedName);
        }
      }





      //  console.log(name);
      //    console.log(token);
      authCtx.authenticate(token);
      //authCtx.setSkillHandler(workerSkillAuth);
      //  console.log(skillLogin);
      //    console.log(nameLogin);
      authCtx.setWorkerNameFunc(displayName);
      authCtx.setUserIdftn(userid);

      //r navigation.navigate('Tab2' , {name});
    } catch (err) {
      console.log(err);
      Alert.alert('Authentication Failed', 'Check Your Credentials');
    }

    console.log(email);
    console.log(password);
  }

  function signupwithGoogleHandler() {
    console.log('Tsffff : ');

    let provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return (
    <ScrollView>
      <View style={styles.container}>

        <MaterialIcons name="account-circle" size={80} style={styles.acc} color="black" />
        <Text style={styles.userText}>Worker Account</Text>
        {/*  { login &&  <TextInput style ={styles.input} placeholder='User Name' onChangeText={text => setUsername(text)} value={username}>
        
        </TextInput>} */}
        {/* <TouchableOpacity onPress = {toggleRecording}><Text style = {styles.voiceIcon}>{isRecording ? 'Stop Rec' : 'Start Rec'}</Text></TouchableOpacity> 
      <Text>{transcript}</Text> */}
        <TextInput style={styles.input} placeholder='Email' required='true' onChangeText={text => setEmail(text)} value={email} ></TextInput>
        {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
        {signUp && <TextInput style={styles.input} placeholder='Full Name' onChangeText={text => setName(text)} value={name}  ></TextInput>}
        {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
        <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={text => setPassword(text)} value={password} ></TextInput>
        {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
        {signUp && <TextInput style={styles.input} placeholder='Phone No' onChangeText={text => setPhone(text)} value={phone} keyboardType='phone-pad'></TextInput>}
        {errors.phone && <Text style={{ color: 'red' }}>{errors.phone}</Text>}
        {signUp && <TextInput style={styles.input} placeholder='Enter Skill' onChangeText={text => setSkill(text)} value={skill}></TextInput>}
        {errors.skill && <Text style={{ color: 'red' }}>{errors.skill}</Text>}
        {signUp && <TextInput style={styles.input} placeholder='Enter Your Location' onChangeText={text => setLocation(text)} value={location}></TextInput>}
        {errors.location && <Text style={{ color: 'red' }}>{errors.location}</Text>}
        {signUp && <View>

          <Button title="Upload CNIC Front" onPress={() => pickImage()} />
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />
          )}
          {errors.image1 && <Text style={{ color: 'red' }}>{errors.image1}</Text>}
          <Button title="Upload CNIC BACK" onPress={() => pickImage2()} />
          {selectedImage && (
            <Image source={{ uri: selectedImage2 }} style={{ width: 100, height: 100 }} />
          )}
          {errors.image2 && <Text style={{ color: 'red' }}>{errors.image2}</Text>}

        </View>}
        {login && <TouchableOpacity style={styles.btn} onPress={loginHandler}>
          <Text style={styles.signbtn}>Login</Text>
        </TouchableOpacity>}
      {/*   {login && <TouchableOpacity style={styles.btn} onPress={signupwithGoogleHandler}>
          <Text style={styles.signbtn}>Login With Google</Text>
        </TouchableOpacity>} */}
        <View style={styles.signContainer}>
          {!signUp && <Text style={styles.or2}>Doesnot have account?</Text>}
          {/* <Text style = {styles.or}>Or</Text> */}
          {login && <TouchableOpacity onPress={signupHandler2}>
            <Text style={styles.sb} >Sign Up</Text>
          </TouchableOpacity>}
        </View>
        {signUp && <TouchableOpacity style={styles.btn} onPress={signupHandler}>
          <Text style={styles.signbtn}>Register</Text>
        </TouchableOpacity>
        }

        {/* {login &&

          <>

            <Text style={styles.or}>or</Text>
            <Text style={styles.using}>Continue With</Text>

            <View style={styles.icons}>
              <TouchableOpacity style={styles.to}>
                <AntDesign name="google" size={40} color="#1a73e8" />
              </TouchableOpacity >
            </View>
          </>
        } */}
      </View>
    </ScrollView>
  )
}

export default WorkerSignUp;

const styles = StyleSheet.create({
  voiceIcon: {
    textAlign: 'right'
  },


  userText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    padding: 10
  },

  to: {
    padding: 10
  },
  icons: {
    flexDirection: 'row',
    padding: 10,
    margin: 15,
    justifyContent: 'center',
    marginTop: 40
  },

  btn: {
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#Afd9e8',
    fontSize: 40,
    fontWeight: 'bold',

    alignItems: 'center',
    width: 330
  },
  signbtn: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  or: {
    fontSize: 15,
    marginTop: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  using: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30
  },
  container: {
    marginTop: 100,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  acc: {
    textAlign: 'center',
    marginTop: -20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  signContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 40
  },
  sb: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10
  },
  or2: {
    fontSize: 15,
    textAlign: 'center',
    marginRight: 10,
    marginTop: 10
  },
});