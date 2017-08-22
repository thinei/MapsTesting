import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Icon from 'react-native-vector-icons/FontAwesome'
const FBSDK = require('react-native-fbsdk');

const {
    LoginButton, LoginManager,
    AccessToken,
    ShareDialog,
  } = FBSDK;

class AuthScreen extends Component {

    constructor(props){
      super(props)
    }
    componentDidMount(){
     
      this.props.facebookLogin()
      console.log(this.props)
      this.onAutoComplete(this.props)
    }

    componentWillReceiveProps(nextProps) {
      this.onAutoComplete(nextProps);
    }

    onAutoComplete(props){
      //console.log(props)
      if(props.token){
        this.props.navigation.navigate('map')
      }
    }

    render(){
      return(
        <View/>
      )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    shareText: {
      fontSize: 20,
      margin: 10,
    },
  });

function mapStateToProps(state){
  
  const token  = state.auth.token
  
  return { token }
}
export default connect(mapStateToProps, actions)(AuthScreen);