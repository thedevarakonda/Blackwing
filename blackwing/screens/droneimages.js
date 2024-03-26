import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';

const ImagesScreen = ({ route }) => {
  const { selectedDate } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImageClick = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.text}>Selected Date: {selectedDate}</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity onPress={() => handleImageClick(require('../assets/im1.jpg'))}>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/im1.jpg')} style={styles.image} />
            <Text style={styles.imageText}>
              Time: 10:00 AM{'\n'}
              Count: 15{'\n'}
              Location: Location 1
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleImageClick(require('../assets/im2.jpg'))}>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/im2.jpg')} style={styles.image} />
            <Text style={styles.imageText}>
              Time: 11:00 AM{'\n'}
              Count: 20{'\n'}
              Location: Location 2
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleImageClick(require('../assets/im3.jpg'))}>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/im2.jpg')} style={styles.image} />
            <Text style={styles.imageText}>
              Time: 11:00 AM{'\n'}
              Count: 20{'\n'}
              Location: Location 2
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleImageClick(require('../assets/im4.jpg'))}>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/im2.jpg')} style={styles.image} />
            <Text style={styles.imageText}>
              Time: 11:00 AM{'\n'}
              Count: 20{'\n'}
              Location: Location 2
            </Text>
          </View>
        </TouchableOpacity>
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
