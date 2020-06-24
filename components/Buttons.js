import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Buttons = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Buttons;

const styles = {
  textStyle: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  buttonStyle: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
