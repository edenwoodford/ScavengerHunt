import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';

export function HuntsPage() {
  const [huntName, setHuntName] = useState('');
  const [hunts, setHunts] = useState([]);
  const userToken = useSelector((state) => state.user.token);
  const navigation = useNavigation();

  const fetchHunts = async () => {
  };
//useFocusEffect use this anytime you navigate back to this page -steven
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.reset({ 
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
  useEffect(() => {
    fetchHunts();
  }, []);
  const addHunt = async () => {
    if (!userToken) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('name', huntName);
      formData.append('token', userToken); 
  
      const response = await fetch('https://cpsc345sh.jayshaffstall.com/addHunt.php', {
        method: 'POST',
        body: formData,
      });
        
      const data = await response.json();
      if (data.status === 'error') {
        Alert.alert('Error', data.error.join(', '));
        return;
      }
      Alert.alert('Success', 'Hunt added');
      setHuntName('');
      fetchHunts(); 
    } catch (error) {
      Alert.alert('Error', 'Error adding hunt');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Create hunt"
        value={huntName}
        onChangeText={setHuntName}
      />
      <Text>This is the hunts page!</Text>
      <Button title="Logout" onPress={handleLogout} /> 
      <Button title="Add Hunt" onPress={addHunt} />
      {hunts.map(hunt => (
        <Text key={hunt.id}>{hunt.name}</Text>
      ))}
    </View>
  );
}
