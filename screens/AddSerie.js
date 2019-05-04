import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Svg, { Rect, Circle } from 'react-native-svg';
//import PinchZoomView from 'react-native-pinch-zoom-view';
//import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import firebase from 'react-native-firebase';
import Main from './Main';
import Serie from './Serie';

let arr = [];
let acc = [];

export default class AddShots extends React.Component {
  constructor() {
   super();
   this.ref = firebase.firestore().collection('series');
   this.state = {
      date: '',
      coordinates: [],
      accuracy: '',
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
 });
   arr = [];
   acc = [];
}

  cancel = () => {
    arr = [];
    acc = [];
  }

  handleShot = (e, message) => {

    const { nativeEvent } = e;
    const {
      locationX,
      locationY,
      pageX,
      pageY,
    } = nativeEvent;

    arr.push({posX: locationX, posY: locationY});
    acc.push(message);

    this.setState({
        coordinates: arr,
        accuracy: acc,
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
       return (<View key={i} style={{width: 16, height: 16, borderRadius: 8, position: 'absolute', top: e.posY - 8, left: e.posX + 14, backgroundColor: 'yellow', zIndex: 2}}/>)
     });

     return (
       <>
      <View style={{flex: 8, alignItems: 'center', zIndex: 1}}>

      {shots}

      <Svg width="90%" height="90%" viewBox="0 0 100 100">
        <Rect
          disabled={this.state.svgActive}
          width={50}
          height={50}
          fill='rgb(49, 50, 47)'
          onPress={e => {
            this.handleShot(e, 'miss');
          }}
        />
        <Rect
          disabled={this.state.svgActive}
          width={50}
          height={50}
          x={49}
          fill='rgb(49, 50, 47)'
          onPress={e => {
            this.handleShot(e, 'miss');
          }}
        />
        <Rect
          disabled={this.state.svgActive}
          width={50}
          height={50}
          y={49}
          fill='rgb(49, 50, 47)'
          onPress={e => {
            this.handleShot(e, 'miss');
          }}
        />
        <Rect
          disabled={this.state.svgActive}
          width={50}
          height={50}
          y={49}
          x={49}
          fill='rgb(49, 50, 47)'
          onPress={e => {
            this.handleShot(e, 'miss');
          }}
        />
        <Circle
          disabled={this.state.svgActive}
          x={24}
          y={24}
          r={24}
          cx={26}
          cy={26}
          fill="black"
          onPress={e => {
            this.handleShot(e, 'hit');
          }}
        />
        <Circle
          disabled={this.state.svgActive}
          x={18}
          y={18}
          r={18}
          cx={32}
          cy={32}
          fill="white"
          onPress={e => {
            this.handleShot(e, 'hit');
          }}
        />
        <Circle
          disabled={this.state.svgActive}
          x={14}
          y={14}
          r={14}
          cx={36}
          cy={36}
          fill="black"
          onPress={e => {
            this.handleShot(e, 'hit');
          }}
        />
        <Circle
          disabled={this.state.svgActive}
          x={12}
          y={12}
          r={12}
          cx={38}
          cy={38}
          fill="white"
          onPress={e => {
            this.handleShot(e, 'hit');
          }}
        />
        <Circle
          disabled={this.state.svgActive}
          x={8}
          y={8}
          r={8}
          cx={42}
          cy={42}
          fill="black"
          onPress={e => {
            this.handleShot(e, 'hit');
          }}
        />
        <Circle
          disabled={this.state.svgActive}
          x={4}
          y={4}
          r={4}
          cx={46}
          cy={46}
          fill="white"
          onPress={e => {
            this.handleShot(e, 'hit');
          }}
        />
      </Svg>
      </View>
      <View style={{flex: 1}}>
      <Text>Pierwszy strzał: {this.state.accuracy[0]}</Text>
      </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around'}}>
        <Icon onPress={() => this.addSerie() || this.props.navigation.navigate('Main')} name='pluscircle' size={40} color={this.state.btnActive === true ? 'grey' : 'rgb(245, 66, 66)'} disabled={this.state.btnActive}/>
        <Icon onPress={() => this.cancel() || this.props.navigation.navigate('Main')} name='closecircle' size={40} color='rgb(245, 66, 66)'/>
        </View>
       </>
     )
   }


 }
