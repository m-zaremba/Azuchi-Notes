import React from 'react'
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'
import Loading from './screens/Loading'
import SignUp from './screens/SignUp'
import Login from './screens/Login'
import Main from './screens/Main'

export default createAppContainer(createSwitchNavigator(
  {
    Load: Loading,
    SignUp: SignUp,
    Login: Login,
    Main: Main,
  },
  {
    initialRouteName: 'Load',
  }
));
