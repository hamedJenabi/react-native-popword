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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [focus, setFocus] = useState(false);

  const navigation = useNavigation();
  const onPressActionLogIn = () => {
    navigation.navigate('Pop Word');
  };
  const onPressActionSignUp = () => {
    navigation.navigate('Pop Word');
  };

  const focusing = () => {
    setFocus(!focus);
  };
  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.text}>Please log in here</Text>
      <View>
        <TextInput
          placeholder="Username"
          style={styles.textInput}
          onChangeText={(value) => {
            setUsername(value);
          }}
          value={username}
          // onFocus={() => setFocus(true)}
          // onBlur={() => setFocus(false)}
        />
      </View>
      <View style={{ paddingTop: 4 }}>
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          style={styles.textInput}
          onChangeText={(value) => {
            setPassword(value);
          }}
          value={password}
          // onFocus={() => setFocus(true)}
          // onBlur={() => setFocus(false)}
        />
      </View>

      <View style={styles.searchButton}>
        <Buttons text="log in" onPress={onPressActionLogIn} />
        <Text style={styles.text}>don't have an account?</Text>

        <Buttons text="sign up for free" onPress={onPressActionSignUp} />
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
    borderColor: 'grey',
    alignSelf: 'center',
    borderWidth: 1,
  },
  textFocus: {
    height: 40,
    width: '60%',
    borderColor: 'blue',
    alignSelf: 'center',
    borderWidth: 2,
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
