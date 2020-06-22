import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  SafeAreaView,
  Image,
  Button,
  Alert,
  Platform,
  StatusBar,
  View,
  Dimensions,
  TextInput,
} from 'react-native';
import {
  useDimentions,
  useDeviceOrientation,
} from '@react-native-community/hooks';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  useNavigationState,
  useNavigation,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../../components/Header';
import Buttons from '../../components/Buttons';

export default function HomeScreen() {
  const [word, setWord] = useState('');

  const navigation = useNavigation();
  const onPressAction = () => {
    navigation.navigate('result');
  };

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.text}>type down your word here:</Text>
      <View>
        <TextInput
          placeholder="search"
          style={styles.textInput}
          onChangeText={(value) => {
            setWord(value);
          }}
          value={word}
        />
      </View>

      <View style={styles.searchButton}>
        <Buttons text="search" onPress={onPressAction} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
    fontSize: 16,
  },
  textInput: {
    height: 40,
    width: '60%',
    borderColor: 'gray',
    alignSelf: 'center',
    borderWidth: 1,
  },
  searchButton: {
    height: 40,
    marginTop: 30,
    width: '60%',
    alignSelf: 'center',
  },
  //  onFocus: {
  //   borderColor: 'blue',
  //   borderWidth: 2,
  //   height: 40,
  //   width: '60%',
  //   alignSelf: 'center',
  // },
});
