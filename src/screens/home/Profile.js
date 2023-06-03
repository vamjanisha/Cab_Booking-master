import { Image, StyleSheet, Text, View,TouchableOpacity,TextInput, Modal, Appearance ,} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Network from '../../constants/Network';

const Profile = () => {

const [getid , setGetid] = useState('')
const [editNumber , setEditNumber] = useState(false)
const [editEmail , setEditEmail] = useState(false)
const [editPassword , setEditPassword] = useState(false)
const [theme, setTheme] = useState('LIGHT');


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
  const [password, setPassword] = useState('');


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


  useEffect(() => {
    if (getid != '') {
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      };
      fetch('http://192.168.45.19:3000/data_id?_id=' + getid, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.data[0].First_name);
          setFname(data.data[0].First_name);

          setLname(data.data[0].Last_name);
          // // console.log("setName",setName(data.data[0].name));
          setEmail(data.data[0].email);
    
          setPassword(data.data[0].password);
        });
    }
  }, [getid]);


  return (
    <SafeAreaView style={{flex:1,backgroundColor:theme === 'LIGHT' ?'#fff' : '#000',padding: 16,}}>
    <View style={{flex:1}}>
      {/* <Text>{fname}</Text>
      <Text>{lname}</Text>
      <Text>{email}</Text>
      <Text>{password}</Text> */}

      <View style={{justifyContent:'center',alignItems:'center'}}>
      <Image
              source={require('../../../src/assets/img/user.png')}
              style={{height: 100, width: 100,marginTop:20}}/>
        <Text style={{textAlign:'center' ,fontSize:18,marginTop:10,width:300,color:"#000"}}>User name</Text>
       </View>
        <Text style={{fontSize:19,fontWeight:'bold',color:"#000",paddingTop:40}}>Edit Profile</Text>
        
        {/* Phone Number---------------- */}
        <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:15,fontWeight:'500', color: COLORS.gray,}}>Phone Number</Text>
        <TouchableOpacity onPress={()=>setEditNumber(true)}>
        <Text style={{fontSize:15,fontWeight:'500',color:COLORS.danger}}>Edit</Text>
        </TouchableOpacity>
        </View>
        <TextInput 
        maxLength={10}
        placeholder='Phone Number'
        style={{borderRadius:10,borderWidth:1,borderColor:'#000',marginTop:8,borderEndColor:'pink',}}>
        </TextInput>

        <Modal
         animationType="none"
         transparent={true}   
        visible={editNumber}
        onPress={()=>setEditNumber(true)}
        style={{justifyContent:"center",}}>
        <View style={{marginTop:200,backgroundColor:theme === 'LIGHT' ?'#000' : '	rgb(238, 238, 202)',width:'90%',height:'25%',marginLeft:15,padding:10,borderRadius:10}}>
          <TouchableOpacity onPress={()=>setEditNumber(false)}>
        <Image
              source={require('../../../src/assets/img/close.png')}
              style={{height: 20, width: 20,marginTop:10,alignSelf:'flex-end'}}/>
          </TouchableOpacity>
          <Text>
            Change Phone Number
          </Text>
          <TextInput
          style={{borderRadius:10,borderWidth:1,borderColor:'#000',marginTop:5}}
           placeholder='pnone number'/>
           <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
            <Text  style={{backgroundColor:COLORS.purpal,width:'40%',height:45,textAlign:'center',justifyContent:'center',alignItems:'center',paddingTop:10,borderRadius:10}}>ok</Text>
            <Text  style={{backgroundColor:COLORS.bgColor,width:'40%',height:45,textAlign:'center',justifyContent:'center',alignItems:'center',paddingTop:10,borderRadius:10}}>Change</Text>
          
           </View>
          </View>          
        </Modal>

        {/* Email----------- */}
        <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:15,fontWeight:'500', color: COLORS.gray,}}>Email</Text>
        <TouchableOpacity onPress={()=>setEditEmail(true)}>
        <Text style={{fontSize:15,fontWeight:'500',color:COLORS.danger}}>Edit</Text>
        </TouchableOpacity>
        </View>
        <TextInput 
        maxLength={10}
        placeholder='Email'
        style={{borderRadius:10,borderWidth:1,borderColor:'#000',marginTop:8,borderEndColor:'pink',}}>
        </TextInput>

        <Modal visible={editEmail}
         animationType="slide"
         transparent={true}
        onPress={()=>setEditEmail(true)}
        style={{justifyContent:"center"}}>
        <View style={{marginTop:200,backgroundColor:COLORS.grayLight,width:'90%',height:'25%',marginLeft:15,padding:10,borderRadius:10}}>
          <TouchableOpacity onPress={()=>setEditEmail(false)}>
        <Image
              source={require('../../../src/assets/img/close.png')}
              style={{height: 20, width: 20,marginTop:10,alignSelf:'flex-end'}}/>
          </TouchableOpacity>
          <Text>
            Change Email
          </Text>
          <TextInput
          style={{borderRadius:10,borderWidth:1,borderColor:'#000',marginTop:5}}
           placeholder='Email'/>
           <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
            <Text  style={{backgroundColor:COLORS.warning,width:'40%',height:45,textAlign:'center',justifyContent:'center',alignItems:'center',paddingTop:10,borderRadius:10}}>ok</Text>
            <Text  style={{backgroundColor:COLORS.danger,width:'40%',height:45,textAlign:'center',justifyContent:'center',alignItems:'center',paddingTop:10,borderRadius:10}}>Change</Text>
          
           </View>
          </View>          
        </Modal>

      {/* password------------ */}
        <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:15,fontWeight:'500', color: COLORS.gray,}}>Password</Text>
        <TouchableOpacity onPress={()=>setEditPassword(true)}>
        <Text style={{fontSize:15,fontWeight:'500',color:COLORS.danger}}>Edit</Text>
        </TouchableOpacity>
        </View>
        <TextInput 
        maxLength={10}
        placeholder='password'
        style={{borderRadius:10,borderWidth:1,borderColor:'#000',marginTop:8,}}>
        </TextInput>

        <Modal visible={editPassword}
          animationType="slide"
          transparent={true}
        onPress={()=>setEditPassword(true)}
        style={{justifyContent:"center"}}>
        <View style={{marginTop:200,backgroundColor:COLORS.grayLight,width:'90%',height:'25%',marginLeft:15,padding:10,borderRadius:10}}>
          <TouchableOpacity onPress={()=>setEditPassword(false)}>
        <Image
              source={require('../../../src/assets/img/close.png')}
              style={{height: 20, width: 20,marginTop:10,alignSelf:'flex-end'}}/>
          </TouchableOpacity>
          <Text>
            Change password
          </Text>
          <TextInput
          style={{borderRadius:10,borderWidth:1,borderColor:'#000',marginTop:5}}
           placeholder='password'/>
           <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
            <Text  style={{backgroundColor:COLORS.warning,width:'40%',height:45,textAlign:'center',justifyContent:'center',alignItems:'center',paddingTop:10,borderRadius:10}}>ok</Text>
            <Text  style={{backgroundColor:COLORS.danger,width:'40%',height:45,textAlign:'center',justifyContent:'center',alignItems:'center',paddingTop:10,borderRadius:10}}>Change</Text>
          
           </View>
          </View>          
        </Modal>
<Network></Network>
    </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})