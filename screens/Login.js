import React from 'react';
import { StyleSheet, Text, TextInput, View, ImageBackground } from 'react-native';
import {Button} from 'react-native-elements';
import firebase from 'react-native-firebase';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: null
  }

  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <ImageBackground style={ styles.imgBackground }
              resizeMode='contain'
              source={require('../img/background_mon.png')}>
      <View style={styles.container}>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="EMAIL"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="PASSWORD"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} containerStyle={{width: 200, marginTop: 30}} buttonStyle={{backgroundColor: 'rgb(245, 66, 66)'}}/>
        <Text style={styles.text}>Don't have an account?</Text>
        <Button
          title="Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
          containerStyle={{width: 200, marginTop: 30}} buttonStyle={{backgroundColor: 'rgb(245, 66, 66)'}}
        />
      </View>
      </ImageBackground>
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
    textAlign: 'center',
    color: 'black',
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 10
  },
  imgBackground: {
      width: '100%',
      height: '100%',
      flex: 1,
},
  text: {
    color: 'black',
    fontSize: 20,
    marginTop: 30
  }
})
