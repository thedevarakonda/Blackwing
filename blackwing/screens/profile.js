import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toolbar from './toolbar'; // Assuming you have the Toolbar component in a separate file

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.content}>
        <Text>Welcome to the Profile Screen !</Text>
      </View>
      {/* <Toolbar activeScreen="profile"/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
