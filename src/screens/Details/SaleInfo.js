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
import { Tabs } from "react-native-collapsible-tab-view";

const SaleInfo = ({ book }) => {
  return (
        <Tabs.ScrollView style={styles.container}>
    
    {/* <ScrollView style={styles.container}> */}
      <View style={styles.section}>
 
          <Text style={styles.heading}>{BuyLink} :</Text>
     
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
   
          <Text style={styles.heading}>Country :</Text>
        
        <Text style={styles.detailText}>
          {book?.saleInfo?.country === "IN"
            ? "India"
            : book?.saleInfo.country}
        </Text>
      </View>

      <View style={styles.section}>

          <Text style={styles.heading}>Amount :</Text>
         
        <Text style={styles.detailText}>
          {book?.saleInfo?.listPrice?.amount}{" "}
          {`(${book?.saleInfo?.listPrice?.currencyCode})`}
        </Text>
      </View>
      
    {/* </ScrollView> */}
          </Tabs.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
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
    fontSize: RFValue(14),
    fontWeight: 300,
    color: "gey",
    // borderWidth:1,
    flex: 1,
  },
});

export default SaleInfo;
