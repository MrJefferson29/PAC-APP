import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ShopScreen({ navigation }) {
    const [selectedImages, setSelectedImages] = useState([]);

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all items when the component mounts
        const fetchItems = async () => {
            try {
                const response = await axios.get('http:192.168.149.100:5000/shop/get-all');
                setItems(response.data.data);
            } catch (err) {
                setError('Failed to fetch items');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>{error}</Text>
            </View>
        );
    }

    // Handle image picker
    const handleAddItem = async () => {
        // Request permission for media library access (important for iOS)
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        // Launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaType: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            selectionLimit: 5, // Limit the number of images selected
        });

        if (!result.cancelled) {
            const images = result.assets.map((asset) => asset.uri);
            setSelectedImages(images);

            // Navigate to AddItemScreen with selected images
            navigation.navigate('AddItem', { images });
        } else {
            Alert.alert('Image picker cancelled');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Choose</Text>
                <Text style={styles.subtitle}>to take the African culture with you</Text>

                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#AAA" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="#AAA"
                    />
                </View>
            </View>
            <View style={styles.filter}>
                <TouchableOpacity style={styles.addItem} onPress={handleAddItem}>
                    <Ionicons name="add-sharp" size={20} color={'white'} />
                    <Text style={{ color: 'white' }}> Add Item </Text>
                </TouchableOpacity>
                <Text style={styles.filterItem}>Beads</Text>
                <Text style={styles.filterItem}>Masks</Text>
                <Text style={styles.filterItem}>Clay pots</Text>
            </View>
            <View style={styles.content}>
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item._id}
                        numColumns={2}  // This makes the list display in two columns
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => navigation.navigate('ItemDetails', { item })} >
                                <Image
                                    source={{ uri: `http:192.168.149.100:5000/${item.images[0]}` }} // Replace with your image path
                                    style={styles.image}
                                />
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.price}>XAF {item.price}</Text>
                                <View style={styles.icon}>
                                    <Text style={styles.likes}>5</Text>
                                    <Ionicons name="heart-outline" size={20} color="black" />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    header: {
        backgroundColor: '#4A4A4A',
        width: '100%',
        height: 200,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        color: '#D8C9AE',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#D8C9AE',
        marginTop: 5,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#4A4A4A',
    },
    content: {
        flex: 1,
    },
    filter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    addItem: {
        fontSize: 14,
        fontWeight: '500',
        flexDirection: 'row',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        padding: 10,
        borderRadius: 15,
    },
    filterItem: {
        fontSize: 14,
        color: 'white',
        fontWeight: '500',
        flexDirection: 'row',
        backgroundColor: '#D8C9AE',
        padding: 10,
        borderRadius: 15,
    },
    card: {
        backgroundColor: '#FFF',
        width: '47%',
        height: '250',
        borderRadius: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 15,  // Increased marginTop for vertical spacing
    marginHorizontal: 5,
    },
    image: {
        width: '100%',
        height: '60%',
    },
    name: {
        fontSize: 15,
        fontWeight: '500',
        color: 'black',
        paddingHorizontal: 5,
    },
    price: {
        fontSize: 15,
        fontWeight: '300',
        color: 'black',
        paddingHorizontal: 5,
    },
    likes: {
        fontSize: 16,
        fontWeight: '300'
    },
    icon: {
        height: 40,
        padding: 10,
        alignSelf: 'flex-end',
        flexDirection: 'row',
    },
});
