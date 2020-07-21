import React, { useEffect, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  Dimensions,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import styles from '../../../theme';

import { firebase } from '../../firebase/config';
import CustomHeader from '../../Components/CustomHeader';
import { FlatList } from 'react-native-gesture-handler';

// Let's sort the list too.
// users.sort(function(a, b){
//   if(a.text < b.text) { return -1; }
//   if(a.text > b.text) { return 1; }
//   return 0;
// })
//this link has the way to section list
//https://snack.expo.io/@jemise111/react-native-swipe-list-view
//

/*************** List Screen **********/
export default function ListScreen(props) {
  const [wordList, setWordList] = useState([]);
  // const [animationIsRunning, setAnimationIsRunning] = useState(false);

  const entityRef = firebase.firestore().collection('wordlist');
  const userID = props.extraData.id;
  const db = firebase.firestore();

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  /************* DELETE also from firebase *******/
  const deleteRow = (rowMap, rowKey, txt) => {
    //First the state variable will be updated here
    closeRow(rowMap, rowKey);
    const newData = [...wordList];
    const prevIndex = wordList.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setWordList(newData);

    //Here I get the item I want to remove from DB with WHERE
    //,then using foreach to get
    //all words that has the same text

    const removedItem = db
      .collection('wordlist')
      .where('authorID', '==', userID)
      .where('text', '==', txt)
      .get()
      .then(function (removedItem) {
        removedItem.forEach(function (doc) {
          doc.ref.delete();
        });
      })

      .then(function () {
        // alert('successfully deleted!');
      })
      .catch(function (error) {
        alert('Error removing document: ');
      });
  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  /******** READ from firebase *******/

  useEffect(() => {
    entityRef
      .where('authorID', '==', userID)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const newEntities = [];
          querySnapshot.forEach((doc) => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          setWordList(newEntities);
        },
        (error) => {
          console.log('here in list', error);
        },
      );
  }, []);
  const renderItem = ({ item, index }) => {
    return (
      <Animated.View style={styles.listContainer}>
        <TouchableOpacity
          style={styles.optionDots}
          onPress={() =>
            Alert.alert(
              'Delete',
              'Do you want to delete this word from your history?',
              [
                {
                  text: 'No',
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => deleteRow(index, item.key, item.text),
                },
              ],
            )
          }
        >
          <Image
            style={styles.optionDots}
            source={require('../../../assets/dots.png')}
          ></Image>
        </TouchableOpacity>
        <TouchableHighlight underlayColor={'#AAA'}>
          <View>
            <Text style={styles.text}>
              {item.text}: {item.answer}
            </Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  // const renderHiddenItem = (data, rowMap) => (
  //   <View style={styles.rowBack}>
  //     <Text>Left</Text>
  //     <TouchableOpacity
  //       style={[styles.backRightBtn, styles.backRightBtnRight]}
  //       onPress={() => deleteRow(rowMap, data.item.key, data.item.text)}
  //     >
  //       <Text style={styles.backTextWhite}>Delete</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  return (
    <SafeAreaView style={styles.body}>
      <CustomHeader title="History" userData={props.extraData} />
      <View style={styles.container}>
        {wordList && (
          <View>
            <FlatList
              data={wordList}
              renderItem={renderItem}
              // renderHiddenItem={renderHiddenItem}

              // leftOpenValue={75}
              // rightOpenValue={-75}
              // disableRightSwipe={true}
              // previewRowKey={'0'}
              // previewOpenValue={-40}
              // previewOpenDelay={3000}
              // onRowDidOpen={onRowDidOpen}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   body: {
//     flex: 1,
//     marginTop: 50,
//   },
//   container: {
//     flex: 1,
//     marginTop: 50,
//     borderWidth: 0.1,
//   },
//   listContainer: {
//     justifyContent: 'space-between',
//     alignSelf: 'center',
//     width: '95%',
//     borderRadius: 4,
//     borderWidth: 0.1,
//     borderColor: '#d6d7da',
//     padding: 10,
//     marginBottom: 10,
//     shadowColor: '#ff33b5e5',
//     shadowOffset: {
//       width: 1,
//       height: 0,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 1.01,
//     elevation: 1,
//     backgroundColor: '#ccfff9',
//   },

//   optionDots: {
//     width: 25,
//     height: 22,
//     marginTop: 1,
//     alignSelf: 'flex-end',
//   },

//   text: {
//     fontSize: 16,
//     color: '#333333',
//   },
//   entityText: {
//     fontSize: 18,
//     color: '#333333',
//   },
//   title: {
//     alignSelf: 'center',
//     fontSize: 20,
//     paddingTop: 10,
//     marginBottom: 30,
//   },
//   scrollView: {
//     marginHorizontal: 20,
//   },
// });
