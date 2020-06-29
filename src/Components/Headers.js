import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase/config';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Headers() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [logText, setLogText] = useState('Login');
  const [user, setUser] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const navigation = useNavigation();

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const onListButtonPress = () => {
    navigation.navigate('List');
  };
  async function onPressLogout() {
    await firebase.auth().signOut();
    navigation.navigate('Login');
  }

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
      <View style={styles.header}>
        <Text style={styles.title}>POP WORD</Text>
      </View>
      <TouchableOpacity onPress={showMenuOnPress}>
        <Text style={styles.Hamburger}>{showNav ? 'X' : '☰'}</Text>
      </TouchableOpacity>
      <Text
        style={{
          marginLeft: 10,
        }}
      >
        {user ? user.fullName : ''}
      </Text>
      <View style={styles.switch}>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={styles.main_menu}>
        {showNav ? (
          <View style={styles.listContainer}>
            <TouchableOpacity onPress={onPressLogout}>
              <Text style={styles.text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onListButtonPress}>
              <Text style={styles.text}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onListButtonPress}>
              <Text style={styles.text}>Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onListButtonPress}>
              <Text style={styles.text}>About Popword</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logOut} onPress={onPressLogout}>
              <Text style={styles.logOutText}>{logText}</Text>
            </TouchableOpacity>
            {/* <Text style={styles.text}>{user.fullName}</Text> */}
          </View>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    // position: 'absolute',
    zIndex: 100,
  },

  text: {
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  logOut: {
    fontSize: 16,
    marginBottom: 20,
    alignSelf: 'center',
    height: 47,
    borderRadius: 5,
    backgroundColor: '#009688',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logOutText: {
    color: 'white',
    fontSize: 16,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#009688',
    maxHeight: 60,
  },
  Hamburger: {
    fontSize: 26,
    marginRight: 20,
    alignSelf: 'flex-end',
  },
  switch: {
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 35,
    alignSelf: 'center',
  },
});
