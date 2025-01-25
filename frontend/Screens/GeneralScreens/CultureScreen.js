import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';  // Still using expo-av for video playback
import Ionicons from 'react-native-vector-icons/Ionicons';

const CultureScreen = ({ navigation }) => {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const videoRefs = useRef({}); // To store references to the Video components

    useEffect(() => {
        fetchFeatures();
    }, []);

    const fetchFeatures = async () => {
        try {
            const response = await fetch('https://pac-k50c.onrender.com/features/get-all'); // Replace with your actual API URL
            if (!response.ok) {
                throw new Error('Failed to fetch features');
            }
            const data = await response.json();
            setFeatures(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.featureItem}>
            <View style={styles.author}>
                <Image source={require('../../assets/2.jpeg')} style={styles.authorImage} />
                <View style={styles.authorText}>
                    <Text style={styles.authorName}>Boey Penndragon</Text>
                    <Text style={styles.authorLocation}>Bamesing Up quarter</Text>
                </View>
            </View>
            <FlatList
                horizontal
                data={item.files}
                keyExtractor={(file, idx) => `${file}-${idx}`}
                renderItem={({ item: file, index }) => {
                    const fileExtension = file.split('.').pop().toLowerCase();
                    const isImage = ['jpeg', 'jpg', 'png', 'gif'].includes(fileExtension);
                    const isVideo = ['mp4', 'mov', 'avi'].includes(fileExtension);

                    return (
                        <View style={styles.mediaContainer}>
                            {isImage ? (
                                <Image
                                    source={{ uri: `https://pac-k50c.onrender.com/${file}` }}
                                    style={styles.image}
                                />
                            ) : isVideo ? (
                                <Video
                                    ref={(ref) => { videoRefs.current[index] = ref; }}
                                    source={{ uri: `https://pac-k50c.onrender.com/${file}` }}
                                    style={styles.video}
                                    useNativeControls
                                    resizeMode="cover"
                                />
                            ) : null}
                        </View>
                    );
                }}
                keyExtractor={(file, idx) => `${file}-${idx}`}
            />
            <View style={styles.bottomWrapper}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.notes}>{item.notes}</Text>
            </View>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    if (error) {
        return <Text style={styles.error}>{`Something went wrong: ${error}`}</Text>;
    }

    const lastFiveFeatures = features.slice(-5);

    return (
        <View style={{ marginBottom: '60' }}>
            <View style={styles.backwards}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={30} color="#D8C9AE" style={styles.searchIcon} />
                </TouchableOpacity>
                <Text style={styles.word}>Features just for you </Text>
                <Ionicons name="ellipsis-vertical-outline" size={25} color="#D8C9AE" style={styles.searchIcon} />
            </View>
            <FlatList
                data={features}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backwards: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        backgroundColor: '#575757',
        height: 70,
        alignItems: 'flex-end',
    },
    word: {
        fontSize: 20,
        fontWeight: '300',
        color: '#D8C9AE'
    },
    featureItem: {
        backgroundColor: '#f8fbfb',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        padding: 12,
    },
    author: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorImage: {
        width: 50,
        height: 50,
        borderRadius: 40,
    },
    authorText: {
        paddingHorizontal: 13,
    },
    authorName: {
        fontSize: 15,
        fontWeight: '900',
    },
    authorLocation: {
        fontWeight: '400',
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
        color: '#333',
        marginBottom: 3,
    },
    notes: {
        fontSize: 15,
        color: '#777',
        marginBottom: 5,
    },
    category: {
        fontSize: 12,
        color: '#007BFF',
        marginBottom: 10,
    },
    files: {
        marginTop: 10,
    },
    mediaContainer: {
        marginVertical: 5,
        borderRadius: 1,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: Dimensions.get('window').width - 40,
        height: 400,
        resizeMode: 'cover',
    },
    video: {
        width: Dimensions.get('window').width - 40,
        height: 400,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    bottomWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});

export default CultureScreen;
