import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export function Register ({route, navigation}) {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const register = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        let formData = new FormData();
        formData.append('userid', userId);
        formData.append('password', password);

        try {
            const response = await fetch('https://cpsc345sh.jayshaffstall.com/register.php', {
                method: 'POST',
                body: formData,
                headers: {'Content-Type': 'multipart/form-data',},
            });

            const data = await response.json();
            if (data.status === 'error') {
                setErrors(data.error);
                Alert.alert('Registration Error', data.error.join(', '));
            } else {
                setMessage('Registration successful!');
                navigation.navigate('HuntsPage');
            }
        } catch (error) {
            Alert.alert('Network Error', 'Failed to register. Please try again later.');
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Username"
                onChangeText={setUserId}
                value={userId}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
                style={styles.input}
            />
            <TextInput
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                style={styles.input}
            />
            <Button title="Register" onPress={register} />
            <Text>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
        width: '80%',
    },
});
