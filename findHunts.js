import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, FlatList, Alert } from 'react-native';
import { useSelector } from 'react-redux';

export function FindHunts({ navigation }) {
  const [hunts, setHunts] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const userToken = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchHunts = async () => {
      const formData = new FormData();
      formData.append('token', userToken);
      formData.append('search', searchFilter);

      try {
        const response = await fetch('https://cpsc345sh.jayshaffstall.com/findHunts.php', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.hunts) {
          setHunts(data.hunts);
        }
      } catch (error) {
        console.error('Error fetching hunts:', error);
      }
    };

    fetchHunts();
  }, [searchFilter, userToken]);

  const startHunt = async (huntId) => {
    const formData = new FormData();
    formData.append('token', userToken);
    formData.append('huntid', huntId);

    try {
      const response = await fetch('https://cpsc345sh.jayshaffstall.com/startHunt.php', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.status == 'success') {
        Alert.alert('Success', 'Hunt started!');
      } else {
        Alert.alert('Error', 'Failed to start...');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Search Hunts"
        value={searchFilter}
        onChangeText={setSearchFilter}
      />
      <FlatList
        data={hunts}
        keyExtractor={(item) => item.huntid.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Name: {item.name}</Text>
            <Text>Completion: {item.completed ? `${item.completed}%` : 'Not started'}</Text>
            <Button title="View Hunt" onPress={() => navigation.navigate('HuntDetail', { huntId: item.huntid })}/>
            {!item.completed && (
              <Button title="Start Hunt" onPress={() => startHunt(item.huntid)}/>
            )}
          </View>
        )}
      />
    </View>
  );
}
