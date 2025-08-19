import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

const CategoryModal = ({ items, onClick, showModal, handleCategory }) => {
  return (
    <Modal
      transparent={true}
      visible={showModal}
      animationType="fade"
      onRequestClose={() => onclick()}
    >
      <TouchableWithoutFeedback onPress={() => onClick()}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text
              style={{
                fontSize: RFValue(18),
                marginBottom: 20,
                color: "#57564F",
              }}
            >
              Categories
            </Text>

            <ScrollView style={{ width: "100%" }}>
              {items.map((item, key) => (
                <TouchableOpacity
                  onPress={() => handleCategory(item)}
                  style={{
                    //   borderWidth: 1,
                    width: "100%",
                    padding: 5,
                    backgroundColor: "#FAF7F3",
                    borderRadius: 0,
                    marginBottom: 10,
                  }}
                  key={key}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: RFValue(16),
                      color: "grey",
                      width: "100%",
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* <TouchableOpacity
                onPress={() => handleCategory("")}
                style={{
                  //   borderWidth: 1,
                  width: "100%",
                  padding: 5,
                  backgroundColor: "#FAF7F3",
                  borderRadius: 0,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: RFValue(16),
                    color: "grey",
                    width: "100%",
                  }}
                >
                  All
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleCategory("Computers")}
                style={{
                  borderWidth: 0,
                  width: "100%",
                  padding: 5,
                  backgroundColor: "#FAF7F3",
                  borderRadius: 0,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: RFValue(16),
                    color: "grey",
                    width: "100%",
                  }}
                >
                  Computers
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleCategory("Business & Economics")}
                style={{
                  borderWidth: 0,
                  width: "100%",
                  padding: 5,
                  backgroundColor: "#FAF7F3",
                  borderRadius: 0,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: RFValue(16),
                    color: "grey",
                    width: "100%",
                  }}
                >
                  Business & Economics
                </Text>
              </TouchableOpacity> */}
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#EFEEEA",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
});

export default CategoryModal;
