import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeTours from './HomeTours';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../colors';
import CarsForRent from './CarsForRent';

const HandleUserIcons = () => {
  const [userNames, setUserNames] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [gotUserInfo, setGotUserInfo] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('user_email').then(value => {
      setGotUserInfo(true);
      if (value != null) {
        setUserEmail(value);
      } else {
        setUserEmail('');
      }
    });
    AsyncStorage.getItem('user_name').then(value => {
      if (value != null) {
        setUserNames(value);
      } else {
        setUserNames('');
      }
    });
  });
  if (gotUserInfo) {
    if (userNames != null && userEmail != '') {
      return (
        <View
          style={{
            height: 30,
            width: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.yellow1,
            borderRadius: 50,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            {userNames.charAt(0)}
          </Text>
        </View>
      );
    } else {
      return <Icon name="user-o" size={30} color={colors.yellow1} />;
    }
  } else {
    return <Icon name="user-o" size={30} color={colors.yellow1} />;
  }
};

const Home = ({navigation}) => {
  const [userNames, setUserNames] = useState('');
  const [userAddres, setUserAddress] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [gotUserInfo, setGotUserInfo] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('user_email').then(value => {
      setGotUserInfo(true);
      if (value != null) setUserEmail(value);

      AsyncStorage.getItem('user_name').then(value => {
        if (value != null) setUserNames(value);
      });
      AsyncStorage.getItem('user_phone').then(value => {
        if (value != null) setUserPhone(value);
      });
      AsyncStorage.getItem('user_address').then(value => {
        if (value != null) setUserAddress(value);
      });
    });
  });
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <View>
            <Icon2 name="menu" size={40} color={colors.yellow1} />
          </View>
        </TouchableOpacity>

        <View style={styles.headerTitlecontainer}>
          <Text
            style={{fontSize: 16, fontWeight: 'bold', color: colors.yellow1}}>
            Rwanda Nziza
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (userEmail != null && userEmail != '') {
              navigation.navigate('Profile');
            } else {
              navigation.navigate('LoginModal');
            }
          }}>
          <HandleUserIcons />
        </TouchableOpacity>
      </View>
      <ScrollView style={{position: 'relative', top: 0}}>
        <HomeTours navigation={navigation} />
        <CarsForRent navigation={navigation} />
        <Text
          style={{textAlign: 'center', color: colors.color2, marginBottom: 10}}>
          Explore Rwanda Tours &copy;2021
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.color1,
    flex: 1,
    padding: 0,
  },
  header: {
    backgroundColor: colors.color1,
    // backgroundColor: 'rgba(0,0,0,1)',
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerTitlecontainer: {
    padding: 10,
    borderRadius: 25,
  },
});
export default Home;
