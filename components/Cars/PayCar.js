import React, {useState, useEffect} from 'react';
import {Image, Text, View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';
import {WebView} from 'react-native-webview';
import {FormsUrl} from '../Config';

function PayCar({route, navigation}) {
  const {car, amount, days} = route.params;
  // console.log(car._id, days);

  const [userEmail, setUserEmail] = useState(null);
  const [userNames, setUserNames] = useState(null);
  const [loadingError, setLoadingError] = useState(false);

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
      {userEmail != null && loadingError === false ? (
        <WebView
          source={{
            uri: `${FormsUrl}book_car.php?car_id=${car._id}&user_email=${userEmail}&price=${car.price}&name=${car.name}&days=${days}&currency=${car.currency}&user_names=${userNames}&amount=${amount}&image=${car.image}`,
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

export default PayCar;
