import React from 'react';
import firebase from 'react-native-firebase';

import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import AddSerie from './AddSerie';
import Main from './Main';

export default class Serie extends React.PureComponent {

   render(){

       return (
              <View style={styles.serieRow}>
                      <Text style={ styles.text }>{this.props.date}</Text>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon name={`${this.props.accuracy[0]}`} size={30} color='black'/>
                      <Icon name={`${this.props.accuracy[1]}`} size={30} color='black'/>
                      <Icon name={`${this.props.accuracy[2]}`} size={30} color='black'/>
                      <Icon name={`${this.props.accuracy[3]}`} size={30} color='black'/>
                      </View>
              </View>
        );
   }
 }

 const styles = StyleSheet.create({
   serieRow: {
       height: 60,
       marginTop: 3,
       marginLeft: 5,
       paddingLeft: 15,
       paddingRight: 15,
       marginRight: 5,
       borderRadius: 10,
       backgroundColor: 'rgba(255, 255, 255, 0.85)',
       justifyContent: 'space-between',
       alignItems: 'center',
       flexDirection: 'row',
 },
   text: {
     fontSize: 24,
     color: 'black'
   }
 });
