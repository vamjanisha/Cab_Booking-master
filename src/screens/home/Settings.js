import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Network from '../../constants/Network';

const Settings = () => {
  const drive = useSelector(state => state.reducer);
  const locationDrive = useSelector(state => state.reducerDrive)


  const [startlet, setStartLet] = useState('');
  const [startlng, setStartLng] = useState('');


  const [distance,setDistance] = useState('')
  const [duration,setDuration] = useState('')


  useEffect(() => {
    console.log('hellow......', drive);
    console.log('heloow........', locationDrive);
    console.log('startLatitude......', drive.startLatitude);
    console.log('startLongitude......', drive.startLongitude);
    console.log('endLatitude......', drive.endLatitude);
    console.log('endLongitude......', drive.endLongitude);

   console.log("distance",distance);
   console.log("duration",duration);

  }, []);
  useEffect(() => {
    console.log('startlet>>>', startlet);
    console.log('startlng>>>', startlng);
  }, []);

  const mapRef = useRef();

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        style={{height: '100%'}}>
        {drive.startLatitude ? (
          <Marker
            key={1}
            coordinate={{
              latitude: parseFloat(drive.startLatitude),
              longitude: parseFloat(drive.startLongitude),
            }}
            // image={ImagePath.icCurloc}
            title={'pickupCords'}
            description={'pickupCords'}
          />
        ) : (
          ''
        )}

        {drive.endLatitude ? (
          <Marker
            key={1}
            coordinate={{
              latitude: parseFloat(drive.endLatitude),
              longitude: parseFloat(drive.endLongitude),
            }}
            // image={ImagePath.icCurloc}
            title={'pickupCords'}
            description={'pickupCords'}
          />
        ) : (
          ''
        )}

        <MapViewDirections
          origin={{
            latitude: drive.startLatitude,
            longitude: drive.startLongitude,
          }}
          destination={{
            latitude: drive.endLatitude,
            longitude: drive.endLongitude,
          }}
          apikey={'AIzaSyAOh-9cnLtOazGNihqhA6-QAAJxCnbmgAU'}
          strokeWidth={5}
          strokeColor="red"
          optimizeWaypoints={true}
          onReady={result => {
            {
              if (result) {
                setDistance(result.distance)
                setDuration(result.duration)
                // console.log(`Distance: ${result.distance} km`);
                // console.log(`Duration: ${result.duration / 60} hours.`);
              }
            }
            // console.log(`Distance: ${result.distance} km`);
            // console.log(`Duration: ${result.duration} min.`);

            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 30,
                bottom: 300,
                left: 30,
                top: 100,
              },
            });
          }}
        />
      </MapView>
      <Network></Network>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
