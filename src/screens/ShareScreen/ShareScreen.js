import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  Share,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import styles from '../../../theme';

import { firebase } from '../../firebase/config';
import CustomHeader from '../../Components/CustomHeader';
import * as Sharing from 'expo-sharing';

/*************** List Screen **********/
export default function ShareScreen(props) {
  const [wordList, setWordList] = useState([]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Never forget a word you looked for',
        message:
          'https://play.google.com/store/apps/details?id=com.nativeApper.popword&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.body}>
      <CustomHeader title="History" userData={props.extraData} />
      <View style={styles.container}>
        <View style={styles.body}>
          <View>
            <Text style={styles.title}>
              You liked the idea? Share it with your friends
            </Text>
          </View>
          <TouchableOpacity onPress={onShare}>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Spread the love</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
