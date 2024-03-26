import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toolbar from './toolbar'; // Assuming you have the Toolbar component in a separate file

const AnalyticsScreen = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.content}>
        <Text>Welcome to the Analytics Screen !</Text>
      </View>
      {/* <Toolbar activeScreen="analytics"/> */}
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

export default AnalyticsScreen;
