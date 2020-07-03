import 'react-native-gesture-handler';
import { firebase } from './src/firebase/config';

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert, Platform, AsyncStorage } from 'react-native';

/******** expo notification Modules *********/
import { Notifications } from 'expo';

// import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

/*********************************************/

import { Linking } from 'expo';
import {
  HomeScreen,
  LoginScreen,
  RegistrationScreen,
  ListScreen,
  SplashScreen,
} from './src/screens';

import { decode, encode } from 'base-64';
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();
import { YellowBox } from 'react-native';

//Header_2 will be the main header later using Stack options
import Headers_2 from './src/Components/Headers_2';

/*********Get Token and store it in AssyncStorage *********/

export default function App() {
  YellowBox.ignoreWarnings(['Setting a timer']);
  const [loading, setLoading] = useState(true);

  /********** Getting the USER from firebase ************/
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setUser(userData);
            setTimeout(() => {
              setLoading(false);
            }, 2500);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        //THIS is 3 seconds waiting for SplashScreen to show
        //and then it goes to Login/Home
        setTimeout(() => {
          setLoading(false);
        }, 2500);
      }
    });
  }, []);

  /*********  Notification permission  *****/
  const [expoPushToken, setExpoPushToken] = useState('');
  useEffect(() => {
    getPushNotificationPermissions();
  });
  const getPushNotificationPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    const tok = await Notifications.getExpoPushTokenAsync();
    setExpoPushToken(tok);
  };
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('notification-sound-channel', {
      name: 'Notification Sound Channel',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
    AsyncStorage.setItem('pushToken', expoPushToken);
  }

  /************ SplashScreen ***********/
  if (loading) {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Welcome" component={SplashScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              options={{
                headerLeft: () => <Headers_2 />,
              }}
            >
              {(props) => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="List">
              {(props) => <ListScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
