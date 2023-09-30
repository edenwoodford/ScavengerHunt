import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

export function HomeScreen ({route, navigation}) {
    


return (
<View style={styles.container}>
<Button title='Register' onPress={() => navigation.navigate('Register')} />
<Button title= 'Login' onPress= {()  => navigation.navigate('Login')} />
<Button title= 'Guest' onPress= {() =>navigation.navigate('HuntsPage')} />
</View>
)

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });