import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import { pushNotifications } from '../../services/';

import Headers from '../../Components/Headers';

export default function HomeScreen(props) {
  const [entityText, setEntityText] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const entityRef = firebase.firestore().collection('wordlist');
  const userID = props.extraData.id;
  const navigation = useNavigation();

  const onListButtonPress = () => {
    pushNotifications.localNotification();
  };

  /*************Fetching function ********/

  const fetching = () => {
    fetch('hidden', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'petapro-translate-v1.p.rapidapi.com',
        'x-rapidapi-key': '0a868878b3msha696a9ae4c53aaep18f96fjsn41fe05117014',
      },
    })
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
        Alert.alert('Error', 'Word not found', [
          {
            text: 'ok',
            onPress: () => {
              setLoading(false);
            },
          },
        ]);
      });
    //hier waits until result is back then add them to database
  };
  /******** READ from Database ********/

  // useEffect(() => {
  //   entityRef
  //     .where('authorID', '==', userID)
  //     .orderBy('createdAt', 'desc')
  //     .onSnapshot(
  //       (querySnapshot) => {
  //         const newEntities = [];
  //         querySnapshot.forEach((doc) => {
  //           const entity = doc.data();
  //           entity.id = doc.id;
  //           newEntities.push(entity);
  //         });
  //         setEntities(newEntities);
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //     );
  // }, []);

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
  };
  /******** Search for the answer *********/

  const onSearchButtonPress = () => {
    fetching();
  };

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>{item.text}</Text>
      </View>
    );
  };
  /******** return *********/

  return (
    <View style={styles.body}>
      <Headers />
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
          {/* <TouchableOpacity style={styles.button} onPress={onListButtonPress}>
            <Text style={styles.buttonText}>notification</Text>
          </TouchableOpacity> */}
        </View>
        <View style={{ padding: 24 }}>
          {show ? (
            isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View>
                <FlatList
                  data={data}
                  keyExtractor={({ id }, index) => id.toString()}
                  removeClippedSubviews={true}
                  renderItem={({ item }) => (
                    <>
                      {/* <Text style={styles.text}>
                        --- Swipe right to save this word to POP ---{'>'}
                      </Text> */}
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
        {/* {entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )} */}
      </View>
    </View>
  );
}
