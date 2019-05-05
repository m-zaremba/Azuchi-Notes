import React from 'react';
import { Text, View, Button, ImageBackground, StyleSheet } from 'react-native';
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
     let errQuart = [];
     this.state.series.map((e,i) => {
       coordObj.push(e.coordinates);

       if(e.errors){
         errQuart.push(e.errors);
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

    let firstAcc = []; // Accuracy of 1st Arrow as number
    let secondAcc = []; // Accuracy of 2nd Arrow as number
    let thirdAcc = []; // Accuracy of 3rd Arrow as number
    let fourthAcc = []; // Accuracy of 4th Arrow as number

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
    })


    //Show all shots markers

     let statShots = statCoords.map((e,i) => {
       return (<View key={i} style={{width: 10, height: 10, borderRadius: 5, position: 'absolute', top: e.posY - 7, left: e.posX + 15, backgroundColor: 'red', zIndex: 2}}/>)
     });


     return (
       <>
       <View style={{flex: 6, alignItems: 'center', zIndex: 1, paddingTop: 20}}>

       {statShots}

       <Svg width="90%" height="90%" viewBox="0 0 100 100">
         <Rect
           disabled='true'
           width={50}
           height={50}
           fill='rgb(49, 50, 47)'
         />
         <Rect
           disabled='true'
           width={50}
           height={50}
           x={49}
           fill='rgb(49, 50, 47)'
         />
         <Rect
           disabled='true'
           width={50}
           height={50}
           y={49}
           fill='rgb(49, 50, 47)'
         />
         <Rect
           disabled='true'
           width={50}
           height={50}
           y={49}
           x={49}
           fill='rgb(49, 50, 47)'
         />
         <Circle
           disabled='true'
           x={24}
           y={24}
           r={24}
           cx={26}
           cy={26}
           fill="black"
         />
         <Circle
           disabled='true'
           x={18}
           y={18}
           r={18}
           cx={32}
           cy={32}
           fill="white"
         />
         <Circle
           disabled='true'
           x={14}
           y={14}
           r={14}
           cx={36}
           cy={36}
           fill="black"
        />
         <Circle
           disabled='true'
           x={12}
           y={12}
           r={12}
           cx={38}
           cy={38}
           fill="white"
         />
         <Circle
           disabled='true'
           x={8}
           y={8}
           r={8}
           cx={42}
           cy={42}
           fill="black"
         />
         <Circle
           disabled='true'
           x={4}
           y={4}
           r={4}
           cx={46}
           cy={46}
           fill="white"
         />
       </Svg>
       </View>
       <View style={{flex: 1, flexDirection: 'row', paddingLeft: 4, PaddingRight: 10, justifyContent:'space-around', borderBottomColor: 'red', borderBottomWidth: 1}}>
        <Text style={{flex: 1, fontSize: 20, textAlign: 'center'}}>{typeof shots === 'number' ? `${`Shots:\n${shots}`}` : `${`Shots:\n0`}`}</Text>
        <Text style={{flex: 1, fontSize: 20, textAlign: 'center'}}>{typeof shots === 'number' ? `Hits:\n${shots - misses}` : `Hits:\n0`}</Text>
        <Text style={{flex: 1, fontSize: 20, textAlign: 'center'}}>{`Misses:\n${misses}`}</Text>
        <Text style={{flex: 1, fontSize: 20, textAlign: 'center'}}>{typeof shots === 'number' ? `Accuracy:\n${(((shots - Number(errors.length))/ shots) * 100).toFixed(0)}%` : `Accuracy:\n0%`}</Text>
       </View>
       <View style={{flex: 1, flexDirection: 'row', paddingLeft: 4, PaddingRight: 10, justifyContent:'space-around', alignItems: 'center'}}>
       <Text style={{flex: 1, fontSize: 20, textAlign: 'center'}}>{`1st \n accuracy`}</Text>
       <Text style={{flex: 1, fontSize: 20, textAlign: 'center'}}>{`2nd \n accuracy`}</Text>
       <Text style={{flex: 1, fontSize: 20, textAlign: 'center'}}>{`3rd \n accuracy`}</Text>
       <Text style={{flex: 1, fontSize: 20, textAlign: 'center'}}>{`4th \n accuracy`}</Text>
       </View>
         <View style={{flex: 1, flexDirection: 'row', paddingLeft: 4, PaddingRight: 10, justifyContent:'space-around'}}>
         <Text style={{flex: 1, fontSize: 20, textAlign: 'center'}}>{firstAcc.length > 0 ? `${(((firstAcc.reduce(function(a, b) { return a + b; }, 0)) / firstAcc.length) * 100).toFixed(0)}` : '0'}%</Text>
         <Text style={{flex: 1, fontSize: 20, textAlign: 'center'}}>{firstAcc.length > 0 ? `${(((secondAcc.reduce(function(a, b) { return a + b; }, 0)) / secondAcc.length) * 100).toFixed(0)}` : '0'}%</Text>
         <Text style={{flex: 1, fontSize: 20, textAlign: 'center'}}>{firstAcc.length > 0 ? `${(((thirdAcc.reduce(function(a, b) { return a + b; }, 0)) / thirdAcc.length) * 100).toFixed(0)}` : '0'}%</Text>
         <Text style={{flex: 1, fontSize: 20, textAlign: 'center'}}>{firstAcc.length > 0 ? `${(((fourthAcc.reduce(function(a, b) { return a + b; }, 0)) / fourthAcc.length) * 100).toFixed(0)}` : '0'}%</Text>
         </View>
       </>
     )
   }
 }

 const styles = StyleSheet.create({


 });
