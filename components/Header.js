import React from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  View,
  Dimensions,
} from 'react-native';
import {
  useDimentions,
  useDeviceOrientation,
} from '@react-native-community/hooks';

export default function header(props) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>POP WORD</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#009688',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    maxHeight: 50,
    justifyContent: 'center',
    borderBottomColor: 'blue',
  },
  text: {
    fontSize: 26,
  },
});
