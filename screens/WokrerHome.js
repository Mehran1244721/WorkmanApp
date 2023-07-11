import { View,SafeAreaView, Text , StyleSheet , TouchableOpacity , Image } from 'react-native'
import React  , {useState , useEffect,useContext}from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AuthContext } from '../store/auth-context';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons'; 
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';


const WokrerHome = ({route}) => {

  const navigation = useNavigation();

  const name = route.params;
  const AuthCtx = useContext(AuthContext);
 const [category , setCategory] = useState('');
 const [pickedCity , setPickedCity] = useState('');
 const [isConnected, setIsConnected] = useState(true);
 const [data2 , setData] = useState([]);
// const [isWorker , setIsWorker] = useState(true);
 useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    setIsConnected(state.isConnected);
  });

  return () => {
    unsubscribe();
  };
}, []);

useEffect(()=>{

  fetchDataById();   


  },[fetchDataById]);


  const fetchDataById = async () => {
    try {
      const response = await axios.get('https://workman-e7694-default-rtdb.firebaseio.com/workers.json');
  
      const data1 = response.data;

      const userId = AuthCtx.userId;

      console.log(data1);


      if(data1 === null){
    //    console.log('No Orders Found');
        setData([]);
      }else{
        const userData = Object.entries(data1).reduce((acc, [key, value]) => {
          if (value.id === userId) {
            acc.push({ orderId: key, ...value });
          }
          return acc;
        }, []);

        console.log(userData);
      
         setData(userData);
    }
     /*  setOrders(data); */
      // Process the data here
     // console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




   const data = [
      
    {id : 1 ,  title : 'Plumber' , icon : 'plumbing'  },
    {id : 2 ,  title : 'AC Tech'  , icon : 'plumbing'  },
    {id : 3 ,  title : 'Carpenter'  , icon : 'plumbing'  },
    {id : 4 ,  title : 'Labour'  , icon : 'plumbing'  },
    {id : 5 ,  title : 'Mechanic'  , icon : 'plumbing'  },
    {id : 6 ,  title : 'Electrician'  , icon : 'plumbing'  },
    {id : 7 ,  title : 'Hardware Eng'  , icon : 'plumbing'  },
    {id : 8 ,  title : 'Cleaner'  , icon : 'plumbing'  },
      {id : 9 ,  title : 'Mason'  , icon : 'plumbing'  },
      {id : 10 ,  title : 'Gardener' , icon : 'plumbing'  },
      {id : 11,  title : 'Driver'  , icon : 'plumbing'  },

   ];


   const images = [];

   const title = AuthCtx.skill;
   if(title==='Plumber'){
     images.push(require('../assets/Plumber/plumber.jpg'));
     images.push(require('../assets/Plumber/plumber2.jpeg'));
   }
   if(title==='AC Tech'){
       images.push(require('../assets/AC_TECH/AC1.jpg'));
     images.push(require('../assets/AC_TECH/AC2.jpg'));
   }
   if(title==='Carpenter'){
       images.push(require('../assets/Carpenter/carpenter2.jpg'));
     images.push(require('../assets/Carpenter/carpenter3.jpg'));
   }
   if(title==='Labour'){
       images.push(require('../assets/Labour/Labour1.jpg'));
     images.push(require('../assets/Labour/labour2.jpg'));
   }
   if(title==='Mechanic'){
       images.push(require('../assets/Mechanic/mechanic1.jpg'));
     images.push(require('../assets/Mechanic/mechanic2.jpg'));
   }
   if(title==='Electrician'){
       images.push(require('../assets/Electrician/Elect1.webp'));
     images.push(require('../assets/Electrician/electrician2.jpg'));
   }
   if(title==='Hardware Eng'){
       images.push(require('../assets/Hardware/hardware1.jpg'));
     images.push(require('../assets/Hardware/hardware2.jpg'));
   }
   if(title==='Cleaner'){
       images.push(require('../assets/Cleaner/cleaner1.jpg'));
     images.push(require('../assets/Cleaner/cleaner2.jpg'));
   }
   if(title==='Mason'){
       images.push(require('../assets/Mason/mason1.jpg'));
     images.push(require('../assets/Mason/mason2.jpg'));
   }
   if(title==='Gardener'){
       images.push(require('../assets/Gardener/gardener1.webp'));
     images.push(require('../assets/Gardener/gardener2.jpg'));
   }
   if(title==='Driver'){
       images.push(require('../assets/Driver/driver1.jpg'));
     images.push(require('../assets/Driver/driver2.jpg'));
   }


   const optionChangeHandler = (val) =>{
    setPickedCity(val);
}

 //  console.log(name);
   const userName  = name;
   //console.log(userName);

   if (!isConnected) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.noInternetContainer}>
          <Text style={styles.noInternetText}>No internet connection</Text>
        </View>
      </SafeAreaView>
    );
  }

  const onPressHandlerProfile = () =>{
    navigation.navigate('Profile', { isUser: false, isWorker: true, data2 });
  }




   
  return (
    <SafeAreaView style = {styles.safe}>
       <View style = {styles.navbar}>
       <MaterialIcons name="work" size={24} color="black" /><Text style = {styles.wm}>WorkMan</Text>
        <TouchableOpacity onPress={onPressHandlerProfile}>
        <Text style  = {styles.hello}>{AuthCtx.workerName}</Text>
        </TouchableOpacity>
        
        
     </View>

     <View style = {styles.imagesContainer}>
     <Swiper loop={true} autoplay={true}>
        {images.map((image, index) => (
          <View key={index}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </Swiper>
     </View>
      
     <Text style = {styles.mainText}><FontAwesome style = {styles.icon1} name="user-circle-o" size={24} color="black" />Hi, Mr  {AuthCtx.workerName}</Text>


      <View style = {styles.LocationPicker}>
       <Picker selectedValue={pickedCity}
        onValueChange={optionChangeHandler}
        style={styles.picker}>
         <Picker.Item label="Mardan" value="Mardan" />
         
         
        
        </Picker> 
        
     </View>
  
      <View style = {styles.skillContainer}>

      
      <Text style = {styles.serviceText}>Your are Currently Working as a </Text>
      <Text style = {styles.skillText} >{AuthCtx.skill}</Text>
      </View>
    </SafeAreaView>
  )
}

export default WokrerHome;
const styles = StyleSheet.create({

  safe : {
    backgroundColor : '#dce8e0' , 
    height : 800
  },
    navbar : {
        padding  : 10 , 
        backgroundColor : '#d1dae8',
        borderRadius : 10,
        margin : 10 , 
        flexDirection : 'row' , 
        justifyContent : 'space-between'
       } , 
       wm : {
        fontSize : 20 , 
        fontWeight : 'bold' , 
        color : 'blue',
        marginLeft : -50
       } , 
       hello : {
        marginLeft : -20 , 
        marginTop : 4 , 
        fontWeight : 'bold'
       } ,
       mainText : {
        fontWeight : 'bold' , 
        fontSize : 20,
        textAlign : 'center' , 
        
        backgroundColor : '#f7fcf9' , 
        padding : 20

       },
       skillContainer : {
        fontWeight : 'bold',
        alignItems : 'center' , 
        marginTop : 150
       },
       skillText : {
        marginTop : 20 , 
        fontWeight : 'bold' , 
        fontSize : 30 
       } ,
       serviceText : {
        fontWeight : 'bold' , 
        
       },
       imagesContainer : {  
        width : 400,
        height : 200,
       } , 
       image : {
        width : '100%' , 
        height : '100%'
       },
       LocationPicker : {
        marginTop : -80,
        flexDirection : 'row' , 
        marginLeft : 90
       },
       picker : {
        width: 190,
        height: 20,
        ...Platform.select({
            ios: {
              // iOS-specific style
              shadowOpacity: 0,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 0,
              backgroundColor: 'transparent',
            }, 
          }),
        },
          icon1 : {
            marginTop : 10 ,
            marginLeft : 50 ,
            marginRight : 10 
           } ,
           
           noInternetContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          noInternetText: {
            fontSize: 20,
            fontWeight: 'bold',
          },

});