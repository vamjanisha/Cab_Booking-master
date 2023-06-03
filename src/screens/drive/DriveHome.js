import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {accept_request , drive_location} from '../../components/redux/actioon';
import {useDispatch, useSelector} from 'react-redux';
// import { useSelector } from 'react-redux/es/exports';

import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Example App',
        message: 'Example App access to your location ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      alert('You can use the location');
    } else {
      console.log('location permission denied');
      alert('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

const DriveHome = () => {
  const [drivedata, setdrivedata] = useState([]);
  const [driverLocation, setDriverLocation] = useState({});

  const dispatch = useDispatch();

  const drive = useSelector(state => state.reducer);

  const locationDrive = useSelector(state => state.reducerDrive)

  useEffect(() => {

    requestLocationPermission();
  }, []);
  useEffect(() => {
    // console.log(region);
    btnGoLocation();
  }, []);

  const btnGoLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('Drive position ', position);
        setDriverLocation(position);
        // setMlet(position.coords.latitude);
        // setMlog(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  console.log('hello' , locationDrive);
  console.log('>>>>>>>>>', drive);

  useEffect(() => {
    if (drivedata == '') {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        // body: JSON.stringify({ }),
      };
      fetch('http://192.168.1.18:3000/drive_data', requestOptions)
        .then(response => response.json())
        .then(data => {
          // console.log(data);

          setdrivedata(data.data);
        });
    }
  }, []);

  console.log('====================================');
  // console.log(driverLocation);
  console.log('====================================');

  const senRequest = (item , driverLocation) => {


    dispatch(accept_request(item));
    console.log("kano king",driverLocation);   
    dispatch(drive_location(driverLocation))
    

    console.log(item);
    console.log(driverLocation);
  };

  // console.log('>>>>>>>', drivedata);
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{margin: 10}}>
        {drivedata.map(item => {
          return (
            <>
              <View
                style={{
                  backgroundColor: 'pink',
                  paddingVertical: 10,
                  margin: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>startLat {item.startLatitude}</Text>
                  <Text>startLng{item.startLongitude}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>endLatitude{item.endLatitude}</Text>
                  <Text>endLongitude{item.endLongitude}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Fnames{item.userFirstName}</Text>
                  <Text>Lname{item.userLastName}</Text>
                </View>

                <Text style={{textAlign: 'center'}}>Email{item.userEmail}</Text>
                <Text style={{textAlign: 'center'}}>id{item._id}</Text>

                <TouchableOpacity
                  onPress={() => senRequest(item , driverLocation)}
                  style={{
                    backgroundColor: 'yellow',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: 20,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingHorizontal: 20,
                      paddingVertical: 8,
                    }}>
                    Accept
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DriveHome;

const styles = StyleSheet.create({});
