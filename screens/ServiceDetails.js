import { View, Text , SafeAreaView , StyleSheet ,Image , ScrollView,  TouchableOpacity} from 'react-native'
import React, { useState , useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import axios from 'axios';
const ServiceDetails = ({route}) => {

    const navigation = useNavigation();
    const [data , setData] = useState([]);


    useEffect(()=>{

    fetchDataByName();

    },[]);

    const {title , icon} = route.params;

    const images = [];
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


    const quickOrderHandler = () =>{
      navigation.navigate('quickOrder' , {title});
    }

    const fetchDataByName = async () => {
      try {
        const response = await axios.get('https://workman-e7694-default-rtdb.firebaseio.com/workers.json');
    
        const data1 = response.data;

       // const userId = AuthCtx.userId;

      //  const skill = AuthCtx.skill;

        console.log(data1);


        if(data1 === null){
      //    console.log('No Orders Found');
          setData([]);
        }else{

          const workers = [];

          for (const key in data1) {
            if (data1[key].skill === title) {
              workers.push({ workerId: key, ...data1[key] });
            }
          }
          console.log(workers);
          setData(workers);
        }
       } catch (error) {
          console.error('Error fetching data:', error);
        }







          /* const userOrders = Object.entries(data1).reduce((acc, [key, value]) => {
            if (value.skill === skill) {
              acc.push({ orderId: key, ...value });
            }
            return acc;
          }, []);
        
           setData(userOrders);

           console.log(userOrders);
      }
       /*  setOrders(data); */
        // Process the data here
       // console.log(data);
  //    } catch (error) {
  //      console.error('Error fetching data:', error);
  //    }
 //   };
// */


    }


  return (
    <SafeAreaView style = {styles.safe}>
        
        <View style = {styles.txtView}>
       <TouchableOpacity onPress = {()=> navigation.goBack()}>
        <AntDesign  name="arrowleft" style = {styles.arrow} size={24} color="blue" />
        </TouchableOpacity>
        <Text style = {styles.text}>Selected Service</Text>
        </View>
        <View style = {styles.main}>
     
       <MaterialIcons name={icon} size={70} color='black'></MaterialIcons>
       <Text style = {styles.title}>{title}</Text>

        </View>
       {/*  <View style = {styles.imagesContainer}>
     <Swiper loop={true} autoplay={true}>
        {images.map((image, index) => (
          <View key={index}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </Swiper> 
      </View> */}

     <View>
    
     <ScrollView style = {styles.scroll} decelerationRate={0.9}>

<View style = {styles.workers}>

{
   !data &&
   <View>
     <Text>No Workers Found ...</Text>
   </View>
 }
 {data.length > 0 ? (
   data.map((order, index) => (
     <View key={index} style = {styles.orderItem}>
      
      <TouchableOpacity onPress={()=> navigation.navigate('WorkerInfo' , {order})}>
       <Text>Worker #{index + 1}</Text>
       <Text>Name: {order.name1}</Text>
       <Text>Address: {order.Location}</Text>
       <Text>Category: {order.skill}</Text>
       <Text>Phone: {order.phone1}</Text>
       
         <Text style = {styles.btn}>Hire Worker</Text> 

       </TouchableOpacity>
       
     </View>
   ))
 ) : (
   <Text>Loading Data...</Text>
 )}


</View>






</ScrollView>





     </View>
      
    </SafeAreaView>
  )
}

export default ServiceDetails;

const styles = StyleSheet.create({
 scroll : {
  marginBottom : 400
 },
  btn : {
    fontSize : 18 , 
    marginLeft : 120 , 
    marginTop : 5, 
    backgroundColor : 'red' , 
    width : 120 , 
    textAlign : 'center',
    padding : 5 ,
    borderRadius : 10 , 
    color : 'white'
  },
    orderbtnsCont : {
        flexDirection : 'row' , 
        marginBottom : 60 ,
         padding : 20 ,  
         justifyContent : 'space-around' , 
         marginTop : 40 , 
         
    },
    orderBtns : {
        backgroundColor : '#37cef0' ,
        padding : 20,
        borderRadius : 50 ,
        width : 180 , 
        
    },
    workers : {
    },

    costCont : {
        alignItems : 'center' , 
        marginTop : 15 , 
        backgroundColor : 'white' , 
        width : 300 , 
        padding : 20 , 
        marginLeft : 40 , 
        borderRadius : 20
    },
    costText : {
        fontWeight : 'bold' , 
        marginTop : 8
    },
    
    arrow : {
        
      marginTop : 15,
      marginLeft : 20
    },
   title : {
    fontWeight : 'bold' , 
    fontSize : 30
   },
    txtView : {
       
        backgroundColor : 'white', 
        height : 60 , 
        marginBottom : 20
    },
    text : {
        fontWeight : 'bold' , 
        fontSize : 25 , 
        textAlign : 'center' ,   
        marginTop : -25 
    },
  
    main : {
        padding :10 ,   
        alignItems : 'center',
        backgroundColor : 'white' , 
        
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
       imagesContainer : {  
        width : 400,
        height : 200,
       } , 
       image : {
        width : '100%' , 
        height : '100%'
       },
       safe : {
        backgroundColor : '#e3d5d5'
       },
       orderText : {
        fontWeight : 'bold' , 
        textAlign : 'center',
        color : 'white'
       },
       orderItem : {
        marginTop : 10 , 
        borderColor : 'black' , 
        width : 350,
        borderRadius : 20,
        borderWidth : 2 , 
        padding : 10 , 
        marginLeft : 10 , 
      },
      });