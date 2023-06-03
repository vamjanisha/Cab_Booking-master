import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  Image,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();

  const posx = new Animated.Value(200);

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [userdata, setUserData] = useState('');

//   const btnRegister = () => {
//     console.log('fname', fname);
//     console.log('lname', lname);
//     console.log('email', email);
//     console.log('password', password);

//     if (fname == '') {
//       console.log('enter your Fname');
//     } else if (lname == '') {
//       console.log('enter your Lname');
//     } else if (email == '') {
//       console.log('enter your email');
//     } else if (password == '') {
//       console.log('enter password ');
//     } else {
//       const requestOptions = {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},

//         body: JSON.stringify({
//           First_name: fname,
//           Last_name: lname,
//           email: email,
//           password: password,
//         }),
//       };
//       fetch('http://192.168.202.19:3000/register', requestOptions)
//         .then(response => response.json())
//         .then(data => setUserData(data));
//         console.log("userdaata",userdata)

//       if (userdata.status == 'success') {
//         console.log('DONE');
//         // navigation.navigate('Login');

// // setTimeout(() => {
// //   navigation.navigate('ForgotPassword');
  
// // }, 2000);

//         // setTimeout(() => {
//         //   Animated.timing(posx, {
//         //     useNativeDriver: false,
//         //     toValue: -220,
//         //     duration: 1000,
//         //   }).start();
//         //   navigation.navigate('Login');
//         // }, 2000);
//       } else {
//         console.log('NOT DONE');
//         // Alert.alert('somthing is worng')
//       }
//     }
//   };

  // const btnRegister = () => {
  //   Animated.timing(posx, {
  //     useNativeDriver: false,
  //     toValue: -220,
  //     duration: 1000,
  //   }).start();

  //   setTimeout(() => {
  //     navigation.navigate('Login');
  //   }, 1000);
  // };

  return (
    <SafeAreaView style={styles.main}>
      {/* <ScrollView> */}
      <View style={styles.container}>
        <View style={styles.wFull}>
          <Animated.View style={[styles.animatedBox, {left: posx}]}>
            <Image
              source={require('../../../src/assets/img/vehicle.png')}
              style={{height: 100, width: 100}}
            />
          </Animated.View>
          <View style={styles.row}>
            {/* <Logo width={55} height={55} style={styles.mr7} /> */}
            <Text style={styles.brandName}>Olors</Text>
          </View>

          <Text style={styles.loginContinueTxt}>Register in to Login</Text>

          <TextInput
            style={styles.input}
            // autoCapitalize='sentences'

            placeholder="First Name"
            onChangeText={data => setFname(data)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={data => setLname(data)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={data => setEmail(data)}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            keyboardType="phone-pad"
            onChangeText={data => setPassword(data)}
          />

          <View style={styles.loginBtnWrapper}>
            <LinearGradient
              colors={[COLORS.gradientForm, COLORS.primary]}
              style={styles.linearGradient}
              start={{y: 0.0, x: 0.0}}
              end={{y: 1.0, x: 0.0}}>
              {/******************** LOGIN BUTTON *********************/}
              <TouchableOpacity
                onPress={() => btnRegister()}
                activeOpacity={0.7}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Register</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/***************** FORGOT PASSWORD BUTTON *****************/}
          {/* <TouchableOpacity
          onPress={() =>
            btnForgotPassword()
          }
          style={styles.forgotPassBtn}>
          <Text style={styles.forgotPassText}>Forgot Password?</Text>
        </TouchableOpacity> */}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}> Already have an account? </Text>
          {/******************** REGISTER BUTTON *********************/}
          <TouchableOpacity onPress={() => btnRegister()}>
            <Text style={styles.signupBtn}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  container: {
    padding: 15,
    width: '100%',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.primary,
    opacity: 0.9,
  },
  loginContinueTxt: {
    fontSize: 21,
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
    // textTransform:'uppercase'
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
    marginTop: 15,
  },
  // footer
  footer: {
    position: 'absolute',
    bottom: 10,
    textAlign: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  signupBtn: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  // utils
  wFull: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
  animatedBox: {
    // backgroundColor: 'blue',
    // height: 100,
    // width: 100,
    borderRadius: 50,
    // borderWidth: 2,
    alignSelf: 'center',
  },
});
