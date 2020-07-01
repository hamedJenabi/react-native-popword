import 'react-native-gesture-handler';
import { firebase } from './src/firebase/config';

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  LoginScreen,
  HomeScreen,
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
// import Headers_2 from './src/Components/Headers_2';

export default function App() {
  YellowBox.ignoreWarnings(['Setting a timer']);
  const [loading, setLoading] = useState(true);

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
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        //THIS is 4 seconds waiting for SplashScreen to show
        //and then it goes to Login/Home
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    });
  }, []);

  //pushing Notification to users

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
              // options={{
              //   headerLeft: () => <Headers_2 />,
              // }}
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
