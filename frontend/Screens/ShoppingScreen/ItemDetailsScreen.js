// ItemDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ItemDetailsScreen({ route }) {
    const { item } = route.params; // Get the item data passed from the previous screen

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: `http:192.168.64.100:5000/${item.images[0]}` }}
                style={styles.image}
            />
            <View style={styles.contact}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.pri}>Price </Text>
                    <Text style={styles.price}>XAF {item.price}</Text>
                </View>
                <Text style={styles.description}>{item.description} I wanna Know why, why'd you have to write a song about me</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    textWrapper: {
        padding: 10,
    },
    contact: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'pink',
        padding: 10,
    },
    button: {
        backgroundColor: '#575757',
        paddingVertical: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 24,
        fontWeight: '400',
        marginVertical: 10,
    },
    pri: {
        fontSize: 19,
        fontWeight: '300'
    },
    price: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        color: '#575757',
        fontWeight: '600',
        fontFamily: 'Gaqire'
    },
});
