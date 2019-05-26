import React from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Svg, { Rect, Circle } from 'react-native-svg';
import firebase from 'react-native-firebase';
import Main from './Main';
import Serie from './Serie';

let arr = [];
let acc = [];
let err = [];

export default class AddShots extends React.Component {
  constructor() {
   super();
   this.uid = firebase.auth().currentUser.uid;
   this.ref = firebase.firestore().collection(this.uid);
   this.state = {
      date: '',
      coordinates: [],
      accuracy: '',
      errors: [],
      svgActive: '',
      btnActive: true,
      note: ''
  };
 }


 addSerie() {
   this.ref.add({
   date: this.state.date,
   timestamp: new Date(),
   coordinates: this.state.coordinates,
   accuracy: this.state.accuracy,
   errors: this.state.errors,
   modalVisible: false,
   note: this.state.note
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
      })

    if(this.state.coordinates.length >= 4) {
      this.setState({
        svgActive: 'true',
        btnActive: false,
      })
    }
  };

  updateTextInput(value) {
    this.setState({ note: value });
  }

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
       if(i === 0) {
         return (<View key={i} style={{...styles.shotMarker, top: e.posY + 36, left: e.posX + 16, backgroundColor: 'red'}}/>)
       } else if (i === 1) {
         return (<View key={i} style={{...styles.shotMarker, top: e.posY + 36, left: e.posX + 16, backgroundColor: 'green'}}/>)
       } else if (i === 2) {
         return (<View key={i} style={{...styles.shotMarker, top: e.posY + 36, left: e.posX + 16, backgroundColor: 'blue'}}/>)
       } else {
         return (<View key={i} style={{...styles.shotMarker, top: e.posY + 36, left: e.posX + 16, backgroundColor: 'violet'}}/>)
       }
     });

     return (
      <>
        <View style={styles.mainWindow}>

        {shots}

          <Svg width='90%' height='90%' viewBox='0 0 100 100'>
            <Rect
              disabled={this.state.svgActive}
              width={33}
              height={51}
              fill='rgb(49, 50, 47)'
              onPressIn={e => {
                this.handleShot(e, 'md-close', 'UL');
              }}
            />
            <Rect
              disabled={this.state.svgActive}
              width={37}
              height={50}
              x={32}
              fill='rgb(49, 50, 47)'
              onPressIn={e => {
                this.handleShot(e, 'md-close', 'U');
              }}
            />
            <Rect
              disabled={this.state.svgActive}
              width={32}
              height={51}
              x={68}
              fill='rgb(49, 50, 47)'
              onPressIn={e => {
                this.handleShot(e, 'md-close', 'UR');
              }}
            />
            <Rect
              disabled={this.state.svgActive}
              width={50}
              height={27}
              y={50}
              fill='rgb(49, 50, 47)'
              onPressIn={e => {
                this.handleShot(e, 'md-close', 'L');
              }}
            />
            <Rect
              disabled={this.state.svgActive}
              width={50}
              height={27}
              y={50}
              x={51}
              fill='rgb(49, 50, 47)'
              onPressIn={e => {
                this.handleShot(e, 'md-close', 'R');
              }}
            />
            <Rect
              disabled={this.state.svgActive}
              width={33}
              height={24}
              y={76}
              fill='rgb(49, 50, 47)'
              onPressIn={e => {
                this.handleShot(e, 'md-close', 'LL');
              }}
            />
            <Rect
              disabled={this.state.svgActive}
              width={36}
              height={24}
              x={32}
              y={76}
              fill='rgb(49, 50, 47)'
              onPressIn={e => {
                this.handleShot(e, 'md-close', 'Lo');
              }}
            />
            <Rect
              disabled={this.state.svgActive}
              width={33}
              height={24}
              x={67}
              y={76}
              fill='rgb(49, 50, 47)'
              onPressIn={e => {
                this.handleShot(e, 'md-close', 'LR');
              }}
            />
            <Circle
              disabled={this.state.svgActive}
              x={23}
              y={23}
              r={23}
              cx={27}
              cy={40}
              fill='black'
              onPress={e => {
                this.handleShot(e, 'ios-radio-button-off');
              }}
            />
            <Circle
              disabled={this.state.svgActive}
              x={18}
              y={18}
              r={18}
              cx={32}
              cy={45}
              fill='white'
              onPress={e => {
                this.handleShot(e, 'ios-radio-button-off');
              }}
            />
            <Circle
              disabled={this.state.svgActive}
              x={14}
              y={14}
              r={14}
              cx={36}
              cy={49}
              fill='black'
              onPress={e => {
                this.handleShot(e, 'ios-radio-button-off');
              }}
            />
            <Circle
              disabled={this.state.svgActive}
              x={12}
              y={12}
              r={12}
              cx={38}
              cy={51}
              fill='white'
              onPress={e => {
                this.handleShot(e, 'ios-radio-button-off');
              }}
            />
            <Circle
              disabled={this.state.svgActive}
              x={8}
              y={8}
              r={8}
              cx={42}
              cy={55}
              fill='black'
              onPress={e => {
                this.handleShot(e, 'ios-radio-button-off');
              }}
            />
            <Circle
              disabled={this.state.svgActive}
              x={4}
              y={4}
              r={4}
              cx={46}
              cy={59}
              fill='white'
              onPress={e => {
                this.handleShot(e, 'ios-radio-button-off');
              }}
            />
          </Svg>
        </View>
        <View style={{flex: 5}}>
          <View style={styles.arrowsCount}>
            <Text style={styles.text}>1st Arrow</Text>
            <Text style={styles.text}>2nd Arrow</Text>
          </View>
          <View style={styles.icons}>
            {this.state.accuracy.length >= 1 ? <Icon style={{width: '50%', textAlign: 'center'}} name={`${this.state.accuracy[0]}`} size={40} color='red'/> : null}
            {this.state.accuracy.length >= 2 ? <Icon style={{width: '50%', textAlign: 'center'}} name={`${this.state.accuracy[1]}`} size={40} color='green'/> : null}
          </View>
          <View style={styles.arrowsCount}>
            <Text style={styles.text}>3rd Arrow</Text>
            <Text style={styles.text}>4th Arrow</Text>
          </View>
          <View style={styles.icons}>
            {this.state.accuracy.length >= 3 ? <Icon style={{width: '50%', textAlign: 'center'}} name={`${this.state.accuracy[2]}`} size={40} color='blue'/> : null}
            {this.state.accuracy.length >= 4 ? <Icon style={{width: '50%', textAlign: 'center'}} name={`${this.state.accuracy[3]}`} size={40} color='violet'/> : null}
          </View>
          <TextInput
            placeholder={'ADD NOTE'}
            value={this.state.textInput}
            onChangeText={(text) => this.updateTextInput(text)}
          />
          <View style={styles.buttonsWrapper}>
            <AntDesignIcon onPress={() => this.addSerie() || this.props.navigation.navigate('Main')} name='pluscircle' size={48} color={this.state.btnActive === true ? 'grey' : 'rgb(245, 71, 71)'} disabled={this.state.btnActive}/>
            <AntDesignIcon onPress={() => this.cancel() || this.props.navigation.navigate('Main')} name='closecircle' size={48} color='rgb(245, 71, 71)'/>
          </View>
        </View>
      </>
     )
   }
 }

 const styles = StyleSheet.create({
   mainWindow: {
     flex: 6,
     alignItems: 'center',
     zIndex: 1,
     justifyContent: 'flex-end'
   },
   arrowsCount: {
     flex: 1,
     justifyContent: 'center',
     flexDirection: 'row',
     alignItems: 'flex-end'
   },
   icons: {
     flex: 1,
     flexDirection: 'row',
     alignItems: 'flex-start',
     paddingTop: 5
   },
   buttonsWrapper: {
     flex: 2,
     flexDirection: 'row',
     justifyContent:'space-around',
     alignItems: 'flex-end',
     paddingBottom: 10
   },
   text: {
     flex: 1,
     textAlign: 'center',
     fontSize: 22,
     color: 'black'
   },
   shotMarker: {
     width: 10,
     height: 10,
     borderRadius: 5,
     position: 'absolute',
     zIndex: 2,
   }
 });
