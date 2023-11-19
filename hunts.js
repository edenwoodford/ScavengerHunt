import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, Alert,FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager'

//useFocusEffect use this anytime you navigate back to this page -steven
export function HuntsPage() {
  const [huntName, setHuntName] = useState('');
  const [hunts, setHunts] = useState([]);
    const [location, setLocation] = useState(null);
    const [message, setMessage] = useState('Waiting...');
    useEffect(() => {
    (async () => {
    let fg = await Location.requestForegroundPermissionsAsync();
    if (fg.status !== 'granted') {
    setMessage('Permission to access foreground location was denied');
    return;``
    }
    let bg = await Location.requestBackgroundPermissionsAsync();
    if (bg.status !== 'granted') {
    setMessage('Permission to access background location was denied');
    return;
    }
    setMessage("Ready for tracking")
    return () => {
    stopTracking()
    }
    })();
    }, []);
    const startTracking = async () => {
      await Location.startLocationUpdatesAsync(taskName, {
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 3,
      });
      }
      const stopTracking = async () => {
        let status = await TaskManager.isTaskRegisteredAsync(taskName)
        if (status)
        await Location.stopLocationUpdatesAsync(taskName)
        }
  const userToken = useSelector((state) => state.user.token);
  const navigation = useNavigation();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.reset({ 
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
  const fetchHunts = async () => {
    try {
      const formData = new FormData();
      formData.append('token', userToken);
      const response = await fetch('https://cpsc345sh.jayshaffstall.com/getMyHunts.php', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status == 'error') {
        Alert.alert('Error', data.error.join(', '));
        return;
      }
      setHunts(data.hunts);
    } catch (error) {
      Alert.alert('Error', 'Error fetching hunts');
    }
  };

  const addHunt = async () => {
    if (!userToken) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    const formData = new FormData();
    formData.append('name', huntName);
    formData.append('token', userToken);

    try {
      const response = await fetch('https://cpsc345sh.jayshaffstall.com/addHunt.php', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.status == 'error') {
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
  const detailButton = (huntId) => {
    navigation.navigate('HuntDetail', { id: huntId });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchHunts();
      return () => {};
    }, [])
  );
  const goHome = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={{ padding: 20 }}>
    <Text>{message}</Text>
    <Button title="Start" onPress={startTracking}/>
    <Button title="Stop" onPress={stopTracking}/>
    <Button title="Go Home" onPress={goHome} />
      <TextInput
        placeholder="Create hunt"
        value={huntName}
        onChangeText={setHuntName} />
      <Button title="Add Hunt" onPress={addHunt} />
      <Button title="Logout" onPress={handleLogout} />
      <FlatList
        data={hunts}
        keyExtractor={(hunt) => hunt.huntid.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Button title="View Details" onPress={() => detailButton(item.huntid)} />
          </View>
        )}
      />
    </View>
  );
}
