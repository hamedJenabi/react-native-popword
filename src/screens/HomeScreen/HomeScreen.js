import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { firebase } from '../../firebase/config';
import {
  NavigationContainer,
  useNavigationState,
  useNavigation,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../../../components/Header';

const Stack = createStackNavigator();

export default function HomeScreen(props) {
  const navigation = useNavigation();
  const [entityText, setEntityText] = useState('');
  const [entities, setEntities] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [word, setWord] = useState('');
  const [selectedValue, setSelectedValue] = useState('English');
  const entityRef = firebase.firestore().collection('entities');
  const userID = props.extraData.id;

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
        console.log(data);
      })

      .catch((error) => {
        Alert.alert('Error', 'Word not found', [
          {
            text: 'ok',
            onPress: () => {
              setWord(''), setLoading(false);
            },
          },
        ]);
      });
  };
  /************ WRITE on Firebase */

  const uploadToDatabase = () => {
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
  };
  /*********** this shows the entitites back on App */
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

  const onListButtonPress = () => {
    navigation.navigate('List');
  };
  async function onAddButtonPress() {
    if (entityText && entityText.length > 0) {
      setShow(true);
      //It should be waiting here to fetch the data and then goes forward to put it in database: That's why "await"
      await fetching();
      uploadToDatabase();
    }
  }

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
    <View style={styles.container}>
      <Header />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEntityText(text)}
          value={entityText}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
          <Text style={styles.buttonText}>Look up</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={onListButtonPress}>
          <Text style={styles.buttonText}>List</Text>
        </TouchableOpacity> */}
      </View>

      <View style={{ flex: 1, padding: 24 }}>
        {show ? (
          isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Text>
                  {item.l2_text}({item.wortart.toLowerCase()}) : {item.l1_text}
                  {item.synonyme1}
                </Text>
              )}
            />
          )
        ) : (
          false
        )}
      </View>

      {/* this shows the list. I need it for ListScreen
      {entities && (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginBottom: 20,
    flex: 1,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  listContainer: {
    marginTop: 20,
    padding: 20,
  },
  entityContainer: {
    marginTop: 16,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  entityText: {
    fontSize: 20,
    color: '#333333',
  },
});
