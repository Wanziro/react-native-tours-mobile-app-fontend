import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../colors';
import TourDetailSlider from './TourDetailSlider';
import Icon from 'react-native-vector-icons/Ionicons';

function BookingType({route, navigation}) {
  const {tour} = route.params;
  return (
    <>
      <SafeAreaView>
        <View
          style={{
            backgroundColor: colors.yellow1,
            height: 150,
            borderBottomEndRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 30}}>Booking Type</Text>
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 20}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            Choose Booking Method
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SubmitDocuments', {tour: tour});
            }}>
            <View
              style={{
                backgroundColor: colors.yellow1,
                padding: 15,
                marginTop: 30,
                borderRadius: 10,
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                Documents submision
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: colors.yellow1,
                padding: 15,
                marginTop: 30,
                borderRadius: 10,
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>Payment</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

export default BookingType;
