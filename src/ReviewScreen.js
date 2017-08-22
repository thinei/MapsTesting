import React, { Component } from 'react';
import { Text, View, ScrollView, Linking, Platform } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import  MapView from 'react-native-maps';

class ReviewScreen extends Component {
  static navigationOptions = {
    title: "Review Jobs",
    tabBarIcon: ({tintColor}) => 
      <Icon name='favorite' size={26} color={tintColor} />
  };
  
renderLikedJobs() {
  return this.props.likedJobs.map( job => {

    //Destructuring
    const { company, formattedRelativeTime, url, 
            longitude, latitude, jobtitle, jobkey } = job;
    const initialRegion = {
      longitude,
      latitude,
      latitudeDelta:0.045,    //zoom level of the map
      longitudeDelta: 0.02    //zoom level of the map
    };

    return(
      <Card title = {jobtitle} 
            key = {jobkey}>
        <View style={{height: 250}}>
          <MapView
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            scrollEnabled={false}
            initialRegin={initialRegion}
            />
          <View style={styles.detailWrapper}>
            <Text style={styles.italics}>{company}</Text>
            <Text style={styles.italics}>{formattedRelativeTime}</Text>
          </View>
          <Button
            title="Apply Now!"
            backgroundColor="#03A9F4"
            onPress={() => Linking.openURL(url)}
          />
        </View>
      </Card>
    );
  });
}

  render() {
    const { navigate } = this.props.navigation;
    return (
      
      <ScrollView>
        <Button
          title="Settings"
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(0,122,255,1)"
          onPress={() => navigate("setting")}
        />
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
}

function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
