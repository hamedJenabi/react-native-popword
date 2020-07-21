import * as Notifications from 'expo-notifications';

const pushNotification = (text, result) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  const answer = [...result];

  const identifier = Notifications.scheduleNotificationAsync({
    content: {
      title: 'POP WORD',
      body: `${text}: ${answer[0].result}, ${answer[0].detail}`,
    },
    trigger: {
      //5 seconds  from now (Test)
      seconds: 15,
    },
  });
  const notificationName = Notifications.scheduleNotificationAsync({
    content: {
      title: 'POP WORD',
      body: `${text}: ${answer[0].result}, ${answer[0].detail}`,
      color: 'red',
    },
    trigger: {
      //3 days from now
      seconds: 3 * 86400,
    },
  });
  console.log('notificationName', notificationName);
  Notifications.scheduleNotificationAsync({
    content: {
      title: 'POP WORD',
      body: `${text}: ${answer[0].result}, ${answer[0].detail}`,
      color: 'red',
    },
    trigger: {
      //7 days from now
      seconds: 7 * 86400,
    },
  });
  Notifications.scheduleNotificationAsync({
    content: {
      title: 'POP WORD',
      body: `${text}: ${answer[0].result}, ${answer[0].detail}`,
      color: 'red',
    },
    trigger: {
      //30 days from now
      seconds: 30 * 86400,
    },
  });
  return notificationName;
};
export default pushNotification;
// import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import { Platform } from 'react-native';

// const configure = () => {
//   PushNotification.configure({
//     onRegister: function (token) {
//       console.log('token', token);
//     },

//     onNotification: function (notification) {
//       // process the notification
//       // required on iOS only
//       notification.finish(PushNotificationIOS.FetchResult.NoData);
//     },

//     permissions: {
//       alert: true,
//       badge: true,
//       sound: true,
//     },

//     popInitialNotification: true,
//     requestPermissions: true,
//   });
// };
// const localNotification = () => {
//   PushNotification.localNotification({
//     autoCancel: true,
//     largeIcon: 'ic_launcher',
//     // smallIcon: 'ic_notification',
//     bigText: 'My big text that will be shown when notification is expanded',
//     subText: 'This is a subText',
//     color: 'green',
//     vibrate: true,
//     vibration: 300,
//     title: 'Notification Title',
//     message: 'Notification Message',
//     playSound: true,
//     soundName: 'default',
//     actions: '["Accept", "Reject"]',
//   });
// };

// export { configure, localNotification };

/*******try pushing a notificatio *********/

// const onPushNotificationButtonPress = async (title, body) => {
//   let previousToken = await AsyncStorage.getItem('pushToken');
//   setExpoToken(previousToken);

//   Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: true,
//       shouldPlaySound: false,
//       shouldSetBadge: false,
//     }),
//   });
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
