import React from 'react';
import {Text, View, ImageBackground, StyleSheet, Modal, TouchableOpacity, ScrollView} from 'react-native';
import firebase from 'react-native-firebase';
import Svg, { Rect, Circle, TSpan } from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import CalendarModal from 'react-native-modal';
import InfoModal from 'react-native-modal';
import { Button } from 'react-native-elements';


export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.uid = firebase.auth().currentUser.uid;
    this.ref = firebase.firestore().collection(this.uid);
    this.unsubscribe = null;
    this.state = {
      series: [],
      loading: true,
      modalVisible: false,
      showInfoModal: false,
      showCalendarModal: false,
      selectedStartDate: null,
      selectedEndDate: null,
      defaultStartDate: '',
      defaultEndDate: '',
      upperLColor: 'rgba(0, 0, 0, 0)',
      upColor: 'rgba(0, 0, 0, 0)',
      upperRColor: 'rgba(0, 0, 0, 0)',
      leftColor: 'rgba(0, 0, 0, 0)',
      rightColor: 'rgba(0, 0, 0, 0)',
      lowerLColor: 'rgba(0, 0, 0, 0)',
      lowColor: 'rgba(0, 0, 0, 0)',
      lowerRColor: 'rgba(0, 0, 0, 0)'
    }
    this.onDateChange = this.onDateChange.bind(this);
  }

  onCollectionUpdate = querySnapshot => {
    const series = [];
    querySnapshot.forEach(doc => {
      const { accuracy, coordinates, errors } = doc.data();

      series.push({
        doc, // DocumentSnapshot
        accuracy,
        coordinates,
        errors
      });
    });

    this.setState({
      series: series,
      loading: false
    });
  };

  handleModal = () => {
    this.setState({
      modalVisible: true
    });

    let errQuart = []; // error tags 2D array
    let errList = []; // 1D error 'list'
    this.state.series.map((e, i) => {
      if (e.errors) {
        errQuart.push(e.errors);
      }
    });

    let upperL = [];
    let up = [];
    let upperR = [];
    let left = [];
    let right = [];
    let lowerL = [];
    let low = [];
    let lowerR = [];

    for (let i = 0; i < errQuart.length; i++) {
      for (let j = 0; j < errQuart[i].length; j++) {
        errList.push(errQuart[i][j]);
      }
    }

    errList.map(e => {
      if (e === 'UL') {
        upperL.push(e);
      } else if (e === 'U') {
        up.push(e);
      } else if (e === 'UR') {
        upperR.push(e);
      } else if (e === 'L') {
        left.push(e);
      } else if (e === 'R') {
        right.push(e);
      } else if (e === 'LL') {
        lowerL.push(e);
      } else if (e === 'Lo') {
        low.push(e);
      } else if (e === 'LR') {
        lowerR.push(e);
      }
    });

    let hitsRatio = [upperL.length, up.length, upperR.length, left.length, right.length, lowerL.length, low.length, lowerR.length];
    let highestHitRatio = Math.max(...hitsRatio);

    if (hitsRatio.indexOf(highestHitRatio) === 0) {
      this.setState({
        upperLColor: 'rgba(255, 0, 0, 0.55)'
      })
    } else if (hitsRatio.indexOf(highestHitRatio) === 1) {
      this.setState({
        upColor: 'rgba(255, 0, 0, 0.55)'
      })
    } else if (hitsRatio.indexOf(highestHitRatio) === 2) {
      this.setState({
        upperRColor: 'rgba(255, 0, 0, 0.55)'
      })
    } else if (hitsRatio.indexOf(highestHitRatio) === 3) {
      this.setState({
        leftColor: 'rgba(255, 0, 0, 0.55)'
      })
    } else if (hitsRatio.indexOf(highestHitRatio) === 4) {
      this.setState({
        rightColor: 'rgba(255, 0, 0, 0.55)'
      })
    } else if (hitsRatio.indexOf(highestHitRatio) === 5) {
      this.setState({
        lowerLColor: 'rgba(255, 0, 0, 0.55)'
      })
    } else if (hitsRatio.indexOf(highestHitRatio) === 6) {
      this.setState({
        lowColor: 'rgba(255, 0, 0, 0.55)'
      })
    } else if (hitsRatio.indexOf(highestHitRatio) === 7) {
      this.setState({
        lowerRColor: 'rgba(255, 0, 0, 0.55)'
      })
    }


  };

  setModalVisible(visible) {
    this.setState({
      modalVisible: false
    });
  }

  showInfoModal = () => {
    this.setState({
      showInfoModal: true
    })
  }

  hideInfoModal = () => {
    this.setState({
      showInfoModal: false
    })
  }

  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }


  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

    let now = new Date();
    let start = moment(now).startOf('day').valueOf();
    let end = moment(now).endOf('day').valueOf();

    this.setState({
      defaultStartDate: start,
      defaultEndDate: end,
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    // All shots counter

    let seriesAcc = []; // All shots accuracy tags
    let sum = [];

    this.state.series.map((e, i) => {
      seriesAcc.push(e.accuracy);
      sum.push(e.accuracy.length * (i + 1));
    });

    let shots = sum[sum.length - 1]; // Number of fired shots

    // arrows hits coordinates

    let coordObj = [];
    let errQuart = []; // error tags 2D array
    let errList = []; // 1D error 'list'

    this.state.series.map((e, i) => {

      coordObj.push(e.coordinates);

      if (e.errors) {
        errQuart.push(e.errors);
      }
    });

    let upperL = [];
    let up = [];
    let upperR = [];
    let left = [];
    let right = [];
    let lowerL = [];
    let low = [];
    let lowerR = [];

    for (let i = 0; i < errQuart.length; i++) {
      for (let j = 0; j < errQuart[i].length; j++) {
        errList.push(errQuart[i][j]);
      }
    }

    errList.map(e => {
      if (e === 'UL') {
        upperL.push(e);
      } else if (e === 'U') {
        up.push(e);
      } else if (e === 'UR') {
        upperR.push(e);
      } else if (e === 'L') {
        left.push(e);
      } else if (e === 'R') {
        right.push(e);
      } else if (e === 'LL') {
        lowerL.push(e);
      } else if (e === 'Lo') {
        low.push(e);
      } else if (e === 'LR') {
        lowerR.push(e);
      }
    });

    let statCoords = []; // array of shot coordinates

    for (let i = 0; i < coordObj.length; i++) {
      for (let j = 0; j < coordObj[i].length; j++) {
        statCoords.push(coordObj[i][j]);
      }
    }

    // Calculate number of missed shots via error messages

    let errors = [];
    for (let i = 0; i < errQuart.length; i++) {
      for (let j = 0; j < errQuart[i].length; j++) {
        errors.push(errQuart[i][j]);
      }
    }

    let misses = errors.length;

    // Shot stats per Arrow

    let firstAcc = []; // Accuracy of 1st Arrow in all series as 0/1 number necessary for following calculations
    let secondAcc = []; // Accuracy of 2nd Arrow in all series as 0/1 number necessary for following calculations
    let thirdAcc = []; // Accuracy of 3rd Arrow in all series as 0/1 number necessary for following calculations
    let fourthAcc = []; // Accuracy of 4th Arrow in all series as 0/1 number necessary for following calculations

    seriesAcc.map((e, i) => {
      if (e[0] === 'ios-radio-button-off') {
        firstAcc.push(1);
      } else {
        firstAcc.push(0);
      }

      if (e[1] === 'ios-radio-button-off') {
        secondAcc.push(1);
      } else {
        secondAcc.push(0);
      }

      if (e[2] === 'ios-radio-button-off') {
        thirdAcc.push(1);
      } else {
        thirdAcc.push(0);
      }

      if (e[3] === 'ios-radio-button-off') {
        fourthAcc.push(1);
      } else {
        fourthAcc.push(0);
      }
    });

    //Show all shots markers

    let statShots = statCoords.map((e, i) => {
      if (i === 0 || i % 4 === 0) {
        return (<View key={i} style={{...styles.shotMarker, top: e.posY + 36, left: e.posX + 16, backgroundColor: 'red'}}/>)
      } else if (i === 1 || i % 4 === 1) {
        return (<View key={i} style={{...styles.shotMarker, top: e.posY + 36, left: e.posX + 16, backgroundColor: 'green'}} />);
      } else if (i === 2 || i % 4 === 2) {
        return (<View key={i} style={{...styles.shotMarker, top: e.posY + 36, left: e.posX + 16, backgroundColor: 'blue'}}/>)
      } else {
        return (<View key={i} style={{...styles.shotMarker, top: e.posY + 36, left: e.posX + 16, backgroundColor: 'violet'}}/>)
      }
    });


    //Shots error cause list
    let errHeader = '';
    let errMessage = `Reasons Your arrows hits randomly:\n\u2022 Too much tension is placed in the hands when shooting\n \u2022 There is too much slack in the body`;

    if (this.state.upperLColor === 'rgba(255, 0, 0, 0.55)') {
      errMessage = '';
    } else if (this.state.upColor === 'rgba(255, 0, 0, 0.55)') {
      errHeader = <Text style={{fontWeight: 'bold'}}>Reasons Your arrows hits above the mato:</Text>;
      errMessage = `\n\n\u2022 Ashibumi is too wide\n\u2022 The right side of pelvis is too high\n\u2022 The upper body is tilted toward the target\n\u2022 The upper body is tilted to the right\n\u2022 The arrow is held too low on the face\n\u2022 The right elbow is held too low in kai\n\u2022 The left wrist is bent upward in kai\n\u2022 The left arm lifts at the hanare\n\u2022 The grip is held too high at nigiri\n`;
    } else if (this.state.upperRColor === 'rgba(255, 0, 0, 0.55)') {
      errHeader = <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Reasons Your arrows hits above and to the right of the mato:</Text>;
      errMessage = `\n\n\u2022 The upper body leans to the right\n\u2022 At hanare the arms are moved upward\n`;
    } else if (this.state.leftColor === 'rgba(255, 0, 0, 0.55)') {
      errHeader = <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Reasons Your arrows hits left of the mato:</Text>;
      errMessage = `\n\n\u2022 The right elbow is forward in kai\n\u2022 The right arm gives in at the release\n\u2022 The left wrist is bent to the left\n\u2022 The left foot is set behind the center line\n\u2022 The pelvis is twisted to the left out of the horizontal\n\u2022 The left hand pushes to fast in drawing\n`;
    } else if (this.state.rightColor === 'rgba(255, 0, 0, 0.55)') {
      errHeader = <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Reasons Your arrows hits right of the mato:</Text>;
      errMessage = `\n\n\u2022 The tenouchi is weak\n\u2022 The left wrist is bent to the right\n\u2022 The left arm gives in at the release\n\u2022 The right foot is set behind the center line\n\u2022 The pelvis is twisted to the right out of the center line\n`;
    } else if (this.state.lowerLColor === 'rgba(255, 0, 0, 0.55)') {
      errHeader = <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Reasons Your arrows hits below and to the left of the mato:</Text>;
      errMessage = `\n\n\u2022 The upper body leans toward the target\n\u2022 Moving the right hand back at hanare\n`;
    } else if (this.state.lowColor === 'rgba(255, 0, 0, 0.55)') {
      errHeader = <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Reasons Your arrows hits below the mato:</Text>;
      errMessage = `\n\n\u2022 The arrow is held too hight on the face\n\u2022 The right elbow is held too high in kai\n\u2022 The left wrist is bent downward\n\u2022 The left arm drops at the hanare\n\u2022 Ashibumi is too narrow\n\u2022 The grip is held too low at nigiri\n\u2022 The left side of the pelvis is too high\n\u2022 The upper body is tilted toward the target\n\u2022 The left shoulder is too low\n\u2022 The right shoulder is too far forward\n\u2022 The bow is not drawn far enough\n\u2022 The hozuke is too low\n\u2022 Wrong yugaeri resulting from opening the bow hand\n\u2022 Moving the right elbow back at hanare`;
    } else if (this.state.lowerRColor === 'rgba(255, 0, 0, 0.55)') {
      errHeader = <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Reasons Your arrows hits below and to the right of the mato:</Text>;
      errMessage = `\n\n\u2022 The angle of the feet is too great\n\u2022 The upper body is leaning forward\n\u2022 The left wrist is bent too far toward the back of the hand\n\u2022 The bow is not perpendicular\n\u2022 The wrist is bent outward\n\u2022 Wrong midpoint of turning the bow`;
    }

    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(2019, 1, 1);
    const maxDate = new Date(2021, 6, 3);
    const startDate  =  selectedStartDate ? selectedStartDate.startOf('day').valueOf() : '';
    const endDate = selectedEndDate ? selectedEndDate.endOf('day').valueOf() : '';

    let headerMessage = '';

    if(this.state.selectedStartDate === null) {
      headerMessage = 'Statistics for all shots'
    } else {
      headerMessage = `Stats for shots from: ${moment(this.state.selectedStartDate).format('DD MM YYYY')} to: ${moment(this.state.selectedEndDate).format('DD MM YYYY')}`
    }

    return (
      <>
        <View
          style={{
            flex: 6,
            alignItems: 'center',
            zIndex: 1,
            justifyContent: 'flex-end',
            paddingBottom: 24
          }}
        >
          {statShots}

          <Svg width='90%' height='90%' viewBox='0 0 100 100'>
            <Rect disabled='true' width={100} height={100} fill='rgb(49, 50, 47)' />
            <Circle disabled='true' x={23} y={23} r={23} cx={27} cy={40} fill='black' />
            <Circle disabled='true' x={18} y={18} r={18} cx={32} cy={45} fill='white' />
            <Circle disabled='true' x={14} y={14} r={14} cx={36} cy={49} fill='black' />
            <Circle disabled='true' x={12} y={12} r={12} cx={38} cy={51} fill='white' />
            <Circle disabled='true' x={8} y={8} r={8} cx={42} cy={55} fill='black' />
            <Circle disabled='true' x={4} y={4} r={4} cx={46} cy={59} fill='white' />
          </Svg>
          <MaterialIcon style={{position: 'absolute', top: 5, right: 5}} name='help-circle' size={35} color='gray' onPress={() => {this.showInfoModal()}}/>
        </View>
        <View style={{flex: 4}}>

        <View style={styles.dateChoice}>
          <MaterialIcon name='calendar-range-outline' size={45} color='rgb(255, 57, 57)' onPress={() => {
            this.setState({
              showCalendarModal: true
            })
          }} />
          <Text style={{fontSize: 14, alignSelf: 'center', flexGrow: 1}}>{headerMessage}</Text>
        </View>
          <View style={styles.statsView}>
            <Text style={styles.statText}>{typeof shots === 'number' ? `${`Shots:\n${shots}`}` : `${`Shots:\n0`}`}</Text>
            <Text style={styles.statText}>{typeof shots === 'number' ? `Hits:\n${shots - misses}`: `Hits:\n0`}</Text>
            <Text style={styles.statText}> {`Misses:\n${misses}`}</Text>
            <Text style={styles.statText}>{typeof shots === 'number' ? `Accuracy:\n${(((shots - Number(errors.length)) / shots) *100).toFixed(0)}%` : `Accuracy:\n0%`}</Text>
          </View>
          <View style={styles.statsView}>
            <Text style={{...styles.statText, color: 'red' }}>{`1st\narrow\naccuracy`}</Text>
            <Text style={{...styles.statText, color: 'green'}}>{`2nd\narrow\naccuracy`}</Text>
            <Text style={{...styles.statText, color: 'blue'}}>{`3rd\narrow\naccuracy`}</Text>
            <Text style={{...styles.statText, color: 'violet'}}>{`4th\narrow\naccuracy`}</Text>
          </View>
          <View style={styles.statsView}>
          <Text style={{...styles.statText, color: 'red'}}>{firstAcc.length > 0 ? `${(((firstAcc.reduce(function(a, b) { return a + b; }, 0)) / firstAcc.length) * 100).toFixed(0)}` : '0'}%</Text>
          <Text style={{...styles.statText, color: 'green'}}>{firstAcc.length > 0 ? `${(((secondAcc.reduce(function(a, b) { return a + b; }, 0)) / secondAcc.length) * 100).toFixed(0)}` : '0'}%</Text>
          <Text style={{...styles.statText, color: 'blue'}}>{firstAcc.length > 0 ? `${(((thirdAcc.reduce(function(a, b) { return a + b; }, 0)) / thirdAcc.length) * 100).toFixed(0)}` : '0'}%</Text>
          <Text style={{...styles.statText, color: 'violet'}}>{firstAcc.length > 0 ? `${(((fourthAcc.reduce(function(a, b) { return a + b; }, 0)) / fourthAcc.length) * 100).toFixed(0)}` : '0'}%</Text>
          </View>
        </View>
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View
            style={{
              marginTop: 22,
              width: '92%',
              height: '95%',
              backgroundColor: 'rgba(85, 85, 85, 0.98)',
              marginLeft: '4%',
              paddingTop: 10,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10
            }}
          >
            <View
              style={{
                flex: 4,
                alignItems: 'center'
              }}
            >
              <Svg width='90%' height='90%' viewBox='0 0 100 100'>
              <Rect disabled='true' width={100} height={100} fill='rgb(49, 50, 47)' />
              <Rect
                disabled='true'
                width={33}
                height={51}
                fill={this.state.upperLColor}
              />
              <Rect
                disabled='true'
                width={37}
                height={50}
                x={32}
                fill={this.state.upColor}
              />
              <Rect
                disabled='true'
                width={32}
                height={51}
                x={68}
                fill={this.state.upperRColor}
              />
              <Rect
                disabled='true'
                width={50}
                height={27}
                y={50}
                fill={this.state.leftColor}
              />
              <Rect
                disabled='true'
                width={50}
                height={27}
                y={50}
                x={51}
                fill={this.state.rightColor}
              />
              <Rect
                disabled='true'
                width={33}
                height={24}
                y={76}
                fill={this.state.lowerLColor}
              />
              <Rect
                disabled='true'
                width={36}
                height={24}
                x={32}
                y={76}
                fill={this.state.lowColor}
              />
              <Rect
                disabled='true'
                width={33}
                height={24}
                x={67}
                y={76}
                fill={this.state.lowerRColor}
              />
              <Circle disabled='true' x={23} y={23} r={23} cx={27} cy={40} fill='black' />
              <Circle disabled='true' x={18} y={18} r={18} cx={32} cy={45} fill='white' />
              <Circle disabled='true' x={14} y={14} r={14} cx={36} cy={49} fill='black' />
              <Circle disabled='true' x={12} y={12} r={12} cx={38} cy={51} fill='white' />
              <Circle disabled='true' x={8} y={8} r={8} cx={42} cy={55} fill='black' />
              <Circle disabled='true' x={4} y={4} r={4} cx={46} cy={59} fill='white' />
              <TSpan
                fill='white'
                fontSize="13"
                x="15"
                y="25"
                textAnchor="middle"
                >{upperL.length}</TSpan>
              <TSpan
                fill='white'
                fontSize="13"
                x="50"
                y="25"
                textAnchor="middle"
                >{up.length}</TSpan>
              <TSpan
                fill='white'
                fontSize="13"
                x="85"
                y="25"
                textAnchor="middle"
                >{upperR.length}</TSpan>
              <TSpan
                fill='white'
                fontSize="13"
                x="15"
                y="68"
                textAnchor="middle"
                >{left.length}</TSpan>
              <TSpan
                fill='white'
                fontSize="13"
                x="85"
                y="68"
                textAnchor="middle"
                >{right.length}</TSpan>
              <TSpan
                fill='white'
                fontSize="13"
                x="15"
                y="93"
                textAnchor="middle"
                >{lowerL.length}</TSpan>
              <TSpan
                fill='white'
                fontSize="13"
                x="50"
                y="97"
                textAnchor="middle"
                >{low.length}</TSpan>
              <TSpan
                fill='white'
                fontSize="13"
                x="85"
                y="93"
                textAnchor="middle"
                >{lowerR.length}</TSpan>
              </Svg>
            </View>
            <View
              style={{
                flex: 8,
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  flexDirection: 'row'
                }}
              >
              </View>
              <ScrollView>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'white',
                    lineHeight: 35
                  }}
                >
                  {errHeader}
                  {errMessage}
                </Text>
              </ScrollView>
            </View>
            <Icon
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              name='close'
              size={40}
              color='black'
              style={{
                position: 'absolute',
                top: 6,
                right: 10
              }}
            />
          </View>
        </Modal>

        <CalendarModal visible={this.state.showCalendarModal} style={styles.calendarModal} >

            <View >
              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                minDate={minDate}
                maxDate={maxDate}
                todayBackgroundColor="rgb(255, 57, 57)"
                selectedDayColor="rgb(255, 57, 57)"
                selectedDayTextColor="#FFF"
                onDateChange={this.onDateChange}
              />
            </View>
            <Button title='ACCEPT' type='solid' containerStyle={{width: '90%', alignSelf: 'center'}} buttonStyle={{backgroundColor: 'rgb(245, 71, 71)'}} onPress={() => {
              this.setState({
                showCalendarModal: false
              })
            }}/>
        </CalendarModal>

        <InfoModal style={styles.infoModal} visible={this.state.showInfoModal}>
        <Button title='Close' onPress={() => {this.hideInfoModal()}} >
        </Button>
        </InfoModal>

        {upperL.length > 10 || up.length > 10 || upperR.length > 10 || left.length > 10 || right.length > 10 || lowerL.length > 10 || low.length > 10 || lowerR.length > 10 ? (
          <Icon
            style={styles.teacherIcon}
            onPress={() => {
              this.handleModal();
            }}
            name='message1'
            size={50}
            color='white'
          />
        ) : null}

      </>
    );
  }
}

const styles = StyleSheet.create({
  statText: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center'
  },
  statsView: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 4,
    paddingRight: 4,
    justifyContent: 'space-around'
  },
  teacherIcon: {
    position: 'absolute',
    bottom: '44%',
    right: 35,
    zIndex: 3
  },
  shotMarker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    zIndex: 2,
  },
  calendarModal: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    width: '100%',
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0
  },
  dateChoice: {
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoModal: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    width: '100%',
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0
  },
});
