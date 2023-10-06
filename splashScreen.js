import React, { useEffect } from 'react';
import { View, Image,Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(async () => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          navigation.replace('Login');
          return;
        }
        const formData = new FormData();
        formData.append('token', token);
        const response = await fetch('https://cpsc345sh.jayshaffstall.com/verifyToken.php', {
          method: 'POST',
          body: formData,
        });
        

        const data = await response.json();
        if (data.status === 'error') {
          navigation.replace('Login');
        } else {
          navigation.replace('HuntsPage'); 
        }
      } catch (error) {
        console.error(error);
        navigation.replace('Login');
      }
    };

    checkToken(); }
    ,3000);
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <Image 
        source={require('./assets/template.jpg')} 
        style={{flex: 1, width: null, resizeMode: 'cover'}} 
      />
    </View>
  );  
}
//do in useEffect
//set timeout to show the splash screen if it goes too fast