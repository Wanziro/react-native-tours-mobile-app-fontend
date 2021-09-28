import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import colors from '../colors';
import TourDetailSlider from './TourDetailSlider';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import {BackendUrl} from '../Config';

const TourDetailsModal = ({route, navigation}) => {
  const {tour} = route.params;
  const [userEmail, setUserEmail] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingTour, setDeletingTour] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('user_email').then(value => {
      if (value != null) setUserEmail(value);
      setIsLoading(false);
    });
    AsyncStorage.getItem('user_type').then(value => {
      if (value != null) setUserType(value);
    });
  });

  const handleBooking = () => {
    navigation.navigate('BookingType', {tour});
  };

  const handleBooking2 = () => {
    navigation.navigate('LoginModal');
  };

  const handleDelete = () => {
    setDeletingTour(true);
    Axios.post(BackendUrl + 'api/tours/delete/', {id: tour._id})
      .then(res => {
        // console.log(res.data);
        navigation.navigate('Tours');
      })
      .catch(err => {
        console.log(err);
      });
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
            userType == 'admin' ? (
              <>
                <TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: colors.yellow1,
                      padding: 15,
                    }}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      Edit Tours Basic info
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: 10}}>
                  <View
                    style={{
                      backgroundColor: colors.yellow1,
                      padding: 15,
                    }}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      Edit Tours Images
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginTop: 10}}
                  onPress={() => {
                    handleDelete();
                  }}>
                  <View
                    style={{
                      backgroundColor: colors.yellow1,
                      padding: 15,
                    }}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      {deletingTour ? 'Deleting Tour' : 'Delete Tour'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            ) : (
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
            )
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
    </>
  );
};

export default TourDetailsModal;
