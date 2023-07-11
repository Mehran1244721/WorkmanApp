import { View, Text , StyleSheet , SafeAreaView , ScrollView, TouchableOpacity } from 'react-native'
import React , {useEffect, useState , useContext} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { AuthContext } from '../store/auth-context';
const OrderService = () => {
  

     const AuthCtx = useContext(AuthContext);
      const [data , setData] = useState([]);
      let i = 0;


      useEffect(()=>{
   
   
        fetchDataByName();
    
      },[fetchDataByName , data]);    
    

    //  console.log(userId);

      const fetchDataByName = async () => {
        try {
          const response = await axios.get('https://workman-e7694-default-rtdb.firebaseio.com/orders.json');
      
          const data1 = response.data;

          const userId = AuthCtx.userId;


          if(data1 === null){
        //    console.log('No Orders Found');
            setData([]);
          }else{
            const userOrders = Object.entries(data1).reduce((acc, [key, value]) => {
              if (value.UserId === userId) {
                acc.push({ orderId: key, ...value });
              }
              return acc;
            }, []);
          
             setData(userOrders);
        }
         /*  setOrders(data); */
          // Process the data here
         // console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
   //  console.log(orders);


   const handleDeleteOrder = async (userId) => {
    try {
      const response = await axios.get('https://workman-e7694-default-rtdb.firebaseio.com/orders.json');

      const data = response.data;
      const orderKeys = Object.keys(data);
      
      const orderToDelete = orderKeys.find(key => data[key].userId === userId);

      console.log(orderToDelete);
      
      if (orderToDelete) {
        await axios.delete(`https://workman-e7694-default-rtdb.firebaseio.com/orders/${orderToDelete}.json`);
        fetchDataByName(); // Refresh data after deletion
      } else {
        console.log('Order not found for the user ID:', userId);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };


  return (
    <SafeAreaView style = {styles.safe}>
      <View style = {styles.mainContainer}>
      <Text style = {styles.txt}>Your Orders</Text><MaterialCommunityIcons style = {styles.orderIcon} name="golf-cart" size={35} color="black" />
      </View>
      <View>
        <Text>{data.userName}</Text>
      </View>
      <View style = {styles.orderContainer}> 
       

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
          <Text style = {styles.orderCount}>Order #{index + 1}</Text>
            <Text>Worker Name:{order.WorkerName}</Text>
            <Text>Address: {order.address}</Text>
            <Text>Category: {order.category}</Text>
            <Text>Worker Phone: {order.WorkerPhone}</Text>
            <TouchableOpacity onPress = {()=>handleDeleteOrder(order.userId)}>
              <Text style = {styles.deleteBtn}>Delete Order</Text>
            </TouchableOpacity>
          </View>
          
        ))
      ) : (
        <Text>Loading user data...</Text>
      )}
    </View>
    </ScrollView>
  </View>
      </View>
      
    </SafeAreaView>
  )
}

export default OrderService;

const styles = StyleSheet.create({
  orderIcon : {
    marginTop : 28 , 
    marginLeft : 20
  },
  mainContainer : {
     backgroundColor : '#f1f5f0' , 
     width : 350 , 
     height  : 100 , 
     flexDirection : 'row',
     justifyContent : 'center' , 
     marginLeft : 13 ,
     marginTop : 20
  },
  txt : {
    fontWeight : 'bold' , 
    textAlign : 'center' , 
    marginTop : 30 ,
    fontSize : 25 
  } , 
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text : {
    fontSize: 20,
    padding: 15,
    margin : 10,
    borderRadius : 20
  },
  orderContainer : {
    alignItems: 'center' , 
    paddingBottom : 130 , 
  } , 
  orderItem : {
    marginTop : 30 , 
    borderColor : 'black' , 
    width : 300,
    borderRadius : 20,
    borderWidth : 2 , 
    padding : 10 , 
    backgroundColor : 'white'
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
  } , 
  safe : {
    backgroundColor : '#c6e3c1'
  },
  orderCount : {
    textAlign : 'center' ,
    color : 'red' ,
    fontWeight : 'bold' , 
    marginBottom : 2
  }
});