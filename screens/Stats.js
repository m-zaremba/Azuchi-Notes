import React from 'react';
import { Text, View, Button, ImageBackground, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';
import Svg, { Rect, Circle } from 'react-native-svg';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/AntDesign';

export default class Stats extends React.Component {
   constructor(props) {
   super(props);
   this.ref = firebase.firestore().collection('series');
   this.state = {
     series: [],
     loading: true,
     modalVisible: false,
   }
   }

   onCollectionUpdate = (querySnapshot) => {
    const series = [];
    querySnapshot.forEach((doc) => {
      const { accuracy, coordinates, errors } = doc.data();

      series.push({
        doc, // DocumentSnapshot
        accuracy,
        coordinates,
        errors,
      });
    });

    this.setState({
      series: series,
      loading: false,
   });
  }

  handleModal = () => {
    this.setState({
      modalVisible: true,
    })
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: false,
    });
  }


   componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
   }

   componentWillUnmount() {
    this.unsubscribe();
   }

   render(){

     // All shots counter

     let seriesAcc = []; // All shots accuracy tags
     let sum = [];

     this.state.series.map((e,i) => {
       seriesAcc.push(e.accuracy);
       sum.push(e.accuracy.length*(i+1));
     })

     let shots = sum[sum.length-1]; // Number of fired shots


     // arrows hits coordinates

     let coordObj = [];
     let errQuart = []; // error tags 2D array
     let errList = []; // 1D error 'list'
     this.state.series.map((e,i) => {
       coordObj.push(e.coordinates);

       if(e.errors){
         errQuart.push(e.errors);
       }
     })

     let upperL = [];
     let upperR = [];
     let lowerL = [];
     let lowerR = [];

     for(let i = 0; i < errQuart.length; i++){
       for(let j = 0; j < errQuart[i].length; j++){
         errList.push(errQuart[i][j]);
       }
     }

     errList.map(e => {
       if(e === 'UL') {
         upperL.push(e)
       } else if (e === 'UR') {
         upperR.push(e)
       } else if (e === 'LL') {
         lowerL.push(e)
       } else if (e === 'LR') {
         lowerR.push(e)
       }
     })


     let statCoords = []; // array of shot coordinates

     for(let i = 0; i < coordObj.length; i++){
       for(let j = 0; j < coordObj[i].length; j++){

         statCoords.push(coordObj[i][j]);
       }
     }


    // Calculate number of missed shots via error messages

    let errors = [];
    for(let i = 0; i < errQuart.length; i++){
      for(let j = 0; j < errQuart[i].length; j++){

        errors.push(errQuart[i][j]);
      }
    }

    let misses = errors.length;


    // Shot stats per Arrow

    let firstAcc = []; // Accuracy of 1st Arrow in all series as 0/1 number necessary for following calculations
    let secondAcc = []; // Accuracy of 2nd Arrow in all series as 0/1 number necessary for following calculations
    let thirdAcc = []; // Accuracy of 3rd Arrow in all series as 0/1 number necessary for following calculations
    let fourthAcc = []; // Accuracy of 4th Arrow in all series as 0/1 number necessary for following calculations

    seriesAcc.map((e,i) => {
      if(e[0] === 'circle') {
        firstAcc.push(1);
      } else {
        firstAcc.push(0);
      }

      if(e[1] === 'circle') {
        secondAcc.push(1);
      } else {
        secondAcc.push(0);
      }

      if(e[2] === 'circle') {
        thirdAcc.push(1);
      } else {
        thirdAcc.push(0);
      }

      if(e[3] === 'circle') {
        fourthAcc.push(1);
      } else {
        fourthAcc.push(0);
      }
    });

    //Show all shots markers

      let statShots = statCoords.map((e,i) => {
       if(i === 0 || i%4 === 0) {
         return (<View key={i} style={{width: 10, height: 10, borderRadius: 5, position: 'absolute', top: e.posY - 7, left: e.posX + 15, backgroundColor: 'red', zIndex: 2}}/>)
       } else if (i === 1 || i%4 === 1) {
         return (<View key={i} style={{width: 10, height: 10, borderRadius: 5, position: 'absolute', top: e.posY - 7, left: e.posX + 15, backgroundColor: 'green', zIndex: 2}}/>)
       } else if (i === 2 || i%4 === 2) {
         return (<View key={i} style={{width: 10, height: 10, borderRadius: 5, position: 'absolute', top: e.posY - 7, left: e.posX + 15, backgroundColor: 'blue', zIndex: 2}}/>)
       } else {
         return (<View key={i} style={{width: 10, height: 10, borderRadius: 5, position: 'absolute', top: e.posY - 7, left: e.posX + 15, backgroundColor: 'violet', zIndex: 2}}/>)
       }
      });

     return (
       <>
       <View style={{flex: 6, alignItems: 'center', zIndex: 1, paddingTop: 20}}>

       {statShots}

       <Svg width='90%' height='90%' viewBox='0 0 100 100'>
         <Rect
           disabled='true'
           width={100}
           height={100}
           fill='rgb(49, 50, 47)'
         />
         <Circle
           disabled='true'
           x={24}
           y={24}
           r={24}
           cx={26}
           cy={26}
           fill='black'
         />
         <Circle
           disabled='true'
           x={18}
           y={18}
           r={18}
           cx={32}
           cy={32}
           fill='white'
         />
         <Circle
           disabled='true'
           x={14}
           y={14}
           r={14}
           cx={36}
           cy={36}
           fill='black'
        />
         <Circle
           disabled='true'
           x={12}
           y={12}
           r={12}
           cx={38}
           cy={38}
           fill='white'
         />
         <Circle
           disabled='true'
           x={8}
           y={8}
           r={8}
           cx={42}
           cy={42}
           fill='black'
         />
         <Circle
           disabled='true'
           x={4}
           y={4}
           r={4}
           cx={46}
           cy={46}
           fill='white'
         />
       </Svg>
       </View>
       <View style={styles.statsView}>
        <Text style={styles.statText}>{typeof shots === 'number' ? `${`Shots:\n${shots}`}` : `${`Shots:\n0`}`}</Text>
        <Text style={styles.statText}>{typeof shots === 'number' ? `Hits:\n${shots - misses}` : `Hits:\n0`}</Text>
        <Text style={styles.statText}>{`Misses:\n${misses}`}</Text>
        <Text style={styles.statText}>{typeof shots === 'number' ? `Accuracy:\n${(((shots - Number(errors.length))/ shots) * 100).toFixed(0)}%` : `Accuracy:\n0%`}</Text>
       </View>
       <View style={styles.statsView}>
       <Text style={styles.statText}>{`1st \n accuracy`}</Text>
       <Text style={styles.statText}>{`2nd \n accuracy`}</Text>
       <Text style={styles.statText}>{`3rd \n accuracy`}</Text>
       <Text style={styles.statText}>{`4th \n accuracy`}</Text>
       </View>
         <View style={styles.statsView}>
         <Text style={styles.statText}>{firstAcc.length > 0 ? `${(((firstAcc.reduce(function(a, b) { return a + b; }, 0)) / firstAcc.length) * 100).toFixed(0)}` : '0'}%</Text>
         <Text style={styles.statText}>{firstAcc.length > 0 ? `${(((secondAcc.reduce(function(a, b) { return a + b; }, 0)) / secondAcc.length) * 100).toFixed(0)}` : '0'}%</Text>
         <Text style={styles.statText}>{firstAcc.length > 0 ? `${(((thirdAcc.reduce(function(a, b) { return a + b; }, 0)) / thirdAcc.length) * 100).toFixed(0)}` : '0'}%</Text>
         <Text style={styles.statText}>{firstAcc.length > 0 ? `${(((fourthAcc.reduce(function(a, b) { return a + b; }, 0)) / fourthAcc.length) * 100).toFixed(0)}` : '0'}%</Text>
         </View>
         <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          >
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
          <View style={{marginTop: 22, width: '92%', height: '95%', backgroundColor: 'rgba(85, 85, 85, 0.95)', marginLeft: '4%', paddingTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
            <View>
              <Text style={{fontSize: 20, color: 'white'}}>{`Upper Left Qurter hits count = ${upperL.length} \n
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}</Text>
            </View>
          </View>
          </TouchableHighlight>
        </Modal>
        <Icon style={styles.teacherIcon}onPress={() => {this.handleModal()}} name='message1' size={40} color='white'/>
       </>
     )
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
     justifyContent:'space-around'
   },
   teacherIcon: {
     position: 'absolute',
     bottom: '45%',
     right: 45,
     zIndex: 3,
   }
 });
