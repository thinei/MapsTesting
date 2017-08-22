import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import  MapView from 'react-native-maps';
import { connect } from 'react-redux'
import Swipe from '../components/Swipe'
import { Card, Button, Icon } from 'react-native-elements'
import * as actions from '../actions'

class DeckScreen extends Component {

   static navigationOptions = {
    title: 'Jobs',
    tabBarIcon: ({tintColor}) => 
      <Icon name='description' size={28} color={tintColor} />
  }

  renderCard(job) {

  const initialRegion = {
    longitude: job.longitude,
    latitude: job.latitude,
    latitudeDelta: 0.045,
    longitudeDelta: 0.02

  }

    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex:1 }}
            cacheEnabled={Platform.OS === 'android' ? true : false }
            initialRegion={initialRegion}
          >
        </MapView>
        </View>
      
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
          <Text>
            {job.snippet.replace(/<b>/g,'').replace(/<\/b/g,'')}
          </Text>
        
      </Card>
    )
  }

  renderNoMoreCards= () => {
    return (
      <Card title="No More Jobs">
        <Button 
        title="Back To Map"
        large
        icon={{ name: 'my-location'}}
        backgroundColor='#03A9F4'
        onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={{marginTop:10}}>
        <Swipe 
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards.bind(this)}
          keyProp="jobkey"
          // likeJob => from job_actions.js
          onSwipeRight={job => this.props.likeJob(job)}  
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
}

// jobs => from reducer
function mapStateToProps({ jobs }) {
  return { jobs : jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);