import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const GigaMarketScreenHeader = (props) => {
  const handleNavigation = () => {
    props.navigation();
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.headerTextLeft}
        onPress={handleNavigation}
      >
        <AntDesign name="left" size={24} color="white" />
        <Text style={styles.gigamarketText}>Gigamarket</Text>
      </TouchableOpacity>

      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerRightTouchable}>
          <Text style={styles.rightSideText}>0 ALL</Text>
          <Image
            style={styles.headerRightImage}
            source={require("../assets/images/unnamed.png")}
          ></Image>
          <Text style={styles.rightSideText}>32282</Text>
          <Image
            style={styles.headerRightImage}
            source={require("../assets/images/unnamed.png")}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
    height: 50,
    // backgroundColor: "red",
    // marginTop: 30,
  },

  headerTextLeft: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
  },

  gigamarketText: {
    color: "white",
    fontSize: 23,
  },

  headerRight: {
    width: "40%",
    maxWidth: 170,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 10,
  },

  headerRightTouchable: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },

  headerRightImage: {
    width: 15,
    height: 15,
    borderRadius: 20,
  },

  rightSideText: {
    color: "white",
  },
});

export default GigaMarketScreenHeader;
