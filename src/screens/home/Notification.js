import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import Network from '../../constants/Network';

const Notification = () => {
const [pass , setPass] = useState([])
  
const drive = useSelector(state => state.reducer);
// const objectLength = Object.keys(drive).length

useEffect(() => {
//  console.log("driveeeeeee",drive)
 console.log("driveeeeeee",drive.length)
//  console.log("driveeeeeee",objectLength)
 setPass(drive)

}, [drive])


useEffect (()=>{
 console.log("pass",pass.length=1)


},[drive])
  return (
    <View>
      <Text>Notification</Text>
      <Network></Network>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})