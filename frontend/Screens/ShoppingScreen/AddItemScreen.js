import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { AuthContext } from '../../Contexts/AuthContext'; // Import AuthContext

export default function AddItemScreen({ route, navigation }) {
    const { images } = route.params; // Get images from navigation
    const { userToken } = useContext(AuthContext); // Access token from context
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    // Handle item submission
    const handleAddItem = async () => {
        if (!name || !price || !description || images.length === 0) {
            Alert.alert('Error', 'Please fill in all fields and select images');
            return;
        }

        // Prepare form data
        const formData = new FormData();
        images.forEach((uri, index) => {
            formData.append('images', {
                uri,
                type: 'image/jpeg', // or the appropriate type
                name: `image${index}.jpg`,
            });
        });

        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);

        try {
            const response = await axios.post('http:192.168.149.100:5000/shop/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userToken}`,
                },
                
            }, 
);

            if (response.status === 201) {
                Alert.alert('Success', 'Item added successfully');
                navigation.goBack(); // Go back to the previous screen
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to add item');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Item</Text>

            <TextInput
                style={styles.input}
                placeholder="Item Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
            />
            <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Description"
                multiline
                value={description}
                onChangeText={setDescription}
            />

            <View style={styles.imagePreview}>
                {images.map((uri, index) => (
                    <Image key={index} source={{ uri }} style={styles.image} />
                ))}
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                <Text style={styles.addButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
    },
    imagePreview: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
