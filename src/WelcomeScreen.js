import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Slides from '../components/Slides'

const slide_data = [
  { text : 'Welcome to react-native', color:'#f8caaf'}, 
  { text : 'I like challenge',color:'#e6e6fa'}, 
  { text : 'Come and join with us',color: '#86ffb6'}
  ];

class WelcomeScreen extends Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  } 
  render() {
    return (
      <Slides
      data = {slide_data} onComplete={this.onSlidesComplete}
      />
    );
  }
}

export default WelcomeScreen;

