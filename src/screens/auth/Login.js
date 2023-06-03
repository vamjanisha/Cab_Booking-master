import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Animated,
  Image,
  Appearance,
Modal
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../../constants';
import NetInfo from "@react-native-community/netinfo";
import {useNavigation} from '@react-navigation/native';
import Network from '../../constants/Network';
const Login = () => {
  const navigation = useNavigation();
  const posx = new Animated.Value(300);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState('LIGHT');
  
  const btnForgotPassword = () => {
    navigation.navigate('ForgotPassword', {userId: 'X0001'});
  };

  const btnRegister = () => {
    navigation.navigate('Register');
  };

  useEffect(()=>{
    const colorThem = Appearance.getColorScheme()
    const listener = Appearance.addChangeListener(colorThemee=>{
    console.log(colorThemee);
    })
    console.log(colorThem,"--------ColorThem");
    if(colorThem == 'light'){
      setTheme("LIGHT")
    }else{
      setTheme("DARK")
    }
    return()=>{
      listener;
    }
},[])

  // const btnLogin = () => {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json'},

  //     body: JSON.stringify({email: email, password: password}),
  //   };
  //   fetch('http://192.168.202.19:3000:3000/login', requestOptions)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       if (data.status == 'success') {
  //         storeData(data.data[0]._id);

  //         navigation.navigate('Home');
  //       } else {
  //         console.log('helooooooooooo');
  //       }
  //     });
  // };

  const btnLogin = () => {
    navigation.navigate('Home');
  };


  const btnDrive = () => {
    navigation.navigate('DriveHome');

  }
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@login_data', value);
    } catch (e) {
      console.log(e);
      // saving error
    }
  };

  setTimeout(() => {}, 1000);

  useEffect(() => {
    // setTimeout(() => {
    //   Animated.timing(posx, {
    //     useNativeDriver: false,
    //     toValue: 120,
    //     duration: 2000,
    //   }).start();
    // }, 2000);
    Animated.timing(posx, {
      useNativeDriver: false,
      toValue: 120,
      duration: 2000,
    }).start();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     Animated.timing(posx, {
  //       useNativeDriver: false,
  //       toValue: 120,
  //       duration: 1000,
  //     }).start();
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <SafeAreaView style={[styles.main,{backgroundColor:theme === 'LIGHT' ?'#fff' : '#000'}]}>
      <View style={[styles.container]}>
        <View style={styles.wFull}>
          <Animated.View style={[styles.animatedBox, {left: posx}]}>
            <Image
              source={require('../../../src/assets/img/vehicle.png')}
              style={{height: 100, width: 100}}
            />
          </Animated.View>
          <TouchableOpacity onPress={()=>btnDrive()} style={styles.row}>
            {/* <Logo width={55} height={55} style={styles.mr7} /> */}
            <Text style={styles.brandName}>Book my</Text>
          </TouchableOpacity>

          <Text style={styles.loginContinueTxt}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            // keyboardType="email-address"
            onChangeText={data => setEmail(data)}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            keyboardType="phone-pad"
            onChangeText={data => setPassword(data)}
          />
             {/***************** FORGOT PASSWORD BUTTON *****************/}
             <TouchableOpacity
            onPress={() => btnForgotPassword()}
            style={{marginLeft:190,marginTop:-5}}>
            <Text style={styles.forgotPassText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.loginBtnWrapper}>
            <LinearGradient
              colors={[COLORS.gradientForm, COLORS.primary]}
              style={styles.linearGradient}
              start={{y: 0.0, x: 0.0}}
              end={{y: 1.0, x: 0.0}}>
              {/******************** LOGIN BUTTON *********************/}
              <TouchableOpacity
                onPress={() => btnLogin()}
                activeOpacity={0.7}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Log In</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          
          <View style={styles.footer}>
          <Text style={styles.footerText}> Don't have an account? </Text>
          {/******************** REGISTER BUTTON *********************/}
          <TouchableOpacity onPress={() => btnRegister()}>
            <Text style={styles.signupBtn}>Sign Up</Text>
          </TouchableOpacity>
        </View>


        <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
          <TouchableOpacity>
          <Image
              source={require('../../../src/assets/img/facebook.png')}
              style={{height: 40, width: 40,borderRadius:100,margin:5}} />
          </TouchableOpacity>
          <TouchableOpacity>
         <Image
              source={require('../../../src/assets/img/twitter.png')}
              style={{height: 40, width: 40,margin:5}}/>
          </TouchableOpacity>
        </View>
        </View>
      </View>
     
      <Network></Network>
      
      
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    // backgroundColor:COLORS.bgColor
  },
  container: {
    padding: 15,
    width: '100%',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:'8%',
   
  },
  brandName: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.primary,
    opacity: 0.9,
  },
  loginContinueTxt: {
    fontSize: 30,
    textAlign: 'center',
    color: COLORS.gray,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
  },
  // Login Btn Styles
  loginBtnWrapper: {
    height: 55,
    marginTop: 12,
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
    borderRadius: 50,
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
    fontSize: 16,
    fontWeight: '400',
  },
  forgotPassText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  // footer
  footer: {
    // position: 'absolute',
    // bottom: 10,
    // textAlign: 'center',
    flexDirection: 'row',
    marginLeft:60,
    marginTop:15
  },
  footerText: {
    color: COLORS.gray,
    fontWeight: 'bold',
    marginTop:-5
  },
  signupBtn: {
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop:-5
  },
  // utils
  wFull: {
    width: '100%',
    // marginBottom:60
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
});
