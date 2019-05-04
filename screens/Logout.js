import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import firebase from 'react-native-firebase';

export default class Stats extends React.Component {
   constructor(props) {
   super(props);

   }

   handleLogout = () => {
     firebase.auth().signOut();
   }

   render(){
     return (
       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../img/mon.png')} style={{width: 200, height: 200, resizeMode: 'contain'}} />
        <Button title="Log Out" onPress={this.handleLogout} />
       </View>
     )
   }
 }
