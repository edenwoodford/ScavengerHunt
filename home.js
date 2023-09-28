import { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

export function HomeScreen ({navigation}) {
    
    const [message, setMessage] = useState('')
    const [alerts, setAlerts] = useState([])
    const fetchData = async () => {
    const result = await
    fetch('https://api.weather.gov/alerts/active?area=OH')
    if (result.ok){
    const data = await result.json()
    setMessage(data.title)
    setAlerts(data.features)
    }
    else{
    setMessage("Error fetching data, status code: " + result.status)
    }
    }
    
    
return (
<View style={styles.container}>
<Button title='See Hunts' onPress={() => navigation.navigate('Hunt')} />
<Text>{message}</Text>
<Text>{alerts.length}</Text>
<Button title="Fetch Alerts" onPress={fetchData} />
<ScrollView style={{width: '75%', height: '75%'}}>
{
alerts.map((value, index) => {
return <Text key={index}>{value.properties.headline}</Text>
})
}
</ScrollView>
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