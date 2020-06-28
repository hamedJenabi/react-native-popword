import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import { firebase } from '../../firebase/config';
// import Headers from '../../Components/Headers';

export default function ListScreen(props) {
  const [entityText, setEntityText] = useState('');
  const [entities, setEntities] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [color, setColor] = useState(16);

  const entityRef = firebase.firestore().collection('entities');
  const userID = props.extraData.id;

  const onSwipeUp = () => {
    alert('I go up');
    setColor('red');
  };
  const onSwipeDown = () => {
    alert('I go Down');
  };
  const onSwipeLeft = () => {
    alert('I go Left');
    setColor('blue');
  };
  const onSwipeRight = () => {
    alert('I go Right');
    setColor('green');
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
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
          setEntities(newEntities);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);
  const renderEntity = ({ item, index }) => {
    return (
      <View>
        <GestureRecognizer
          onSwipeUp={(state) => onSwipeUp(state)}
          onSwipeDown={(state) => onSwipeDown(state)}
          onSwipeLeft={(state) => onSwipeLeft(state)}
          onSwipeRight={(state) => onSwipeRight(state)}
        >
          <View style={{ backgroundColor: { color } }}>
            <Text>
              {index}. {item.text}
            </Text>
          </View>
        </GestureRecognizer>
      </View>
    );
  };

  return (
    <>
      {entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20,
    padding: 20,
  },
});

// import React, { useState } from 'react';
// import {
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     TouchableHighlight,
//     View,
// } from 'react-native';

// import { SwipeListView } from 'react-native-swipe-list-view';

// export default function Basic() {
//     const [listData, setListData] = useState(
//         Array(20)
//             .fill('')
//             .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
//     );

//     const closeRow = (rowMap, rowKey) => {
//         if (rowMap[rowKey]) {
//             rowMap[rowKey].closeRow();
//         }
//     };

//     const deleteRow = (rowMap, rowKey) => {
//         closeRow(rowMap, rowKey);
//         const newData = [...listData];
//         const prevIndex = listData.findIndex(item => item.key === rowKey);
//         newData.splice(prevIndex, 1);
//         setListData(newData);
//     };

//     const onRowDidOpen = rowKey => {
//         console.log('This row opened', rowKey);
//     };

//     const renderItem = data => (
//         <TouchableHighlight
//             onPress={() => console.log('You touched me')}
//             style={styles.rowFront}
//             underlayColor={'#AAA'}
//         >
//             <View>
//                 <Text>I am {data.item.text} in a SwipeListView</Text>
//             </View>
//         </TouchableHighlight>
//     );

//     const renderHiddenItem = (data, rowMap) => (
//         <View style={styles.rowBack}>
//             <Text>Left</Text>
//             <TouchableOpacity
//                 style={[styles.backRightBtn, styles.backRightBtnLeft]}
//                 onPress={() => closeRow(rowMap, data.item.key)}
//             >
//                 <Text style={styles.backTextWhite}>Close</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//                 style={[styles.backRightBtn, styles.backRightBtnRight]}
//                 onPress={() => deleteRow(rowMap, data.item.key)}
//             >
//                 <Text style={styles.backTextWhite}>Delete</Text>
//             </TouchableOpacity>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <SwipeListView
//                 data={listData}
//                 renderItem={renderItem}
//                 renderHiddenItem={renderHiddenItem}
//                 leftOpenValue={75}
//                 rightOpenValue={-150}
//                 previewRowKey={'0'}
//                 previewOpenValue={-40}
//                 previewOpenDelay={3000}
//                 onRowDidOpen={onRowDidOpen}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: 'white',
//         flex: 1,
//     },
//     backTextWhite: {
//         color: '#FFF',
//     },
//     rowFront: {
//         alignItems: 'center',
//         backgroundColor: '#CCC',
//         borderBottomColor: 'black',
//         borderBottomWidth: 1,
//         justifyContent: 'center',
//         height: 50,
//     },
//     rowBack: {
//         alignItems: 'center',
//         backgroundColor: '#DDD',
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingLeft: 15,
//     },
//     backRightBtn: {
//         alignItems: 'center',
//         bottom: 0,
//         justifyContent: 'center',
//         position: 'absolute',
//         top: 0,
//         width: 75,
//     },
//     backRightBtnLeft: {
//         backgroundColor: 'blue',
//         right: 75,
//     },
//     backRightBtnRight: {
//         backgroundColor: 'red',
//         right: 0,
//     },
// });
