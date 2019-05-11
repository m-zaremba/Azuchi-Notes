import React from 'react';
import { Text, View, Image } from 'react-native';
import firebase from 'react-native-firebase';
import {Button} from 'react-native-elements';

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
       <Image
           style={{width: 300, height: 300}}
           source={require('../img/mon.png')}
         />
        <Button title='LOG OUT' onPress={this.handleLogout} containerStyle={{width: '90%', marginTop: 30}} buttonStyle={{backgroundColor: 'rgb(245, 71, 71)'}}/>
      </View>
     )
   }
 }
