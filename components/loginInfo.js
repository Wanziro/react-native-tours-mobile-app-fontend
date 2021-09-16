import AsyncStorage from '@react-native-community/async-storage';

const email = AsyncStorage.getItem('user_email').then(value => {
  console.log(value);
  return value;
});
const name = AsyncStorage.getItem('user_name').then(value => {
  return value;
});

const getName = () => {
  let name = '';
  AsyncStorage.getItem('user_name').then(value => {
    return value;
  });
};
const getEmail = async () => {
  let name = '';
  AsyncStorage.getItem('user_email').then(value => {
    name = value;
  });
  return name;
};
module.exports = {
  User: {
    getName,
    getEmail,
  },
};
