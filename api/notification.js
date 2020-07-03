// import 'react-native-gesture-handler';
// import { firebase } from './src/firebase/config';

// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Alert, Platform, AsyncStorage } from 'react-native';

// /******** expo notification Modules *********/
// import { Notifications } from 'expo';
// // import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';
// /*********************************************/

// import { Linking } from 'expo';
// import {
//   HomeScreen,
//   LoginScreen,
//   RegistrationScreen,
//   ListScreen,
//   SplashScreen,
// } from './src/screens';

// const entityRef = firebase.firestore().collection('wordlist');
// const userID = props.extraData.id;
// const db = firebase.firestore();

// // import { AsyncStorage } from 'react-native';
// // import { Permissions, Notifications } from 'expo';

// // export default registerForNotifications = async () => {
// //   let previousToken = await AsyncStorage.getItem('pushToken');
// //   console.log(previousToken);
// //   if (previousToken) return;
// //   else {
// //     let { status } = await Permissions.askAsync(
// //       Permissions.REMOTE_NOTIFICATIONS,
// //     );

// //     if (status !== 'granted') return;

// //     let token = await Notifications.getExponentPushTokenAsync();

// //     AsyncStorage.setItem('pushToken', token);
// //   }
// // };
