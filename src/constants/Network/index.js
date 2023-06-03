import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Appearance,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '..';

const Network = () => {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('LIGHT');
  useEffect(() => {
    const colorThem = Appearance.getColorScheme();
    const listener = Appearance.addChangeListener(colorThemee => {
      console.log(colorThemee);
    });
    console.log(colorThem, '--------ColorThem');
    if (colorThem == 'light') {
      setTheme('LIGHT');
    } else {
      setTheme('DARK');
    }
    return () => {
      listener;
    };
  }, []);
  useEffect(() => {
    unsubscribe();
  }, []);

  const unsubscribe = () => {
    NetInfo.fetch().then(state => {
      setTimeout(function () {
        if (state.isConnected) {
          setLoading(false);
          // any thing you want to load before navigate home screen
        } else {
          setLoading(true);
        }
      }, 500);
    });
  };
  return (
    
    <Modal
      animationType="none"
      transparent={true}
      visible={loading}
      // onPress={()=>setEditNumber(true)}
      style={{justifyContent: 'center', alignItems: 'center', }}>        
        {loading ? (
          <View style={{
            backgroundColor: theme === 'LIGHT' ?'rgb(238, 238, 202)' : 'rgb(77, 77, 77)',
            marginTop: 190,
            width: '80%',
            height: '50%',
            marginLeft: 36,
            padding: 10,
            borderRadius: 10,}}>
              {/* <TouchableOpacity style={{justifyContent:'center',alignItems:'flex-end'}}
               onPress={()=> setLoading(false)}>
               <Image  source={require('../../../src/assets/img/close.png')}
                style={{height: 30, width: 30, borderRadius: 100}}
          ></Image>
              </TouchableOpacity> */}
            <View style={{alignItems: 'center', justifyContent: 'center',marginTop:35}}>
              <Image
                source={require('../../../src/assets/img/wifi.png')}
                style={{height: 70, width: 70, borderRadius: 100}}
              />

              <Text
                style={{
                  textAlign: 'center',
                  color:theme === 'LIGHT' ?'rgb(77, 77, 77)' :
                  ' rgb(238, 238, 202)',
                  fontWeight: '800',
                  fontSize: 30,
                  
                }}>
                {'Data incorrect'}
              </Text>

            
                <Text style={{textAlign: 'center', color: theme === 'LIGHT' ?'rgb(77, 77, 77)' :
                 ' rgb(238, 238, 202)',marginTop:10,width: 230,fontSize:20}}>
                  {'Please check your internet connection and try again'}
                </Text>

              <View style={styles.loginBtnWrapper}>
                <LinearGradient
                  colors={[COLORS.gradientForm, COLORS.gradientForm]}
                  style={styles.linearGradient}
                  start={{y: 0.0, x: 0.0}}
                  end={{y: 1.0, x: 0.0}}>
                  {/******************** LOGIN BUTTON *********************/}
                  <TouchableOpacity
                   onPress={() => setLoading(false)}
                    activeOpacity={0.7}
                    style={styles.loginBtn}>
                    <Text style={styles.loginText}>I understand</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        ) : null}
    </Modal>
  );
};

export default Network;

const styles = StyleSheet.create({
  loginBtnWrapper: {
    height: 55,
    width: '80%',
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  linearGradient: {
    width: '100%',
    borderRadius: 10,
  },
  loginBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '600',
  },
});
