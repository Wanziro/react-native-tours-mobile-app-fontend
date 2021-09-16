import Axios from 'axios';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
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
import {BackendUrl} from '../Config';

const Login = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginBtnText, setLoginBtnText] = useState('Login Now');

  const handleSubmit = () => {
    setLoginBtnText('Logging in...');
    if (!password || !email) {
      alert('Please enter both username and password.');
      setLoginBtnText('Login Now');
    } else {
      Axios.post(BackendUrl + 'api/login', {password, email})
        .then(res => {
          console.log(res.data);
          if (res.data.success) {
            AsyncStorage.setItem('user_email', res.data.user[0].email);
            AsyncStorage.setItem('user_name', res.data.user[0].name);
            // AsyncStorage.setItem('user_address', res.data.user[0].address);
            // AsyncStorage.setItem('user_phone', res.data.user[0].phone);
            navigation.navigate('Home');
          } else {
            setLoginError(true);
            setErrorMessage(res.data.msg);
            alert(res.data.msg);
          }
          setLoginBtnText('Login Now');
        })
        .catch(err => {
          console.log('something went wrong, ', err);
          setLoginBtnText('Login Now');
        });
    }
  };

  const ShowError = () => {
    if (loginError) {
      return (
        <Text style={{textAlign: 'center', color: colors.red1, marginTop: 5}}>
          {errorMessage}
        </Text>
      );
    } else {
      return <></>;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/img/conv1.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 30,
          }}>
          <View style={styles.header}>
            <Icon size={100} color={colors.yellow1} name="sun-o" />
          </View>
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.h1}>Login</Text>
          {/* email text field */}
          <View style={{position: 'relative'}}>
            <TextInput
              placeholder="Email"
              textContentType="emailAddress"
              style={styles.textInput}
              onChangeText={e => setEmail(e)}
            />
            <View style={styles.iconContainer}>
              <Icon name="envelope" size={30} color="lightgray" />
            </View>
          </View>

          {/* password text field */}
          <View style={{position: 'relative', marginTop: 20}}>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={e => {
                setPassword(e);
              }}
            />
            <View style={styles.iconContainer}>
              <Icon name="lock" size={30} color="lightgray" />
            </View>
          </View>

          <ShowError />

          {/* submit button */}
          <TouchableOpacity style={{marginVertical: 20}}>
            <View style={styles.button}>
              <Text
                onPress={handleSubmit}
                style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                {loginBtnText}
              </Text>
            </View>
          </TouchableOpacity>
          {/* submit button */}

          {/* google button */}
          <TouchableOpacity style={{marginVertical: 20}}>
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
                Login With Google
              </Text>
            </View>
          </TouchableOpacity>
          {/* Google button */}

          <View style={{marginVertical: 20}}>
            <Text style={{textAlign: 'center', marginBottom: 20, fontSize: 18}}>
              Don't have Account?
            </Text>
            <TouchableWithoutFeedback
              style={{padding: 20}}
              onPress={() => {
                navigation.navigate('SignUpModal');
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: colors.yellow1,
                  fontWeight: '900',
                  textDecorationStyle: 'dotted',
                  textDecorationLine: 'underline',
                }}>
                Sign Up
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffffffcc',
    padding: 20,
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

export default Login;
