import React from 'react';
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

const TourDetailsModal = ({route, navigation}) => {
  const {tour} = route.params;
  const handleBooking = () => {
    navigation.navigate('BookingType', {tour});
  };
  return (
    <>
      <TourDetailSlider images={tour.images} />
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
            <Text style={{fontSize: 20}}>{tour.title}</Text>
          </View>
          <View
            style={{
              marginBottom: 10,
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 20, marginBottom: 10}}>Overview</Text>
            <Text style={{color: colors.color2}}>{tour.overview}</Text>
          </View>
          <View
            style={{
              marginBottom: 10,
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 20, marginBottom: 10}}>Included</Text>
            {tour.included.map((item, index) => (
              <View key={index} style={{flexDirection: 'row'}}>
                <Icon
                  name="checkmark-circle-sharp"
                  size={20}
                  color="green"
                  style={{marginRight: 10}}
                />
                <Text style={{color: colors.color2}}>{item}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              marginBottom: 10,
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 20, marginBottom: 10}}>Excluded</Text>
            {tour.excluded.map((item, index) => (
              <View key={index} style={{flexDirection: 'row'}}>
                <Icon
                  name="close"
                  size={20}
                  color="red"
                  style={{marginRight: 10}}
                />
                <Text style={{color: colors.color2}}>{item}</Text>
              </View>
            ))}
          </View>

          <View
            style={{
              marginBottom: 10,
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <View style={{flexDirection: 'row', marginLeft: -3}}>
              <Icon name="location" size={20} color={colors.color5} />
              <Text style={{color: colors.color6}}>{tour.location}</Text>
            </View>
            <Text style={{color: colors.color6}}>
              Price: From {tour.currency}
              {tour.price}
            </Text>
          </View>

          {/* book now button */}
          <View
            style={{
              borderRadius: 10,
              marginBottom: 20,
              marginTop: 10,
            }}>
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
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TourDetailsModal;
