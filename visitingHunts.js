import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';

export function DoHunts({ route, navigation }) {
  const { huntId, huntDetails } = route.params;
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    setLocations(huntDetails.locations);
  }, [huntDetails]);
  
  const checkIn = async (locationId) => {
  //logic to check in and assist user in getting closer at some point
  //locationid
    Alert.alert('Check In', `Checked in at location ${locationId}`);
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
          <View style={{ paddingVertical: 10 }}>
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
