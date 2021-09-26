import React, {useState, useEffect} from 'react';
import {Image, Text, View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';
import {WebView} from 'react-native-webview';
import {FormsUrl} from '../Config';

function SubmitDocuments({route, navigation}) {
  const {tour} = route.params;
  // console.log(tour._id);

  const [userEmail, setUserEmail] = useState(null);
  const [loadingError, setLoadingError] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('user_email').then(value => {
      if (value != null) setUserEmail(value);
    });
  });

  const ActivityIndicatorElement = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          width: '100%',
          display: 'flex',
          height: '100%',
        }}>
        <ActivityIndicator
          color={colors.yellow1}
          size="large"
          style={{marginBottom: 10}}
        />
        <Text>Establishing Secure connection...</Text>
      </View>
    );
  };

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
      {userEmail != null && loadingError === false ? (
        <WebView
          source={{
            uri: `${FormsUrl}tour_documents.php?tour_id=${tour._id}&user_email=${userEmail}&title=${tour.title}`,
          }}
          style={{marginTop: 20}}
          renderLoading={ActivityIndicatorElement}
          startInLoadingState={true}
          onError={syntheticEvent => {
            setLoadingError(true);
            const {nativeEvent} = syntheticEvent;
            console.log('WebView error: ', nativeEvent);
          }}
        />
      ) : (
        <View style={{padding: 20}}>
          {loadingError ? (
            <Text style={{color: 'red', fontSize: 25}}>
              Network error! Please check your internet connection and try again
              later.
            </Text>
          ) : (
            <>
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
            </>
          )}
        </View>
      )}
    </>
  );
}

export default SubmitDocuments;
