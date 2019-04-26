import React from 'react';
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native';
import firebase from 'react-native-firebase';

export default class Main extends React.Component {
  state = {
    currentUser: null
  }

  handleLogout = () => {
    firebase.auth().signOut();
  }

render() {
    const { currentUser } = this.state;

return (
      <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        <Button title="Log Out" onPress={this.handleLogout} />
      </View>
    )
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
