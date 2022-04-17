import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Carousel from "react-native-snap-carousel";

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },
  marginRight: {
    marginRight: 5,
  },
  doDontsTitle: {
    color: "#393939",
    fontWeight: "bold",
  },
  doDontsContainer: {
    marginBottom: 15,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  doDontsText: {
    lineHeight: 18,
    flex: 1,
    flexWrap: "wrap",
  },
});

const dosContent = (
  <View>
    <View style={styles.doDontsContainer}>
      <Text style={styles.doDontsTitle}>DO's</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          style={styles.marginRight}
          name="chevron-left"
          size={12}
          color="#a8a8a8"
        />
        <Icon
          style={styles.marginRight}
          name="chevron-right"
          size={12}
          color="#393939"
        />
      </View>
    </View>

    <View style={styles.fixToText}>
      <Icon style={styles.marginRight} name="check" size={12} color="#24a148" />
      <Text style={styles.doDontsText}>
        Drink soup, juice, coconut water etc.
      </Text>
    </View>
    <View style={styles.fixToText}>
      <Icon style={styles.marginRight} name="check" size={12} color="#24a148" />
      <Text style={styles.doDontsText}>
        Lie on your chest and breathe deeply to improve oxygenation.
      </Text>
    </View>
    <View style={styles.fixToText}>
      <Icon style={styles.marginRight} name="check" size={12} color="#24a148" />
      <Text style={styles.doDontsText}>
        Paracetamol at 6 hours interval and cough syrup if required.
      </Text>
    </View>
    <View style={styles.fixToText}>
      <Icon style={styles.marginRight} name="check" size={12} color="#24a148" />
      <Text style={styles.doDontsText}>
        Steam inhalation and/or warm water gargle.
      </Text>
    </View>
    <View style={styles.fixToText}>
      <Icon style={styles.marginRight} name="check" size={12} color="#24a148" />
      <Text style={styles.doDontsText}>
        Antibiotics as advised by medical practitioner.
      </Text>
    </View>
  </View>
);

const dontsContent = (
  <View>
    <View style={styles.doDontsContainer}>
      <Text style={styles.doDontsTitle}>DON'Ts</Text>
    </View>
    <View style={styles.fixToText}>
      <Icon style={styles.marginRight} name="close" size={12} color="#da1e28" />
      <Text style={styles.doDontsText}>
        Do not panic and rush to hospitals.
      </Text>
    </View>
    <View style={styles.fixToText}>
      <Icon style={styles.marginRight} name="close" size={12} color="#da1e28" />
      <Text style={styles.doDontsText}>Do not use remdesivir at home.</Text>
    </View>
    <View style={styles.fixToText}>
      <Icon style={styles.marginRight} name="close" size={12} color="#da1e28" />
      <Text style={styles.doDontsText}>
        Do not use oxygen cylinder without advise of medical practitioner.
      </Text>
    </View>
    <View style={styles.fixToText}>
      <Icon style={styles.marginRight} name="close" size={12} color="#da1e28" />
      <Text style={styles.doDontsText}>
        Do not undergo CT-Scan without advise of medical practitioner.
      </Text>
    </View>
    <View style={styles.fixToText}>
      <Icon style={styles.marginRight} name="close" size={12} color="#da1e28" />
      <Text style={styles.doDontsText}>Do not use budesonide nebulizer.</Text>
    </View>
  </View>
);

class DosDontsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carouselItems: [
        {
          title: dosContent,
        },
        {
          title: dontsContent,
        },
      ],
    };
  }

  renderItems({ item, index }) {
    return <View key={index}>{item.title}</View>;
  }

  render() {
    return (
      <View style={{ height: "auto" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={this.state.carouselItems}
            renderItem={this.renderItems}
            sliderWidth={320}
            itemWidth={320}
            layout={"default"}
            inactiveSlideScale={0.9}
            inactiveSlideOpacity={0.7}
            loop={false}
          ></Carousel>
        </View>
      </View>
    );
  }
}

export default DosDontsComponent;
