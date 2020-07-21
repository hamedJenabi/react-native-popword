import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  Alert,
  SafeAreaView,
  Platform,
  Keyboard,
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import styles from '../../../theme';
import { firebase } from '../../firebase/config';
import Constants from 'expo-constants';
import { FlatList } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';

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
  const [selectedDict, setSelectedDict] = useState('de-en');
  const [notificationName, setNotifcationName] = useState('');
  const entityRef = firebase.firestore().collection('wordlist');
  const userID = props.extraData.id;
  const userData = props.extraData;

  const navigation = useNavigation();

  /******Cancel notification *****/

  const cancelNotification = async (notificationName) => {
    await Notifications.cancelScheduledNotificationAsync(notificationName);
  };

  /*************Fetching function ********/

  const fetching = async () => {
    fetch(
      `https://popwordapi.herokuapp.com/api/popword/${selectedDict}/${entityText}`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((response) => {
        const result = response.slice(0, 2);
        setData(result);
        setLoading(false);

        if (result) {
          setShow(true);
          addToDataBase(result);
          const notification = pushNotification(entityText, result);
          setNotifcationName(notification);
        }
      });
  };

  /******** INSERT INTO DATABASE *********/

  const addToDataBase = (answer) => {
    if (entityText && entityText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const entityData = {
        text: entityText,
        authorID: userID,
        createdAt: timestamp,
        answer: `${answer[0].result}, ${answer[0].detail} `,
      };
      entityRef
        .add(entityData)
        .then((_doc) => {
          setEntityText('');
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert('add error', error);
        });
    }
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

  /**** DaRK MODE *****/

  /******** return *********/

  return (
    <SafeAreaView style={styles.body}>
      <CustomHeader title="Home" userData={userData} />
      <View style={styles.container}>
        <Text style={styles.text}>Choose your dictionary</Text>
        <View
          style={{
            ...(Platform.OS !== 'android' && {
              zIndex: 10,
            }),
          }}
        >
          <DropDownPicker
            items={[
              {
                label: 'German  -->  English',
                value: 'de-en',
              },
              {
                label: 'English  -->  German',
                value: 'en-de',
              },
              {
                label: 'Spanish  -->  English',
                value: 'es-en',
              },
            ]}
            defaultValue="de-en"
            containerStyle={{
              marginTop: 20,
              height: 40,
              width: 255,
            }}
            style={{
              backgroundColor: '#fafafa',
              shadowColor: '#e6fffc',
              shadowOffset: {
                width: 1,
                height: 0,
              },
              shadowOpacity: 0.1,
              shadowRadius: 1.01,

              elevation: 1,
            }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{
              backgroundColor: '#e6fffc',
              shadowColor: 'blue',
              shadowOffset: {
                width: 1,
                height: 0,
              },

              shadowOpacity: 0.1,
              shadowRadius: 1.01,

              elevation: 1,
            }}
            arrowSize={22}
            onChangeItem={(item) => setSelectedDict(item.value)}
            dropDownMaxHeight={300}
            activeLabelStyle={{ color: '#008071' }}
          />
        </View>

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
          <TouchableOpacity
            style={styles.searchButton}
            onPress={onSearchButtonPress}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 24 }}>
          {show ? (
            isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View style={{ zIndex: 10 }}>
                <FlatList
                  data={data}
                  keyExtractor={({ id }, index) => id.toString()}
                  // removeClippedSubviews={true}
                  // renderHiddenItem={renderHiddenItem}
                  // rightOpenValue={-145}
                  // disableRightSwipe={true}
                  // previewRowKey={'0'}
                  // previewOpenValue={-40}
                  // previewOpenDelay={3000}
                  renderItem={({ item }) => (
                    <>
                      <View style={styles.listContainer}>
                        <TouchableOpacity
                          style={styles.optionDots}
                          onPress={() =>
                            Alert.alert(
                              'Delete',
                              'Do you want to cancel notifications for this word?',
                              [
                                {
                                  text: 'No',
                                  style: 'cancel',
                                },
                                {
                                  text: 'Yes',
                                  onPress: async () => {
                                    await cancelNotification(notificationName);
                                  },
                                },
                              ],
                            )
                          }
                        >
                          <Image
                            style={styles.optionDots}
                            source={require('../../../assets/dots.png')}
                          ></Image>
                        </TouchableOpacity>
                        <View>
                          <Text style={styles.entityText}>
                            {item.word}: {item.result}
                          </Text>
                          <Text>{item.detail}</Text>
                        </View>
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
