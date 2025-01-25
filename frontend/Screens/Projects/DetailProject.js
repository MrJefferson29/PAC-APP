import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Linking } from 'react-native';


export default function DetailProject({ route, navigation }) {
    const { headerText, content } = route.params;

    const [phoneNumber, setPhoneNumber] = useState('');

    const handleInputChange = (text) => {
        setPhoneNumber(text);
    };

    const handleDial = () => {
        if (phoneNumber.trim() === '') {
            Alert.alert('Error', 'Please enter a valid phone number.');
            return;
        }

        const ussdCode = `*126*1*1*654711169*${phoneNumber}#`;

        // Attempt to open the phone dialer
        const url = `tel:${ussdCode}`;

        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert('Error', 'Unable to dial the number.');
                }
            })
            .catch((err) => console.error('Error dialing:', err));
    };

    return (
        <View style={styles.container}>
            <View style={styles.backwards}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={30} color="white" style={styles.searchIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>{headerText}</Text>
                <Ionicons name="ellipsis-vertical-outline" size={25} color="white" style={styles.searchIcon} />
            </View>
            <Image source={require('../../assets/2.jpeg')} style={{ height: 220, width: '100%' }} />
            <Text style={styles.content}>{content}</Text>
            <View style={{ marginTop: 100, width: '100%', borderRadius: 40, backgroundColor: '#575757', height: 400 }}>
                <Text style={styles.support}>Support this project</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChangeText={handleInputChange}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.button} onPress={handleDial}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#D8C9AE'
    },
    content: {
        fontSize: 17,
        fontWeight: '700',
        marginVertical: 30,
        paddingHorizontal: 1,
    },
    backwards: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 15,
        backgroundColor: '#575757',
        alignItems: 'flex-end',
    },
    support: {
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '22%',
        marginTop: 15,
        color: '#D8C9AE'
    },
    input: {
        backgroundColor: '#f0f0f0',
        margin: 20,
        padding: 10,
        borderRadius: 4,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        backgroundColor: '#D8C9AE',
        paddingVertical: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        color: '#575757'
    },
    buttonText: {
        color: '#575757',
        fontSize: 16,
        fontWeight: 'bold',
    },
});