import React, {useState, useEffect} from 'react';
import {View, ScrollView, StatusBar} from 'react-native';
import Axios from 'axios';
import {BackendUrl} from '../Config';
import Tour from './Tour';
import colors from '../colors';

function Tours({navigation}) {
  const [tours, setTours] = useState([]);

  //getting tours from the backend
  useEffect(() => {
    Axios.get(BackendUrl + 'api/tours/')
      .then(res => {
        if (res.data != '' && typeof res.data == 'object') {
          setTours(res.data);
        }
      })
      .catch(err => {
        console.log('something went wrong, ' + err);
      });
  }, []);
  return (
    <>
      <StatusBar backgroundColor={colors.yellow1} barStyle="light-content" />
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 20,
            flex: 1,
            backgroundColor: colors.color1,
          }}>
          {tours.map((tour, index) => (
            <Tour key={index} navigation={navigation} details={tour} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

export default Tours;
