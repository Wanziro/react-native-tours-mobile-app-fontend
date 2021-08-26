import React from 'react';
import {Image, View, FlatList, StyleSheet, Text, StatusBar} from 'react-native';
import colors from '../colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const cars = [
  {
    id: 1,
    name: 'BMW 03',
    img: require('../../assets/img/car1.jpg'),
    price: 5000,
    currency: 'RWF',
    time: 'Day',
  },
  {
    id: 2,
    name: 'Fast and Furious',
    img: require('../../assets/img/car2.jpg'),
    price: 8000,
    currency: '$',
    time: 'Hour',
  },
  {
    id: 3,
    name: 'Corolla 970',
    img: require('../../assets/img/car2.jpg'),
    price: 50,
    currency: '$',
    time: 'Day',
  },
  {
    id: 4,
    name: 'Corolla 65',
    img: require('../../assets/img/car2.jpg'),
    price: 100000,
    currency: 'RWF',
    time: 'Hour',
  },
  {
    id: 5,
    name: 'Kiboko',
    img: require('../../assets/img/car1.jpg'),
    price: 70000,
    currency: 'RWF',
    time: 'Hour',
  },
];

const Item = ({item}) => (
  <View style={styles.item}>
    <Image
      source={item.img}
      style={{
        width: '100%',
        height: 120,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}
    />
    <View style={{padding: 10}}>
      <Text style={{fontSize: 25}}>{item.name}</Text>
      <Text style={{color: colors.color2}}>
        RWF {item.price} Per {item.time}
      </Text>
    </View>
  </View>
);

const App = () => {
  const renderItem = ({item}) => <Item item={item} />;

  return (
    <View style={{marginBottom: 20, marginHorizontal: 10}}>
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
      <FlatList
        horizontal
        data={cars}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
