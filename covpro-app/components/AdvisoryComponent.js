import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { fetchUserData } from "../redux/user/userActions";
import Icon from "react-native-vector-icons/EvilIcons";

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: (userId) => dispatch(fetchUserData(userId)),
});

class AdvisoryComponent extends Component {
  render() {
    return (
      <View style={{ height: "auto" }}>
        <Text style={styles.recommend}>Recommendations</Text>
        <View style={styles.postContentPositive}>
          <Text style={styles.infectedCovid}>
            You're infected with COVID-19!
          </Text>
          <Text style={styles.isolateYourself}>
            Isolate yourself for 14 days.
          </Text>
          <Text style={styles.srfVerify}>
            SRF verification : {this.props.user.data.profileStatus}
          </Text>
          <View style={{ position: "relative", flexDirection: "row" }}>
            <Text style={styles.hospitalDetails}>Hospital Assigned</Text>
            <Icon
              style={{ marginTop: 5, marginLeft: 5 }}
              name="refresh"
              size={30}
              color="#0198a2"
              onPress={() => {
                this.props.fetchUserData(this.props.user.data.userId);
              }}
            />
          </View>
          <Text style={styles.hospital}>{this.props.user.data.hospital}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContentPositive: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    borderLeftWidth: 3,
    borderLeftColor: "#da1e28",
  },
  isolateYourself: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#da1e28",
  },
  hospitalDetails: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
    textDecorationLine: "underline",
    fontWeight: "bold",
    color: "#1C8D73",
  },
  hospital: {
    color: "#333333",
    fontSize: 14,
  },
  srfVerify: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infectedCovid: {
    color: "#da1e28",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
  },
  recommend: {
    marginBottom: 10,
    fontWeight: "bold",
    marginRight: 160,
    marginTop: 10,
    fontSize: 14,
    color: "#393939",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvisoryComponent);
