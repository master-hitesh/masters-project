import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../redux/user/userActions";
import { Loading } from "./LoadingComponent";

const mapStateToProps = (state) => {
  console.log("LoginComponent State --> ", state);
  return {
    user: state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginUser: (userObj) => dispatch(loginUser(userObj)),
  logoutUser: () => dispatch(logoutUser()),
});

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    console.log("LoginComponent Props ---> ", props);
    this.state = {
      id: "",
      password: "",
    };
  }

  componentDidUpdate() {
    console.log("LoginComponent componentDidUpdate");
    if (this.props.user.data && this.props.user.data.userId != null) {
      if (!this.props.user.data.success) {
        alert("Mobile number or password doesn't match.");
        this.props.logoutUser();
      } else {
        this.props.navigation.navigate("Home");
      }
    }
    if (this.props.user.error !== "") {
      alert(this.props.user.error);
      this.props.logoutUser();
    }
  }

  handelLogin() {
    const userObj = {
      id: this.state.id,
      password: this.state.password,
    };

    if (userObj.id.length !== 10) {
      alert("Please enter a valid 10 digit mobile number.");
      return false;
    }

    if (userObj.password.length !== 13) {
      alert("Please enter a valid password.");
      return false;
    }

    this.props.loginUser(userObj);
  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.props.user.loading) {
      return <Loading />;
    } else {
      return (
        <ScrollView
          style={{ backgroundColor: "#f6f6f6" }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
            <View style={{ flex: 1, padding: 40 }}>
              <Image
                source={require("../assets/covpro.png")}
                style={styles.image}
              />
              <Text style={styles.covproText}>COVPRO</Text>
              <Text style={styles.covproDesc}>COVID Protection</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.formRowCustom}>
                <Text style={styles.formLabel}>Mobile Number</Text>
                <TextInput
                  keyboardType={"number-pad"}
                  style={styles.inputText}
                  onChangeText={(id) => {
                    this.setState({ id: id });
                  }}
                  value={this.state.id}
                  placeholder="10-digit mobile number"
                  placeholderTextColor="#a8a8a8"
                  maxLength={10}
                />
              </View>
              <View style={styles.formRowCustom}>
                <Text style={styles.formLabel}>Password</Text>
                <TextInput
                  keyboardType={"number-pad"}
                  style={styles.inputText}
                  onChangeText={(password) => {
                    this.setState({ password: password });
                  }}
                  value={this.state.password}
                  placeholder="13-digit SRF ID"
                  placeholderTextColor="#a8a8a8"
                  maxLength={13}
                />
              </View>
              <View style={{ marginTop: 120 }}>
                <Button
                  buttonStyle={styles.buttonColor}
                  onPress={() => this.handelLogin()}
                  title="Login"
                  style={{ paddingTop: 20 }}
                  disabled={!this.state.id || !this.state.password}
                />
              </View>
              <View style={styles.account}>
                <Text style={styles.formLabel}>Don't have an account?</Text>
                <Button
                  title="Register Here"
                  type="clear"
                  onPress={() => {
                    navigate("Register");
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  formRowCustom: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 12,
    marginBottom: 5,
    color: "#393939",
    fontWeight: "bold",
  },
  buttonColor: {
    backgroundColor: "#007d79",
    borderColor: "#007d79",
    borderWidth: 2,
    borderRadius: 2,
  },
  image: {
    width: 40,
    height: 40,
    alignSelf: "center",
    alignItems: "center",
  },
  covproText: {
    fontWeight: "bold",
    fontSize: 24,
    alignSelf: "center",
    color: "#161616",
    paddingTop: 10,
  },
  covproDesc: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    color: "#161616",
    paddingTop: 10,
  },
  form: {
    flex: 1,
    marginBottom: 120,
    alignSelf: "center",
  },
  inputText: {
    height: 40,
    width: 325,
    borderColor: "#e2e1e1",
    borderWidth: 1,
    paddingLeft: 10,
  },
  account: {
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
