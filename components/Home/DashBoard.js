import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {BackendUrl} from '../Config';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import colors from '../colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DashBoard() {
  const [tours, setTours] = useState([]);
  const [toursBooking, setToursBooking] = useState([]);
  const [cars, setCars] = useState([]);
  const [carsBooking, setCarsBooking] = useState([]);
  const [users, setUsers] = useState([]);

  //loaders
  const [loadingTours, setLoadingTours] = useState(true);
  const [loadingToursBooking, setLoadingToursBooking] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCars, setLoadingCars] = useState(true);

  useEffect(() => {
    Axios.get(BackendUrl + 'api/tours/')
      .then(res => {
        setLoadingTours(false);
        setTours(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    Axios.post(BackendUrl + 'api/tours/allInfo/')
      .then(res => {
        setLoadingToursBooking(false);
        setToursBooking(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    Axios.post(BackendUrl + 'api/cars')
      .then(res => {
        setLoadingCars(false);
        setCars(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    Axios.post(BackendUrl + 'api/users/')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    Axios.post(BackendUrl + 'api/cars/booked/')
      .then(res => {
        setCarsBooking(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../assets/img/conv1.jpg')}
        resizeMode="cover"
        style={{width: '100%', height: windowHeight}}>
        <ScrollView style={{padding: 20}}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>
              Dashboard
            </Text>
            <Icon name="bell" size={30} color="white" />
          </View>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: 20,
              marginTop: 20,
              borderRadius: 10,
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text style={{color: 'white', fontSize: 18}}>Tours</Text>
              <View>
                {loadingTours ? (
                  <ActivityIndicator color="white" size="large" />
                ) : (
                  <Text style={{color: 'white', fontSize: 18}}>
                    {tours.length}
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text style={{color: 'white', fontSize: 18}}>Tours Booking</Text>
              {loadingToursBooking ? (
                <ActivityIndicator color="white" size="large" />
              ) : (
                <Text style={{color: 'white', fontSize: 18}}>
                  {toursBooking.length}
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: 20,
              marginTop: 20,
              borderRadius: 10,
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text style={{color: 'white', fontSize: 18}}>Cars For Rent</Text>
              {loadingCars ? (
                <ActivityIndicator color="white" size="large" />
              ) : (
                <Text style={{color: 'white', fontSize: 18}}>
                  {cars.length}
                </Text>
              )}
            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text style={{color: 'white', fontSize: 18}}>Cars Booking</Text>
              <Text style={{color: 'white', fontSize: 18}}>
                {carsBooking.length}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: 20,
              marginTop: 20,
              borderRadius: 10,
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: 'white', fontSize: 30}}>{users.length}</Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Registered Users
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default DashBoard;
