import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  AsyncStorage,
  SafeAreaView,
  Platform,
  Keyboard,
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Picker,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';
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
  const [selectedDict, setSelectedDict] = useState('');

  const [expoToken, setExpoToken] = useState('');

  const entityRef = firebase.firestore().collection('wordlist');
  const userID = props.extraData.id;
  const userData = props.extraData;

  const navigation = useNavigation();

  /*************Fetching function ********/

  const fetching = () => {
    fetch(`http://10.0.2.2:3000/api/popword/${selectedDict}/${entityText}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((response) => {
        const result = response.slice(0, 3);

        setData(result);
        setShow(true);

        setLoading(false);

        if (result) {
          addToDataBase(result);
          pushNotification(entityText, result);
        }
        // setShow(true);
      });

    // .catch((error) => {
    //   alert('Error', 'Word not found', [
    //     {
    //       text: 'ok',
    //       onPress: () => {
    //         setLoading(false);
    //       },
    //     },
    //   ]);
    // });
  };

  /******** INSERT INTO DATABASE *********/

  const addToDataBase = (answer) => {
    console.log('answer in function', answer);
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
  /******** hidden Items ******/
  // const renderHiddenItem = (data, rowMap) => (
  //   <View style={styles.rowBack}>
  //     <TouchableOpacity
  //       style={[styles.backRightBtn, styles.backRightBtnRight]}
  //       onPress={() => deleteRow(rowMap, data.item.key, data.item.text)}
  //     >
  //       <Text style={styles.backTextWhite}>
  //         Don't send me Notification for this word
  //       </Text>
  //     </TouchableOpacity>
  //   </View>
  // );
  /******** return *********/

  return (
    <SafeAreaView style={styles.body}>
      <CustomHeader title="Home" userData={userData} />
      <View style={styles.container}>
        <Text style={styles.text}>What word do you want to look up?</Text>
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
            ]}
            defaultValue="de-en"
            containerStyle={{
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
        {/* <Picker
          selectedLanguage={selectedLanguage}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label="German  -> English" value="de-en" />
          <Picker.Item label="English -> German" value="en-de" />
        </Picker> */}

        {/* <Picker.Item label="German  -> Spanish" value="de-es" />
          <Picker.Item label="Spanish -> German" value="es-de" />
          <Picker.Item label="German  -> Italian" value="de-it" />
          <Picker.Item label="Italian -> German" value="it-de" /> */}
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
              <View style={{ zIndex: 10 }}>
                <FlatList
                  data={data}
                  // keyExtractor={({ id }, index) => id.toString()}
                  // removeClippedSubviews={true}
                  // renderHiddenItem={renderHiddenItem}
                  // rightOpenValue={-145}
                  // disableRightSwipe={true}
                  // previewRowKey={'0'}
                  // previewOpenValue={-40}
                  // previewOpenDelay={3000}
                  renderItem={({ item }) => (
                    <>
                      <View style={styles.entityContainer}>
                        <View>
                          <Text style={styles.entityText}>
                            {item.word}: {item.result}
                          </Text>
                          <Text>{item.detail}</Text>
                        </View>
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
                                  onPress: () => alert('canceled'),
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
