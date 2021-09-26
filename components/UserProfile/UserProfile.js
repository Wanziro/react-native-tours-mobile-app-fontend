import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../colors';
import {block} from 'react-native-reanimated';

const UserProfile = ({navigation}) => {
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
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    // navigation.navigate('Home');
    RNRestart.Restart();
  };

  //profile page
  const ProfilePage = () => {
    if (userEmail != '' || userEmail != null) {
      return (
        <SafeAreaView
          style={{backgroundColor: colors.color4, flex: 1, margin: 0}}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.userIconContainer}>
              <Icon size={100} name="user-circle" color="black" />
            </View>
            <Text
              style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
              {userNames}
            </Text>
          </View>
          <View style={{...styles.infoContainer, marginTop: 25}}>
            <Text style={{fontWeight: 'bold'}}>Email</Text>
            <Text
              style={{color: colors.color2, marginTop: 10, marginBottom: 10}}>
              {userEmail}
            </Text>
            <Text style={{fontWeight: 'bold'}}>Address</Text>
            <Text
              style={{color: colors.color2, marginTop: 10, marginBottom: 10}}>
              {userAddres}
            </Text>
            <Text style={{fontWeight: 'bold'}}>Phone Number</Text>
            <Text
              style={{color: colors.color2, marginTop: 10, marginBottom: 10}}>
              {userPhone}
            </Text>
          </View>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: colors.yellow1,
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20,
                padding: 15,
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                <Icon name="edit" size={20} color="white" /> Edit Info
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleLogout();
            }}>
            <View
              style={{
                ...styles.infoContainer,
                marginTop: 25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Icon name="sign-out" size={20} color={colors.yellow1} />
              <Text style={styles.logout}>Logout</Text>
            </View>
          </TouchableOpacity>

          <Text style={{textAlign: 'center', marginTop: 25}}>
            Explore Rwanda Tours &copy;2021
          </Text>
        </SafeAreaView>
      );
    } else {
      return <View>{navigation.navigate('LoginModal')}</View>;
    }
  };

  return <>{gotUserInfo ? <ProfilePage /> : null}</>;
};

export default UserProfile;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: colors.color1,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    position: 'relative',
    borderRadius: 10,
  },
  userIconContainer: {
    top: -30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logout: {
    color: colors.yellow1,
    fontWeight: 'bold',
  },
});
