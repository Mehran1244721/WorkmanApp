import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, fetch } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../store/auth-context';
import axios, { Axios } from 'axios';

const SettingTools = ({ route }) => {

  const authCtx = useContext(AuthContext);

  const { name, phone, terms, about, logout, skill } = route.params;
  console.log(route.params)
  const [enteredName, setEnteredName] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');
  const [enteredSkill, setEnteredSkill] = useState('');
  const [data, setData] = useState(null);
  const [workerData, setWorkerData] = useState(null);


  //console.log(skill);

  useEffect(() => {

    fetchDataByName();
    fetchDataByNameWorker();


  }, [data]);



  const fetchDataByName = async () => {

    try {
      const response = await axios.get('https://workman-e7694-default-rtdb.firebaseio.com/users.json');

      const data1 = response.data;
      const userId = authCtx.userId;

      if (data1 === null) {
        //    console.log('No Orders Found');
        setData([]);
      } else {
        const userOrders = Object.entries(data1).reduce((acc, [key, value]) => {
          if (value.userId === userId) {
            acc.push({ orderId: key, ...value });
          }
          return acc;
        }, []);


        setData(data1);
      }

    } catch (err) {
      console.log(err);
    }



  }



  const UserId = authCtx.userId;
  const token = authCtx.token;





  const handleNameChange = async () => {
    try {

      const userID = authCtx.userId;
      const objectId = Object.keys(data).find(key => data[key].userId === userID);


      if (objectId) {
        const firebaseUrl = 'https://workman-e7694-default-rtdb.firebaseio.com';
        const endpoint = `users/${objectId}/name1.json`;

        const response = await axios.put(`${firebaseUrl}/${endpoint}`, JSON.stringify(enteredName));
        console.log('Name updated successfully:', response.data);

        const displayName = response.data;
        // console.log(displayName);
        authCtx.setUserNameFunc(displayName);
      } else {
        console.log('User not Found');
      }


    } catch (error) {
      console.log(error.response);
      console.error('Error updating name:', error);
    }
  };



  const handlePhoneChange = async () => {
    try {

      const userID = authCtx.userId;
      const objectId = Object.keys(data).find(key => data[key].userId === userID);


      if (objectId) {
        const firebaseUrl = 'https://workman-e7694-default-rtdb.firebaseio.com';
        const endpoint = `users/${objectId}/phone1.json`;

        const response = await axios.put(`${firebaseUrl}/${endpoint}`, JSON.stringify(enteredPhone));
        console.log('Phone Number updated successfully:', response.data);


      } else {
        console.log('User not Found');
      }


    } catch (error) {
      console.log(error.response);
      console.error('Error updating name:', error);
    }
  };


  const fetchDataByNameWorker = async () => {

    try {
      const response = await axios.get('https://workman-e7694-default-rtdb.firebaseio.com/workers.json');

      const data1 = response.data;
      const userId = authCtx.userId;

      if (data1 === null) {
        //    console.log('No Orders Found');
        setWorkerData([]);
      } else {
        const userOrders = Object.entries(data1).reduce((acc, [key, value]) => {
          if (value.id === userId) {
            acc.push({ orderId: key, ...value });
          }
          return acc;
        }, []);


        setWorkerData(data1);
      }

    } catch (err) {
      console.log(err);
    }



  }





  const handleSkillChange = async () => {
    try {

      const userID = authCtx.userId;
      const objectId = Object.keys(workerData).find(key => workerData[key].id === userID);


      if (objectId) {
        const firebaseUrl = 'https://workman-e7694-default-rtdb.firebaseio.com';
        const endpoint = `workers/${objectId}/skill.json`;

        const response = await axios.put(`${firebaseUrl}/${endpoint}`, JSON.stringify(enteredSkill));
        console.log('Skill updated successfully:', response.data);
        authCtx.setSkillHandler(response.data);

        //const displayName = response.data;
        // console.log(displayName);
        //  authCtx.setUserNameFunc(displayName);
      } else {
        console.log('User not Found');
      }


    } catch (error) {
      console.log(error.response);
      console.error('Error updating Skill:', error);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>

      {name &&
        <View style={styles.view1}>
          <View style={styles.updateCont}>
            <Text style={styles.update}>Update Name Here</Text>
          </View>
          <Text style={styles.name}>Enter Your New Name</Text>
          <TextInput style={styles.nameInput} placeholder='Enter New Name' onChangeText={text => setEnteredName(text)} value={enteredName}></TextInput>

          <TouchableOpacity style={styles.btn} onPress={handleNameChange}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>

      }

      {
        phone &&
        <View style={styles.view1}>
          <View style={styles.updateCont}>
            <Text style={styles.update}>Update Phone Here</Text>
          </View>
          <Text style={styles.name}>Enter Your New Phone</Text>
          <TextInput style={styles.nameInput} placeholder='Enter New Phone' onChangeText={text => setEnteredPhone(text)} value={enteredPhone} keyboardType='phone-pad'></TextInput>

          <TouchableOpacity style={styles.btn} onPress={handlePhoneChange}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      }

      {skill &&

        <View style={styles.view1}>
          <View style={styles.updateCont}>
            <Text style={styles.update}>Update Skill Here</Text>
          </View>
          <Text style={styles.name}>Enter Your New Service</Text>
          <TextInput style={styles.nameInput} placeholder='Enter New Skill' onChangeText={text => setEnteredSkill(text)} value={enteredSkill}></TextInput>

          <TouchableOpacity style={styles.btn} onPress={handleSkillChange}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>


      }





      {
        terms &&
        <View>
          <Text>The Terms and Condition of our application are .....</Text>
        </View>
      }

      {
        about &&
        <View>
          <Text>We are a group of friends who are focusing on automation of processes</Text>
        </View>
      }
      {
        logout &&

        <View style={styles.logout}>
          <Text style={styles.logoutText}>Do You Really Want To Logout</Text>
          <TouchableOpacity onPress={authCtx.logout} style={styles.logoutBtn}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      }




    </SafeAreaView>
  )
}

export default SettingTools;

const styles = StyleSheet.create({
  logout: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 50,
    alignItems: 'center',
    marginTop: 200,
    backgroundColor: 'white'
  },
  logoutText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 50
  },
  logoutBtn: {
    backgroundColor: '#f59095',
    color: 'white',
    padding: 15,
    margin: 10,
    width: 80,
    borderRadius: 10

  },
  view1: {
    textAlign: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 70,
    padding: 80,
    height: 800

  },
  name: {
    fontWeight: 'bold',
    margin: 5,
    padding: 10,
    fontSize: 15
  },
  nameInput: {
    borderColor: 'black',
    borderWidth: 2,
    width: 250,
    height: 30,
    borderRadius: 10
  },
  btn: {
    margin: 15,
    padding: 15,
    backgroundColor: '#aee6cc',
    borderRadius: 15,
    width: 100,
    marginTop: 50,
    alignItems: 'center',
    color: 'white'
  },

  update: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 40,
    color: 'red'
  },
  safe: {
    backgroundColor: '#c3dbbd',
    height: 800
  }
})