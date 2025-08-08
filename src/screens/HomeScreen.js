import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import HomeHeader from "../components/HomeHeader";
import ListCard from "../components/ListCard";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { useDispatch } from "react-redux";
import { add } from "../redux/book/bookSlice";
import BookContext from "../context/store";

const { height, width } = Dimensions.get("window");

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const [hasmore, setHasmore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [showModal, setShowmodal] = useState(false);
  const [text, setText] = useState("");
  const [list, setList] = useState(false);

  const [filtered, setFiltered] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();


  const { book } = useContext(BookContext);

  const start = useRef(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    if (!hasmore || loading) {
      // console.log(loading)
      return;
    }
    setLoading(true);

    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q={SEARCH_TERM}&subject:${
          category === "" ? "SELECTED_CATEGORY" : category
        }&startIndex=${start.current}&maxResults=10`
      );
      if (result?.data?.items?.length > 0) {
        setBooks((prev) => [...prev, ...result.data.items]);
        setFiltered((prev) => [...prev, ...result.data.items]);
        // console.log(books)
        setLoading(false);
        start.current += 11;
      } else {
        setHasmore(false);
      }
    } catch (err) {
      setLoading(false);
      console.log("Error while fetching data-->", err);
    }
  }, [hasmore, loading]);

  const numColumns = width < 720 ? 2 : 3;
  const remainder = filtered.length % numColumns;
  const fillers = remainder === 0 ? [] : Array(numColumns - remainder).fill({});
  const paddedBooks = [...filtered, ...fillers];


  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <ListCard
          book={item}
          key={index}
          onClick={(book) => handleClick(book)}
          list={list}
        />
      );
    },
    [handleClick,list]
  );

  const handleCategory = (category) => {
    setShowmodal(false);
    setCategory(category);
    if (category === "") return;
    fetchData();
  };

  const handleFilter = (inputText) => {
    setText(inputText);

    if (!inputText || inputText.trim() === "") {
      setFiltered(books);
      return;
    }

    const result = books.filter((item) =>
      item?.volumeInfo?.title?.toLowerCase().includes(inputText.toLowerCase())
    );
    setFiltered(result);
  };

  // console.log(filtered);

  const handleClick = useCallback(
    (book) => {
      dispatch(add(book));
      console.log('Book-->',book)
      navigation.navigate("Detail", { book, title: book.volumeInfo.title });
    },
    [navigation]
  );

useEffect(() => {
  if (book?.volumeInfo?.title) {
    console.log("New book received in context:", book);
    setBooks((prev) => [book, ...prev]);
    setFiltered((prev) => [book, ...prev]);
  }
}, [book]);


  // console.log('listttt====>',list)

  return (
    <SafeAreaView style={styles.container}>
      {showModal && (
        <Modal
          transparent={true}
          visible={showModal}
          animationType="fade"
          onRequestClose={() => setShowmodal(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowmodal(false)}>
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

                <ScrollView style={{ width: "100%" ,}}>
                  <TouchableOpacity
                    onPress={() => handleCategory("")}
                    style={{
                      borderWidth: 1, 
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
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      <HomeHeader
        onClick={() => setShowmodal(true)}
        category={category}
        onChange={handleFilter}
        onList={()=>setList(!list)}
        list={list}
      />
     <FlatList
  key={list ? 'list' : 'grid'} // 🔁 changes when layout toggles
  numColumns={list ? 1 : (width < 720 ? 2 : 3)}
  data={paddedBooks}
  renderItem={renderItem}
  keyExtractor={useCallback((item) => item.id, [])}
  style={styles.listContainer}
  contentContainerStyle={styles.contentContainerStyle}
  onEndReached={text.length === 0 ? fetchData : null}
  onEndReachedThreshold={0.1}
  ListFooterComponent={loading && <ActivityIndicator />}
  ListEmptyComponent={useCallback(
    () => (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 50, color: "white" }}>Loading...</Text>
      </View>
    ),
    []
  )}
/>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDFBEE",
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#A0C878",
    paddingTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contentContainerStyle: {
    marginHorizontal: 16,
    // paddingVertical:10
  },
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

export default HomeScreen;
