import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import colors from '../colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Axios from 'axios';
import {BackendUrl, UploadsUrl} from '../Config';

const Item = ({item, navigation}) => (
  <View style={styles.item}>
    <TouchableOpacity
      onPress={() => navigation.navigate('CarDetails', {car: item})}>
      <Image
        source={{uri: UploadsUrl + item.image}}
        style={{
          width: '100%',
          height: 120,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
    </TouchableOpacity>
    <View style={{padding: 10}}>
      <Text numberOfLines={1} style={{fontSize: 25}}>
        {item.name}
      </Text>
      <Text style={{color: colors.color2}}>
        {item.currency} {item.price} Per Day
      </Text>
    </View>
  </View>
);

const App = ({navigation}) => {
  const [cars, setCars] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = sub => {
    Axios.post(BackendUrl + 'api/cars/notBooked')
      .then(res => {
        if (sub) {
          setCars(res.data);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    let sub = true;
    fetchData(sub);

    const interval = setInterval(() => {
      fetchData(sub);
    }, 50000);

    return () => {
      sub = false;
      clearInterval(interval);
    };
  });
  const renderItem = ({item}) => <Item item={item} navigation={navigation} />;

  return (
    <View style={{marginBottom: 10, marginHorizontal: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 20, fontWeight: '800', marginTop: 10}}>
          Cars For Rent
        </Text>
        <Icon name="car" size={30} style={{marginTop: 10}} />
      </View>
      {isLoading == true ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            display: 'flex',
            height: 100,
          }}>
          <ActivityIndicator
            color={colors.yellow1}
            size="large"
            style={{marginBottom: 10}}
          />
          <Text>Loading car info, Please wait...</Text>
        </View>
      ) : cars.length == 0 ? (
        <View>
          <Text style={{color: colors.color2, fontSize: 18}}>
            No cars for renting cars available
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            horizontal
            data={cars}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 10,
    width: 250,
    borderRadius: 15,
    borderColor: colors.color3,
    borderWidth: 5,
  },
});

export default App;
