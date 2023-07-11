import { View, Text, SafeAreaView , StyleSheet , Image } from 'react-native'
import React , {useState} from 'react'

const Profile = ({route}) => {


const {isUser , isWorker , data1 , data2} = route.params;


console.log(data1);
console.log(data2);

//const [isUser , setIsUser] = useState(route.params);
//const [isWorker , setIsWorker] = useState(route.params);


//console.log(isUser);



console.log('The User : ',isUser);
console.log('The Worker : ' , isWorker);

//console.log('The Email',email1);


if (isUser) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <Text style={styles.heading}>User Profile</Text>




          {data1.map((item, index) => (
            <View key={index} style={styles.profileItem}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{item.email1}</Text>
            </View>
          ))}

          {data1.map((item, index) => (
            <View key={index} style={styles.profileItem}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{item.name1}</Text>
            </View>
          ))}

          {data1.map((item, index) => (
            <View key={index} style={styles.profileItem}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{item.phone1}</Text>
            </View>
          ))}

          {data1.map((item, index) => (
            <View key={index} style={styles.profileItem}>
              <Text style={styles.label}>User ID:</Text>
              <Text style={styles.value}>{item.userId}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    );
  }

if(isWorker){
    //setIsUser(false);
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <Text style={styles.heading}>Worker Profile</Text>




          {data2.map((item, index) => (
            <View key={index} style={styles.profileItem}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{item.email1}</Text>
            </View>
          ))}

          {data2.map((item, index) => (
            <View key={index} style={styles.profileItem}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{item.name1}</Text>
            </View>
          ))}

          {data2.map((item, index) => (
            <View key={index} style={styles.profileItem}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{item.phone1}</Text>
            </View>
          ))}

          {data2.map((item, index) => (
            <View key={index} style={styles.profileItem}>
              <Text style={styles.label}>Worker ID:</Text>
              <Text style={styles.value}>{item.id}</Text>
            </View>
          ))}
           {data2.map((item, index) => (
            <View key={index} style={styles.profileItem}>
              <Text style={styles.label}>Skill:</Text>
              <Text style={styles.value}>{item.skill}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
      )
}



  
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
      },
      profileContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
      },
      heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        marginLeft : 100 , 
        marginTop : 50
      },
      profileItem: {
        flexDirection: 'row',
        marginBottom: 8,
      },
      label: {
        flex: 1,
        fontWeight: 'bold',
        marginBottom : 20
      },
      value: {
        flex: 2,
        marginBottom : 20
      },
})