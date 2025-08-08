import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BasicDetail from "./Details/BasicDetail";
import VolumeInfo from "./Details/VolumeInfo";
import SaleInfo from "./Details/SaleInfo";
import SearchInfo from "./Details/SearchInfo";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
import Practice from "./Practice";
const TopTab = createMaterialTopTabNavigator();

const DetailScreen = ({ route }) => {
  const book = useSelector((state) => state.book.books);
  const { volumeInfo } = book;

  console.log("book Details.  --->", book);

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView contentContainerStyle={styles.scrollContent}> */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: volumeInfo?.imageLinks?.thumbnail }}
          resizeMode="contain"
        />
      </View>

      <TopTab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: RFValue(12), flex: 1 },
          tabBarActiveTintColor: "#A0C878",
          tabBarInactiveTintColor: "grey",
          tabBarItemStyle: { flex: 1 },
          tabBarStyle: { backgroundColor: "white" },
          tabBarIndicatorStyle: {
            backgroundColor: "#A0C878",
            height: 3,
            borderRadius: 5,
          },
        }}
      >
        <TopTab.Screen
          name="Basic Details"
          children={() => <BasicDetail book={book} />}
        />
        <TopTab.Screen
          name="Volume Details"
          children={() => <VolumeInfo book={book} />}
        />
        <TopTab.Screen
          name="Sale Details"
          children={() => <SaleInfo book={book} />}
        />

      </TopTab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDFBEE",
    flex: 1,
  },
  scrollContent: {
    // padding: 16,
  },
  imageContainer: {
    alignItems: "center",
    margin: 20,
  },
  image: {
    width: RFPercentage(20),
    aspectRatio: 0.75, // maintain book aspect
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  authorContainer: {
    marginBottom: 16,
    flexDirection: "row",
  },
  sectionLabel: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  authorText: {
    fontSize: 14,
    marginLeft: 8,
  },
  descriptionContainer: {
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
});

export default DetailScreen;
