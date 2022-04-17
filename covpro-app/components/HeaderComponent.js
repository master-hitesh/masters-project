import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { logoutUser } from "../redux/user/userActions";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";

const mapStateToProps = (state) => {
  console.log("HeaderComponent State --> ", state);
  return {
    user: state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

class HeaderComponent extends Component {
  render() {
    return (
      <View style={styles.profile}>
        <View style={{ marginRight: 10 }}>
          <Image
            style={styles.imageStyle}
            source={require("../assets/profile.png")}
          />
        </View>
        <View style={{ marginRight: 10 }}>
          <Text style={styles.nameText}>{this.props.user.data.name}</Text>
          <Text style={styles.srfText}>
            SRF ID :{this.props.user.data.specimenId}
          </Text>
        </View>
        <View>
          <Icon
            name="logout"
            size={30}
            color="#0198a2"
            onPress={() => {
              this.props.logoutUser(this.props.user.data.userId);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    position: "relative",
    top: 0,
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: "#D3D3D3",
    backgroundColor: "#ffffff",
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
    height: 80,
    paddingTop: 10,
  },
  imageStyle: {
    width: 50,
    height: 50,
  },
  nameText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "bold",
  },
  srfText: {
    color: "#333333",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
