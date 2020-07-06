import 'react-native-gesture-handler';
import { firebase } from '../../src/firebase/config';

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, Button, Platform, Image, AsyncStorage } from 'react-native';

/******** expo notification Modules *********/
import { Notifications } from 'expo';

// import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

/*********************************************/

import {
  HomeScreen,
  LoginScreen,
  RegistrationScreen,
  ListScreen,
} from '../../src/screens';

import { decode, encode } from 'base-64';
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import { YellowBox } from 'react-native';

export default function TabNavigation() {
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
          })
          .catch((error) => {});
      }
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? require('../../assets/home_focused.png')
              : require('../../assets/home.png');
          } else if (route.name === 'List') {
            iconName = focused
              ? require('../../assets/list_focused.png')
              : require('../../assets/list.png');
          } else if (route.name === 'Setting') {
            iconName = focused
              ? require('../../assets/setting_focused.png')
              : require('../../assets/setting.png');
          }

          // You can return any component that you like here!
          return (
            <Image
              source={iconName}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      {user ? (
        <>
          <Tab.Screen name="Home">
            {(props) => <HomeScreen {...props} extraData={user} />}
          </Tab.Screen>
          <Tab.Screen name="List">
            {(props) => <ListScreen {...props} extraData={user} />}
          </Tab.Screen>
          <Tab.Screen name="Setting">
            {(props) => <ListScreen {...props} extraData={user} />}
          </Tab.Screen>
        </>
      ) : (
        <>
          <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen name="Registration" component={RegistrationScreen} />
        </>
      )}
    </Tab.Navigator>
  );
}
