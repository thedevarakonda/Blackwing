import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';

const MapScreen = () => {
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState([
    {
      date: new Date(2024, 2, 20), 
      latitude: 25,
      longitude: 41,
    },
    {
      date: new Date(2024, 2, 21), 
      latitude: 26,
      longitude: 42,
    },
    {
      date: new Date(2024, 2, 22), 
      latitude: 27,
      longitude: 43,
    },
    {
      date: new Date(2024, 2, 23), 
      latitude: 28,
      longitude: 44,
    },
    {
      date: new Date(2024, 2, 24), 
      latitude: 29,
      longitude: 46,
    },
    {
      date: new Date(2024, 2, 24), 
      latitude: 29,
      longitude: 48,
    },
  ]);
  
  const openDatePicker = () => {
    setShowDate(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);

    const dronesAvailable = location.some(item => currentDate.toDateString() === item.date.toDateString());
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

            if(date.toDateString() == item.date.toDateString()){
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
