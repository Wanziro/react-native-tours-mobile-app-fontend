import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';
import {WebView} from 'react-native-webview';
import {FormsUrl} from '../Config';

function SubmitDocuments({route, navigation}) {
  const {tour} = route.params;
  // console.log(tour._id);

  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('user_email').then(value => {
      if (value != null) setUserEmail(value);
    });
  });

  return (
    <>
      <View
        style={{
          backgroundColor: colors.yellow1,
          height: 150,
          borderBottomEndRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 30}}>Travel Documents</Text>
        <Text style={{color: 'white', fontSize: 30}}>Submission</Text>
      </View>
      {userEmail != null ? (
        <WebView
          source={{
            uri: `${FormsUrl}tour_documents.php?tour_id=${tour._id}&user_email=${userEmail}`,
          }}
          style={{marginTop: 20}}
        />
      ) : (
        <View style={{padding: 20}}>
          <Image
            source={require('../../assets/loading.gif')}
            style={{
              width: '100%',
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              color: colors.yellow1,
              marginTop: 10,
            }}>
            Looding user info...
          </Text>
        </View>
      )}
    </>
  );
}

export default SubmitDocuments;
