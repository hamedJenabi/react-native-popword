import { StyleSheet, AsyncStorage } from 'react-native';
import react, { useEffect, useState } from 'react';

const styles = (darkmode) =>
  StyleSheet.create({
    body: {
      flex: 1,
      marginTop: 50,
    },
    bodyDark: {
      flex: 1,
      marginTop: 50,
      backgroundColor: 'black',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 20,
    },
    title: {},
    logo: {
      flex: 1,
      height: 120,
      width: 90,
      alignSelf: 'center',
      margin: 30,
    },
    avatar: {
      borderRadius: 120 / 2,
      margin: 20,
      height: 120,
      width: 120,
      alignSelf: 'center',
    },
    input: {
      height: 48,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 30,
      marginRight: 30,
      paddingLeft: 16,
    },
    button: {
      backgroundColor: '#009688',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    footerView: {
      flex: 1,
      alignItems: 'center',
      marginTop: 20,
    },
    footerText: {
      fontSize: 16,
      color: '#2e2e2d',
    },
    footerLink: {
      color: '#788eec',
      fontWeight: 'bold',
      fontSize: 16,
    },
    text: {
      fontSize: 18,
      color: '#333333',
      margin: 0,
      letterSpacing: 1,
    },

    logoutText: {
      fontSize: 26,
      color: '#333333',
      marginTop: 10,
    },
    textContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginTop: 15,
      width: '70%',
      borderRadius: 4,
      borderWidth: 0.1,
      borderColor: '#1affe4',
      padding: 15,
      shadowColor: 'blue',
      shadowOffset: {
        width: 1,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1.01,

      elevation: 1,
    },
    formContainer: {
      flexDirection: 'row',
      height: 80,
      marginTop: 30,
      marginBottom: 20,
      flex: 1,
      paddingTop: 10,
      paddingBottom: 30,
      paddingLeft: 30,
      paddingRight: 30,
    },
    switch: {
      justifyContent: 'center',
      margin: 0,
      marginTop: -15,
    },
    input: {
      height: 48,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: 'white',
      paddingLeft: 16,
      flex: 1,
      marginRight: 5,
    },
    optionDots: {
      width: 25,
      height: 22,
      alignSelf: 'flex-end',
      marginBottom: -10,
    },
    pickerContainer: {
      backgroundColor: '#e6fffc',
      borderRadius: 25,
      marginTop: 30,
    },
    searchButton: {
      height: 47,
      borderRadius: 5,
      backgroundColor: '#009688',
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
    },

    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    listContainer: {
      marginTop: 15,
      minWidth: '90%',
      justifyContent: 'space-between',
      backgroundColor: '#e6fffc',
      borderRadius: 4,
      borderWidth: 0.1,
      borderColor: '#1affe4',
      padding: 15,
      shadowColor: 'blue',
      shadowOffset: {
        width: 1,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1.01,

      elevation: 1,
    },
    entityText: {
      fontSize: 18,
      color: '#333333',
    },
    userName: {
      fontSize: 16,
      color: '#333333',
      marginTop: 30,
      marginBottom: 30,
    },
  });
export default styles();
