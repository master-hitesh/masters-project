import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import HeaderComponent from "./HeaderComponent";
import moment from "moment";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { addComment } from "../redux/user/userActions";

const mapStateToProps = (state) => {
  console.log("ChatComponent State --> ", state);
  return {
    user: state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addComment: (userObj) => dispatch(addComment(userObj)),
});

function RenderComments({ comments }) {
  if (comments.length > 0)
    return (
      <View style={{ flex: 6, marginTop: 20 }}>
        {comments.map((comment) => {
          return (
            <View style={styles.messageContainer} key={comment.timestamp}>
              <Text style={styles.comment}>{comment.comment}</Text>
              <Text style={styles.textSecondary}>
                {moment.unix(comment.timestamp / 1000).format("LLL")}
              </Text>
            </View>
          );
        })}
      </View>
    );
  else return <View></View>;
}

class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  addComment() {
    const userObj = {
      id: this.props.user.data.userId,
      comment: this.state.comment,
    };
    this.props.addComment(userObj);
  }

  render() {
    if (this.props.user.data.chat) {
      return (
        <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
          <HeaderComponent />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <Text style={styles.messageTitle}>
                {this.props.user.data.chat.length > 0
                  ? "Messages"
                  : "No messages to show!"}
              </Text>
              <RenderComments comments={this.props.user.data.chat} />
            </View>
            <View style={styles.commentContainer}>
              <View style={{ margin: 20, backgroundColor: "#ffffff" }}>
                <TextInput
                  style={styles.commentText}
                  onChangeText={(text) => {
                    this.setState({
                      comment: "Patient : " + text,
                      enabled: true,
                    });
                  }}
                  placeholder="Enter your comment..."
                />
              </View>
              <View>
                <Icon
                  name="send"
                  size={30}
                  color="#0198a2"
                  onPress={() => this.addComment()}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  messageContainer: {
    width: 350,
    marginBottom: 5,
    backgroundColor: "#f2f2f2",
  },
  textSecondary: {
    color: "#707070",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    margin: 10,
  },
  messageTitle: {
    marginBottom: 5,
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  commentText: {
    width: 300,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 5,
    paddingLeft: 10,
  },
  commentContainer: {
    position: "relative",
    top: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  comment: {
    margin: 10,
    alignItems: "flex-start",
    fontSize: 14,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);
