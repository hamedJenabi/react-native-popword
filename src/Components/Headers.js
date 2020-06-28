import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase/config';
import {
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  View,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Headers() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [logText, setLogText] = useState('Login');
  const [user, setUser] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const navigation = useNavigation();

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const onPressList = () => {
    // firebase.auth().signOut();
    navigation.navigate('List');
  };
  const onPressLogout = () => {
    // firebase.auth().signOut();
    navigation.navigate('Login');
  };

  const showMenuOnPress = () => {
    setShowNav(!showNav);
  };

  /*********** This checks if user is logged in *********/
  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLogText('Logout');
            setUser(userData);
          })
          .catch((error) => {
            alert('error');
          });
      } else {
        setLogText('Login');
      }
    });
  }, []);

  return (
    <>
      <View style={styles.main_menu}>
        <TouchableOpacity onPress={showMenuOnPress}>
          <Text style={styles.Hamburger}>{showNav ? 'X' : '☰'}</Text>
        </TouchableOpacity>
        {showNav ? (
          <View>
            <TouchableOpacity onPress={onPressLogout}>
              <Text style={styles.text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressList}>
              <Text style={styles.text}>Word List</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressLogout}>
              <Text style={styles.text}>{logText}</Text>
            </TouchableOpacity>
            {/* <Text style={styles.text}>{user.fullName}</Text> */}
          </View>
        ) : null}

        <View style={styles.header}>
          <Text style={styles.title}>POP WORD</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  main_menu: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    zIndex: -1,
  },
  popUp: {
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 5,
    backgroundColor: 'white',
    display: 'flex',
    zIndex: 10,
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#009688',
    zIndex: -1,
  },
  Hamburger: {
    fontSize: 26,
    marginRight: 20,
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
  },
});
