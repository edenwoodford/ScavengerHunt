import React from 'react';
import { Button, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export function HuntsPage() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Register' }],
    });
  };
  
  return (
    <View>
        <Text> This is the hunts page!</Text>
        <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
