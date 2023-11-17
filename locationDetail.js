import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';

export function LocationDetail({ route, navigation }) {
  const [successMessage, setSuccessMessage] = useState('');
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
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Access to location is needed to set position.');
      return;
    }
  
    let { coords } = await Location.getCurrentPositionAsync({});
    setLocation((prevLocation) => ({
      ...prevLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    }));
    const formData = new FormData();
    formData.append('locationid', location.locationid);
    formData.append('token', userToken);
    formData.append('latitude', coords.latitude.toString());
    formData.append('longitude', coords.longitude.toString());
    try {
        const response = await fetch('https://cpsc345sh.jayshaffstall.com/updateHuntLocationPosition.php', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.status == 'success') {
          setSuccessMessage(`Position set to Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`);
        } else {
          Alert.alert('Error', 'Failed to set position');
        }
      } catch (error) {
        Alert.alert('Error', 'Error setting position');
    };
  }
  return (
    <View>
      <TextInput
        placeholder="Location Name"
        value={location.name}
        onChangeText={(text) => setLocation({ ...location, name: text })}
      />
      <View>
      {successMessage !== '' && (
        <Text style={{ color: 'green', marginTop: 10 }}>{successMessage}</Text>
      )}
      <Button title="Update Location" color="green" onPress={updateLocation} />
      <Button title="Delete Location" color="red" onPress={deleteLocation} />
      <Button title="Set Location Position" onPress={setLocationPosition} />
      </View>
    </View>
  );
}
