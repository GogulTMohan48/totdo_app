import { StyleSheet } from 'react-native';
import React from 'react';
import Home from './screen/Home';
import Add from './screen/Add';
import Items from './screen/Items';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="add" component={Add} options={{ headerShown: false }} />
        <Stack.Screen name="items" component={Items} options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({});


