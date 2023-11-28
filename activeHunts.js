import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export function ActiveHunts() {
  const [activeHunts, setActiveHunts] = useState([]);
  const userToken = useSelector((state) => state.user.token);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchActiveHunts = async () => {
      try {
        const formData = new FormData();
        formData.append('token', userToken);
        const response = await fetch('https://cpsc345sh.jayshaffstall.com/findActiveHunts.php', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.hunts) {
          setActiveHunts(data.hunts);
        }
      } catch (error) {
        Alert.alert('Error', 'Error fetching active hunts');
      }
    };

    fetchActiveHunts();
  }, [userToken]);
  const abandonHunt = async (huntId) => {
    try {
      const formData = new FormData();
      formData.append('token', userToken);
      formData.append('huntid', huntId);
      const response = await fetch('https://cpsc345sh.jayshaffstall.com/abandonHunt.php', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status === 'success') {
        Alert.alert('Success', 'hunt abandoned');
      } else {
        Alert.alert('Error', 'could not abandon this scavenger hunt');
      }
    } catch (error) {
      Alert.alert('Error', 'could not abandon scavenger hunt');
    }
  };
  const viewThisHunt = async (huntId) => {
    try {
      const formData = new FormData();
      formData.append('token', userToken);
      formData.append('huntid', huntId);
  
      const response = await fetch('https://cpsc345sh.jayshaffstall.com/getAvailableLocations.php', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Response:', response);
      console.log('Data:', data);
  
      if (data.status === 'okay') {
        console.log('Data Hunt:', data.hunt);
        navigation.navigate('DoHunts', { huntId, huntDetails: data});
      } else {
        Alert.alert('Error', 'No/failed to get locations');
      }
    } catch (error) {
      console.error('Error to see', error);
      Alert.alert('Error', 'no locations to show');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={activeHunts}
        keyExtractor={(item) => item.huntid.toString()}
        renderItem={({ item }) => (
        <View style={{ paddingVertical: 10 }}>
          <Text>{item.name} - Hunt Completion: {item.completed}%</Text>
          <Button title="View Details" onPress={() => viewThisHunt(item.huntid)} />
          <Button title="Abandon Hunt" onPress={() => abandonHunt(item.huntid)} />
        </View>
      )}  />
    </View>
  );
}
