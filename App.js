import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import CharacterScreen from './src/screens/CharacterScreen';
import ThemeScreen from './src/screens/ThemeScreen';
import StoryScreen from './src/screens/StoryScreen';
import ParentDashboard from './src/screens/ParentDashboard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Character" component={CharacterScreen} />
          <Stack.Screen name="ThemeScreen" component={ThemeScreen} />
          <Stack.Screen name="Story" component={StoryScreen} />
          <Stack.Screen name="Parent" component={ParentDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
