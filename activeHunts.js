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

  const viewHuntDetails = (huntId) => {
    navigation.navigate('HuntDetail', { huntId });
  };

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={activeHunts}
        keyExtractor={item => item.huntid.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 10 }}>
            <Text>{item.name} - Completion: {item.completed}%</Text>
            <Button title="View Details" onPress={() => viewHuntDetails(item.huntid)} />
          </View>
        )}
      />
    </View>
  );
}
