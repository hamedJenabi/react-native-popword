import React from 'react';
import { useState, useEffect } from 'react';

import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  useNavigationState,
  useNavigation,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SplashScreen() {
  const navigation = useNavigation();

  const onPressAction = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>POP WORD</Text> */}
      <Text lineBreakMode="middle" style={styles.text}>
        Never forget a word
      </Text>
      <Text lineBreakMode="middle" style={styles.text}>
        you looked up
      </Text>
      <Image
        style={styles.image}
        source={require('../../../assets/splash.gif')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 40,
  },

  title: {
    alignSelf: 'center',
    marginTop: 40,

    top: 20,
    zIndex: 2,
    fontSize: 36,
    letterSpacing: 3,
    fontFamily: 'Roboto',
  },
  text: {
    alignSelf: 'center',
    top: 80,
    zIndex: 2,
    fontSize: 20,
    letterSpacing: 3,
    fontFamily: 'Roboto',
  },
});
