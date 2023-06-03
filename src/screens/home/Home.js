import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MapView, {Marker} from 'react-native-maps';
import {COLORS} from '../../constants';

import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Network from '../../constants/Network';


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

const Home = () => {
  const mapRef = useRef();

  const [mLet, setMlet] = useState(0);
  const [mLog, setMlog] = useState(0);

  const [region, setRegion] = useState({
    latitude: mLet,
    longitude: mLog,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });



  useEffect(() => {
    console.log('hello');
    requestLocationPermission();
  }, []);
  useEffect(() => {
    console.log(region);
  }, []);

  const btnGoLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);

        setMlet(position.coords.latitude);
        setMlog(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <>
      <View style={styles.main}>
        <MapView
          ref={mapRef}
          region={{
            latitude: mLet,
            longitude: mLog,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          zoomEnabled={true}
          zoomControlEnabled={true}
          zoomTapEnabled={true}
          style={{height: '100%', width: '100%'}}>
          <Marker
            key={1}
            // tracksViewChanges={true}
            coordinate={{latitude: mLet, longitude: mLog}}
            title={'Me'}
            description={'marker.description'}
          />
        </MapView>
        <TouchableOpacity
          style={styles.bottomView}
          onPress={() => btnGoLocation()}>
          <Text style={styles.bottomText}>Tracker</Text>
        </TouchableOpacity>
        <Network></Network>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  bottomText: {
    textAlign: 'center',
    fontSize: 24,
    color: COLORS.bgColor,
    padding: 10,
    fontWeight: 'bold',
  },
  bottomView: {
    position: 'absolute',
    width: '60%',
    backgroundColor: COLORS.gray,
    // justifyContent:'center',
    // alignItems:'center',
    alignSelf: 'center',
    borderRadius: 10,
    bottom: 80,
  },
});
