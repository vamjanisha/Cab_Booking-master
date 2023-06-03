import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from '../constants';
import Login from '../screens/auth/Login';
import ForgotPassword from '../screens/auth/ForgotPassword';
import Register from '../screens/auth/Register';
import Lodding from '../screens/auth/Lodding';
import HomeNavigator from './HomeNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DriveHome from '../screens/drive/DriveHome';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log('helooooooo', getid);
  }, []);

  const [getid, setGetid] = useState('');
  const [islogin, setlogin] = useState(false);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@login_data');
      if (value !== null) {
        setGetid(value);
        setlogin();
        console.log('>>>>>>>>>>>', value);
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     {
  //       getid =='' ? console.log('login') : console.log('home');
  //     }
  //   }, 2000);
  // });
  //  if (islogin == false) {
  //   return <Lodding/>;
  // } else {
    return (
      <Stack.Navigator >
        {/* ( getid ? (console.log('hello')) : (console.log('jj')) ) */}

        <Stack.Screen
          name="Lodding"
          component={Lodding}
          options={{headerShown: false}}
        />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={({route}) => ({
            headerTintColor: COLORS.white,
            // headerBackTitle: 'Back',
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            title: route.params.userId,
          })}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="DriveHome" component={DriveHome} />
        <Stack.Screen
          name="Home"
          component={HomeNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  
};

export default AuthNavigator;

const styles = StyleSheet.create({});
