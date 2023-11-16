import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useSelector } from 'react-redux';
//use geolocation?
export function LocationDetail({ route, navigation }) {
  const [location, setLocation] = useState(route.params.location || {});
  const userToken = useSelector((state) => state.user.token);
  
  useEffect(() => {
    if (!location.name) {
      fetchLocationDetails();
    }
  }, []);

  const fetchLocationDetails = async () => {
    const formData = new FormData();
    formData.append('locationid', location.locationid);
    formData.append('token', userToken);

    try {
      const response = await fetch('https://cpsc345sh.jayshaffstall.com/getLocationDetails.php', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status == 'success') {
        setLocation(data.location);
      } else {
        Alert.alert('Error', 'Failed to fetch location details');
      }
    } catch (error) {
      Alert.alert('Error', 'Error fetching location details');
    }
  };

  const updateLocation = async () => {
    const formData = new FormData();
    formData.append('locationid', location.locationid);
    formData.append('token', userToken);
    formData.append('name', location.name);
    formData.append('description', location.description);
    formData.append('clue', location.clue);

    try {
      const response = await fetch('https://cpsc345sh.jayshaffstall.com/updateHuntLocation.php', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status == 'success') {
        Alert.alert('Success', 'Location updated');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to update location');
      }
    } catch (error) {
      Alert.alert('Error', 'Error updating location');
    }
  };

  const deleteLocation = async () => {
    const formData = new FormData();
    formData.append('locationid', location.locationid);
    formData.append('token', userToken);
    try {
      const response = await fetch('https://cpsc345sh.jayshaffstall.com/deleteHuntLocation.php', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status == 'success') {
        Alert.alert('Success', 'Location deleted');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to delete location');
      }
    } catch (error) {
      Alert.alert('Error', 'Error deleting location');
    }
  };

  const setLocationPosition = async () => {
    //using geolocation for now,
    Geolocation.getCurrentPosition(
      async (position) => {
        const formData = new FormData();
        formData.append('locationid', location.locationid);
        formData.append('token', userToken);
        formData.append('latitude', position.coords.latitude.toString());
        formData.append('longitude', position.coords.longitude.toString());

        try {
          const response = await fetch('https://cpsc345sh.jayshaffstall.com/updateHuntLocationPosition.php', {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();
          if (data.status == 'success') {
            Alert.alert('Success', 'Location position set');
          } else {
            Alert.alert('Error', 'Failed to set location position');
          }
        } catch (error) {
          Alert.alert('Error', 'Error setting location position');
        }
      },
      (error) => Alert.alert('Error', 'Failed to get current position'),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Location Name"
        value={location.name}
        onChangeText={(text) => setLocation({ ...location, name: text })}
      />
      <Button title="Update Location" color="green" onPress={updateLocation} />
      <Button title="Delete Location" color="red" onPress={deleteLocation} />
      <Button title="Set Location Position" onPress={setLocationPosition} />
    </View>
  );
}
