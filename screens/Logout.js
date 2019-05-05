import React from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
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
       <ImageBackground style={ styles.imgBackground }
               resizeMode='contain'
               source={require('../img/background_mon.png')}>
       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button title='LOG OUT' onPress={this.handleLogout} containerStyle={{width: 200, marginTop: 30}} buttonStyle={{backgroundColor: 'rgb(245, 66, 66)'}}/>
       </View>
       </ImageBackground>
     )
   }
 }

 const styles = StyleSheet.create({
   imgBackground: {
       width: '100%',
       height: '100%',
       flex: 1,
 }
 });
