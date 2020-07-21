import React, { useEffect, useState } from 'react';
import {
  Animated,
  AsyncStorage,
  SafeAreaView,
  Dimensions,
  Alert,
  Text,
  Switch,
  Linking,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import styles from '../../../theme';

import { firebase } from '../../firebase/config';
import CustomHeader from '../../Components/CustomHeader';

/*************** List Screen **********/
export default function AboutScreen(props) {
  const [wordList, setWordList] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const entityRef = firebase.firestore().collection('wordlist');
  const userID = props.extraData.id;
  const db = firebase.firestore();
  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 50,
      }}
    >
      <CustomHeader title="About" userData={props.extraData} />
      <View style={styles.container}>
        <Image
          source={require('../../../assets/about.png')}
          style={styles.avatar}
        />
        <Text style={styles.text}>My name is Hamed.</Text>
        <View style={styles.textContainer}>
          <Text style={{ textAlign: 'center', letterSpacing: 1 }}>
            I am a Full-Stack Developer who always wants to develope new ideas.
            This App was an idea I had for a long time, never got the change to
            do it, but thanks to my BootCamp at UpLeveled, I made it happen.
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.linkedin.com/in/hamed-jenabi/')
            }
          >
            <Image
              style={{ width: 35, height: 35, marginRight: 2, marginTop: 5 }}
              source={require('../../../assets/in.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://github.com/hamedJenabi/')}
          >
            <Image
              style={{ width: 35, height: 35, marginRight: 2, marginTop: 5 }}
              source={require('../../../assets/git.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://twitter.com/HamedJenabi_713')
            }
          >
            <Image
              style={{ width: 35, height: 35, marginRight: 2, marginTop: 5 }}
              source={require('../../../assets/twitter.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={styles.text}>About POPWORD</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={{ textAlign: 'center', letterSpacing: 1 }}>
            This App helps you remember every word you looked up on dictionary.
            According to modern pedagogy methods, if you look up a word, and
            will be reminded in 3 days, 7 days and one month about that word,
            you will NEVER forget it.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
