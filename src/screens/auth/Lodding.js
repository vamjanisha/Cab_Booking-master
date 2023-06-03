import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';


import AsyncStorage from '@react-native-async-storage/async-storage';

const Lodding = () => {
  const navigation = useNavigation();
    const [islogin,setlogin] = useState(false)

    useEffect(() => {
        setTimeout(() => {
          navigation.navigate('Login')
        }, 2000);
      }, []);

  useEffect(() => {
    getData();
    console.log('daaaaa', getid);
  }, [getid]);

  const [getid, setGetid] = useState('');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@login_data');
      if (value !== null) {
        setGetid(value);
        console.log('>>>>>>>>>>>', value);
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={[COLORS.gradientForm, COLORS.primary]}
        style={styles.linearGradient}
        start={{y: 0.0, x: 0.0}}
        end={{y: 1.0, x: 0.0}}>
        {/******************** LOGIN BUTTON *********************/}
        <View activeOpacity={0.7} style={styles.loginBtn}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </LinearGradient>
    </View>
  );
};

export default Lodding;

const styles = StyleSheet.create({
  loginBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
