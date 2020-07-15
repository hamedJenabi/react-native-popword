import React, { useState } from 'react';
import { firebase } from '../../firebase/config';

import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  BackHandler,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

export default function LogoutScreen(props) {
  const username = props.extraData.fullName;
  const onLogoutPress = async () => {
    await firebase.auth().signOut().then(BackHandler.exitApp());
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 50, marginTop: 50 }}>
        <Image source={require('../../../assets/popcorn.png')} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>Hey {username},</Text>
        <Text style={styles.text}>It was a good run.</Text>
        <Text style={styles.text}>See you soon.</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => onLogoutPress()}>
        <Text style={styles.buttonTitle}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
