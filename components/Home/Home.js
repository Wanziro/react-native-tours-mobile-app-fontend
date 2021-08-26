import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';

import HomeTours from './HomeTours';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../colors';
import CarsForRent from './CarsForRent';

const Home = ({navigation}) => {
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
            navigation.navigate('LoginModal');
          }}>
          <View>
            <Icon name="user-o" size={30} color={colors.yellow1} />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={{position: 'relative', top: 0}}>
        <HomeTours navigation={navigation} />
        <CarsForRent />
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
