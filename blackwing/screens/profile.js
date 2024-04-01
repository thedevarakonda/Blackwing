import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  
  const handleUsernameChange = (text) => {
    setUsername(text);
  }
  
  const handleEmailChange = (text) => {
    setEmail(text);
  }
  
  const handleChangePassword = () => {
    // Add functionality to change password
  }
  
  const handleLogout = () => {
    // Add functionality to logout
  }
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={handleUsernameChange}
      />
      <TextInput
        style={styles.input}
        placeholder="emailaddress@gmail.com"
        value={email}
        onChangeText={handleEmailChange}
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, {backgroundColor: 'pink'}]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
      <Text style={styles.contactText}>Contact Us</Text>
      <Text style={styles.contactEmail}>support@blackwing.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  contactText: {
    marginTop: 20,
  },
  contactEmail: {
    color: 'blue',
  },
});

export default ProfileScreen;