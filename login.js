import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
export function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await fetch('https://cpsc345sh.jayshaffstall.com/login.php', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      if (data.status === 'error') {
        Alert.alert('Login Error', data.error.join(', '));
      } else {
        await AsyncStorage.setItem('userToken', data.token);
        navigation.replace('ScavengerHunt');
      }
    } catch (error) {
      Alert.alert('Network Error', 'try again later');
    }
  };


  return (
    <View style = {styles.container}>
<TextInput 
  placeholder="Username" 
  onChangeText={setUsername} 
  value={username} 
  style={styles.input}
    />
    <TextInput 
    placeholder="Password" 
    secureTextEntry={true}
    onChangeText={setPassword} 
    value={password} 
    style={styles.input}
    />
      <Button title="Login" onPress={login} />
      <Button title= "Don't have an account?"  onPress={() => navigation.navigate('Register')} ></Button>
    </View>
  );
}
