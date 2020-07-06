import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  AsyncStorage,
  SafeAreaView,
  FlatList,
  Keyboard,
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import Constants from 'expo-constants';
// import * as Notifications from 'expo-notifications';
import * as Notifications from 'expo-notifications';

import * as Permissions from 'expo-permissions';
import pushNotification from '../../functions/pushNotification';
import CustomHeader from '../../Components/CustomHeader';

export default function HomeScreen(props) {
  const [entityText, setEntityText] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [expoToken, setExpoToken] = useState('');

  const entityRef = firebase.firestore().collection('wordlist');
  const userID = props.extraData.id;
  const navigation = useNavigation();

  /*************Fetching function ********/

  const fetching = () => {
    fetch(
      `hidden,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'petapro-translate-v1.p.rapidapi.com',
          'x-rapidapi-key':
            '0a868878b3msha696a9ae4c53aaep18f96fjsn41fe05117014',
        },
      },
    )
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        const result = response.slice(0, 3);
        setData(result);
        if (result) {
          addToDataBase(result);
        }
        setShow(true);
      })

      .catch((error) => {
        alert('Error', 'Word not found', [
          {
            text: 'ok',
            onPress: () => {
              setLoading(false);
            },
          },
        ]);
      });
  };

  /******** INSERT INTO DATABASE *********/

  const addToDataBase = (result) => {
    if (entityText && entityText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const entityData = {
        text: entityText,
        authorID: userID,
        createdAt: timestamp,
        //here instead of 0 i can put th index of the answer being chosen by user
        answer: result[0].l1_text,
      };
      entityRef
        .add(entityData)
        .then((_doc) => {
          setEntityText('');
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
    pushNotification(entityText, result);
  };
  /******** Search for the answer *********/

  const onSearchButtonPress = () => {
    fetching();
  };

  const renderEntity = ({ item, index }) => {
    return (
      <Animated.View style={styles.entityContainer}>
        <TouchableHighlight underlayColor={'#AAA'}>
          <Text style={styles.entityText}>{item.text}</Text>
        </TouchableHighlight>
      </Animated.View>
    );
  };
  /******** hidden Items ******/
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key, data.item.text)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  /******** return *********/

  return (
    <SafeAreaView style={styles.body}>
      <CustomHeader title="Home" />
      <View style={styles.container}>
        <Text style={styles.text}>What word do you want to look up?</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Look it up here"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEntityText(text)}
            value={entityText}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={onSearchButtonPress}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 24 }}>
          {show ? (
            isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View>
                <SwipeListView
                  data={data}
                  keyExtractor={({ id }, index) => id.toString()}
                  removeClippedSubviews={true}
                  renderHiddenItem={renderHiddenItem}
                  rightOpenValue={-150}
                  previewRowKey={'0'}
                  previewOpenValue={-40}
                  previewOpenDelay={3000}
                  renderItem={({ item }) => (
                    <>
                      <View style={styles.entityContainer}>
                        <Text style={styles.entityText}>
                          {item.l2_text} ({item.wortart.toLowerCase()}) :{' '}
                          {item.l1_text}
                        </Text>
                        <Text>{item.synonyme1}</Text>
                      </View>
                    </>
                  )}
                />
              </View>
            )
          ) : (
            false
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
