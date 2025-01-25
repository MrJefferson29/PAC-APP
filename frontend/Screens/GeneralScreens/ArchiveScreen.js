import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';


export default function ArchiveScreen({navigation}) {
    const [collapsedSections, setCollapsedSections] = useState({
        section1: true,
        section2: true,
        section3: true,
        section4: true,
        section5: true,
        section6: true,
        section7: true,
        section8: true,
    });

    const toggleSection = (section) => {
        setCollapsedSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    return (
        <ImageBackground
            source={require('../../assets/1.jpeg')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.backwards}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={30} color="#575757" style={styles.searchIcon} />
                </TouchableOpacity>
                <Ionicons name="ellipsis-vertical-outline" size={25} color="#575757" style={styles.searchIcon} />
            </View>
            <ScrollView>
                <View style={styles.adContainer}>
                    <Text style={styles.adText}>Sponsored Ad Goes Here</Text>
                </View>
                <View style={styles.container}>
                    {/* Section 1 */}
                    <View>
                        <TouchableOpacity
                            onPress={() => toggleSection('section1')}
                            style={styles.header}
                        >
                            <Text style={styles.headerText}>
                                0.1 Location and Demographics

                            </Text>
                        </TouchableOpacity>
                        <Collapsible collapsed={collapsedSections.section1}>
                            <View style={styles.content}>
                                <Text>
                                    Bamessing is one of four villages constituting the Ndop Central Subdivision
                                    and one of thirteen in Ngoketunjia Division, located in Cameroon's North
                                    West Region. Situated approximately 38 km from Bamenda along the Bamenda-Nkambe
                                    stretch of the ring road, it lies just before Bamunka (Ndop town). As of the
                                    2005 census, Bamessing had a population of approximately 40,000 residents.
                                </Text>
                            </View>
                        </Collapsible>
                    </View>

                    {/* Section 2 */}
                    <View>
                        <TouchableOpacity
                            onPress={() => toggleSection('section2')}
                            style={styles.header}
                        >
                            <Text style={styles.headerText}>
                                0.2 Traditional Pottery and Prescraft
                            </Text>
                        </TouchableOpacity>
                        <Collapsible collapsed={collapsedSections.section2}>
                            <View style={styles.content}>
                                <Text>
                                    Bamessing is renowned for its rich pottery tradition, exemplified by
                                    the Presbyterian Pottery Center (Prespot), a branch of the Presbyterian
                                    Handicraft Centre (Prescraft). Established in the early 1980s with
                                    support from the Basel Mission and "Bread for the World," Prespot aims
                                    to preserve and promote local pottery techniques. The center introduces
                                    innovations such as the potter's wheel, glazing, and wood kiln firing,
                                    enhancing the quality and diversity of products. European designers, notably
                                    from Mission 21 (Switzerland), collaborate to develop new designs.
                                </Text>
                            </View>
                        </Collapsible>
                    </View>

                    <View>
                        <TouchableOpacity
                            onPress={() => toggleSection('section3')}
                            style={styles.header}
                        >
                            <Text style={styles.headerText}>
                                0.3 Craft Economy and Fair Trade
                            </Text>
                        </TouchableOpacity>
                        <Collapsible collapsed={collapsedSections.section3}>
                            <View style={styles.content}>
                                <Text>
                                    Prescraft operates multiple centers, including those in Bali, Bafut, and
                                    Bamessing, employing over 300 artisans across various crafts such as
                                    wood carving, basketry, and pottery. The organization is committed to
                                    Fair Trade principles, ensuring artisans receive equitable compensation
                                    and access to sustainable markets. As a member of the World Fair Trade
                                    Organization (WFTO) and its regional chapter, Cooperation for Fair
                                    Trade in Africa (COFTA), Prescraft actively promotes ethical trading
                                    practices.
                                </Text>
                            </View>
                        </Collapsible>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => toggleSection('section4')}
                            style={styles.header}
                        >
                            <Text style={styles.headerText}>
                                0.4 Environmental Sustainability
                            </Text>
                        </TouchableOpacity>
                        <Collapsible collapsed={collapsedSections.section4}>
                            <View style={styles.content}>
                                <Text>
                                    Prescraft is dedicated to environmental conservation, maintaining
                                    fuel plantations and implementing reforestation programs in
                                    collaboration with local farmers. These initiatives, supported by
                                    Mission 21, aim to ensure a sustainable supply of raw materials
                                    and promote ecological balance in the region.
                                </Text>
                            </View>
                        </Collapsible>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => toggleSection('section5')}
                            style={styles.header}
                        >
                            <Text style={styles.headerText}>
                                0.5 Administration
                            </Text>
                        </TouchableOpacity>
                        <Collapsible collapsed={collapsedSections.section5}>
                            <View style={styles.content}>
                                <Text>
                                    Bamessing operates as a second-class Fondom, led by a traditional
                                    ruler, Fon Richard Muntong III, whose decisions are guided by the
                                    Ngumba (secret society). The Fon also serves as an auxiliary
                                    administrator, working alongside government-appointed divisional
                                    and sub-divisional service heads coordinated by the senior
                                    officer of Ngoketunjia Division.
                                </Text>
                            </View>
                        </Collapsible>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => toggleSection('section6')}
                            style={styles.header}
                        >
                            <Text style={styles.headerText}>
                                0.6 Education
                            </Text>
                        </TouchableOpacity>
                        <Collapsible collapsed={collapsedSections.section6}>
                            <View style={styles.content}>
                                <Text>
                                    The village offers a range of educational institutions, including
                                    government-owned, privately-owned, and denominational schools, catering
                                    to nursery, primary, secondary, and high school levels. These
                                    institutions provide comprehensive education to the local population,
                                    contributing to the community's development.
                                </Text>
                            </View>
                        </Collapsible>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => toggleSection('section7')}
                            style={styles.header}
                        >
                            <Text style={styles.headerText}>
                                0.7 Social and Religious Impact
                            </Text>
                        </TouchableOpacity>
                        <Collapsible collapsed={collapsedSections.section7}>
                            <View style={styles.content}>
                                <Text>
                                    As a project of the Presbyterian Church in Cameroon (PCC), Prescraft
                                    embodies the church's commitment to economic justice, education, and
                                    equal rights. The PCC's involvement in economic and political matters
                                    reflects its quest for justice and equal rights for every Cameroonian
                                    citizen. Prescraft's activities are guided by these principles, aiming
                                    to provide employment opportunities, preserve traditional crafts, and
                                    contribute to community development.
                                </Text>
                            </View>
                        </Collapsible>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => toggleSection('section8')}
                            style={styles.header}
                        >
                            <Text style={styles.headerText}>
                                0.8 Current Affairs
                            </Text>
                        </TouchableOpacity>
                        <Collapsible collapsed={collapsedSections.section8}>
                            <View style={styles.content}>
                                <Text>
                                    In December 2024, Fon Richard Muntong III called on separatist fighters
                                    in the region to surrender their weapons and embrace peace, emphasizing
                                    the suffering inflicted on the community due to ongoing conflicts. He
                                    urged fighters to join the Disarmament, Demobilization, and Reintegration
                                    Commission centers, offering assistance throughout the process. The Fon
                                    set a deadline of December 31, 2024, for fighters to comply, warning of
                                    traditional, administrative, and legal sanctions against those who
                                    continue to participate in separatist activities.
                                </Text>
                            </View>
                        </Collapsible>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    backwards: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        backgroundColor: 'white',
        height: 70,
        alignItems: 'flex-end'
    },
    container: { padding: 10 },
    header: {
        padding: 15,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    },
    adContainer: {
        backgroundColor: '#575757',
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    adText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#D8C9AE',
    },

    headerText: { fontSize: 16, fontWeight: '500' },
    content: {
        fontSize: 16,
        padding: 15,
        backgroundColor: 'rgba(249, 249, 249, 0.8)',
        marginBottom: 10,
        borderRadius: 5,
    },
});
