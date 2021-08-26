import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from './components/Home/Home';
import Tours from './components/Tours/Tours';
import colors from './components/colors';
import LoginModal from './components/Modals/Login';
import SignUpModal from './components/Modals/SignUp';
import TourDetailsModal from './components/Tours/TourDetailsModal';
import Login from './components/Modals/Login';

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
      <MainStack.Screen
        name="Tours"
        options={{
          title: 'Latest Tours',
          headerStyle: {backgroundColor: colors.yellow1},
          headerTintColor: 'white',
        }}
        component={Tours}
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
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
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
  );
}
