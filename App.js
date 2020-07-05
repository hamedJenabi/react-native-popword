import 'react-native-gesture-handler';
import { firebase } from './src/firebase/config';

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
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
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import { YellowBox } from 'react-native';

import CustomDrawerToggle from './src/Components/CustomHeader';

/************* TabNavigation *********/
// function TabNavigation(props) {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused
//               ? require('./assets/home_focused.png')
//               : require('./assets/home.png');
//           } else if (route.name === 'List') {
//             iconName = focused
//               ? require('./assets/list_focused.png')
//               : require('./assets/list.png');
//           } else if (route.name === 'Setting') {
//             iconName = focused
//               ? require('./assets/setting_focused.png')
//               : require('./assets/setting.png');
//           }

//           // You can return any component that you like here!
//           return (
//             <Image
//               source={iconName}
//               style={{ width: 20, height: 20 }}
//               resizeMode="contain"
//             />
//           );
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: 'tomato',
//         inactiveTintColor: 'gray',
//       }}
//     >
//       {props.user ? (
//         <>
//           <Tab.Screen name="Home">
//             {(props) => <HomeScreen {...props} extraData={props.user} />}
//           </Tab.Screen>
//           <Tab.Screen name="List">
//             {(props) => <ListScreen {...props} extraData={props.user} />}
//           </Tab.Screen>
//           <Tab.Screen name="Setting">
//             {(props) => <ListScreen {...props} extraData={props.user} />}
//           </Tab.Screen>
//         </>
//       ) : (
//         <>
//           <Tab.Screen name="Login" component={LoginScreen} />
//           <Tab.Screen name="Registration" component={RegistrationScreen} />
//         </>
//       )}
//     </Tab.Navigator>
//   );
// }
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
      {/* <Drawer.Navigator initialRouteName="tabNav">
        <Drawer.Screen name="Home" component={TabNavigation} user={user} />
        <Drawer.Screen name="Logout" component={LoginScreen} />
      </Drawer.Navigator> */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? require('./assets/home_focused.png')
                : require('./assets/home.png');
            } else if (route.name === 'List') {
              iconName = focused
                ? require('./assets/list_focused.png')
                : require('./assets/list.png');
            } else if (route.name === 'Setting') {
              iconName = focused
                ? require('./assets/setting_focused.png')
                : require('./assets/setting.png');
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
    </NavigationContainer>
  );
}
