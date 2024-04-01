import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import Card from '../components/Card';
import { ActivityIndicator } from 'react-native';

const ImagesScreen = ({ route }) => {
  const { selectedDate } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imaget, setimaget] = useState(null);
  const [response_data, set_response_data] = useState(null);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {

    console.log(selectedDate);
    fetch('http://10.0.2.2:8000/fetch_image', {

      method: "POST",

      body: JSON.stringify({
        "date": selectedDate,
      }),

      headers: {
        Accept: 'application/json',
        "Content-type": "application/json"
      }

    })
      .then((response) => response.json())
      .then((responseData) => { 
        

        set_response_data(responseData) 
        setLoading(false);
      })
      
        .catch((error) => { console.log(error.message) })

  }, [])

  if(Loading)
  {
    return <View style={styles.loadcontainer}>
      <ActivityIndicator size={"large"}/>
      <Text>Loading</Text>
    </View>
  }

  return (

    <View style={styles.container}>
      <Text style={styles.text}>Selected Date: {selectedDate}</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {response_data.map((i) => {
          return (
            <>
              <Card Drone={i}/>
            </>
          )
        })}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={selectedImage} style={styles.modalImage} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 10,
  },
  imageText: {
    flex: 1,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',

  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default ImagesScreen;
