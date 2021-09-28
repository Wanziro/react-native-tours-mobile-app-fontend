import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors, {color2} from '../colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const CarBookingDays = ({route, navigation}) => {
  const {car} = route.params;
  const [days, setDays] = useState(1);

  const handleBooking = () => {
    navigation.navigate('CarBooking', {car});
  };
  const minusDays = () => {
    let x = days - 1;
    x <= 1 ? setDays(1) : setDays(x);
  };
  const plusDays = () => {
    let x = days + 1;
    setDays(x);
  };

  return (
    <SafeAreaView>
      <ScrollView>
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
            <Text style={{fontSize: 20}}>
              How many days you want to rend {car.name}?
            </Text>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                activeOpacity={0.1}
                style={{padding: 20}}
                onPress={minusDays}>
                <Icon name="minus" size={30} color={colors.yellow1} />
              </TouchableOpacity>
              <Text style={{fontSize: 30, color: colors.color2}}>
                {days} day(s)
              </Text>
              <TouchableOpacity
                activeOpacity={0.1}
                style={{padding: 20}}
                onPress={plusDays}>
                <Icon name="plus" size={30} color={colors.yellow1} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              marginBottom: 10,
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text>Price Per Day</Text>
              <Text>
                {car.currency} {car.price}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text>Total Amount To Pay</Text>
              <Text>
                {car.currency} {days * car.price}
              </Text>
            </View>
          </View>
          {/* book now button */}

          <View
            style={{
              borderRadius: 10,
              marginBottom: 20,
              marginTop: 10,
            }}>
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: colors.yellow1,
                  padding: 15,
                }}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  Pay Now
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CarBookingDays;
