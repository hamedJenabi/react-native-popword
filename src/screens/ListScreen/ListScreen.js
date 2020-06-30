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

export default function ListScreen(props) {
  const [wordList, setWordList] = useState([]);
  const [animationIsRunning, setAnimationIsRunning] = useState(false);

  const entityRef = firebase.firestore().collection('wordlist');
  const userID = props.extraData.id;

  /************Swipe Functions*********/
  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value < -Dimensions.get('window').width && !setAnimationIsRunning) {
      setAnimationIsRunning = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
      }).start(() => {
        const newData = [...listData];
        const prevIndex = listData.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        setListData(newData);
        setAnimationIsRunning = false;
      });
    }
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  /************* DELETE also from firebase *******/
  const deleteRow = async (rowMap, rowKey, txt) => {
    // const res = await firebase
    //   .firestore()
    //   .collection('wordlist')
    //   .where('text', '==', txt)
    //   .delete();
    // alert('delete');
    closeRow(rowMap, rowKey);

    const newData = [...wordList];
    const prevIndex = wordList.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setWordList(newData);
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
  const renderEntity = ({ item, index }) => {
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
        onPress={() => deleteRow(rowMap, data.item.key, data.text)}
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
              removeClippedSubviews={true}
              data={wordList}
              renderItem={renderEntity}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={75}
              rightOpenValue={-150}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowDidOpen={onRowDidOpen}
              rightOpenValue={-Dimensions.get('window').width}
              onSwipeValueChange={onSwipeValueChange}
              useNativeDriver={false}
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
