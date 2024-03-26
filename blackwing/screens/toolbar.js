import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Toolbar = ({ activeScreen, navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToScreen('Home')}>
        <MaterialIcons name="home" size={24} color={activeScreen === 'Home' ? 'black' : 'grey'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToScreen('Analysis')}>
        <MaterialIcons name="analytics" size={24} color={activeScreen === 'Analysis' ? 'black' : 'grey'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToScreen('Maps')}>
        <MaterialIcons name="map" size={24} color={activeScreen === 'Maps' ? 'black' : 'grey'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToScreen('Profile')}>
        <MaterialIcons name="person" size={24} color={activeScreen === 'Profile' ? 'black' : 'grey'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white', // Customize toolbar background color
    height: 50, // Customize toolbar height
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: 'black'
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    borderColor: 'black', // Color of the border
  },
});

export default Toolbar;
