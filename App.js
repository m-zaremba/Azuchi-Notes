import React from 'react'
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import Loading from './screens/Loading';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Main from './screens/Main';
import AddSerie from './screens/AddSerie';

export default createAppContainer(createSwitchNavigator(
  {
    Load: Loading,
    Login: Login,
    SignUp: SignUp,
    Main: Main,
    AddSerie: AddSerie,
  },
  {
    initialRouteName: 'Load',
  }
));
