import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
// import { useNotification } from "../context/NotificationContext";
import ToastModule from '../ToastBridge';
const { height, width } = Dimensions.get("window");

const HomeHeader = ({ onClick, category, onChange, onList, list }) => {
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const image =
    "https://images.unsplash.com/photo-1678286742832-26543bb49959?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDA%3D";


  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello Sudipta</Text>
        <TouchableOpacity onPress={
          // ()=>showNotification("clicked")
          // ()=>
          // ToastModule.show('Hello from native Android Toast!')
          ()=>
          navigation.navigate('Practice')
          }
          >
          <Image style={styles.headerImage} source={{ uri: image }} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={RFValue(20)} color="grey" />
        <TextInput
          placeholder="search books..."
          style={styles.searchInput}
          onChangeText={(text) => onChange(text)}
        ></TextInput>

        {category === "All" ? (
          <TouchableOpacity onPress={() => onClick()}>
            <Ionicons name="filter-outline" size={RFValue(20)} color="grey" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => onClick()}>
            <Text>{category}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.listHeaderContainer}>
        <Text style={styles.listHeader}>Most Popular Books</Text>

        <View style={styles.iconContainer}>

          <TouchableOpacity onPress={()=>navigation.navigate('AddBook')}>
              <Ionicons name="add" size={RFValue(20)} color="grey" />
          </TouchableOpacity>

          <TouchableOpacity onPress={onList}>
            {list ? (
              <Ionicons name="grid-outline" size={RFValue(20)} color="grey" />
            ) : (
              <Ionicons name="list-outline" size={RFValue(20)} color="grey" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // marginVertical: RFValue(20),
  },
  header: {
    // borderWidth: 1,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: RFValue(28),
    // fontSize: 28,
    fontWeight: 500,
    color: "#57564F",
    // borderWidth:1,
  },
  headerImage: {
    height: height * 0.05,
    width: height * 0.05,
    borderRadius: 100,
    objectFit: "cover",
  },
  searchBar: {
    borderWidth: 1,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: height * 0.01,
    paddingHorizontal: RFValue(8),
    paddingVertical: RFValue(4),
    flexDirection: "row",
    gap: 10,
    borderColor: "grey",
    backgroundColor: "white",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: RFValue(14),
  },
  listHeader: {
    fontSize: RFValue(14),
    fontWeight: 600,
    color: "#57564F",
  },
  listHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    justifyContent: "space-between",
    marginTop: 18,
  },
  iconContainer:{
    flexDirection:'row',
    gap:RFValue(15)
  }
});

export default HomeHeader;
