import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

export default class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 30}}>Loading</Text>
        <ActivityIndicator size={60} color='rgb(255, 57, 57)' />
      </View>
    )
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'Login')
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
