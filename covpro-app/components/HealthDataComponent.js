import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Picker,
  Button,
} from "react-native";
import HeaderComponent from "./HeaderComponent";
import { connect } from "react-redux";
import { addHealthData } from "../redux/user/userActions";

const mapStateToProps = (state) => {
  console.log("HealthDataComponent State --> ", state);
  return {
    user: state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addHealthData: (userObj) => dispatch(addHealthData(userObj)),
});

class HealthDataComponent extends Component {
  constructor(props) {
    super(props);
    console.log("Props ---> ", props);
    this.state = {
      temp: this.props.user.data.healthData.temp,
      heartRate: this.props.user.data.healthData.heartRate,
      symptom: this.props.user.data.healthData.symptom,
      comorbidity: this.props.user.data.healthData.comorbidity,
      oxygen: this.props.user.data.healthData.oxygen,
    };
  }

  addHealthData() {
    const userObj = {
      id: this.props.user.data.userId,
      temp: this.state.temp,
      heartRate: this.state.heartRate,
      symptom: this.state.symptom,
      comorbidity: this.state.comorbidity,
      oxygen: this.state.oxygen,
    };

    this.props.addHealthData(userObj);
    alert("Health data will be updated shortly!");
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
        <HeaderComponent />
        <Text style={styles.healthDataDesc}>
          Please update your health data every 6 hours! Our health workers are
          constantly monitoring your vitals and will be in touch with you soon.
        </Text>
        <View style={styles.formRowCustom}>
          <Text style={styles.formLabel}>Body Temperature(Fahrenheit)</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => {
              this.setState({ temp: text, enabled: true });
            }}
            value={this.state.temp}
            keyboardType={"number-pad"}
            placeholder="Enter value between 95 and 105"
          />
        </View>
        <View style={styles.formRowCustom}>
          <Text style={styles.formLabel}>Heart Rate(bpm)</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => {
              this.setState({ heartRate: text, enabled: true });
            }}
            value={this.state.heartRate}
            keyboardType={"number-pad"}
            maxLength={3}
            placeholder="Enter value between 0 and 300"
          />
        </View>
        <View style={styles.formRowCustom}>
          <Text style={styles.formLabel}>Oxygen Saturation(SpO2)</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => {
              this.setState({ oxygen: text });
            }}
            value={this.state.oxygen}
            keyboardType={"number-pad"}
            maxLength={3}
            placeholder="Enter value between 0 and 100"
          />
        </View>
        <View style={styles.formRowCustom}>
          <Text style={styles.formLabel}>Select Primary Symptom</Text>
          <Picker
            style={styles.pickerText}
            selectedValue={this.state.symptom}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ symptom: itemValue })
            }
          >
            <Picker.Item label="Runny Nose" value="Runny Nose" />
            <Picker.Item label="Dry Cough" value="Dry Cough" />
            <Picker.Item label="Sore Throat" value="Sore Throat" />
            <Picker.Item label="Body Ache" value="Body Ache" />
            <Picker.Item label="Loss of Taste" value="Loss of Taste" />
            <Picker.Item label="Excessive Fatigue" value="Excessive Fatigue" />
            <Picker.Item label="Diarrhea" value="Diarrhea" />
            <Picker.Item label="Mental Confusion" value="Mental Confusion" />
            <Picker.Item label="Breathlessness" value="Breathlessness" />
            <Picker.Item label="Severe Chest Pain" value="Severe Chest Pain" />
            <Picker.Item
              label="Bluish Discoloration"
              value="Bluish Discoloration"
            />
            <Picker.Item label="None" value="None" />
          </Picker>
        </View>
        <View style={styles.formRowCustom}>
          <Text style={styles.formLabel}>Select Primary Comorbidity</Text>
          <Picker
            style={styles.pickerText}
            selectedValue={this.state.comorbidity}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ comorbidity: itemValue })
            }
          >
            <Picker.Item label="Hypertention" value="Hypertention" />
            <Picker.Item label="Diabetes" value="Diabetes" />
            <Picker.Item label="Pulmonary Disease" value="Pulmonary Disease" />
            <Picker.Item
              label="Cardiovascular Disease"
              value="Cardiovascular Disease"
            />
            <Picker.Item label="None" value="None" />
          </Picker>
        </View>
        <View style={styles.formRowCustom}>
          <Button
            buttonStyle={styles.buttonColor}
            onPress={() => this.addHealthData()}
            title="Add Health Data"
            style={{ paddingTop: 20 }}
            disabled={
              !this.state.temp ||
              !this.state.heartRate ||
              !this.state.symptom ||
              !this.state.comorbidity ||
              !this.state.oxygen
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formRowCustom: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    margin: 20,
    marginTop: 10,
    backgroundColor: "#f6f6f6",
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
  healthDataDesc: {
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "center",
    color: "#161616",
    paddingTop: 10,
    margin: 20,
    textAlign: "justify",
  },
  inputText: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 5,
    paddingLeft: 10,
  },
  pickerText: {
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HealthDataComponent);
