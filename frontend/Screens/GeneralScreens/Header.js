import React, {useRef} from 'react'
import { StyleSheet } from 'react-native';


const DrawerWithHeader = ({ children }) => {
  const drawerRef = useRef(null);

  const renderDrawerContent = () => (
    <View style={styles.drawerContent}>
      <Text style={styles.drawerText}>Menu</Text>
      <TouchableOpacity>
        <Text style={styles.drawerItem}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.drawerItem}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.drawerItem}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  const handlePress = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', `Cannot open the URL: ${url}`);
    }
  };

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={renderDrawerContent}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => drawerRef.current.openDrawer()} style={styles.circle}>
          <Ionicons name="menu" size={20} color="#575757" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>BAMESING-NSEI</Text>
          <Text style={styles.headerSubtitle}>
            Sponsored by{' '}
            <Text
              style={{ color: '#575757', fontWeight: '500', textDecorationLine: 'underline' }}
              onPress={() => handlePress('https://t.me/jfsn_amari')}
            >
              Serge Gainbourg LLC
            </Text>
          </Text>
        </View>
        <Ionicons name="chatbox-ellipses-outline" size={30} color="#575757" />
      </View>
      {children}
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingTop: 33,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#575757',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  circle: {
    borderWidth: 1,
    borderColor: '#575757',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  drawerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drawerItem: {
    fontSize: 18,
    paddingVertical: 10,
  },
});
