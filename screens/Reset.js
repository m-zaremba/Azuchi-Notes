import React from 'react';
import firebase from 'react-native-firebase';
import {StyleSheet, Text, TextInput, View, Image} from 'react-native';
import { Button } from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'


export default class Reset extends React.Component {
  state = {
    email: '',
    errorMessage: null
  };

  handleReset = () => {
    const { email } = this.state;
    if(this.state.email != '') {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function (user) {
          alert('Please check your email.')
        }).catch(error => this.setState({ errorMessage: error.message }))
    } else {
      this.setState({
        errorMessage: 'Please enter your email address'
      })
    }

  }

  render() {

    return (
      <View style={styles.container}>
        <Image style={{ width: 300, height: 300 }} source={require('../img/mon.png')} />
        {this.state.errorMessage && (<Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>)}
        <TextInput
          style={styles.inputText}
          autoCapitalize='none'
          placeholder='Email'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Button
          title='Reset'
          onPress={this.handleReset}
          containerStyle={{ width: '90%', marginTop: 30 }}
          buttonStyle={{ backgroundColor: 'rgb(245, 71, 71)' }}
        />
        <MaterialIcon name='arrow-left-circle' style={{position: 'absolute', top: 5, left: 5}} size={35} color='grey' onPress={() => {
          this.props.navigation.navigate('Login')
        }} />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  },
  inputText: {
    color: 'black',
    height: 40,
    width: '90%',
    marginTop: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingLeft: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(245, 71, 71)'
  },
  text: {
    color: 'black',
    fontSize: 20,
    marginTop: 120
  }
});
