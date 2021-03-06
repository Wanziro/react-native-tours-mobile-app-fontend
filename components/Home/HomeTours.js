import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {BackendUrl, UploadsUrl} from '../Config';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Carousel from 'pinar';
import colors from '../colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeTours = ({navigation}) => {
  const [items, setItems] = useState([]);

  const fetchData = sub => {
    console.log('called');
    Axios.get(BackendUrl + 'api/home/tours/')
      .then(res => {
        if (sub) {
          setItems(res.data);
        }
      })
      .catch(err => {
        console.log('something went wrong, ', err);
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
  }, []);
  return (
    <View style={{padding: 0}}>
      <Carousel
        autoplay={true}
        loop={true}
        height={windowHeight - 410}
        showsControls={false}
        showsDots={false}
        autoplayInterval={5000}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image
              source={{uri: UploadsUrl + item.images[0]}}
              style={styles.img}
              fadeDuration={1000}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                marginLeft: 80,
              }}>
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  padding: 10,
                  right: 0,
                  position: 'absolute',
                  top: -55,
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    paddingHorizontal: 10,
                    color: 'white',
                    fontWeight: '400',
                    fontSize: 18,
                    color: colors.yellow1,
                  }}>
                  From {item.currency} {item.price}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  padding: 10,
                }}>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    color: 'white',
                    fontWeight: '400',
                    fontSize: 18,
                  }}>
                  {item.title}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Carousel>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => {
            navigation.navigate('Tours');
          }}>
          <View
            style={{
              backgroundColor: colors.yellow1,
              padding: 15,
              width: '100%',
              borderRadius: 25,
              marginTop: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
              }}>
              Explore More Tours
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    // backgroundColor: colors.color4,
    flex: 1,
  },
  img: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 100,
  },
});

export default HomeTours;
