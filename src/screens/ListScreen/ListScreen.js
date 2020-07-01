import React, { useEffect, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';

import { firebase } from '../../firebase/config';
import Headers from '../../Components/Headers';
import { SwipeListView } from 'react-native-swipe-list-view';

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
  const [animationIsRunning, setAnimationIsRunning] = useState(false);

  const entityRef = firebase.firestore().collection('wordlist');
  const userID = props.extraData.id;
  const db = firebase.firestore();

  /************Swipe Functions*********/
  // const onSwipeValueChange = (swipeData) => {
  //   const { key, value } = swipeData;
  //   if (value < -Dimensions.get('window').width && !setAnimationIsRunning) {
  //     setAnimationIsRunning = true;
  //     Animated.timing(rowTranslateAnimatedValues[key], {
  //       toValue: 0,
  //       duration: 200,
  //     }).start(() => {
  //       const newData = [...listData];
  //       const prevIndex = listData.findIndex((item) => item.key === key);
  //       newData.splice(prevIndex, 1);
  //       setListData(newData);
  //       setAnimationIsRunning = false;
  //     });
  //   }
  // };

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
        alert('Document successfully deleted!');
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
          console.log(error);
        },
      );
  }, []);
  const renderItem = ({ item, index }) => {
    return (
      <Animated.View style={styles.listContainer}>
        <TouchableHighlight underlayColor={'#AAA'}>
          <Text style={styles.text}>
            {item.text} : {item.answer}
          </Text>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Text>Left</Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key, data.item.text)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.body}>
      <Headers />
      <View style={styles.container}>
        <Text style={styles.title}>Swipe left for more options</Text>

        {wordList && (
          <View>
            <SwipeListView
              data={wordList}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={75}
              rightOpenValue={-150}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowDidOpen={onRowDidOpen}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
    borderWidth: 0.1,
    borderColor: '#d6d7da',
    shadowColor: '#ff33b5e5',
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.01,
    elevation: 1,
  },
  listContainer: {
    alignSelf: 'center',
    width: '90%',
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: '#d6d7da',
    padding: 16,
    marginBottom: 10,
    shadowColor: '#ff33b5e5',
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.01,
    elevation: 1,
    backgroundColor: '#1ed4b0',
    justifyContent: 'center',
  },
  rowBack: {
    borderRadius: 4,
    width: '90%',
    alignSelf: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
  },
  entityText: {
    fontSize: 20,

    color: '#333333',
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    paddingTop: 10,
    marginBottom: 30,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  backTextWhite: {
    alignSelf: 'center',
    color: '#FFF',
  },

  backRightBtn: {
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    borderRadius: 4,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
    borderRadius: 4,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderRadius: 4,
  },
});
