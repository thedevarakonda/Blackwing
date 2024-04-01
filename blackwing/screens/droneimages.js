import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';

const ImagesScreen = ({ route }) => {
  const { selectedDate } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);

  const handleImageClick = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  useEffect(() => {
    axios(`http://10.0.2.2:5000/fetch_images?date=${selectedDate}`)
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((error) => { console.log("Error:", error) })

  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Selected Date: {selectedDate}</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {data.map((imageData, index) => (
          <TouchableOpacity key={index} onPress={() => handleImageClick(imageData.image)} style={styles.imageContainer}>
            <Image source={{ uri: `data:image/jpeg;base64,${imageData.image}` }} style={styles.image} />
            <Text style={styles.imageText}>
              Time: {imageData.time}{'\n'}
              Count: {imageData.count}{'\n'}
              {imageData.location}
            </Text>
          </TouchableOpacity>
        ))}
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
              <Image source={{ uri: `data:image/jpeg;base64,${selectedImage}` }} style={styles.modalImage} />
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
