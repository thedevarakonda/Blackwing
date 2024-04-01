import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
const MapScreen = () => {
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState([]);

  useEffect(()=>{

    axios('http://10.0.2.2:8000/fetch_map')
    .then((response)=>{
      console.log(response.data)
      setLocation(response.data)
    })
    .catch((error)=>{
      console.log("Error: ",error)
    })
  },[])
  
  const openDatePicker = () => {
    setShowDate(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);

    const dronesAvailable = location.some(item => currentDate.toDateString() === new Date(item.date).toDateString());
    console.log(dronesAvailable)

    if (!dronesAvailable) {
      return(
      
      Alert.alert(
        'No drones',
        'There are no drones detected on '+currentDate.toDateString(),
        [{ text: 'OK', onPress: () => console.log('OK pressed') }]
      )
      )
    }
    
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 17.4,
          longitude: 78.4,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {
          
          location.map((item,index)=>{

            if(date.toDateString() == new Date(item.date).toDateString()){
              return(
                <Marker 
                  key={index}
                  coordinate={{latitude:item.latitude,longitude:item.longitude}}
                />
              )
            }
            
          })
        }
      </MapView>
      <View style={styles.group}>
        <TouchableOpacity style={styles.dateButton} onPress={openDatePicker}>
          <Text style={styles.dateButtonText}>Choose Date</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Selected Date: {date.toDateString()}</Text>
      </View>
      
      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={handleDateChange}

        />
      )}
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
  map: {
    height: '80%',
    width: '100%',
  },
  dateButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  dateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  group:{
      alignItems:'center'
  },
  text:{
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold'
  }

});

export default MapScreen;
