import React, { useState, useEffect } from 'react';
import { Button, View, TextInput,Text, Alert, FlatList,Switch } from 'react-native';
import { useSelector } from 'react-redux';

export function HuntDetail({ route, navigation }) {
  const [huntName, setHuntName] = useState('');
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState('');
  const [active, setActive] = useState(false);
  const userToken = useSelector((state) => state.user.token);
  useEffect(() => {
    const fetchLocations = async () => {
        const formData = new FormData();
        formData.append('huntid', route.params.id);
        formData.append('token', userToken);
        try {
            const response = await fetch('https://cpsc345sh.jayshaffstall.com/getHuntLocations.php', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log(data);
            if (data.locations) {
                setLocations(data.locations);
            }
        } catch (error) {
            Alert.alert('Error', 'Error fetching locations');
        }
    };

    if (route.params) {
        setHuntName(route.params.name || '');
        setActive(route.params.active == '1' ? true : false);
        fetchLocations();
    }
}, [route.params, userToken]);
    const updateHunt = async () => {
      const formData = new FormData();
      formData.append('huntid', route.params.id);
      formData.append('name', huntName);
      formData.append('active', active ? '1' : '0');
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

    const addLocation = async () => {
      const formData = new FormData();
      formData.append('huntid', route.params?.id);
      formData.append('token', userToken);
      formData.append('name', location);
      try {
        const response = await fetch('https://cpsc345sh.jayshaffstall.com/addHuntLocation.php', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.status == 'success') {
          const newLocationObj = { locationid: data.locationid, name: location };
          setLocations([...locations, newLocationObj]);
          setLocation('');
        } else {
          Alert.alert('Error', 'Failed to add location');
        }
      } catch (error) {
        Alert.alert('Error', 'Error adding location');
      }
    };
  
  const LocationDetail = (location) => {
    navigation.navigate('LocationDetail', { location });
  };
  
  return (
    <View style={{padding: 20}}>
      <TextInput
        placeholder="Change hunt name here"
        value={huntName}
        onChangeText={setHuntName}/>
      <Text> This is the hunts page!</Text>
      <Button title="Save Changes" color="green" onPress={updateHunt} />
      <Button title="Delete Hunt" color="red" onPress={deleteHunt} />
      <Text>Locations:</Text>
      <FlatList
        data={locations}
        keyExtractor={item => item.locationid.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Name: {item.name}</Text>
            <Button title="Edit Location" onPress={() => LocationDetail(item)} />
          </View>
        )}
      />
      <TextInput
        placeholder="New Location Name"
        value={location}
        onChangeText={setLocation}/>
      <Button title="Add Location" onPress={addLocation} />
      <Text>Make Hunt Active</Text>
      <Switch
        value={active} onValueChange={setActive}/>
        <Button title="Save Changes" color="green" onPress={updateHunt} />

    </View>
  );
}