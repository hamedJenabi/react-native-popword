import * as Notifications from 'expo-notifications';

const pushNotification = (text, res) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  Notifications.scheduleNotificationAsync({
    content: {
      title: 'POP WORD',
      body: `${text} (${res[0].wortart.toLowerCase()}) : ${res[0].l1_text} , ${
        res[2].l1_text
      }`,
      color: 'red',
    },
    trigger: {
      //5 seconds  from now (Test)
      seconds: 5,
    },
  });
  Notifications.scheduleNotificationAsync({
    content: {
      title: 'POP WORD',
      body: `${text} ${res[0].wortart.toLowerCase()} : ${res[0].l1_text}`,
      color: 'red',
    },
    trigger: {
      //3 days from now
      seconds: 3 * 24 * 60 * 60 * 1000,
    },
  });

  Notifications.scheduleNotificationAsync({
    content: {
      title: 'POP WORD',
      body: `${text} ${res[0].wortart.toLowerCase()} : ${res[0].l1_text} `,
      color: 'red',
    },
    trigger: {
      //7 days from now
      seconds: 7 * 24 * 60 * 60 * 1000,
    },
  });
  Notifications.scheduleNotificationAsync({
    content: {
      title: 'POP WORD',
      body: `${text} ${res[0].wortart.toLowerCase()} : ${res[0].l1_text} `,
      color: 'red',
    },
    trigger: {
      //30 days from now
      seconds: 30 * 24 * 60 * 60 * 1000,
    },
  });
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
