import React from 'react';

import { View, Text, Image, SafeAreaView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

/************* CostumDrawerContent *********/
export default function CostumDrawerContent(props) {
  const pressLogOut = () => {
    firebase.auth().signOut();
    props.navigation.navigate('Logout');
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          height: 37,
          width: '100%',
          alignItems: 'center',
          marginBottom: 30,
          marginTop: 100,
          borderBottomColor: '#d6d7da',
          padding: 56,
          shadowColor: '#ff33b5e5',
          shadowOffset: {
            width: 1,
            height: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 1.01,
          elevation: 1,
        }}
      >
        <Image
          style={{ alignSelf: 'center' }}
          source={require('../../assets/popcorn.png')}
        />
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Home')}
        style={{
          justifyContent: 'center',
          height: 37,
          alignSelf: 'center',
          marginBottom: 30,
        }}
      >
        <Text style={{ fontSize: 20 }}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('List')}
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          marginBottom: 30,
        }}
      >
        <Text style={{ fontSize: 20 }}>List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('List')}
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          marginBottom: 70,
        }}
      >
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Setting</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 36 }}>
        <TouchableOpacity
          onPress={pressLogOut}
          style={{
            height: 47,
            borderRadius: 5,
            backgroundColor: '#009688',
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
