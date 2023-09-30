import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './home.js';
import { HuntsPage } from './hunts.js';
import { Register } from './register.js';
import { Login } from './login.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{title: 'Home Page'}}
    />
    <Stack.Screen
    name= "Register"
    component = {Register}
    options={{title: "Register New User"}}
    />
    {/* <Stack.Screen
    name= "Login"
    component = {Login}
    options={{title: "Returning User Login"}}
    /> */}
    <Stack.Screen
    name="HuntsPage"
    component={HuntsPage}
    options={{title: 'Hunt Page'}}
    />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
