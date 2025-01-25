import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';

export default function ProjectList({ navigation }) {
    const [activeTab, setActiveTab] = useState('All Projects');
    const [collapsedSections, setCollapsedSections] = useState({
        section1: true,
        section2: true,
        section3: true,
    });

    const toggleSection = (section) => {
        setCollapsedSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const navigateToDetailScreen = (headerText, content) => {
        navigation.navigate('DetailProject', { headerText, content }); // Passing both headerText and content as parameters
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-outline" size={30} color="white" />
                    </TouchableOpacity>
                    <Ionicons name="ellipsis-vertical-outline" size={25} color="white" />
                </View>
                <View source={require('../../assets/2.jpeg')} style={styles.image}></View>
            </View>

            <View style={styles.tab}>
                <TouchableOpacity onPress={() => setActiveTab('All Projects')}>
                    <Text style={styles.text}>All Projects</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Active Sponsors')}>
                    <Text style={styles.text}>Active Sponsors</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {activeTab === 'All Projects' ? (
                    <View>
                        {[
                            { headerText: 'Bamesing town center rebuild', content: 'Detailed description about Bamesing town center rebuild goes here.' },
                            { headerText: 'Prescraft Workshop', content: 'Detailed description about Prescraft Workshop goes here.' },
                            { headerText: 'The Tamub farmer\'s association', content: 'Detailed description about The Tamub farmer\'s association goes here.' }
                        ].map((project, index) => (
                            <View key={index}>
                                <TouchableOpacity
                                    onPress={() => toggleSection(`section${index + 1}`)}
                                    style={styles.top}
                                >
                                    <Text style={styles.headerText}>{project.headerText}</Text>
                                </TouchableOpacity>
                                <Collapsible collapsed={collapsedSections[`section${index + 1}`]}>
                                    <TouchableOpacity onPress={() => navigateToDetailScreen(project.headerText, project.content)}>
                                        <View style={styles.content}>
                                            <Text>{project.content}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Collapsible>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View>
                        <View>
                            <TouchableOpacity
                                onPress={() => toggleSection('section1')}
                                style={styles.top}
                            >
                                <Text style={styles.headerText}>
                                    Mr Fabien Wandi
                                </Text>
                            </TouchableOpacity>
                            <Collapsible collapsed={collapsedSections.section1}>
                                <View style={styles.content}>
                                    <Text>
                                        Also known as the man of our time, Mr Fabien is the chief 
                                        visionary behind this project, and is regarded as one of 
                                        the highest supporters of the Bamesing culture
                                    </Text>
                                </View>
                            </Collapsible>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => toggleSection('section2')}
                                style={styles.top}
                            >
                                <Text style={styles.headerText}>
                                    Engr Nkweti Jefferson
                                </Text>
                            </TouchableOpacity>
                            <Collapsible collapsed={collapsedSections.section2}>
                                <View style={styles.content}>
                                    <Text>
                                        Nkweti Jefferson is a software Engineer and is respected for his 
                                        donations to the realization of the PAC Bamesing Initiative
                                    </Text>
                                </View>
                            </Collapsible>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 250,
        position: 'relative',
    },
    headerIcons: {
        position: 'absolute',
        top: 30,
        left: 10,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 35,
        backgroundColor: '#575757'
    },
    tab: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    text: {
        padding: 20,
        fontSize: 18,
        fontWeight: '600',
    },
    top: {
        padding: 15,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        fontSize: 16,
        padding: 15,
        backgroundColor: 'rgba(249, 249, 249, 0.8)',
        marginBottom: 10,
        borderRadius: 5,
    },
});
