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
import Icon from 'react-native-vector-icons/Ionicons';
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
              No booking information found for your account.
            </Text>
          </View>
        </>
      );
    } else {
      return (
        <>
          <View>
            {data.map((info, index) => (
              <View
                key={index}
                style={{
                  padding: 20,
                  margin: 10,
                  backgroundColor: 'white',
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginBottom: 10,
                    textTransform: 'capitalize',
                  }}>
                  {info.title}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Booking Type:</Text>
                  <Text>{info.bookingType}</Text>
                </View>
                {info.bookingType == 'Travel Documents' ? (
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}>
                    <Text style={{fontWeight: 'bold'}}>
                      Document Submitted:{' '}
                    </Text>
                    <Text>{info.bookingDocumentType}</Text>
                  </View>
                ) : (
                  <></>
                )}
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
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
                    <Text>{info.status}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.color2,
                    padding: 15,
                    marginTop: 10,
                    borderRadius: 6,
                  }}
                  onPress={() => {
                    deleteRequest(info._id);
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    Delete Request
                  </Text>
                </TouchableOpacity>
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

function ToursBookingInfo({navigation}) {
  const [userEmail, setUserEmail] = useState(null);
  const [gotInfo, setGotInfo] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user_email').then(value => {
      if (value != null) setUserEmail(value);
    });

    Axios.post(BackendUrl + 'api/tours/info', {userEmail})
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

export default ToursBookingInfo;
