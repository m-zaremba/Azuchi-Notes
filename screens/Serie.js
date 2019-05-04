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
                      {this.props.accuracy[0]==='hit' ? <Icon name='circle' size={30} color='black'/> : <Icon name='cross' size={30} color='black'/>}
                      {this.props.accuracy[1]==='hit' ? <Icon name='circle' size={30} color='black'/> : <Icon name='cross' size={30} color='black'/>}
                      {this.props.accuracy[2]==='hit' ? <Icon name='circle' size={30} color='black'/> : <Icon name='cross' size={30} color='black'/>}
                      {this.props.accuracy[3]==='hit' ? <Icon name='circle' size={30} color='black'/> : <Icon name='cross' size={30} color='black'/>}
                      </View>
              </View>
        );
   }
 }

 const styles = StyleSheet.create({
   serieRow: {
       height: 40,
       marginTop: 3,
       marginLeft: 5,
       paddingLeft: 15,
       marginRight: 5,
       borderRadius: 10,
       backgroundColor: 'rgba(0, 0, 0, 0.52)',
       justifyContent: 'space-between',
       flexDirection: 'row',
 },
   text: {
     fontSize: 26,
     color: 'white',
   }
 });
