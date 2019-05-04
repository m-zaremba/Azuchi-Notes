import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import firebase from 'react-native-firebase';

export default class Stats extends React.Component {
   constructor(props) {
   super(props);
   this.ref = firebase.firestore().collection('series');
   this.state = {
     series: [],
     loading: true,
   }
   }

   onCollectionUpdate = (querySnapshot) => {
    const series = [];
    querySnapshot.forEach((doc) => {
      const { accuracy } = doc.data();

      series.push({
        doc, // DocumentSnapshot
        accuracy,
      });
    });

    this.setState({
      series: series,
      loading: false,
   });
  }


   componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
   }

   componentWillUnmount() {
    this.unsubscribe();
   }

   render(){
     let sum = [];

     this.state.series.map((e,i) => {
       sum.push(e.accuracy.length*(i+1));
     })

     let shots = sum[sum.length-1];

     return (
       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../img/mon.png')} style={{width: 200, height: 200, resizeMode: 'contain'}} />
        <Text>liczba oddanych strzałów: {shots}</Text>
       </View>
     )
   }
 }
