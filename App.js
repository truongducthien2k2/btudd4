import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import Login from './screens/login';
import ClassList from './screens/ClassList';
import ClassDetails from './screens/ClassDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="ClassList" component={ClassList}/>
          <Stack.Screen name="ClassDetails" component={ClassDetails}/>
        </Stack.Navigator>
    </NavigationContainer> 
    
        /*<SafeAreaView styles={flex=1}>
          <ClassList/>
        </SafeAreaView>*/
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingLeft: 40,
    paddingRight: 40,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});