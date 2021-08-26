import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../colors';

const SignUp = ({navigation}) => (
  <View style={styles.container}>
    <ImageBackground
      source={require('../../assets/img/place7.jpg')}
      resizeMode="cover"
      style={styles.image}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 20,
        }}>
        <View style={styles.header}>
          <Icon size={50} color={colors.yellow1} name="sun-o" />
        </View>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.h1}>Sign Up</Text>
        {/* name text field */}
        <View style={{position: 'relative'}}>
          <TextInput placeholder="Names" style={styles.textInput} />
          <View style={styles.iconContainer}>
            <Icon name="user" size={30} color="lightgray" />
          </View>
        </View>

        {/* email text field */}

        <View style={{position: 'relative', marginTop: 20}}>
          <TextInput
            placeholder="Email"
            textContentType="emailAddress"
            style={styles.textInput}
          />
          <View style={styles.iconContainer}>
            <Icon name="envelope" size={30} color="lightgray" />
          </View>
        </View>

        {/* address text field */}
        <View style={{position: 'relative', marginTop: 20}}>
          <TextInput
            placeholder="Address"
            secureTextEntry={true}
            style={styles.textInput}
          />
          <View style={styles.iconContainer}>
            <Icon name="address-book" size={30} color="lightgray" />
          </View>
        </View>

        {/* phone text field */}
        <View style={{position: 'relative', marginTop: 20}}>
          <TextInput
            placeholder="Phone Number"
            secureTextEntry={true}
            style={styles.textInput}
          />
          <View style={styles.iconContainer}>
            <Icon name="phone" size={30} color="lightgray" />
          </View>
        </View>

        {/* password text field */}
        <View style={{position: 'relative', marginTop: 20}}>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.textInput}
          />
          <View style={styles.iconContainer}>
            <Icon name="lock" size={30} color="lightgray" />
          </View>
        </View>

        {/* submit button */}
        <TouchableOpacity style={{marginVertical: 10}}>
          <View style={styles.button}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
              Signup Now
            </Text>
          </View>
        </TouchableOpacity>
        {/* submit button */}

        {/* google button */}
        <TouchableOpacity
          style={{marginVertical: 10}}
          onPress={() => {
            navigation.navigate('Main');
          }}>
          <View
            style={{
              ...styles.button,
              backgroundColor: colors.blue1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon
              color="white"
              name="google"
              size={20}
              style={{marginRight: 45}}
            />
            <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
              SignUp With Google
            </Text>
          </View>
        </TouchableOpacity>
        {/* Google button */}

        <View style={{marginVertical: 5}}>
          <Text style={{textAlign: 'center', fontSize: 18}}>
            Already have Account?
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('LoginModal');
              }}>
              <Text
                style={{
                  color: colors.yellow1,
                  textDecorationLine: 'underline',
                }}>
                Sign In
              </Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffffffcc',
    padding: 10,
    borderRadius: 100,
  },
  loginContainer: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#ffffffcc',
    paddingHorizontal: 20,
  },
  textInput: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: colors.color3,
    borderWidth: 2,
    height: 50,
    paddingLeft: 50,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.yellow1,
    padding: 15,
    borderRadius: 30,
  },
});

export default SignUp;
