import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {BackendUrl} from '../Config';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import colors from '../colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DashBoard() {
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
              <Text style={{color: 'white', fontSize: 18}}>0</Text>
            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text style={{color: 'white', fontSize: 18}}>Tours Booking</Text>
              <Text style={{color: 'white', fontSize: 18}}>0</Text>
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
              <Text style={{color: 'white', fontSize: 18}}>0</Text>
            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text style={{color: 'white', fontSize: 18}}>Cars Booking</Text>
              <Text style={{color: 'white', fontSize: 18}}>0</Text>
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
              <Text style={{color: 'white', fontSize: 30}}>0</Text>
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
              <Text style={{color: 'white', fontSize: 30}}>0</Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Total Amount
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
              <Text style={{color: 'white', fontSize: 30}}>0</Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Invoices
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default DashBoard;
