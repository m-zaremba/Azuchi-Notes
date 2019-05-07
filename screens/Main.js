import React from 'react';
import firebase from 'react-native-firebase';

import { FlatList, ScrollView, View, Text, Image, ImageBackground, StyleSheet, TouchableHighlight } from 'react-native';
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import {Button} from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';

import AddSerie from './AddSerie';
import Stats from './Stats';
import Logout from './Logout';
import Serie from './Serie';

class Main extends React.Component {
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
      const { date, accuracy, coordinates, modalVisible } = doc.data();

      series.push({
        key: doc.id,
        doc, // DocumentSnapshot
        date,
        accuracy,
        coordinates,
        modalVisible,
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

     if (this.state.loading) {
    return null;
  }

     return (
       <>
       <ImageBackground style={ styles.imgBackground }
               resizeMode='contain'
               source={require('../img/background_mon.png')}>
       <View style={ styles.mainWindow }>
        <FlatList
          data={this.state.series}
          renderItem={({ item }) => <Serie {...item} />}
        />
        <Icon style={{position: 'absolute', bottom: 20, right: 20}}name='ios-add-circle' size={60} color='rgb(245, 66, 66)' onPress={() => this.props.navigation.navigate('AddSerie')}/>
       </View>
       </ImageBackground>
       </>

     )
   }
 }

const TabNavigator = createBottomTabNavigator(
  {
  Main: Main,
  Stats: Stats,
  Logout: Logout,
 },
 {
   defaultNavigationOptions: ({ navigation }) => ({
     tabBarIcon: ({ focused, horizontal, tintColor }) => {
       const { routeName } = navigation.state;
       let IconComponent = Icon;
       let iconName;
       if (routeName === 'Main') {
         iconName = `${focused ? 'ios-list-box' : 'ios-list'}`;
       } else if (routeName === 'Stats') {
         iconName = `${focused ? 'ios-stats' : 'md-stats'}`;
       } else if (routeName === 'Logout') {
         iconName = `${focused ? 'ios-log-out' : 'ios-log-in'}`;
       }
       return <IconComponent name={iconName} size={40} color={tintColor} />;
     },
   }),
   tabBarOptions: {
     activeTintColor: 'rgb(245, 66, 66)',
     inactiveTintColor: 'rgb(190, 134, 134)',
     showLabel: false,
   },
 }
);

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  imgBackground: {
      width: '100%',
      height: '100%',
      flex: 1,
},
  mainWindow: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
});
