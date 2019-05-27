import React from 'react';
import firebase from 'react-native-firebase';

import {FlatList, ScrollView, View, Text, ImageBackground, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import AddSerie from './AddSerie';
import Stats from './Stats';
import Logout from './Logout';
import Serie from './Serie';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.uid = firebase.auth().currentUser.uid;
    this.ref = firebase
      .firestore()
      .collection(this.uid)
      .orderBy('timestamp', 'desc')
      // .startAt(new Date(2019, 4, 26, 23, 0, 0, 0))
      // .endAt(new Date(2019, 4, 26, 0, 0, 0, 0))
    this.unsubscribe = null;
    this.state = {
      series: [],
      loading: true,
      showModal: false
    };
  }

  onCollectionUpdate = querySnapshot => {
    const series = [];
    querySnapshot.forEach(doc => {
      const { date, accuracy, coordinates, modalVisible, note, timestamp } = doc.data();

      series.push({
        key: doc.id,
        doc, // DocumentSnapshot
        date,
        accuracy,
        coordinates,
        modalVisible,
        note
      });

    //  console.log(timestamp);
    });

    this.setState({
      series: series,
      loading: false
    });
  };

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

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <>
        <ImageBackground
          style={styles.imgBackground}
          resizeMode='contain'
          source={require('../img/background_mon.png')}
        >
          <View style={styles.mainWindow}>
            <FlatList
              data={this.state.series}
              renderItem={({ item }) => <Serie {...item} />}
            />
            <Icon
              style={{ position: 'absolute', bottom: 20, right: 20 }}
              name='ios-add-circle'
              size={60}
              color='rgb(255, 57, 57)'
              onPress={() => this.props.navigation.navigate('AddSerie')}
            />
            <Icon style={{position: 'absolute', top: 0, right: 5}} name='ios-help-circle' size={35} color='gray' onPress={() => {this.showModal()}}/>
          </View>
        </ImageBackground>
        <Modal animationType='fade' transparent={true} visible={this.state.showModal} >
          <TouchableOpacity activeOpacity={1} onPress={() => {this.hideModal()}} >
            <View style={styles.modalView}>
              <View style={styles.serieRow}>
                <Text style={{fontSize: 22, color: 'black'}}>12.05.2019</Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon name='ios-radio-button-off' size={30} style={styles.listIcon} />
                  <Icon name='ios-radio-button-off' size={30} style={styles.listIcon} />
                  <Icon name='ios-radio-button-off' size={30} style={styles.listIcon} />
                  <Icon name='ios-radio-button-off' size={30} style={styles.listIcon} />
                </View>
              </View>
              <View style={{flexDirection:'row', alignItems: 'flex-end'}}>
                  <ModalIcon name='gesture-tap' size={40} color='rgb(255, 57, 57)'/>
                  <Text style={styles.modalText}>Tap to view details</Text>
              </View>

                <View style={{...styles.serieRow, marginTop: 60}}>
                  <Text style={{fontSize: 22, color: 'black'}}>12.05.2019</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon name='ios-radio-button-off' size={30} style={styles.listIcon} />
                    <Icon name='ios-radio-button-off' size={30} style={styles.listIcon} />
                    <Icon name='ios-radio-button-off' size={30} style={styles.listIcon} />
                    <Icon name='ios-radio-button-off' size={30} style={styles.listIcon} />
                  </View>
                </View>
                <View style={{flexDirection:'row', alignItems: 'flex-end'}}>
                <ModalIcon name='gesture-tap-hold' size={40} color='rgb(255, 57, 57)'/>
                <Text style={styles.modalText}>Tap and hold to delete serie</Text>
                </View>
            </View>
          </TouchableOpacity>
        </Modal>
          {/*<Calendar
            // Initially visible month. Default = Date()
            current={'2019-05-27'}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2019-05-01'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2020-05-31'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day) => {console.log('selected day', day)}}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => {console.log('selected day', day)}}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {console.log('month changed', month)}}
            // Hide month navigation arrows. Default = false
            hideArrows={true}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={(direction) => (<Arrow />)}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
          />*/}
      </>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Main: Main,
    Stats: Stats,
    Logout: Logout
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
          iconName = `${focused ? 'ios-exit' : 'ios-log-in'}`;
        }
        return <IconComponent name={iconName} size={40} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'rgb(245, 71, 71)',
      inactiveTintColor: 'rgb(190, 134, 134)',
      showLabel: false
    }
  }
);

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  mainWindow: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
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
    color: 'white'
  },
  serieRow: {
    height: 60,
    marginTop: 3,
    marginLeft: 5,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '98%'
  },
  listIcon: {
    color: 'black',
    textAlign: 'center',
    width: 30
  },
});
