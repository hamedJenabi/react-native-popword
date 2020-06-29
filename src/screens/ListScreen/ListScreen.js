import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  Animated,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import { firebase } from '../../firebase/config';
import Headers from '../../Components/Headers';

export default function ListScreen(props) {
  const [entityText, setEntityText] = useState('');
  const [entities, setEntities] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [answer, setAnswer] = useState([]);
  const [color, setColor] = useState(16);

  const entityRef = firebase.firestore().collection('entities');
  const userID = props.extraData.id;

  /********* Fetching translatation from API */

  const fetching = (text) => {
    fetch(`hidden`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'petapro-translate-v1.p.rapidapi.com',
        'x-rapidapi-key': '0a868878b3msha696a9ae4c53aaep18f96fjsn41fe05117014',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        const result = response.slice(0, 1);
        const answerList = [...answer, result.l2_text];
        setAnswer(answerList);
      })

      .catch((error) => {
        // // Alert.alert('Error', 'Word not found', [
        // //   {
        // //     text: 'ok',
        // //     onPress: () => {
        // //       setLoading(false);
        // //     },
        // //   },
        // ]);
      });
  };

  /***********Swiping actions **************/
  // I will do this later

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
          newEntities.map((text) => fetching(text));
          setEntities(newEntities);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);
  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.text}>
          {item.text} : {item.answer}
        </Text>
      </View>
    );
  };

  return (
    <>
      <Headers />
      {entities && (
        <View>
          <Text style={styles.title}>Here is your word list</Text>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    alignSelf: 'center',
    width: '70%',
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: '#d6d7da',
    padding: 15,
    marginBottom: 10,
    shadowColor: '#ff33b5e5',
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.01,

    elevation: 2,
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
  },
  entityText: {
    fontSize: 20,
    color: '#333333',
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    paddingTop: 10,
    marginBottom: 30,
  },
});
