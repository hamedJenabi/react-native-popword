import { Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

const Buttons = ({ onPress, text, word, data }) => {
  useEffect(() => {
    fetch(
      `https://petapro-translate-v1.p.rapidapi.com/?langpair=en-de&query=${word}&wortart=%7Bwordclass%7D`,
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
        const result = response;
        data = result;
      })

      .catch((error) => console.error(error));
    // .finally(() => setLoading(false));
  }, []);

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
  },
};
