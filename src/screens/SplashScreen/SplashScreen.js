import React from 'react';
import { useState, useEffect } from 'react';

import { View, Image, StyleSheet, Text, Button } from 'react-native';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  useNavigationState,
  useNavigation,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Buttons from '../../../components/Buttons';

function SplashScreen({ navigation }) {
  const navigation = useNavigation();

  const onPressAction = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>POP WORD</Text>
      <Text lineBreakMode="middle" style={styles.text}>
        Never forget a word you looked up
      </Text>
      <Image style={styles.image} source={require('../assets/Splash.gif')} />
      <View style={styles.button}>
        <Buttons text="Enter" onPress={onPressAction} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  title: {
    alignSelf: 'center',
    top: 70,
    zIndex: 2,
    fontSize: 26,
    letterSpacing: 3,
    fontFamily: 'Roboto',
  },
  text: {
    alignSelf: 'center',
    top: 150,
    zIndex: 2,
    fontSize: 16,
    letterSpacing: 3,
    fontFamily: 'Roboto',
  },
  button: {
    alignSelf: 'center',
    width: 200,
    zIndex: 4,
    bottom: 50,
  },
});

export default SplashScreen;
