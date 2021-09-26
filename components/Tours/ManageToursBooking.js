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
              marginTop: 20,
            }}>
            <Text style={{color: colors.color2, fontSize: 20}}>
              No booking info found from the clients
            </Text>
          </View>
        </>
      );
    } else {
      return (
        <>
          <View style={{padding: 10}}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>
              {data.length} Booking request(s)
            </Text>
          </View>
          <View>
            {data.map((info, index) => (
              <View
                key={index}
                style={{
                  paddingVertical: 20,
                  marginVertical: 10,
                  backgroundColor: 'white',
                  marginBottom: 30,
                }}>
                <View style={{paddingHorizontal: 30, paddingBottom: 20}}>
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
                    <Text style={{fontWeight: 'bold'}}>Client Email: </Text>
                    <Text>{info.userEmail}</Text>
                  </View>
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
                        Document Submitted:
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
                </View>
                <Text style={{paddingBottom: 10, paddingHorizontal: 30}}>
                  Travel Document Uploaded
                </Text>
                <Image
                  source={{uri: UploadsUrl + info.bookingDocument}}
                  style={{
                    width: '100%',
                    height: 300,
                    marginBottom: 10,
                  }}
                />
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 30,
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'brown',
                      padding: 15,
                      marginTop: 10,
                      borderRadius: 6,
                    }}
                    onPress={() => {
                      deleteRequest(info._id);
                    }}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      Delete
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.yellow1,
                      padding: 15,
                      marginTop: 10,
                      borderRadius: 6,
                    }}
                    onPress={() => {
                      rejectRequest(info._id);
                    }}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      {info.status == 'Rejected' ? 'Rejected' : 'Reject'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'green',
                      padding: 15,
                      marginTop: 10,
                      borderRadius: 6,
                    }}
                    onPress={() => {
                      aproveRequest(info._id);
                    }}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      {info.status == 'Approved' ? 'Approved' : 'Approve'}
                    </Text>
                  </TouchableOpacity>
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
          }}>
          <Text style={{color: colors.color2}}>
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

const aproveRequest = id => {
  Axios.post(BackendUrl + 'api/booking/aprove', {id: id})
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const rejectRequest = id => {
  Axios.post(BackendUrl + 'api/booking/reject', {id: id})
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

function ManageToursBooking({navigation}) {
  const [userEmail, setUserEmail] = useState(null);
  const [gotInfo, setGotInfo] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user_email').then(value => {
      if (value != null) setUserEmail(value);
    });

    Axios.post(BackendUrl + 'api/tours/allInfo', {userEmail})
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
                width: '100%',
                height: 400,
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

export default ManageToursBooking;
