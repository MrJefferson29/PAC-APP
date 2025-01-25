import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Image, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../Contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = ({ navigation }) => {
    const { userToken } = useContext(AuthContext);

    // States for profile data and input fields
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [orgEmail, setOrgEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    // Fetch profile data on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http:192.168.38.100:5000/user/profile', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }

                const data = await response.json();
                setProfileData(data.data);

                // Initialize input states
                setEmail(data.data.email);
                setName(data.data.name);
                setOrgEmail(data.data.orgemail);
                setPhone(data.data.phone);
                setWhatsapp(data.data.whatsapp);
                setBio(data.data.bio || '');
            } catch (error) {
                Alert.alert('Error', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [userToken]);

    // Handle profile update
    const handleSaveChanges = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http:192.168.64.100:5000/user/edit-profile', {
                method: 'PUT', // or POST if your backend requires it
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    orgemail: orgEmail,
                    phone,
                    whatsapp,
                    bio,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const data = await response.json();
            Alert.alert('Success', 'Profile updated successfully');
            navigation.goBack()
            setProfileData(data.updatedData); // Update local state with new profile data
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!profileData) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Unable to load profile data</Text>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.backwards}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-outline" size={30} color="white" style={styles.searchIcon} />
                    </TouchableOpacity>
                    <Ionicons name="ellipsis-vertical-outline" size={25} color="white" style={styles.searchIcon} />
                </View>
                <View style={styles.profilePic}>
                    <Image source={require('../../assets/2.jpeg')} style={styles.ProfileImage} />
                </View>
                <View style={styles.names}>
                    <Text style={styles.name}>{profileData.name} </Text>
                    <Text style={styles.username}>@{profileData.username} </Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.contacts}>
                    <Text style={styles.text}>Email</Text>
                    <View style={styles.emails}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="mail-outline" size={35} color="#AAA" />
                            <View style={{ paddingLeft: '5' }}>
                                <Text style={styles.top}>Personal</Text>
                                <TextInput
                                    style={styles.bottom}
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder={profileData.email}
                                />
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="mail-outline" size={35} color="#AAA" style={styles.searchIcon} />
                            <View style={{ paddingLeft: '5' }}>
                                <Text style={styles.top}>Organization</Text>
                                <TextInput
                                    style={styles.bottom}
                                    value={orgEmail}
                                    onChangeText={setOrgEmail}
                                    placeholder={profileData.orgemail}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.line} />
                    <Text style={styles.text}>Mobile</Text>
                    <View style={styles.number}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="call-outline" size={35} color="#AAA" style={styles.searchIcon} />
                            <View style={{ paddingLeft: '5' }}>
                                <Text style={styles.top}>Telephone</Text>
                                <TextInput
                                    style={styles.bottom}
                                    value={phone}
                                    onChangeText={setPhone}
                                    placeholder={profileData.phone}
                                />
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="logo-whatsapp" size={35} color="#AAA" style={styles.searchIcon} />
                            <View style={{ paddingLeft: '5' }}>
                                <Text style={styles.top}>WhatsApp</Text>
                                <TextInput
                                    style={styles.bottom}
                                    value={whatsapp}
                                    onChangeText={setWhatsapp}
                                    placeholder={profileData.whatsapp}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <TextInput
                    style={styles.bio}
                    value={bio}
                    onChangeText={setBio}
                    placeholder='Write a short story about yourself'
                    multiline
                />
                <View style={{ paddingHorizontal: '10' }}>
                    <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                        <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    header: {
        backgroundColor: '#575757',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 250,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 13,
    },
    backwards: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
    },
    ProfileImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    names: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        marginTop: 20,
    },
    name: {
        fontSize: 18,
        color: '#D8C9AE',
    },
    username: {
        fontWeight: '400',
        fontSize: 17,
        color: '#D8C9AE',
        marginTop: 6,
    },
    contacts: {
        marginTop: 20,
        padding: 20,
    },
    text: {
        fontSize: 15,
        marginBottom: 8,
        fontWeight: '700',
        paddingHorizontal: 10,
    },
    emails: {
        borderBottomColor: 'red',
    },
    top: {
        top: 8,
        fontWeight: '400',
        left: 3,
    },
    bottom: {
        fontSize: 15,
        width: '100%',
        fontWeight: '400'
    },
    line: {
        height: 0.6,
        backgroundColor: '#575757',
        marginVertical: 10,
    },
    info: {
        fontWeight: 300,
        fontSize: 17,
        padding: 10,
    },
    button: {
        backgroundColor: '#575757',
        paddingVertical: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bio: {
        width: '95%',
        borderColor: '#575757',
        height: 80,
        borderWidth: 0.5,
        padding: 10,
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
