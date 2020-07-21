import React from 'react';
import {
  View,
  Alert,
  Text,
  Image,
  SafeAreaView,
  BackHandler,
  NativeModules,
  AsyncStorage,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { firebase } from '../firebase/config';
import styles from '../../theme';
/************* CostumDrawerContent *********/
export default function CostumDrawerContent({ props, user }) {
  const username = user.fullName;

  const pressLogOut = () => {
    props.navigation.navigate('Logout');
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          // justifyContent: 'center',
          height: 37,
          width: '100%',
          // alignItems: 'center',
          marginBottom: 30,
          marginTop: 40,
          padding: 40,
          borderBottomWidth: 0.5,
          borderBottomColor: 'grey',
        }}
      >
        <Image
          // style={{ alignSelf: 'center' }}
          source={require('../../assets/Profile.png')}
        />
        <View>
          <Text style={styles.userName}>{username}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Home')}
        style={{
          justifyContent: 'center',
          height: 37,
          alignSelf: 'center',
          marginBottom: 30,
        }}
      >
        <Text style={{ fontSize: 20 }}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('List')}
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          marginBottom: 30,
        }}
      >
        <Text style={{ fontSize: 20 }}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Settings')}
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          marginBottom: 70,
        }}
      >
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Settings</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 36 }}>
        <TouchableOpacity
          onPress={pressLogOut}
          style={{
            height: 47,
            borderRadius: 5,
            backgroundColor: '#009688',
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
