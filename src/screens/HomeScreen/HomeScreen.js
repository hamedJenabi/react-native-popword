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
import Headers from '../../Components/Headers';

export default function HomeScreen(props) {
  const [entityText, setEntityText] = useState('');
  const [entities, setEntities] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const entityRef = firebase.firestore().collection('entities');
  const userID = props.extraData.id;
  const navigation = useNavigation();

  const onListButtonPress = () => {
    navigation.navigate('List');
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
        const result = response.slice(0, 2);
        setData(result);
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
  };
  /******** READ from Database ********/

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
          setEntities(newEntities);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  const onAddButtonPress = () => {
    // fetching();
    if (entityText && entityText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        text: entityText,
        authorID: userID,
        createdAt: timestamp,
      };
      entityRef
        .add(data)
        .then((_doc) => {
          setEntityText('');
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>
          {index}. {item.text}
        </Text>
      </View>
    );
  };

  return (
    <>
      <Headers />
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add new entity"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEntityText(text)}
            value={entityText}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onListButtonPress}>
            <Text style={styles.buttonText}>list</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, padding: 24 }}>
          {show ? (
            isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View style={styles.listContainer}>
                <FlatList
                  data={data}
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) => (
                    <Text>
                      {item.l2_text}({item.wortart.toLowerCase()}) :{' '}
                      {item.l1_text}
                      {item.synonyme1}
                    </Text>
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
    </>
  );
}
