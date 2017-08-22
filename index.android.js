import React, { Component } from "react";
import { AppRegistry, StyleSheet, View } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import { Provider } from "react-redux";

import store from "./store";
import WelcomeScreen from "./src/WelcomeScreen";
import AuthScreen from "./src/AuthScreen";
import MapScreen from "./src/MapScreen";
import DeckScreen from "./src/DeckScreen";
import ReviewScreen from "./src/ReviewScreen";
import SettingScreen from "./src/SettingScreen";

export default class App extends Component {
  render() {
    const MainNavigator = TabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        main: {
          screen: TabNavigator(
            {
              map: { screen: MapScreen },
              deck: { screen: DeckScreen },
              review: {
                screen: StackNavigator({
                  review: { screen: ReviewScreen },
                  setting: { screen: SettingScreen }
                })
              }
            },
            {
              // following 3 lines are for android
              tabBarPosition: 'bottom',
              swipeEnabled: false,
              animationEnabled: false,

              tabBarOptions: {
                labelStyle: { fontSize: 12 },
                showIcon: true
              }
             
            }
          )
        }
      },
      {
        navigationOptions: {
          tabBarVisible: false
        },
        lazy: true
      }
    );
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});

AppRegistry.registerComponent("AnimationTest", () => App);
