import React from 'react';

import {View, Image, Dimensions} from 'react-native';
import Carousel from 'pinar';
import {BackendUrl, UploadsUrl} from '../Config';
import colors from '../colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TourDetailSlider = ({images}) => {
  return (
    <View style={{borderBottomWidth: 10, borderBottomColor: colors.yellow1}}>
      <Carousel
        height={300}
        autoplay={true}
        width={windowWidth}
        showsControls={false}
        autoplayInterval={1000}
        showsDots={true}>
        {images.map((image, index) => (
          <View key={index}>
            <Image
              source={{uri: UploadsUrl + image}}
              style={{width: '100%', height: '100%'}}
            />
          </View>
        ))}
      </Carousel>
    </View>
  );
};

export default TourDetailSlider;
