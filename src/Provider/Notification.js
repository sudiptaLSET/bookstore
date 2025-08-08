import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const Notification = ({ message }) => {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
    borderRadius: 10,
    zIndex: 1000,
    
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize:RFValue(20)
  },
});
