import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import { useEffect } from 'react'
import axios from 'axios'
import { Modal } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { ActivityIndicator } from 'react-native'

const Card = ({Drone}) => {
  const [imaget, setimaget] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    
    axios.post("http://10.0.2.2:8000/fetch_imageonly",{
      "id":Drone['id']
    }, responseType='arraybuffer')
    .then(response => {setimaget(response.data['image'])})
    .catch(error=>console.error(error))
  }, [])

  const handleImageClick = (imageUri) => {
    // setSelectedImage(imageUri);
    setModalVisible(true);
  };
  
  console.log(Drone);
    return (
      <View>
    <TouchableOpacity onPress={()=>{handleImageClick("bla")}}>
      <View style={styles.imageContainer}>
      {imaget===null?
      <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80, height: 100}} ><ActivityIndicator /></View>:
      <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80, height: 100}}><Image style={{width: 140, height: 100}} source={{uri: `data:image/png;base64,${imaget}`}}/></View> }
        <Text style={styles.imageText}>
          Time: {Drone['Time']} {'\n'}
          Count: {Drone['Count']}{'\n'}
          Location: Location 1
        </Text>
      </View>
    </TouchableOpacity>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{uri: `data:image/png;base64,${imaget}`}} style={styles.modalImage} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
    )
}

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



export default Card;
