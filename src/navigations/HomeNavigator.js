import {StyleSheet, Text, View} from 'react-native';
import React,{useEffect} from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Settings from '../screens/home/Settings';
import Notification from '../screens/home/Notification';
import Profile from '../screens/home/Profile';
import Booking from '../screens/home/Booking';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { COLORS } from '../constants';


//  ! redux  import file 
import {useDispatch, useSelector} from 'react-redux';
// import { useEvent } from 'react-native-reanimated';


// import DrawerNavigator from './DrawerNavigator';
// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = () => {

  const drive = useSelector(state => state.reducer);


  useEffect(() => {
   console.log("driveeeeeee",drive)
   console.log("driveeeeeee",drive.length)

  }, [drive])
  


  return (
    <Tab.Navigator
    
      screenOptions={({route}) => ({
        // headerShown:false,
        headerStyle:{
          backgroundColor: COLORS.white,
          // headerTitleAlign: 'center',
        },
        headerTitleAlign: 'center',
        headerTintColor:COLORS.dark,
    
        tabBarStyle: {
          height: 70,
          borderRadius:10,
          margin:5,
          // marginHorizontal:10,
          paddingBottom:10,
          paddingTop:10,
          // justifyContent:'center',
          // alignSelf:'center',
          // alignItems:'center',
          // paddingHorizontal:30,
          // paddingVertical:40,
          // paddingHorizontal: 5,
          // paddingVertical:20,
          paddingTop: 0,
          backgroundColor: COLORS.dark,
          
          position: 'absolute',
          borderTopWidth: 0,
      },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home-outline' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } else if (route.name === 'Notification') {
            iconName = focused
              ? 'ios-notifications-outline'
              : 'notifications-outline';
          } else if (route.name === 'Profile') {
            fontawesome = focused ? 'user' : 'user-o';
          }
          else if (route.name === 'Booking') {
            iconName = focused
            ? 'ios-car'
            : 'ios-car-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
          //  <FontAwesome name={fontawesome} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{tabBarBadge: drive.length=1}}
      />
      <Tab.Screen name="Booking" component={Booking} />

      <Tab.Screen name="Settings" component={Settings} />


      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <FontAwesome name={'user-o'} size={size} color={color}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({});
