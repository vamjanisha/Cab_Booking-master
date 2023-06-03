import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState , useEffect} from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker} from 'react-native-maps';
import {COLORS} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {
  ScrollView, // Note that this is not imported from react-native
} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Network from '../../constants/Network';
const Booking = () => {
  const [startlat, setStartlat] = useState('');
  const [startlng, setStartlng] = useState('');

  const [endlat, setEndlat] = useState('');
  const [endlng, setEndlng] = useState('');


  const [getid , setGetid] = useState('')

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@login_data')
      if(value !== null) {
        setGetid(value)
        // console.log(value)
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }
  useEffect(() => {
    getData()
  }, [])


  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  
  // useEffect(() => {
  //   if (getid != '') {
  //     const requestOptions = {
  //       method: 'GET',
  //       headers: {'Content-Type': 'application/json'},
  //     };
  //     fetch('http://192.168.1.11:3000/data_id?_id=' + getid, requestOptions)
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log(data.data[0].First_name);
  //         setFname(data.data[0].First_name);

  //         setLname(data.data[0].Last_name);
  //         // // console.log("setName",setName(data.data[0].name));
  //         setEmail(data.data[0].email);
    
  //         setPassword(data.data[0].password);
  //       });
  //   }
  // }, [getid]);

  // console.log('startlat', startlat);
  // console.log('startlng', startlng);
  // console.log('endlat', endlat);
  // console.log('endlng', endlng);







  const btnFind = () => {
    if (startlat === '' || startlng === '') {
      console.log('Select start location ');
    } else if (endlat === '' || endlng === '') {
      console.log('Select end location');
    } else {
      console.log('Nice 😆');
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},

        body: JSON.stringify({
          startLatitude: startlat,
          startLongitude: startlng,
          endLatitude: endlat,
          endLongitude: endlng,
          userFirstName : fname ,
          userLastName : lname ,
          userEmail : email ,
        }),
      };
      fetch('http://192.168.1.13:3000/find_cab', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));

      // if (userdata.status == 'success') {
      //   console.log('DONE');
      //   // navigation.navigate('Login');

      // } else {
      //   console.log('NOT DONE');
      //   // Alert.alert('somthing is worng')
      // }
    }
  };

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}>
          <GooglePlacesAutocomplete
            placeholder="Enter start"
            fetchDetails={true}
            // onPress={(details,data = null)=>btnStart(details)}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
              setStartlat(details.geometry.location.lat);
              console.log(details.geometry.location.lat);
              setStartlng(details.geometry.location.lng);
              console.log(details.geometry.location.lng);

              // console.log(details);
              

            }}
            query={{
              key: 'AIzaSyAOh-9cnLtOazGNihqhA6-QAAJxCnbmgAU',
              language: 'en',
            }}
            // debounce={200}
            styles={styles}
          />
          <GooglePlacesAutocomplete
            placeholder="Enter start"
            fetchDetails={true}
            onPress={(data, details = null) => {

              // 'details' is provided when fetchDetails = true

              console.log(data, details);
              setEndlat(details.geometry.location.lat);
              console.log(details.geometry.location.lat);
              setEndlng(details.geometry.location.lng);
              console.log(details.geometry.location.lng);

            }}
            query={{
              key: 'AIzaSyAOh-9cnLtOazGNihqhA6-QAAJxCnbmgAU',
              language: 'en',
            }}
            // debounce={200}
            styles={styles}
          />
          <View style={styles.loginBtnWrapper}>
            <LinearGradient
              colors={[COLORS.gradientForm, COLORS.primary]}
              style={styles.linearGradient}
              start={{y: 0.0, x: 0.0}}
              end={{y: 1.0, x: 0.0}}>
              {/******************** LOGIN BUTTON *********************/}
              <TouchableOpacity
                onPress={() => btnFind()}
                activeOpacity={0.7}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Find and Book</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
        <Network></Network>
      </View>
    </>
  );
};

export default Booking;

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    // zIndex: 999,
    width: '90%',
    flex: 1,

    alignSelf: 'center',
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 45,
    // width:200,

    color: '#5d5d5d',
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.gradientForm,
    zIndex: 999,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  listView: {
    // top: 45.5,
    zIndex: 10,
    position: 'relative',
    color: 'black',
    backgroundColor: 'white',
    width: '89%',
    // flex:1,

    // height: 100,
    // bottom0,
    alignSelf: 'center',
  },
  separator: {
    // flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'blue',
  },
  description: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 14,
    maxWidth: '89%',
  },
  linearGradient: {
    width: '80%',
    borderRadius: 50,
  },
  loginBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
    height: 55,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
  },
  loginBtnWrapper: {
    // height: 55,

    // marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
  },
});
