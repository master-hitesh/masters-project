import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import { connect } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeComponent from "./HomeComponent";
import HealthDataComponent from "./HealthDataComponent";
import ChatComponent from "./ChatComponent";

const mapStateToProps = (state) => {
  console.log("MainComponent State --> ", state);
  return {
    user: state,
  };
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

class MainComponent extends Component {
  constructor(props) {
    super(props);
    console.log("Props ---> ", props);
  }

  render() {
    if (this.props.user.data && this.props.user.data.userId != null) {
      return (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeComponent} />
            <Tab.Screen name="HealthData" component={HealthDataComponent} />
            <Tab.Screen name="Chat" component={ChatComponent} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginComponent} />
            <Stack.Screen name="Register" component={RegisterComponent} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}

export default connect(mapStateToProps)(MainComponent);
