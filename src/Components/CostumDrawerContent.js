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
/************* CostumDrawerContent *********/
export default function CostumDrawerContent(props) {
  const pressLogOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(
        function () {
          // alert('Signed Out');
          Alert.alert(
            'Sign out',
            'Sure about this?',
            [
              {
                text: 'No',
                style: 'cancel',
              },
              {
                //I will figure out to log out in drawer component
                // If not, I put a logout logo on Header and let's see
                text: 'Yes',
                onPress: () => BackHandler.exitApp(),
              },
            ],
            { cancelable: false },
          );
        },
        function (error) {
          console.error('Sign Out Error', error);
        },
      );
    return;
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          height: 37,
          width: '100%',
          alignItems: 'center',
          marginBottom: 30,
          marginTop: 100,
          borderBottomColor: '#d6d7da',
          padding: 56,
        }}
      >
        <Image
          style={{ alignSelf: 'center' }}
          source={require('../../assets/popcorn.png')}
        />
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
        onPress={() => props.navigation.navigate('List')}
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          marginBottom: 70,
        }}
      >
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Setting</Text>
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
