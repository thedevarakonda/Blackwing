import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import ImagesScreen from './droneimages';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native'

const Stack = createNativeStackNavigator();

const Home = () =>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={HomeScreen} options={{headerTitle:'Home'}} />
      <Stack.Screen name="Images" component={ImagesScreen} />
    </Stack.Navigator>
  )
}


const HomeScreen = () => {

  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    
    axios('https://fastapi-blackwing-5.onrender.com/fetch_data')
    .then((response) => {
      console.log(response.data);
      setData(response.data)
      setLoading(false)
    })
      .catch((error) => {console.log(error)});
  },[])
  

  const handleItemClick = (item) => {
    console.log('Item clicked:', item);
    navigation.navigate('Images', { selectedDate: item.date });
  };


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)} style={styles.item}>
      <Text style={styles.date}>{format(new Date(item.date), 'EEEE, MMMM do yyyy')}</Text>
      <View style={styles.countContainer}>
        <Text style={styles.count}>Drone Count:</Text>
        <Text style={styles.countValue}>{item.count}</Text>
      </View>
    </TouchableOpacity>
  );
  
  if(loading)
  {
    return <View style={styles.loadcontainer}>
      <ActivityIndicator size={"large"}/>
      <Text>Loading</Text>
    </View>
  }
  return (
    <View style={styles.container}>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.content}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loadcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent:'center',
    alignItems:'center',
  },
  content: {
    flexGrow: 1,
  },
  item: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  countContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  count: {
    fontSize: 14,
    color: '#888',
    marginRight: 5,
  },
  countValue: {
    fontSize: 14,
    color: '#000',
  },
  filterButton: {
    alignSelf: 'flex-start',
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
  },
  filterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
});



export default Home;