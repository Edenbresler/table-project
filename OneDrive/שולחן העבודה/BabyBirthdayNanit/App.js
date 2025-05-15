import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './presentation/screens/HomeScreen';
import BirthdayScreen from './presentation/screens/BirthdayScreen';

// Create a Stack Navigator instance
const Stack = createStackNavigator();

const App = () => {
  return (
    // Wrap the navigation in a NavigationContainer to manage the navigation tree
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}> 
        <Stack.Screen
          name="Home"                 // Route name
          component={HomeScreen}     // Component to render for this route
        />
        <Stack.Screen
          name="Birthday"               // Route name
          component={BirthdayScreen}    // Component to render for this route
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
