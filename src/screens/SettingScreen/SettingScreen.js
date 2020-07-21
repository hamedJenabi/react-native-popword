import React, { useEffect, useState } from 'react';
import {
  Animated,
  AsyncStorage,
  SafeAreaView,
  Dimensions,
  Alert,
  Text,
  Switch,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import styles from '../../../theme';

import { firebase } from '../../firebase/config';
import CustomHeader from '../../Components/CustomHeader';

/*************** List Screen **********/
export default function SettingScreen(props) {
  const [wordList, setWordList] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const entityRef = firebase.firestore().collection('wordlist');
  const userID = props.extraData.id;
  const db = firebase.firestore();
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const text = {
    fontSize: 16,
    color: isEnabled ? '#f0ff' : '#333333',
  };
  /************* DELETE also from firebase *******/
  const deleteRow = (txt) => {
    const removedItem = db
      .collection('wordlist')
      .where('authorID', '==', userID)
      .where('text', '==', txt)
      .get()
      .then(function (removedItem) {
        removedItem.forEach(function (doc) {
          doc.ref.delete();
        });
      })

      .then(function () {
        // alert('successfully deleted!');
      })
      .catch(function (error) {
        alert('Error removing document: ');
      });
  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  /******** READ from firebase *******/

  useEffect(() => {
    entityRef
      .where('authorID', '==', userID)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const newEntities = [];
          querySnapshot.forEach((doc) => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          setWordList(newEntities);
        },
        (error) => {
          console.log('here in list', error);
        },
      );
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 50,
        backgroundColor: isEnabled ? 'black' : 'transparent',
        color: isEnabled ? 'white' : 'black',
      }}
    >
      <CustomHeader title="History" userData={props.extraData} />
      <View></View>
      <View style={styles.listContainer}>
        <Text style={styles.text}>Dark Mode: {isEnabled ? 'ON' : 'OFF'}</Text>
        <View style={styles.switch}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.text}>setting page</Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.text}>setting page</Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.text}>setting page</Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.text}>setting page</Text>
      </View>
    </SafeAreaView>
  );
}
