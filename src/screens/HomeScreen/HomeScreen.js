import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  AsyncStorage,
  FlatList,
  Keyboard,
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
import Headers from '../../Components/Headers';
import pushNotification from '../../functions/pushNotification';

export default function HomeScreen(props) {
  const [entityText, setEntityText] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [expoToken, setExpoToken] = useState('');

  const entityRef = firebase.firestore().collection('wordlist');
  const userID = props.extraData.id;
  const navigation = useNavigation();

  /*******try pushing a notificatio *********/

  const onPushNotificationButtonPress = async (title, body) => {
    let previousToken = await AsyncStorage.getItem('pushToken');
    setExpoToken(previousToken);

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    // await Notifications.cancelAllScheduledNotificationsAsync();
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'popword!',
    //     subtitle: 'subpopword',
    //     body: 'Change sides!',
    //     color: 'red',
    //     backgroundColor: 'white',
    //   },
    //   trigger: {
    //     seconds: 2,
    //   },
    // });
    // Notifications.presentNotificationAsync({
    //   title: 'Look at that notification',
    //   body: "I'm so proud of myself!",
    // });
    // Notifications.scheduleNotificationAsync();

    // Notifications.scheduleNotificationAsync(
    //   {
    //     content: {
    //       title: 'Remember to smoke water!',
    //     },
    //     trigger: {
    //       seconds: 60,
    //       repeats: true,
    //     },
    //   },
    // );
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: "Time's up!",
    //     body: 'Change sides!',
    //   },
    //   trigger: {
    //     seconds: 1,
    //   },
    // });

    // const message = {
    //   to: previousToken,
    //   sound: 'default',
    //   title: { title },
    //   body: { body },
    //   data: { data: `${title} - ${body}` },
    // };

    // await fetch('https://exp.host/--/api/v2/push/send', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Accept-encoding': 'gzip, deflate',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(message),
    // });

    /************* */
    // return fetch('https://exp.host/--/api/v2/push/send', {
    //   body: JSON.stringify({
    //     to: previousToken,
    //     title: 'Hamed',
    //     body: 'with return',
    //     data: { message: 'Hamed' - 'with return' },
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'POST',
    // });
    // console.log('TOki toki in home', previousToken);
    // fetch('https://exp.host/--/api/v2/push/send', {
    //   body: JSON.stringify({
    //     to: previousToken,
    //     title: title,
    //     body: body,
    //     data: { message: `${title} - ${body}` },
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'POST',
    // });
  };
  // let response = await fetch('https://exp.host/--/api/v2/push/send', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     to: previousToken,
  //     sound: 'default',
  //     title: 'Demo',
  //     body: 'Demo Notification',
  //   }),
  // });

  // if (Constants.isDevice) {
  //   const { status: existingStatus } = await Permissions.getAsync(
  //     Permissions.NOTIFICATIONS,
  //   );
  //   let finalStatus = existingStatus;
  //   if (existingStatus !== 'granted') {
  //     const { status } = await Permissions.askAsync(
  //       Permissions.NOTIFICATIONS,
  //     );
  //     finalStatus = status;
  //   }
  //   if (finalStatus !== 'granted') {
  //     alert('Failed to get push token for push notification!');
  //     return;
  //   }
  // }
  //   const expoToken = await Notifications.getExpoPushTokenAsync();
  //   const deviceToken = await Notifications.getDevicePushTokenAsync();
  //   console.log('token', expoToken.data);
  //   console.log('token_2', deviceToken);
  //   // AsyncStorage.setItem('pushToken', token.data);

  //   await sendPushNotification();
  // };

  // const sendPushNotification = async () => {
  //   const expoToken = await Notifications.getExpoPushTokenAsync();
  //   const deviceToken = await Notifications.getDevicePushTokenAsync();

  //   const message = {
  //     to: expoToken.data,
  //     sound: 'default',
  //     title: 'Original Title',
  //     body: 'And here is the body!',
  //   };
  // await fetch('https://exp.host/--/api/v2/push/send', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     'accept-encoding': 'gzip, deflate',
  //     host: 'exp.host',
  //   },
  //   body: JSON.stringify({
  //     to: previousToken,
  //     title: 'New Notification',
  //     body: 'The notification hamed!',
  //     priority: 'high',
  //     sound: 'default',
  //     channelId: 'default',
  //   }),
  // });

  //     .then((response) => response.json())
  //     .then((responseJson) => {})
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  /*************Fetching function ********/

  const fetching = () => {
    fetch(
      `hidden`,
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
    // notification(result);
    pushNotification(entityText, result);
  };
  /*--------Schedule the notification *********/
  // const notification = (result) => {
  //   Notifications.setNotificationHandler({
  //     handleNotification: async () => ({
  //       shouldShowAlert: true,
  //       shouldPlaySound: false,
  //       shouldSetBadge: false,
  //     }),
  //   });
  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: 'POP WORD',
  //       body: `${entityText} (${result[0].wortart.toLowerCase()}) : ${
  //         result[0].l1_text
  //       } , ${result[2].l1_text}`,
  //       color: 'red',
  //     },
  //     trigger: {
  //       //5 seconds  from now (Test)
  //       seconds: 5,
  //     },
  //   });
  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: 'POP WORD',
  //       body: `${entityText} ${result[0].wortart.toLowerCase()} : ${
  //         result[0].l1_text
  //       }`,
  //       color: 'red',
  //     },
  //     trigger: {
  //       //3 days from now
  //       seconds: 3 * 24 * 60 * 60 * 1000,
  //     },
  //   });

  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: 'POP WORD',
  //       body: `${entityText}   :  ${result[0].l1_text}`,
  //       color: 'red',
  //     },
  //     trigger: {
  //       //7 days from now
  //       seconds: 7 * 24 * 60 * 60 * 1000,
  //     },
  //   });
  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: 'POP WORD',
  //       body: `${entityText} ${result[0].wortart.toLowerCase()} : ${
  //         result[0].l1_text
  //       } `,
  //       color: 'red',
  //     },
  //     trigger: {
  //       //7 days from now
  //       seconds: 30 * 24 * 60 * 60 * 1000,
  //     },
  //   });
  // };
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPushNotificationButtonPress('hello', 'Alenio')}
          >
            <Text style={styles.buttonText}>notification</Text>
          </TouchableOpacity>
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
