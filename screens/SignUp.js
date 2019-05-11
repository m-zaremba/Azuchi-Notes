import React from 'react';
import { StyleSheet, Text, TextInput, View, ImageBackground, Image } from 'react-native';
import {Button} from 'react-native-elements';
import firebase from 'react-native-firebase';

export default class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: null
  }

  handleSignUp = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }

render() {
    return (

      <View style={styles.container}>
      <Image
          style={{width: 300, height: 300}}
          source={require('../img/mon.png')}
        />
        {this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
        <TextInput
          placeholder='Email'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder='Password'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title='Sign Up' onPress={this.handleSignUp} containerStyle={{width: '90%', marginTop: 30}} buttonStyle={{backgroundColor: 'rgb(245, 71, 71)'}} />
        <Text style={styles.text}>Already have an account?</Text>
        <Button
          title='Login'
          onPress={() => this.props.navigation.navigate('Login')}
          containerStyle={{width: 100, marginTop: 30}} buttonStyle={{backgroundColor: 'rgb(245, 71, 71)'}}
        />
      </View>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  },
  textInput: {
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
})
