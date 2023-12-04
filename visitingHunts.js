import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { useSelector } from 'react-redux';

export function DoHunts({ route, navigation }) {
  const { huntId, huntDetails } = route.params;
  const [locations, setLocations] = useState([]);
  const userToken = useSelector((state) => state.user.token);

  useEffect(() => {
    setLocations(huntDetails.locations);
  }, [huntDetails]);

  const checkIn = async (locationid) => {
    const formData = new FormData();
    formData.append('locationid', locationid);
    formData.append('token', userToken);      
    formData.append('latitude', ''); 
    formData.append('longitude', '');

    const response = await fetch('https://cpsc345sh.jayshaffstall.com/completeLocation.php', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      if (result.status == 'toofar') {
        Alert.alert('Error', 'Too far! Get closer to check in.');
      } else {
        Alert.alert('Check In', `You have checked in.`);
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Hunt ID: {huntId}</Text>
      <Text>Hunt Name: {huntDetails && huntDetails.name}</Text>
      <Text>Locations:</Text>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.locationid.toString()}
        renderItem={({ item }) => (
          <View>
          <Text>Name: {item.name}</Text>
          <Text>Clue: {item.clue}</Text>
          <Text>Description: {item.description}</Text>
          <Button title="Check In" onPress={() => checkIn(item.locationid)} />
          </View>
        )}
      />
    </View>
  );
}
