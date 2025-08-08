import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { BuyLink, OpenLink } from "../../constants/constant";

const SaleInfo = ({ book }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{BuyLink}</Text>
          <Text style={{ fontSize: RFValue(14) }}>:</Text>
        </View>
        <TouchableOpacity
          onPress={() => Linking.openURL(book?.saleInfo?.buyLink)}
        >
          <Text
            style={{
              color: "blue",
              textDecorationLine: "underline",
              fontSize: RFValue(14),
            }}
          >
            {OpenLink}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Country</Text>
          <Text style={{ fontSize: RFValue(14) }}>:</Text>
        </View>
        <Text style={styles.detailText}>
          {book?.saleInfo?.country === "IN"
            ? "India"
            : book?.saleInfo.country}
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Amount</Text>
          <Text style={{ fontSize: RFValue(14) }}>:</Text>
        </View>
        <Text style={styles.detailText}>
          {book?.saleInfo?.listPrice?.amount}{" "}
          {`(${book?.saleInfo?.listPrice?.currencyCode})`}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
  },
  section: {
    // borderWidth:1,
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
    // flexWrap:'wrap'
  },
  heading: {
    fontSize: RFValue(14),
    fontWeight: 500,
    // borderWidth:1,
  },
  headingContainer: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailText: {
    fontSize: RFValue(12),
    fontWeight: 300,
    color: "gey",
    // borderWidth:1,
    flex: 1,
  },
});

export default SaleInfo;
