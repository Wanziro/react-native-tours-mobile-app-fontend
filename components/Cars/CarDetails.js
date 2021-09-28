import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import colors from '../colors';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackendUrl, UploadsUrl} from '../Config';
import Axios from 'axios';

const CarDetail = ({route, navigation}) => {
  const {car} = route.params;
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(null);
  const [deletingCar, setDeletingCar] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('user_email').then(value => {
      if (value != null) setUserEmail(value);
      setIsLoading(false);
    });
    AsyncStorage.getItem('user_type').then(value => {
      if (value != null) setUserType(value);
    });
  });

  const handleDelete = () => {
    setDeletingCar(true);
    Axios.post(BackendUrl + 'api/cars/delete/', {id: car._id})
      .then(res => {
        alert('Car deleted successfull!');
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleBooking = () => {
    navigation.navigate('CarBookingDays', {car});
  };

  const handleBooking2 = () => {
    navigation.navigate('LoginModal');
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          source={{uri: UploadsUrl + car.image}}
          style={{
            width: '100%',
            height: 300,
          }}
        />
        <View
          style={{
            paddingHorizontal: 10,
            backgroundColor: colors.color1,
          }}>
          <View
            style={{
              marginTop: 20,
              marginBottom: 10,
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 20}}>{car.name}</Text>
          </View>
          <View
            style={{
              marginBottom: 10,
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 20, marginBottom: 10}}>Description</Text>
            <Text style={{color: colors.color2}}>{car.description}</Text>
          </View>
          <View
            style={{
              marginBottom: 10,
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <Text style={{color: 'black'}}>Price: </Text>
            <Text style={{color: colors.color6}}>
              {car.currency} {car.price} Per Day
            </Text>
          </View>

          {/* book now button */}

          {isLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                display: 'flex',
                height: 50,
              }}>
              <ActivityIndicator
                color={colors.yellow1}
                size="large"
                style={{marginBottom: 10}}
              />
              <Text>Getting user info...</Text>
            </View>
          ) : userEmail != null ? (
            <View
              style={{
                borderRadius: 10,
                marginBottom: 20,
                marginTop: 10,
              }}>
              {userType == 'admin' ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      handleDelete();
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.yellow1,
                        padding: 15,
                      }}>
                      <Text style={{color: 'white', textAlign: 'center'}}>
                        {deletingCar ? 'Deleting Car' : 'Delete Car'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      handleBooking();
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.yellow1,
                        padding: 15,
                      }}>
                      <Text style={{color: 'white', textAlign: 'center'}}>
                        Book Now
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </View>
          ) : (
            <View
              style={{
                borderRadius: 10,
                marginBottom: 20,
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  handleBooking2();
                }}>
                <View
                  style={{
                    backgroundColor: colors.yellow1,
                    padding: 15,
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    Book Now
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CarDetail;
