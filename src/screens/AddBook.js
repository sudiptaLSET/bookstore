import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import * as ImagePicker from "expo-image-picker";
import BookContext from "../context/store";
import { useNavigation } from "@react-navigation/native";
import { useNotification } from "../context/NotificationContext";
import CategoryModal from "../components/CategoryModal";
import { useSelector,useDispatch} from "react-redux";
import { edit, newAdd } from "../redux/book/bookSlice";

const AddBook = ({ route }) => {
  const { showNotification } = useNotification();
  const dispatcher = useDispatch();
  const bookData = route.params;

  const reduxbook = useSelector((state) => state.book.books);
  // console.log("toEdit->", toEdit);

  const initialState = {
    id: bookData?.book?.id || "",
    etag: bookData?.book?.etag || "",
    kind: bookData?.book?.kind || "",
    volumeInfo: {
      title: bookData?.book?.volumeInfo?.title || "",
      description: bookData?.book?.volumeInfo?.description || "",
      imageLinks: {
        thumbnail: bookData?.book?.volumeInfo?.imageLinks?.thumbnail || "",
      },
      publisher: bookData?.book?.volumeInfo?.publisher || "",
      authors: bookData?.book?.volumeInfo?.authors || [],
      categories: bookData?.book?.volumeInfo?.categories || [],
      contentVersion: bookData?.book?.volumeInfo?.contentVersion || "",
      pageCount: bookData?.book?.volumeInfo?.pageCount || "",
      printType: bookData?.book?.volumeInfo?.printType || "",
      language: bookData?.book?.volumeInfo?.language || "",
      previewLink: bookData?.book?.volumeInfo?.previewLink || "",
    },
    saleInfo: {
      buyLink: bookData?.book?.saleInfo?.buyLink || "",
      country: bookData?.book?.saleInfo?.country || "",
      listPrice: {
        amount: bookData?.book.saleInfo?.listPrice?.amount || "",
        currencyCode: bookData?.book?.saleInfo?.listPrice?.currencyCode || "",
      },
    },
  };

  function bookReducer(state, action) {
    switch (action.type) {
      case "SET_VOLUME_INFO":
        return {
          ...state,
          volumeInfo: { ...state.volumeInfo, ...action.payload },
        };
      case "SET_VOLUME_INFO_AMOUNT":
        return {
          ...state,
          saleInfo: {
            ...state.saleInfo,
            listPrice: {
              ...state.saleInfo.listPrice,
              ...action.payload,
            },
          },
        };
      case "SET_VOLUME_INFO_CURRENCY":
        return {
          ...state,
          saleInfo: {
            ...state.saleInfo,
            listPrice: {
              ...state.saleInfo.listPrice,
              ...action.payload,
            },
          },
        };
      case "SET_IMAGE":
        return {
          ...state,
          volumeInfo: {
            ...state.volumeInfo,
            imageLinks: {
              ...state.volumeInfo.imageLinks,
              thumbnail: action.payload,
            },
          },
        };

      case "SET_SALE_INFO":
        return {
          ...state,
          saleInfo: {
            ...state.saleInfo,
            ...action.payload,
          },
        };

      case "SET_BOOK":
        return {
          ...state,

          ...action.payload,
        };

      default:
        return state;
    }
  }

  const [book, dispatch] = useReducer(bookReducer, initialState);
  const [isValid, setIsValid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("");

  // const { addBook } = useContext(BookContext);

  // Pick Image from Gallery
  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        alert("Permission to access gallery is required!");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        dispatch({ type: "SET_IMAGE", payload: result.assets[0].uri });

        // handleChange("imageUri", result.assets[0].uri);
      }
    } catch (err) {
      console.log("gllaery error-->", err);
    }
  };

  const validateForm = async () => {
    const { volumeInfo, saleInfo } = book;

    const requiredFields = [
      { label: "Title", value: volumeInfo.title },
      { label: "Description", value: volumeInfo.description },
      { label: "Thumbnail Image", value: volumeInfo.imageLinks.thumbnail },
      { label: "Authors", value: volumeInfo.authors },
      { label: "Categories", value: volumeInfo.categories },
      { label: "Content Version", value: volumeInfo.contentVersion },
      { label: "Page Count", value: volumeInfo.pageCount },
      { label: "Print Type", value: volumeInfo.printType },
      { label: "Language", value: volumeInfo.language },
      { label: "Preview Link", value: volumeInfo.previewLink },
      { label: "Buy Link", value: saleInfo.buyLink },
      { label: "Country", value: saleInfo.country },
      { label: "Currency Code", value: saleInfo.listPrice.currencyCode },
      { label: "Amount", value: saleInfo.listPrice.amount },
    ];

    for (let field of requiredFields) {
      if (
        !field.value ||
        (Array.isArray(field.value) && field.value.length === 0)
      ) {
        Alert.alert(`${field.label} is required`);
        return false;
      }
    }

    const onlyDigits = /^\d*\.?\d+$/;

    if (!onlyDigits.test(volumeInfo.pageCount)) {
      Alert.alert("Page Count must contain only digits");
      return false;
    }

    if (!onlyDigits.test(saleInfo.listPrice.amount)) {
      Alert.alert("Amount must contain only digits");
      return false;
    }

    const previewLinkReachable = await checkIfReachable(
      volumeInfo?.previewLink
    );
    if (!previewLinkReachable) {
      Alert.alert("Preview Link is not reachable");
      return false;
    }

    const buyLinkReachable = await checkIfReachable(saleInfo?.buyLink);
    if (!buyLinkReachable) {
      Alert.alert("Buy Link is not reachable");
      return false;
    }

    return true;
  };

  const checkIfReachable = async (url) => {
    if (!url) {
      console.log("Preview link is empty");
      return false;
    }

    try {
      const response = await fetch(url, { method: "HEAD" });
      if (response.ok) {
        // console.log("URL is reachable", response.ok);
        return true;
      } else {
        // console.log("URL is not reachable", response.ok);
        return false;
      }
    } catch (err) {
      console.log("Error reaching URL:", err);
      return false;
    }
  };

  const isFormValid =
    book?.volumeInfo?.title &&
    book.volumeInfo.description &&
    book.volumeInfo.imageLinks.thumbnail &&
    book.volumeInfo.authors &&
    book.volumeInfo.categories &&
    book.volumeInfo.contentVersion &&
    book.volumeInfo.pageCount &&
    book.volumeInfo.printType &&
    book.volumeInfo.language &&
    book.volumeInfo.previewLink &&
    book.id &&
    book.etag &&
    book.kind &&
    book.saleInfo.buyLink &&
    book.saleInfo.country &&
    book.saleInfo.listPrice.currencyCode &&
    book.saleInfo.listPrice.amount &&
    checkIfReachable?.(book.volumeInfo.previewLink);

  const navigation = useNavigation();
  // Submit Product
  const handleSubmit = async () => {
    const validation = await validateForm();
    // console.log("saved boook -------->", validation);
    if (validation === true) {
      if (bookData) {
        // console.log("Book sdsddds");
        editSave();
      } else {
        console.log("Book Saved----->",book);
        dispatcher(newAdd([book]));
        navigation.navigate('Home');
        showNotification("Book Added");
      }

      // Alert.alert("Book added");
    }
  };

  
  const editSave = () => {
    console.log("toEdit--->",book);

    dispatcher(edit(book));
    showNotification("Book edited")
    navigation.navigate('Home')

  };

  const handleVolumeChange = (key, value) => {
    dispatch({ type: "SET_VOLUME_INFO", payload: { [key]: value } });
  };

  const handleSaleChangeAmount = (key, value) => {
    dispatch({ type: "SET_VOLUME_INFO_AMOUNT", payload: { [key]: value } });
  };

  const handleSaleChangeCurrency = (key, value) => {
    dispatch({ type: "SET_VOLUME_INFO_CURRENCY", payload: { [key]: value } });
  };

  const handleSaleChange = (key, value) => {
    dispatch({ type: "SET_SALE_INFO", payload: { [key]: value } });
  };

  const handleField = (key, value) => {
    dispatch({ type: "SET_BOOK", payload: { [key]: value } });
  };

  const items = ["Computers", "Business & Economics"];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        marginHorizontal: RFValue(0),
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ paddingHorizontal: RFValue(10) }}>
          <View style={styles.container}>
            <Text style={styles.heading}>{bookData ? "Edit" : "Add"} Book</Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeading}>Book Title</Text>
              <TextInput
                placeholder="Book Title"
                value={book?.volumeInfo?.title}
                onChangeText={(text) => handleVolumeChange("title", text)}
                maxLength={80}
                style={styles.input}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeading}>Publisher</Text>
              <TextInput
                placeholder="Publisher"
                style={styles.input}
                value={book?.volumeInfo?.publisher}
                onChangeText={(text) => handleVolumeChange("publisher", text)}
                maxLength={80}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeading}>Buy Link</Text>
              <TextInput
                placeholder="Buy Link"
                style={styles.input}
                value={book?.saleInfo?.buyLink}
                onChangeText={(text) => handleSaleChange("buyLink", text)}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeading}>Country</Text>
              <TextInput
                placeholder="Country"
                style={styles.input}
                value={book?.saleInfo?.country}
                onChangeText={(text) => handleSaleChange("country", text)}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeading}>Print Type</Text>
              <TextInput
                placeholder="Print Type"
                style={styles.input}
                value={book?.volumeInfo?.printType}
                onChangeText={(text) => handleVolumeChange("printType", text)}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeading}>Content Version</Text>
              <TextInput
                placeholder="Content Version"
                style={styles.input}
                value={book?.volumeInfo?.contentVersion}
                onChangeText={(text) =>
                  handleVolumeChange("contentVersion", text)
                }
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeading}>Description</Text>
              <TextInput
                placeholder="Description"
                style={[styles.input, { height: 80 }]}
                value={book.volumeInfo.description}
                onChangeText={(text) => handleVolumeChange("description", text)}
                multiline
                maxLength={200}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeading}>Preview Link</Text>
              <TextInput
                placeholder="Preview Link"
                style={[styles.input, { height: 80 }]}
                value={book.volumeInfo.previewLink}
                onChangeText={(text) => handleVolumeChange("previewLink", text)}
                multiline
                maxLength={200}
              />
            </View>

            <View style={styles.fieldContainer}>
              {/* <TouchableOpacity onPress={() => setShowModal(true)}> */}
              <Text style={styles.inputHeading}>Kind</Text>
              {/* </TouchableOpacity> */}
              <TextInput
                placeholder="Kind"
                style={[styles.input, { height: 80 }]}
                value={book.kind}
                onChangeText={(text) => handleField("kind", text)}
                multiline
                maxLength={200}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeading}>ID</Text>
              <TextInput
                placeholder="id"
                style={[styles.input, { height: 80 }]}
                value={book.id}
                onChangeText={(text) => handleField("id", text)}
                multiline
                maxLength={200}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeading}>E-tag</Text>
              <TextInput
                placeholder="E-tag"
                style={[styles.input, { height: 80 }]}
                value={book.etag}
                onChangeText={(text) => handleField("etag", text)}
                multiline
                maxLength={200}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeading}>Authors (comma separated)</Text>
              <TextInput
                placeholder="Authors (comma separated)"
                style={styles.input}
                value={book.volumeInfo.authors.join(", ")}
                onChangeText={(text) =>
                  handleVolumeChange(
                    "authors",
                    text.split(",").map((a) => a.trim())
                  )
                }
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeading}>Categories</Text>
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Text placeholder="Categories" style={styles.input}>
                  {book.volumeInfo.categories.join(", ") || "category"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeading}>Page Count</Text>
              <TextInput
                placeholder="Page Count"
                style={styles.input}
                value={book?.volumeInfo?.pageCount.toString()}
                onChangeText={(text) => handleVolumeChange("pageCount", text)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeading}>Language</Text>
              <TextInput
                placeholder="Language"
                style={styles.input}
                value={book.volumeInfo.language}
                onChangeText={(text) => handleVolumeChange("language", text)}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeading}>Amount</Text>
              <TextInput
                placeholder="Amount"
                style={styles.input}
                value={book.saleInfo.listPrice.amount.toString()}
                onChangeText={(text) => handleSaleChangeAmount("amount", text)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeading}>Currency Code</Text>
              <TextInput
                placeholder="Currency Code"
                style={styles.input}
                value={book.saleInfo.listPrice.currencyCode}
                onChangeText={(text) =>
                  handleSaleChangeCurrency("currencyCode", text)
                }
              />
            </View>

            {book.volumeInfo.imageLinks.thumbnail && (
              <Image
                source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
                style={styles.image}
              />
            )}

            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: RFValue(14),
                }}
              >
                Select Image
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.submitButton,
                !isFormValid && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              // disabled={!isFormValid}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: RFValue(14),
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
          {showModal && (
            <CategoryModal
              items={items}
              onClick={() => setShowModal(false)}
              showModal={showModal}
              handleCategory={(category) => {
                // handleField("kind", category);
                handleVolumeChange("categories", [category]);
                setShowModal(false);
              }}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "",
    // borderWidth:1
    // paddingVertical:RFValue(20)
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  fieldContainer: {
    width: "100%",
    borderColor: "#ccc",
    padding: 10,
    // marginBottom: 15,
  },
  inputHeading: {
    fontSize: RFValue(14),
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: RFValue(10),
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
    marginTop: RFValue(5),
    fontSize: RFValue(12),
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 15,
  },
  imageButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "green",
    padding: RFValue(10),
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#999",
  },
});

export default AddBook;
