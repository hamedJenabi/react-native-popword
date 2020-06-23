import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Picker,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import Buttons from '../../components/Buttons';
import Fetcher from '../../components/Fetcher';

export default function HomeScreen() {
  const navigation = useNavigation();
  let words = '';

  const [isLoading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [word, setWord] = useState('');
  const [selectedValue, setSelectedValue] = useState('English');
  const [lang_1, setLang_1] = useState('en');
  const [lang_2, setLang_2] = useState('de');

  /************** API Request *********/

  const onPressAction = () => {
    setShow(true);
    fetch(KEY, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'petapro-translate-v1.p.rapidapi.com',
        'x-rapidapi-key': '0a868878b3msha696a9ae4c53aaep18f96fjsn41fe05117014',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        const result = response.slice(0, 2);
        setData(result);
        console.log(data);
      })

      .catch((error) => console.error(error));
  };
  /************** Return *********/

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.text}>Select the dictionary</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150, borderColor: 'grey' }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="German" value="de" />
        </Picker>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150, borderColor: 'grey' }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="German" value="de" />
          <Picker.Item label="English" value="en" />
          {/* English, Spanish, Dutch, Polish, Italian */}
        </Picker>
      </View>
      <View>
        <Text style={styles.text}>type down your word here:</Text>
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
      <View style={{ flex: 1, padding: 24 }}>
        {show ? (
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Text>
                  {item.l2_text}
                  {item.wortart}
                  {item.l1_text}, {item.synonyme2}
                </Text>
              )}
            />
          )
        ) : (
          <Text>{word}</Text>
        )}
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
  picker: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
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
