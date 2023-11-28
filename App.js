import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './home.js';
import { HuntsPage } from './hunts.js';
import { Register } from './register.js';
import { Login } from './login.js';
import { SplashScreen } from './splashScreen.js';
import { HuntDetail } from './huntDetail.js';
import { LocationDetail } from './locationDetail.js';
import { DoHunts } from './visitingHunts.js';
import { store } from './store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { ActivityIndicator } from 'react-native';
import { FindHunts } from './findHunts.js';
import { ActiveHunts } from './activeHunts.js';
const persistor = persistStore(store)
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store= {store} >
    <PersistGate loading={<ActivityIndicator/>} persistor={persistor}>
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen
    name="Splash Screen"
    component = {SplashScreen}
    />
    <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{title: 'Home Page'}}
    />
    <Stack.Screen
    name="Search for Hunts"
    component ={FindHunts}
    options= {{title: 'Search for Hunts'}}
    />
    <Stack.Screen
    name= "ActiveHunts"
    component={ActiveHunts}
    options={{title: 'Find Active Hunts'}}
    />
    <Stack.Screen
    name ="DoHunts"
    component = {DoHunts}
    options={{title: "Let's play a game"}}
    />
    <Stack.Screen
    name= "Register"
    component = {Register}
    options={{title: "Register New User"}}
    />
    <Stack.Screen
    name= "Login"
    component = {Login}
    options={{title: "Returning User Login"}}
    />
    <Stack.Screen
    name="HuntsPage"
    component={HuntsPage}
    options={{title: 'Hunt Page'}}
    />
     <Stack.Screen
    name="HuntDetail"
    component={HuntDetail}
    options={{title: 'Hunt Detail'}}
     />
     <Stack.Screen
    name="LocationDetail"
    component = {LocationDetail}
    options={{title:'Location Detail'}}
    />
    </Stack.Navigator>
    </NavigationContainer>
    </PersistGate>
    </Provider>
    
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
