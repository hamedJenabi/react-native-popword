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
import styles from '../../../theme';

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
        <Text style={styles.logoutText}>Hey {username},</Text>
        <Text style={styles.logoutText}>It was a good run.</Text>
        <Text style={styles.logoutText}>we hope to see you soon.</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 36 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#009688',
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
            height: 48,
            width: 250,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            justifySelf: 'flex-end',
          }}
          onPress={() => onLogoutPress()}
        >
          <Text style={styles.buttonTitle}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
