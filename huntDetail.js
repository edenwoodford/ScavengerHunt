import React, { useState, useEffect } from 'react';
import { Button, View, TextInput,Text, Alert } from 'react-native';
import { useSelector } from 'react-redux';

export function HuntDetail({ route, navigation }) {
    const [huntName, setHuntName] = useState('');
    const userToken = useSelector((state) => state.user.token);
    useEffect(() => {
        if (route.params && route.params.name) {
          setHuntName(route.params.name);
        } else {
          setHuntName('');
        }
      }, [route.params]);
    const updateHunt = async () => {
      const formData = new FormData();
      formData.append('huntid', route.params.id);
      formData.append('name', huntName);
      formData.append('token', userToken);
      try {
        const response = await fetch('https://cpsc345sh.jayshaffstall.com/updateHunt.php', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.status == 'error') {
          Alert.alert('Error', data.error.join(', '));
          return;
        }
        Alert.alert('Success', 'Hunt updated');
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', 'Error updating hunt');
      }
    };
    const deleteHunt = async () => {
      const formData = new FormData();
      formData.append('huntid', route.params.id);
      formData.append('token', userToken);
      try {
        const response = await fetch('https://cpsc345sh.jayshaffstall.com/deleteHunt.php', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
        if (data.status == 'error') {
          Alert.alert('Error', data.error.join(', '));
          return;
        }
        Alert.alert('Success', 'Hunt deleted');
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', 'Error deleting hunt');
      }
    };
    return (
      <View style={{padding: 20}}>
        <TextInput
          placeholder="Change hunt name here"
          value={huntName}
          onChangeText={setHuntName}/>
        <Text> This is the hunts page!</Text>
        <Button title="Save Changes" color= "green" onPress={updateHunt} />
        <Button title="Delete Hunt" color="red" onPress={deleteHunt} />
      </View>
    );
  }
  