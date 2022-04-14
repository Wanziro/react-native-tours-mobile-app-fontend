import React from 'react';
import {UploadsUrl} from '../Config';
import {View, Image, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import colors from '../colors';

const Tour = ({details, navigation}) => {
  let date = details.date.split('-');
  let momentInput = date[0] + date[1] + date[2];
  return (
    <View style={{backgroundColor: 'white', borderRadius: 10, marginTop: 20}}>
      <Pressable
        onPress={() => {
          navigation.navigate('TourDetailsModal', {tour: details});
        }}>
        <Image
          source={{uri: UploadsUrl + details.images[0]}}
          style={{
            width: '100%',
            height: 200,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </Pressable>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 18}}>{details.title}</Text>
        <View style={{flexDirection: 'row', marginLeft: -2}}>
          <Icon name="location" size={20} color={colors.color5} />
          <Text style={{color: colors.color6}}>{details.location}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="time" size={20} color={colors.color5} />
            <Text style={{color: colors.color6}}>
              Posted {moment(momentInput).startOf('day').fromNow()}
            </Text>
          </View>
          <Text style={{color: colors.yellow1}}>
            From {details.currency} {details.price}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Tour;
