import React, { Component } from "react";
import { View, Platform } from "react-native";
import { connect } from 'react-redux';
import { Button } from 'react-native-elements'
import { clearLikedJobs } from '../actions';

class SettingScreen extends Component {


  render() {
    return (
      <View>
        <Button 
          title ="Reset Liked Jobs"
          large
          icon = {{ name:'delete-forever' }}
          backgroundColor='#F44336'
          onPress={this.props.clearLikedJobs}
          style={{marginTop:40}}
        />
      </View>
    );
  }
}

export default connect(null, { clearLikedJobs })(SettingScreen);


