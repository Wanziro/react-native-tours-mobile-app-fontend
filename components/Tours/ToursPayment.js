import React, {useState, useEffect} from 'react';
import {Image, Text, View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors, {yellow1} from '../colors';
import {WebView} from 'react-native-webview';
import {FormsUrl} from '../Config';

function ToursPayment({route, navigation}) {
  const {tour} = route.params;
  // console.log(tour._id);

  const [userEmail, setUserEmail] = useState(null);
  const [loadingError, setLoadingError] = useState(false);
  const [userNames, setUserNames] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user_email').then(value => {
      if (value != null) setUserEmail(value);
    });
    AsyncStorage.getItem('user_name').then(value => {
      if (value != null) setUserNames(value);
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
          height: 70,
          borderBottomEndRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 30}}>Payment of 50%</Text>
      </View>
      <View
        style={{
          marginHorizontal: 10,
          padding: 10,
          backgroundColor: 'white',
          marginTop: 10,
          borderRadius: 15,
        }}>
        <Text style={{marginBottom: 10, fontWeight: 'bold'}}>{tour.title}</Text>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Price</Text>
          <Text style={{color: 'black'}}>
            From {tour.currency} {tour.price}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Booking Pre Pay Amount (50%)
          </Text>
          <Text style={{color: 'black'}}>
            {tour.currency} {(tour.price * 50) / 100}
          </Text>
        </View>
      </View>
      {userEmail != null && loadingError === false ? (
        <WebView
          source={{
            uri: `${FormsUrl}pay_tour.php?price=${tour.price}&amount=${
              (tour.price * 50) / 100
            }&currency=${tour.currency}&tour_id=${
              tour._id
            }&user_email=${userEmail}&title=${
              tour.title
            }&user_names=${userNames}`,
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

export default ToursPayment;
