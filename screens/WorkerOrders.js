import { View, Text , SafeAreaView , ScrollView , TouchableOpacity, StyleSheet } from 'react-native'
import React , {useState , useEffect , useContext} from 'react'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../store/auth-context';
import axios from 'axios';
import * as Notifications from 'expo-notifications';


const WorkerOrders = () => {


 const AuthCtx = useContext(AuthContext);

  const navigation = useNavigation();

  const skill = AuthCtx.skill;

  const [data , setData]  = useState([]);



  useEffect(()=>{
   
   
    fetchDataBySkill(skill);

  },[fetchDataBySkill , skill]);  


  const fetchDataBySkill = async (category) => {
    try {
      const response = await axios.get('https://workman-e7694-default-rtdb.firebaseio.com/orders.json');
  
      const data1 = response.data;

      console.log(data1);

      const userSkill = AuthCtx.skill;
      const userId = AuthCtx.userId;


      console.log(userSkill);
      console.log(userId);
      if(data1 === null){
    //    console.log('No Orders Found');
    console.log('This Portion is Called');
        setData([]);
      }else{
        const workerOrders = Object.entries(data1).reduce((acc, [key, value]) => {
          if (value.WorkerId === userId) {
            acc.push({ orderId: key, ...value });
          }
          return acc;
        }, []);
        console.log(workerOrders);
         setData(workerOrders);
 }

    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }
 
 const handleDeleteOrder = async (userId) => {

      try {
        const response = await axios.get('https://workman-e7694-default-rtdb.firebaseio.com/orders.json');
  
        const data1 = response.data;
        const orderKeys = Object.keys(data1);
        
        const orderToDelete = orderKeys.find(key => data1[key].userId === userId);
        if(data.deviceToken){
          fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: data.deviceToken,
              title: 'Order Accepted',
              body: 'world',
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Response:', data);
              // Handle the response data as needed
            })
            .catch((error) => {
              console.error('Error:', error);
              // Handle the error
            });
        } 
        if (orderToDelete) {
          await axios.delete(`https://workman-e7694-default-rtdb.firebaseio.com/orders/${orderToDelete}.json`);
          fetchDataBySkill(); // Refresh data after deletion
        } else {
          console.log('Order not found for the user ID:', userId);
        }
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    };

  return (
    <SafeAreaView style = {styles.safe}>
     
    
    <View style = {styles.view1} >
      <Text style = {styles.text1}>Your Orders</Text>
    </View>

    <View style = {styles.orderContainer}>

    
    <ScrollView>

     <View>

     {
        !data &&
        <View>
          <Text>No Orders Found ...</Text>
        </View>
      }
      {data.length > 0 ? (
        data.map((order, index) => (
          <View key={index} style = {styles.orderItem}>
            <Text>Order #{index + 1}</Text>
            <Text>Name: {order.UserName}</Text>
            <Text>Address: {order.address}</Text>
            <Text>Category: {order.category}</Text>
            <Text>Phone: {order.phone}</Text>
            <TouchableOpacity style = {styles.deleteBtn} onPress = {()=> handleDeleteOrder(order.userId)}>
              <Text style = {styles.orderText}>Approve Order</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text> No Orders...</Text>
      )}


     </View>






    </ScrollView>
    </View>
    </SafeAreaView>
  )

      };
export default WorkerOrders;

const styles = StyleSheet.create({

  safe : {
     backgroundColor : '#dfe6e1',
     height : 800
   },
 orderText : {
  color : 'white'
 },

  text1 : {
    fontSize : 20 , 
    fontWeight : 'bold' , 
    textAlign : 'center'
  } , 
  view1 : {
    margin : 10 ,
    padding : 20, 
    backgroundColor : '#f7fcf9' , 
    borderRadius : 50
  },
  ordersListView : {
    width : 350 , 
    backgroundColor : 'skyblue' , 
    alignItems : 'center' , 
    padding : 20 , 
    marginLeft : 15 , 
    borderRadius : 50 , 
    marginTop : 10
  } , 
  btnText : {
    fontWeight : 'bold' , 
    fontSize : 15
  } , 
  orderContainer : {
    alignItems: 'center' , 
    paddingBottom : 180
  } , 
  orderItem : {
    marginTop : 30 , 
    borderColor : 'black' , 
    width : 300,
    borderRadius : 20,
    borderWidth : 2 , 
    padding : 10
  },
  orderNo: {
    fontWeight:'bold',
    textAlign : 'center',
    marginTop : 10 , 
    color : 'red'
  } , 
  deleteBtn : {
    textAlign : 'center' , 
    marginTop : 20 , 
    backgroundColor : 'red' , 
    padding : 10 , 
    color : 'white' , 
    width : 130 , 
    alignItems : 'center' , 
    marginLeft : 70 , 
    borderRadius : 20
  },
  approveBtn : {
    borderRadius : 30
  }
});