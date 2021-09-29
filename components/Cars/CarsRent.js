import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import colors from '../colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackendUrl, UploadsUrl} from '../Config';
import Axios from 'axios';

const HandleUserInfo = ({data}) => {
  if (data != null) {
    if (data.length == 0) {
      return (
        <>
          <View
            style={{
              padding: 20,
              margin: 10,
              backgroundColor: 'white',
              borderRadius: 15,
              marginTop: 40,
            }}>
            <Text style={{color: colors.color2, fontSize: 20}}>
              There is No car rented using this account.
            </Text>
          </View>
        </>
      );
    } else {
      return (
        <>
          <View>
            <View style={{padding: 20}}>
              <Text style={{color: colors.color2}}>
                Below are the car that you booked
              </Text>
              <Text style={{color: colors.color2}}>
                NB: when you go to pick your car, you must show the transaction
                id for your payment.
              </Text>
            </View>
            {data.map((info, index) => (
              <View
                key={index}
                style={{
                  padding: 20,
                  margin: 10,
                  backgroundColor: 'white',
                  borderRadius: 15,
                }}>
                <Image
                  source={{uri: UploadsUrl + info.image}}
                  style={{
                    width: '100%',
                    height: 200,
                    marginBottom: 5,
                  }}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginBottom: 10,
                    textTransform: 'capitalize',
                  }}>
                  {info.name}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Rented for:</Text>
                  <Text> {info.days} days</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Price Per day: </Text>
                  <Text>RWF {info.price}</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Amount Paid: </Text>
                  <Text>RWF {info.amountPaid}</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Transaction Id: </Text>
                  <Text>{info.transactionId}</Text>
                </View>

                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Date: </Text>
                  <Text>{info.date}</Text>
                </View>
                <View
                  style={{
                    borderTopColor: colors.color2,
                    borderTopWidth: 2,
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'green'}}>
                      Status:
                    </Text>
                    <Text>
                      <Icon name="check" size={20} color="green" />{' '}
                      {info.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </>
      );
    }
  } else {
    return (
      <>
        <View
          style={{
            padding: 20,
            margin: 10,
            backgroundColor: 'white',
            borderRadius: 15,
            marginTop: 40,
          }}>
          <Text style={{color: colors.color2, fontSize: 20}}>
            No booking information found for your account.
          </Text>
        </View>
      </>
    );
  }
};

const deleteRequest = id => {
  Axios.post(BackendUrl + 'api/booking/delete', {id: id})
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

function CarsRent({navigation}) {
  const [userEmail, setUserEmail] = useState(null);
  const [gotInfo, setGotInfo] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user_email').then(value => {
      if (value != null) setUserEmail(value);
    });

    Axios.post(BackendUrl + 'api/cars/mystatus/', {userEmail})
      .then(res => {
        setGotInfo(true);
        setBookingInfo(res.data);
        // console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          {gotInfo == true ? (
            <HandleUserInfo data={bookingInfo} />
          ) : (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 400,
                width: '100%',
              }}>
              <ActivityIndicator
                color={colors.yellow1}
                size="large"
                style={{marginBottom: 10}}
              />
              <Text>Getting booking info...</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default CarsRent;
