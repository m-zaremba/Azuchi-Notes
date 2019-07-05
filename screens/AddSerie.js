import React from 'react';
import firebase from 'react-native-firebase';
import moment from 'moment';

import {View, Text, StyleSheet, TextInput, Modal, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, {Rect, Circle} from 'react-native-svg';

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
      trainingDay: '',
      coordinates: [],
      accuracy: '',
      errors: [],
      svgInactive: '',
      btnDisabled: true,
      undoDisabled: true,
      note: '',
      showModal: false
  };
 }

 showModal = () => {
   this.setState({
     showModal: true
   })
 }

 hideModal = () => {
   this.setState({
     showModal: false
   })
 }

 addSerie() {
   this.ref.add({
   date: this.state.date,
   timestamp: new Date().getTime(),
   coordinates: this.state.coordinates,
   accuracy: this.state.accuracy,
   errors: this.state.errors,
   note: this.state.note,
   trainingDay: this.state.trainingDay
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
        svgInactive: 'true',
        btnDisabled: false,
      })
    }

    if(this.state.coordinates.length+1 >= 1) {
      this.setState({
        undoDisabled: false,
      })
    }

  };

  undo = () => {
    arr.pop();
    acc.pop();
    err.pop();

    this.setState({
        coordinates: arr,
        accuracy: acc,
        errors: err,
      })

    if(this.state.coordinates.length < 4) {
      this.setState({
        svgInactive: '',
        btnDisabled: true,
      })
    }

    if(this.state.coordinates.length+1 <= 1) {
      this.setState({
        undoDisabled: true,
      })
    }
  }

  updateTextInput(value) {
    this.setState({ note: value });
  }

 componentDidMount() {

  let date = moment(new Date()).format('DD.MM.YYYY HH:mm');
  let trainingDay = moment(new Date()).format('DD.MM.YYYY');

  this.setState({
    date: date,
    trainingDay: trainingDay,
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

          <Svg width='100%' height='100%' viewBox='0 0 100 100'>
            <Rect disabled={this.state.svgInactive} width={33} height={51} fill='rgb(49, 50, 47)'
              onPressIn={e => {
                this.handleShot(e, 'md-close', 'UL');
              }}
            />
            <Rect disabled={this.state.svgInactive} width={37} height={50} x={32} fill='rgb(49, 50, 47)'
              onPressIn={e => {
                this.handleShot(e, 'md-close', 'U');
              }}
            />
            <Rect disabled={this.state.svgInactive} width={32} height={51} x={68} fill='rgb(49, 50, 47)'
              onPressIn={e => {
                this.handleShot(e, 'md-close', 'UR');
              }}
            />
            <Rect disabled={this.state.svgInactive} width={50} height={27} y={50} fill='rgb(49, 50, 47)'
              onPressIn={e => {
                this.handleShot(e, 'md-close', 'L');
              }}
            />
            <Rect disabled={this.state.svgInactive} width={50} height={27} y={50} x={50} fill='rgb(49, 50, 47)'
              onPressIn={e => {
                this.handleShot(e, 'md-close', 'R');
              }}
            />
            <Rect disabled={this.state.svgInactive} width={33} height={24} y={76} fill='rgb(49, 50, 47)'
              onPressIn={e => {
                this.handleShot(e, 'md-close', 'LL');
              }}
            />
            <Rect disabled={this.state.svgInactive} width={36} height={24} x={32} y={76} fill='rgb(49, 50, 47)'
              onPressIn={e => {
                this.handleShot(e, 'md-close', 'Lo');
              }}
            />
            <Rect disabled={this.state.svgInactive} width={33} height={24} x={67} y={76} fill='rgb(49, 50, 47)'
              onPressIn={e => {
                this.handleShot(e, 'md-close', 'LR');
              }}
            />
            <Circle disabled={this.state.svgInactive} x={23} y={23} r={23} cx={27} cy={40} fill='black'
              onPress={e => {
                this.handleShot(e, 'ios-radio-button-off');
              }}
            />
            <Circle disabled={this.state.svgInactive}x={18} y={18} r={18} cx={32} cy={45} fill='white'
              onPress={e => {
                this.handleShot(e, 'ios-radio-button-off');
              }}
            />
            <Circle disabled={this.state.svgInactive} x={14} y={14} r={14} cx={36} cy={49} fill='black'
              onPress={e => {
                this.handleShot(e, 'ios-radio-button-off');
              }}
            />
            <Circle disabled={this.state.svgInactive} x={12} y={12} r={12} cx={38} cy={51} fill='white'
              onPress={e => {
                this.handleShot(e, 'ios-radio-button-off');
              }}
            />
            <Circle disabled={this.state.svgInactive} x={8} y={8} r={8} cx={42} cy={55} fill='black'
              onPress={e => {
                this.handleShot(e, 'ios-radio-button-off');
              }}
            />
            <Circle disabled={this.state.svgInactive} x={4} y={4} r={4} cx={46} cy={59} fill='white'
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
            onChangeText={(text) => this.updateTextInput(text)}
          />
          <View style={styles.buttonsWrapper}>
            <MaterialIcon onPress={() => this.addSerie() || this.props.navigation.navigate('Main')} name='check' size={48} color={this.state.btnDisabled === true ? 'grey' : 'rgb(245, 71, 71)'} disabled={this.state.btnDisabled}/>
            <MaterialIcon onPress={() => this.undo()} name='undo-variant' size={48} color={this.state.undoDisabled === true ? 'grey' : 'rgb(245, 71, 71)'} disabled={this.state.undoDisabled}/>
            <MaterialIcon onPress={() => this.cancel() || this.props.navigation.navigate('Main')} name='close' size={48} color='rgb(245, 71, 71)'/>
          </View>
        </View>
        <MaterialIcon style={{position: 'absolute', top: 5, right: 5}} name='help-circle' size={35} color='gray' onPress={() => {this.showModal()}}/>

        <Modal animationType='slide' transparent={true} visible={this.state.showModal} >
          <View style={styles.modalView}>
            <ScrollView style={{width: '100%', height: '100%'}}>
              <Text style={{...styles.modalText, textAlign: 'center', marginBottom: 5, fontWeight: 'bold'}}>SHOTS INPUT SCREEN INFO</Text>
              <View style={styles.azuchiInfo}>
                <Svg width='120' height='120' viewBox='0 0 100 100' style={{alignSelf: 'center'}}>
                  <Rect disabled='true' width={100} height={100} fill='rgb(49, 50, 47)' />
                  <Circle disabled='true' x={23} y={23} r={23} cx={27} cy={40} fill='black' />
                  <Circle disabled='true' x={18} y={18} r={18} cx={32} cy={45} fill='white' />
                  <Circle disabled='true' x={14} y={14} r={14} cx={36} cy={49} fill='black' />
                  <Circle disabled='true' x={12} y={12} r={12} cx={38} cy={51} fill='white' />
                  <Circle disabled='true' x={8} y={8} r={8} cx={42} cy={55} fill='black' />
                  <Circle disabled='true' x={4} y={4} r={4} cx={46} cy={59} fill='white' />
                </Svg>
                <Text style={{...styles.modalText, flexShrink: 1, alignSelf: 'center', marginLeft: 15}}>
                  Tap the azuchi/mato four times to display markers (corresponding to the actual shots)
                </Text>
              </View>
              <View style={styles.noteInfo}>
                <Text style={styles.modalText}>
                  Tap the 'ADD NOTE' field to add any useful information concerning fired shots. Any word from this note may later be used as a filter 'tag' in statistics screen.
                </Text>
              </View>
              <View style={styles.buttonsInfo}>
                <View style={styles.buttonInfo}>
                  <MaterialIcon name='check' size={48} color='rgb(245, 71, 71)'/>
                  <Text style={styles.modalText}>
                    Press the button to confirm and save shots serie. Button is inactive till all four shots are marked on azuchi.
                  </Text>
                </View>
                <View style={{...styles.buttonInfo, marginTop: 15, marginBottom: 15}}>
                  <MaterialIcon name='undo-variant' size={48} color='rgb(245, 71, 71)'/>
                  <Text style={styles.modalText}>
                    Press the button to remove the last marked shot (inactive till at least one shot is marked on azuchi)
                  </Text>
                </View>
                <View style={styles.buttonInfo}>
                  <MaterialIcon name='close' size={48} color='rgb(245, 71, 71)'/>
                  <Text style={styles.modalText}>
                    Press the button to close the pane (discarding any changes) and return to the main window.
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <MaterialIcon onPress={() => {this.hideModal()}} name='close' size={40} color='black' style={{ position: 'absolute', top: 3, right: 3}} />
        </Modal>
      </>
     )
   }
 }

 const styles = StyleSheet.create({
   mainWindow: {
     flex: 6,
     alignItems: 'center',
     zIndex: 1,
     justifyContent: 'flex-end',
     paddingTop: 45
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
   },
   modalView: {
     backgroundColor: 'rgba(75, 75, 75, 0.95)',
     paddingTop: 40,
     paddingBottom: 10,
     paddingLeft: 10,
     paddingRight: 10,
     height: '100%',
     width: '100%',
     justifyContent: 'flex-start',
     alignItems: 'center'
   },
   modalText: {
     fontSize: 20,
     color: 'white',
     flexShrink: 1,
     marginLeft: 5
   },
   azuchiInfo: {
     backgroundColor: 'rgba(255, 255, 255, 0.25)',
     width: '100%',
     paddingTop: 10,
     paddingBottom: 10,
     paddingLeft: 5,
     paddingRight: 5,
     flexDirection: 'row',
   },
   noteInfo: {
     backgroundColor: 'rgba(255, 255, 255, 0.25)',
     marginTop: 40,
     paddingTop: 10,
     paddingBottom: 10,
     paddingLeft: 5,
     paddingRight: 5,
   },
   buttonsInfo: {
     backgroundColor: 'rgba(255, 255, 255, 0.25)',
     marginTop: 40,
     paddingTop: 10,
     paddingBottom: 10,
     paddingLeft: 5,
     paddingRight: 5,
     width: '100%'
   },
   buttonInfo: {
     flexDirection: 'row',
     alignItems: 'center',
   }
 });
