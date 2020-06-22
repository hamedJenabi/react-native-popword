import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
// import {
//   useDimentions,
//   useDeviceOrientation,
// } from '@react-native-community/hooks';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  useNavigationState,
  useNavigation,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from './components/Header';
// import SplashScreen from './app/screens/SplashScreen';
import HomeScreen from './app/screens/HomeScreen';
import SearchScreeen from './app/screens/SearchScreen';
import SplashScreen from './app/screens/SplashScreen';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Welcome" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Pop Word" component={SearchScreeen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
    fontSize: 16,
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 5,
    alignSelf: 'center',
  },
  searchButton: {
    height: 40,
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
  },
});

// <View
//       style={{
//         backgroundColor: 'white',
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//       }}
//     >
//       <View
//         style={{
//           backgroundColor: 'blue',
//           width: 40,
//           height: 40,
//           left: 20,
//         }}
//       />
//       <Image
//         style={{
//           alignSelf: 'center',
//         }}
//         fadeDuration={300}
//         source={{
//           width: 300,
//           height: 550,
//           uri: 'https://picsum.photos/200/300',
//         }}
//       />
//       <View
//         style={{
//           backgroundColor: 'yellow',
//           width: 40,
//           height: 40,
//           right: 20,
//         }}
//       />
//     </View>
//     <Text numberOfLines={1}>Hello WordPop</Text>
//       <Text>this is my App</Text>
//       <TouchableNativeFeedback>
//         <Image
//           fadeDuration={300}
//           source={{
//             width: 200,
//             height: 300,
//             uri: 'https://picsum.photos/200/300',
//           }}
//         />
//       </TouchableNativeFeedback>
//       <Button
//         title="Click Me!"
//         onPress={() =>
//           Alert.alert('My title', 'My Message', [
//             { text: 'Yes', onPress: () => alert('haha') },
//             { text: 'No' },
//           ])
//         }
//       />
