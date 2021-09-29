import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from './components/Home/Home';
import Tours from './components/Tours/Tours';
import colors from './components/colors';
import LoginModal from './components/Modals/Login';
import SignUpModal from './components/Modals/SignUp';
import TourDetailsModal from './components/Tours/TourDetailsModal';
import CreateTour from './components/Tours/CreateTour';
import CarDetails from './components/Cars/CarDetails';
import CarBookingDays from './components/Cars/CarBookingDays';
import Login from './components/Modals/Login';
import UserProfile from './components/UserProfile/UserProfile';
import ToursBookingInfo from './components/Tours/ToursBookingInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookingType from './components/Tours/BookingType';
import SubmitDocuments from './components/Tours/SubmitDocuments';
import ManageToursBooking from './components/Tours/ManageToursBooking';
import DashBoard from './components/Home/DashBoard';
import NewCar from './components/Cars/NewCar';
import PayCar from './components/Cars/PayCar';
import CarsRent from './components/Cars/CarsRent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        backgroundColor: colors.yellow1,
      }}>
      <Stack.Screen
        name="Home"
        options={{
          headerTransparent: true,
          title: '',
        }}
        component={Home}
      />
      <Stack.Screen
        name="Tours"
        options={{
          title: 'Latest Tours',
        }}
        component={Tours}
      />
    </Stack.Navigator>
  );
};
const NewCarNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegisterNewCar"
        options={{
          title: 'Register New Car',
          headerStyle: {backgroundColor: colors.adminHeader},
          headerTintColor: 'white',
        }}
        component={NewCar}
      />
    </Stack.Navigator>
  );
};
const CreateTourNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateNewTour"
        options={{
          title: 'Create New Tour',
          headerStyle: {backgroundColor: colors.adminHeader},
          headerTintColor: 'white',
        }}
        component={CreateTour}
      />
    </Stack.Navigator>
  );
};
const ToursNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tours"
        options={{
          title: 'Latest Tours',
          headerStyle: {backgroundColor: colors.yellow1},
          headerTintColor: 'white',
        }}
        component={Tours}
      />
    </Stack.Navigator>
  );
};
const ManageToursBookingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ManageToursBooking"
        options={{
          title: 'Manage Tours client Booking',
          headerStyle: {backgroundColor: colors.adminHeader},
          headerTintColor: 'white',
        }}
        component={ManageToursBooking}
      />
    </Stack.Navigator>
  );
};
const ToursBookingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ToursBookingInfo"
        options={{
          title: 'Tours Booking Status',
          headerStyle: {backgroundColor: colors.yellow1},
          headerTintColor: 'white',
        }}
        component={ToursBookingInfo}
      />
    </Stack.Navigator>
  );
};

const CarsRentNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CarsRent"
        options={{
          title: 'Cars Rent',
          headerStyle: {backgroundColor: colors.yellow1},
          headerTintColor: 'white',
        }}
        component={CarsRent}
      />
    </Stack.Navigator>
  );
};

//modal configuration
//main screeen
function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        options={{
          headerTransparent: true,
          title: '',
        }}
        component={Home}
      />
    </MainStack.Navigator>
  );
}

function RootStackScreen() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="LoginModal"
        component={LoginModal}
        options={{title: '', headerTransparent: true}}
      />
      <RootStack.Screen
        name="SignUpModal"
        component={SignUpModal}
        options={{title: '', headerTransparent: true}}
      />
      <RootStack.Screen
        name="TourDetailsModal"
        component={TourDetailsModal}
        options={{title: '', headerTransparent: true}}
      />
      <RootStack.Screen
        name="CarDetails"
        component={CarDetails}
        options={{title: 'Car Details'}}
      />
      <RootStack.Screen
        name="Tours"
        component={Tours}
        options={{
          title: 'Latest Tours',
          headerStyle: {backgroundColor: colors.yellow1},
          headerTintColor: 'white',
        }}
      />
      <RootStack.Screen
        name="CarBookingDays"
        component={CarBookingDays}
        options={{title: 'Car Renting Process 1/2'}}
      />
      <RootStack.Screen
        name="PayCar"
        component={PayCar}
        options={{title: 'Car Renting Process 2/2'}}
      />
      <RootStack.Screen
        name="BookingType"
        component={BookingType}
        options={{title: '', headerTransparent: true, headerTintColor: 'white'}}
      />
      <RootStack.Screen
        name="SubmitDocuments"
        component={SubmitDocuments}
        options={{title: '', headerTransparent: true, headerTintColor: 'white'}}
      />
    </RootStack.Navigator>
  );
}

export default function App() {
  const [userEmail, setUserEmail] = useState(null);
  const [userType, setUserType] = useState(null);
  const [gotUserInfo, setGotUserInfo] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('user_email').then(value => {
      setGotUserInfo(true);
      if (value != null) setUserEmail(value);
    });
    AsyncStorage.getItem('user_type').then(value => {
      if (value != null) setUserType(value);
    });
  });

  return (
    <>
      {userEmail != '' && userEmail != null ? (
        <NavigationContainer>
          <Drawer.Navigator
            drawerStyle={{
              backgroundColor: colors.color4,
            }}>
            <Drawer.Screen name="Home" component={RootStackScreen} />
            {userType == 'admin' ? (
              <>
                <Drawer.Screen
                  name="Dashboard"
                  options={{title: 'Admin Dashboard'}}
                  component={DashBoard}
                />
                <Drawer.Screen
                  name="CreateNewTour"
                  options={{
                    title: 'Register New Tour',
                  }}
                  component={CreateTourNavigator}
                />
                <Drawer.Screen
                  name="RegisterNewCar"
                  options={{
                    title: 'Register New Car',
                  }}
                  component={NewCarNavigator}
                />
                <Drawer.Screen
                  name="Tours"
                  options={{
                    title: 'List Of All Tours',
                  }}
                  component={ToursNavigator}
                />
              </>
            ) : (
              <Drawer.Screen
                name="Tours"
                options={{
                  title: 'Latest Tours',
                }}
                component={ToursNavigator}
              />
            )}

            {userType == 'admin' ? (
              <>
                <Drawer.Screen
                  name="ToursBookingInfo"
                  options={{
                    title: 'Manage Tours client Booking',
                  }}
                  component={ManageToursBookingNavigator}
                />
              </>
            ) : (
              <>
                <Drawer.Screen
                  name="ToursBookingInfo"
                  options={{
                    title: 'Tours Booking Status',
                  }}
                  component={ToursBookingNavigator}
                />
                <Drawer.Screen
                  name="CarsRent"
                  options={{
                    title: 'Cars Rent',
                  }}
                  component={CarsRentNavigator}
                />
              </>
            )}
            <Drawer.Screen
              name="Profile"
              options={{title: 'Profile'}}
              component={UserProfile}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Drawer.Navigator
            drawerStyle={{
              backgroundColor: colors.color4,
            }}>
            <Drawer.Screen name="Home" component={RootStackScreen} />
            <Drawer.Screen
              name="Tours"
              options={{
                title: 'Latest Tours',
              }}
              component={ToursNavigator}
            />
            <Drawer.Screen
              name="SignUpModal"
              options={{title: 'Create Account'}}
              component={SignUpModal}
            />
            <Drawer.Screen
              name="LoginModal"
              options={{title: 'Login'}}
              component={Login}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
