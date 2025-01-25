import React, { useContext, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, AuthContext } from './Contexts/AuthContext';
import LoginScreen from './Screens/AuthScreens/LoginScreen';
import RegisterScreen from './Screens/AuthScreens/RegisterScreen';
import HomeScreen from './Screens/GeneralScreens/HomeScreen';
import Shop from './Screens/GeneralScreens/ShopScreen';
import CultureScreen from './Screens/GeneralScreens/CultureScreen';
import AddItemScreen from './Screens/ShoppingScreen/AddItemScreen';
import LoadingScreen from './Screens/GeneralScreens/LoadingScreen';
import { Ionicons } from '@expo/vector-icons';
import ItemDetailsScreen from './Screens/ShoppingScreen/ItemDetailsScreen';
import ArchiveScreen from './Screens/GeneralScreens/ArchiveScreen';
import ProfileScreen from './Screens/ProfileScreens/ProfileScreen';
import ChatScreen from './Screens/GeneralScreens/ChatScreen';
import Map from './Screens/GeneralScreens/Map';
import ProjectList from './Screens/Projects/ProjectList'
import DetailProject from './Screens/Projects/DetailProject';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack - For Login and Register
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

// App Tabs - Main Tab Navigator for bottom tab screens
const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Shop':
            iconName = focused ? 'cart' : 'cart-outline';
            break;
          case 'Map':
            iconName = focused ? 'location' : 'location';
            break;
          case 'Culture':
            iconName = focused ? 'compass' : 'compass-outline';
            break;
          default:
            iconName = 'ellipse-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#E91E63',
      tabBarInactiveTintColor: '#8E8E93',
      tabBarStyle: {
        height: 60,
        paddingBottom: 8,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Shop" component={Shop} />
    <Tab.Screen name="Map" component={Map} />
    <Tab.Screen name="Culture" component={CultureScreen} />
  </Tab.Navigator>
);

const AppContent = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userToken ? (
          <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Tabs" component={AppTabs} options={{ headerShown: false }} />
            <Stack.Screen name="AddItem" component={AddItemScreen} options={{ headerShown: false }} />
            <Stack.Screen name='ItemDetails' component={ItemDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Chat' component={ChatScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Archive' component={ArchiveScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Projects' component={ProjectList} options={{ headerShown: false }}/>
            <Stack.Screen name='DetailProject' component={DetailProject} options={{ headerShown: false }}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
