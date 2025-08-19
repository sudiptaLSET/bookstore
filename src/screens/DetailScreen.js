import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BasicDetail from "./Details/BasicDetail";
import VolumeInfo from "./Details/VolumeInfo";
import SaleInfo from "./Details/SaleInfo";
import SearchInfo from "./Details/SearchInfo";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";

const TopTab = createMaterialTopTabNavigator();

const DetailScreen = ({ route, navigation }) => {
  // const book = useSelector((state) => state.book.books);

  console.log("book Details.  --->", book);
  const { book } = route.params;

  const { volumeInfo } = book;

  useEffect(() => {
    if (book) {
      navigation.setParams({ book });
    }
  }, [book, navigation]);

  const Header = () => (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{ uri: volumeInfo?.imageLinks?.thumbnail }}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <Tabs.Container
      renderHeader={Header}
      headerHeight={60}
      allowHeaderOverscroll={false}
      renderTabBar={(props) => (
        <MaterialTabBar
          {...props}
          activeColor="#A0C878"
          inactiveColor="grey"
          indicatorStyle={{
            backgroundColor: "#A0C878",
            height: 3,
            borderRadius: 3,
          }}
          style={{
            backgroundColor: "white",
          }}
          labelStyle={{
            fontSize: RFValue(12),
            fontWeight: "600",
            textTransform: "none", // optional: prevent uppercase
          }}
        />
      )}
    >
      <Tabs.Tab name="Basic info">
        <BasicDetail book={book} />
      </Tabs.Tab>

      <Tabs.Tab name="Volume info">
        <VolumeInfo book={book} />
      </Tabs.Tab>

      <Tabs.Tab name="Sales info">
        <SaleInfo book={book} />
      </Tabs.Tab>
    </Tabs.Container>

    // <SafeAreaView style={styles.container}>

    //   <View style={styles.imageContainer}>
    //     <Image
    //       style={styles.image}
    //       source={{ uri: volumeInfo?.imageLinks?.thumbnail }}
    //       resizeMode="contain"
    //     />
    //   </View>

    //   <TopTab.Navigator

    //     screenOptions={{
    //       tabBarLabelStyle: { fontSize: RFValue(14), flex: 1 },
    //       tabBarActiveTintColor: "#A0C878",
    //       tabBarInactiveTintColor: "grey",
    //       tabBarItemStyle: { flex: 1 },
    //       tabBarStyle: { backgroundColor: "white" },
    //       tabBarIndicatorStyle: {
    //         backgroundColor: "#A0C878",
    //         height: 3,
    //         borderRadius: 5,
    //       },
    //     }}
    //   >
    //     <TopTab.Screen
    //       name="Basic info"
    //       children={() => <BasicDetail book={book} />}
    //     />
    //     <TopTab.Screen
    //       name="Volume info"
    //       children={() => <VolumeInfo book={book} />}
    //     />
    //     <TopTab.Screen
    //       name="Sale info"
    //       children={() => <SaleInfo book={book} />}
    //     />

    //   </TopTab.Navigator>
    // </SafeAreaView>
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
