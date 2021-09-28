import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import colors from '../colors';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';
import {FormsUrl} from '../Config';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NewCar = ({navigation}) => {
  const [loadingError, setLoadingError] = useState(false);
  useEffect(() => {
    setLoadingError(false);
  }, []);
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
          height: 350,
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
    <SafeAreaView>
      <ScrollView style={{paddingTop: 30}}>
        {loadingError === false ? (
          <WebView
            source={{
              uri: `${FormsUrl}new_car.php`,
            }}
            style={{
              height: windowHeight - 100,
              width: '100%',
            }}
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
            <Text style={{color: 'red', fontSize: 25}}>
              Network error! Please check your internet connection and try again
              later.
            </Text>
            <TouchableOpacity
              style={{marginTop: 20}}
              onPress={() => {
                setLoadingError(false);
              }}>
              <Text>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewCar;
