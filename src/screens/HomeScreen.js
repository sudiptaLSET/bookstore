import {
  View,
  Text,
  // SafeAreaView,
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
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import HomeHeader from "../components/HomeHeader";
import ListCard from "../components/ListCard";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { useDispatch, useSelector } from "react-redux";
import { add, newAdd } from "../redux/book/bookSlice";
// import BookContext from "../context/store";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import CategoryModal from "../components/CategoryModal";
import { useNotification } from "../context/NotificationContext";

const { height, width } = Dimensions.get("window");

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const [hasmore, setHasmore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");
  const [showModal, setShowmodal] = useState(false);
  const [text, setText] = useState("");
  const [list, setList] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const {showNotification} = useNotification();


  const navigation = useNavigation();

  // const { book } = useContext(BookContext);
  const reduxbook = useSelector((state) => state.book.books);


  const dispatch = useDispatch();

  const start = useRef(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    // console.log(loading)
    if (!hasmore || loading) {
      return;
    }
    setLoading(true);

    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q={SEARCH_TERM}&subject:${
          category === "" ? "SELECTED_CATEGORY" : category
        }&startIndex=${start.current}&maxResults=10`
      );
      // console.log(result?.data?.items)
      if (result?.data?.items?.length > 0) {
        dispatch(add(result.data.items));
        setFiltered(reduxbook);
        setBooks(reduxbook)
        setLoading(false);
        start.current += 11;
      } else {
        setLoading(false);
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
    [handleClick, list]
  );

  const handleCategory = (category) => {
    setShowmodal(false);
    setCategory(category);
    if (category === "All") {
      // console.log("All")
      fetchData();
      return;
    } else {
      const result = books.filter((item) =>
        item?.volumeInfo?.categories?.includes(category)
      );
      // console.log("cattt--> ",result)

      setFiltered(result);
    }
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
      if (Object.keys(book).length === 0) return;

      // dispatch(add(book));
      // console.log('Book-->',book)
      navigation.navigate("Detail", { book, title: book?.volumeInfo?.title });
    },
    [navigation]
  );

  // useEffect(() => {
  //   // if (book?.volumeInfo?.title) {
  //   // console.log("New book received in context:", book);
  //   // setBooks((prev) => [...book, ...books]);
  //   // setFiltered((prev) => [...book, ...books]);
  //   dispatch(newAdd(book));
    
  //   // }
  // }, [book]);


  useEffect(()=>{
      if(!hasmore){
        showNotification("No more books 🥲")
      }
  },[hasmore]);


  const items = ["All", "Computers", "Business & Economics"];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {showModal && (
          <CategoryModal
            onClick={() => setShowmodal(false)}
            showModal={showModal}
            handleCategory={(category) => handleCategory(category)}
            items={items}
          />
        )}

        <HomeHeader
          onClick={() => setShowmodal(true)}
          category={category}
          onChange={handleFilter}
          onList={() => setList(!list)}
          list={list}
        />
        <FlatList
          key={list ? "list" : "grid"} // 🔁 changes when layout toggles
          numColumns={list ? 1 : width < 720 ? 2 : 3}
          data={paddedBooks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.listContainer}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReached={
            text.length === 0 && category === "All" ? fetchData : null
          }
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading && <ActivityIndicator size="large" color="#FDFBEE" />
          }
        />
        {/* {!hasmore && (
          <Text style={{ fontSize: RFValue(20), textAlign: "center" }}>
            No more book !
          </Text>
        )} */}
      </SafeAreaView>
    </SafeAreaProvider>
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
    marginTop: RFValue(8),
  },
  contentContainerStyle: {
    marginHorizontal: 6,
    // paddingVertical:10
  },
});

export default HomeScreen;
