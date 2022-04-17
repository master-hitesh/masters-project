import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import HeaderComponent from "./HeaderComponent";
import AdvisoryComponent from "./AdvisoryComponent";
import DosDontsComponent from "./DosDontsComponent";
import { fetchUserData } from "../redux/user/userActions";
import { connect } from "react-redux";

const whoUrl =
  "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public";
const icmrUrl = "https://www.icmr.gov.in/";
const mohfwUrl = "https://www.mohfw.gov.in/";

const mapStateToProps = (state) => {
  console.log("HomeComponent State --> ", state);
  return {
    user: state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: (userId) => dispatch(fetchUserData(userId)),
});

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    console.log("HomeComponent Props ---> ", props);

    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          image: require("../assets/mohfw.jpg"),
          title: "Ministry of Health and Family Welfare",
        },
        {
          image: require("../assets/icmr.png"),
          title: "Indian Council of Medical Research",
        },
        {
          image: require("../assets/who.png"),
          title: "World Health Organization",
        },
      ],
    };

    this.stateImage = {
      activeIndex: 0,
      carouselImageItems: [
        {
          image: require("../assets/sleep.png"),
          title: "Isolate and Take Rest",
        },
        {
          image: require("../assets/mask.jpg"),
          title: "Wear Mask to Protect Family",
        },
        {
          image: require("../assets/distance.jpg"),
          title: "Maintain Social Distance",
        },
        {
          image: require("../assets/wash-hands.png"),
          title: "Sanitize Hands Regularly",
        },
      ],
    };
  }

  componentDidMount() {
    if (this.props.user.data && this.props.user.data.userId != null) {
      console.log("componentDidMount ---> ", this.props.user.data.userId);
      this.props.fetchUserData(this.props.user.data.userId);
    }
  }

  renderHealthRecomendation({ item, index }) {
    return (
      <View
        style={{
          backgroundColor: "#ffffff",
        }}
        key={index}
      >
        <Image style={styles.recommendImage} source={item.image} />
        <Text style={styles.recommendText}>{item.title} </Text>
      </View>
    );
  }

  renderOfficials({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          switch (item.title) {
            case "World Health Organization":
              this.onHandlePressWho();
              break;
            case "Indian Council of Medical Research":
              this.onHandlePressCdc();
              break;
            case "Ministry of Health and Family Welfare":
              this.onHandlePressMohfw();
              break;
            default:
              break;
          }
        }}
      >
        <View style={styles.official} key={index}>
          <Image style={{ width: 80, height: 60 }} source={item.image} />
          <Text style={{ flex: 1, flexWrap: "wrap" }}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  onHandlePressWho() {
    Linking.openURL(whoUrl);
  }

  onHandlePressCdc() {
    Linking.openURL(icmrUrl);
  }

  onHandlePressMohfw() {
    Linking.openURL(mohfwUrl);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
        <HeaderComponent />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <AdvisoryComponent />
          <View style={{ height: 180, marginBottom: 40 }}>
            <Text style={styles.titleText}>Precautionary Measures</Text>

            <View style={styles.carousel}>
              <Carousel
                ref={(c) => {
                  this._carousel = c;
                }}
                data={this.stateImage.carouselImageItems}
                renderItem={this.renderHealthRecomendation}
                sliderWidth={130}
                itemWidth={130}
                itemHeight={152}
                sliderHeight={152}
                layout={"default"}
                slideStyle={{ marginRight: 15 }}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                loop={false}
              ></Carousel>
            </View>
          </View>
          <View style={{ height: 150, marginTop: 5 }}>
            <Text style={styles.titleText}>
              Trush Official Source of Information Only
            </Text>

            <View style={styles.carousel}>
              <Carousel
                ref={(c) => {
                  this._carousel = c;
                }}
                data={this.state.carouselItems}
                renderItem={this.renderOfficials.bind(this)}
                sliderWidth={270}
                itemWidth={270}
                itemHeight={70}
                sliderHeight={70}
                layout={"default"}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={0.7}
                loop={false}
              ></Carousel>
            </View>
            <DosDontsComponent />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#393939",
    marginBottom: 15,
    marginTop: 20,
  },
  carousel: {
    flexDirection: "row",
    alignItems: "center",
  },
  official: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  recommendImage: {
    width: 130,
    height: 101,
    justifyContent: "center",
    marginBottom: 10,
  },
  recommendText: {
    marginLeft: 15,
    marginBottom: 15,
    color: "#343334",
    fontSize: 14,
    justifyContent: "space-between",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
