import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { initializeDatabase, insertItem, fetchItems } from './src/database/products';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/router/router';

export default function App() {

 

 

  


  return (
    
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
