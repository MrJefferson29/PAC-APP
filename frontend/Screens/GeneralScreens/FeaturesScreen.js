import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';


const FeaturesScreen = ({ navigation }) => {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const videoRefs = useRef({}); // To store references to the Video components

    useEffect(() => {
        fetchFeatures();
    }, []);

    const fetchFeatures = async () => {
        try {
            const response = await fetch('http:192.168.64.100:5000/features/get-all'); // Replace with your actual API URL
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

    const handleVideoView = (index) => {
        // Pause all videos when they are out of view
        Object.keys(videoRefs.current).forEach((key) => {
            if (videoRefs.current[key] && key !== index) {
                videoRefs.current[key].pauseAsync();
            }
        });

        // Play the current video
        if (videoRefs.current[index]) {
            videoRefs.current[index].playAsync();
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
                                    source={{ uri: `http:192.168.64.100:5000/${file}` }}
                                    style={styles.image}
                                />
                            ) : isVideo ? (
                                <Video
                                    ref={(ref) => { videoRefs.current[index] = ref; }}
                                    source={{ uri: `http:192.168.64.100:5000/${file}` }}
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
                <View style={styles.text}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.notes}>{item.notes}</Text>
                </View>
            </View>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#4A90E2" style={styles.loader} />;
    }

    if (error) {
        return <Text style={styles.error}>{`Something went wrong: ${error}`}</Text>;
    }

    // Extract last 5 features
    const lastFiveFeatures = features.slice(-5);

    return (
        <View style={styles.container}>
            <FlatList
                data={lastFiveFeatures}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.flatlistContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingBottom: 60,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    featureItem: {
        backgroundColor: '#FFFFFF',
        marginBottom: 15,
        borderRadius: 10,
        elevation: 5,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    author: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    authorImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    authorText: {
        justifyContent: 'center',
    },
    authorName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    authorLocation: {
        fontSize: 14,
        color: '#777',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    notes: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
        fontWeight: '600'
    },
    mediaContainer: {
        marginVertical: 5,
        overflow: 'hidden',
        backgroundColor: '#e0e0e0',
    },
    image: {
        width: Dimensions.get('window').width - 40,
        height: 300,
        resizeMode: 'cover',
    },
    video: {
        width: Dimensions.get('window').width - 40,
        height: 300,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    bottomWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    text: {
        flex: 1,
    },
    icon: {
        color: '#D1D1D1',
    },
    flatlistContainer: {
        paddingBottom: 30,
    },
});

export default FeaturesScreen;
