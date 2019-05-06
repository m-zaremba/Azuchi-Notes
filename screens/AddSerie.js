import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Svg, { Rect, Circle } from 'react-native-svg';
//import PinchZoomView from 'react-native-pinch-zoom-view';
//import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import firebase from 'react-native-firebase';
import Main from './Main';
import Serie from './Serie';

let arr = [];
let acc = [];
let err = [];

export default class AddShots extends React.Component {
  constructor() {
   super();
   this.ref = firebase.firestore().collection('series');
   this.state = {
      date: '',
      coordinates: [],
      accuracy: '',
      errors: [],
      x: null,
      y: null,
      svgActive: '',
      btnActive: true,
  };
 }


 addSerie() {
   this.ref.add({
   date: this.state.date,
   coordinates: this.state.coordinates,
   accuracy: this.state.accuracy,
   errors: this.state.errors,
   modalVisible: false,
 });
   arr = [];
   acc = [];
   err = [];
}

  cancel = () => {
    arr = [];
    acc = [];
    err = [];
  }

  handleShot = (e, message, error) => {

    const { nativeEvent } = e;
    const {
      locationX,
      locationY,
      pageX,
      pageY,
    } = nativeEvent;

    arr.push({posX: locationX, posY: locationY});
    acc.push(message);

    if(error) {
      err.push(error)
    }


    this.setState({
        coordinates: arr,
        accuracy: acc,
        errors: err,
        x: locationX,
        y: locationY,
      })

    if(this.state.coordinates.length >= 4) {
      this.setState({
        svgActive: 'true',
        btnActive: false,
      })
    }
  };


 componentDidMount() {

  var date = new Date().getDate()
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  this.setState({
    date: `${date < 10 ? '0' + date : date}.${month < 10 ? '0' + month : month}.${year}`,
  });

}

   render(){

     let shots = this.state.coordinates.map((e,i) => {
       return (<View key={i} style={{width: 10, height: 10, borderRadius: 5, position: 'absolute', top: e.posY - 7, left: e.posX + 15, backgroundColor: 'red', zIndex: 2}}/>)
     });

     return (
       <>
      <View style={styles.mainWindow}>

      {shots}

      <Svg width='90%' height='90%' viewBox='0 0 100 100'>
        <Rect
          disabled={this.state.svgActive}
          width={50}
          height={50}
          fill='rgb(49, 50, 47)'
          onPressIn={e => {
            this.handleShot(e, 'cross', 'UL');
          }}
        />
        <Rect
          disabled={this.state.svgActive}
          width={50}
          height={50}
          x={49}
          fill='rgb(49, 50, 47)'
          onPressIn={e => {
            this.handleShot(e, 'cross', 'UR');
          }}
        />
        <Rect
          disabled={this.state.svgActive}
          width={50}
          height={50}
          y={49}
          fill='rgb(49, 50, 47)'
          onPressIn={e => {
            this.handleShot(e, 'cross', 'LL');
          }}
        />
        <Rect
          disabled={this.state.svgActive}
          width={50}
          height={50}
          y={49}
          x={49}
          fill='rgb(49, 50, 47)'
          onPressIn={e => {
            this.handleShot(e, 'cross', 'LR');
          }}
        />
        <Circle
          disabled={this.state.svgActive}
          x={24}
          y={24}
          r={24}
          cx={26}
          cy={26}
          fill='black'
          onPress={e => {
            this.handleShot(e, 'circle');
          }}
        />
        <Circle
          disabled={this.state.svgActive}
          x={18}
          y={18}
          r={18}
          cx={32}
          cy={32}
          fill='white'
          onPress={e => {
            this.handleShot(e, 'circle');
          }}
        />
        <Circle
          disabled={this.state.svgActive}
          x={14}
          y={14}
          r={14}
          cx={36}
          cy={36}
          fill='black'
          onPress={e => {
            this.handleShot(e, 'circle');
          }}
        />
        <Circle
          disabled={this.state.svgActive}
          x={12}
          y={12}
          r={12}
          cx={38}
          cy={38}
          fill='white'
          onPress={e => {
            this.handleShot(e, 'circle');
          }}
        />
        <Circle
          disabled={this.state.svgActive}
          x={8}
          y={8}
          r={8}
          cx={42}
          cy={42}
          fill='black'
          onPress={e => {
            this.handleShot(e, 'circle');
          }}
        />
        <Circle
          disabled={this.state.svgActive}
          x={4}
          y={4}
          r={4}
          cx={46}
          cy={46}
          fill='white'
          onPress={e => {
            this.handleShot(e, 'circle');
          }}
        />
      </Svg>
      </View>
      <View style={styles.arrowsCount}>
      <Text style={styles.text}>1st Arrow</Text>
      <Text style={styles.text}>2nd Arrow</Text>
      <Text style={styles.text}>3rd Arrow</Text>
      <Text style={styles.text}>4th Arrow</Text>
      </View>
      <View style={styles.icons}>
      {this.state.accuracy.length >= 1 ? <EntypoIcon style={{width: '25%', textAlign: 'center'}} name={`${this.state.accuracy[0]}`} size={40} color='black'/> : null}
      {this.state.accuracy.length >= 2 ? <EntypoIcon style={{width: '25%', textAlign: 'center'}} name={`${this.state.accuracy[1]}`} size={40} color='black'/> : null}
      {this.state.accuracy.length >= 3 ? <EntypoIcon style={{width: '25%', textAlign: 'center'}} name={`${this.state.accuracy[2]}`} size={40} color='black'/> : null}
      {this.state.accuracy.length >= 4 ? <EntypoIcon style={{width: '25%', textAlign: 'center'}} name={`${this.state.accuracy[3]}`} size={40} color='black'/> : null}

      </View>
        <View style={styles.buttonsWrapper}>
        <Icon onPress={() => this.addSerie() || this.props.navigation.navigate('Main')} name='pluscircle' size={40} color={this.state.btnActive === true ? 'grey' : 'rgb(245, 66, 66)'} disabled={this.state.btnActive}/>
        <Icon onPress={() => this.cancel() || this.props.navigation.navigate('Main')} name='closecircle' size={40} color='rgb(245, 66, 66)'/>
        </View>
       </>
     )
   }
 }

 const styles = StyleSheet.create({
   mainWindow: {
     flex: 6,
     alignItems: 'center',
     zIndex: 1
   },
   arrowsCount: {
     flex: 1,
     justifyContent: 'center',
     flexDirection: 'row',
     paddingLeft: 4,
     paddingRight: 10,
     alignItems: 'flex-end'
   },
   icons: {
     flex: 1,
     flexDirection: 'row',
     paddingLeft: 4,
     paddingRight: 10,
     alignItems: 'flex-start'
   },
   buttonsWrapper: {
     flex: 1,
     flexDirection: 'row',
     justifyContent:'space-around'
   },
   text: {
     flex: 1,
     textAlign: 'center',
     fontSize: 16,
     color: 'black'
   }
 });
