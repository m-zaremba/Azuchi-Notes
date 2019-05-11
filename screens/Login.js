import React from 'react';
import {StyleSheet, Text, TextInput, View, Image} from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'react-native-firebase';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: null
  };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

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
        <TextInput
          secureTextEntry
          style={styles.inputText}
          autoCapitalize='none'
          placeholder='Password'
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          title='Login'
          onPress={this.handleLogin}
          containerStyle={{ width: '90%', marginTop: 30 }}
          buttonStyle={{ backgroundColor: 'rgb(245, 71, 71)' }}
        />
        <Text style={styles.text}>Don't have an account?</Text>
        <Button
          title='Sign Up'
          onPress={() => this.props.navigation.navigate('SignUp')}
          containerStyle={{ width: 100, marginTop: 30 }}
          buttonStyle={{ backgroundColor: 'rgb(245, 71, 71)' }}
        />
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
