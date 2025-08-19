import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { RFValue } from "react-native-responsive-fontsize";
// const { height, width } = Dimensions.get('window')

const ListCard = ({ book, onClick, list }) => {
  const count = useRef(0);

  useEffect(() => {
    count.current += 1;
  }, [count.current]);
  // console.log("list-->", book.volumeInfo);

  return (
    <TouchableOpacity
      style={[
        styles.card,

        {
          flexDirection: list ? "row" : "column",
          aspectRatio: list ? "" : .9,
          justifyContent: list ? "flex-start" : "center",
          paddingVertical: list ? RFValue(20) : RFValue(15),
          paddingHorizontal:list?RFValue(10):RFValue(10),
          gap:list?RFValue(20):0,
          backgroundColor:Object.keys(book).length===0?'#A0C878':'#FDFBEE',
        },
      ]}
      onPress={() => onClick(book)}
    >
      <View
        style={[
          styles.imageContainer,
          { width: list ? RFValue(60) : "60%", height: list ? RFValue(60) : "60%" },
        ]}
      >
        <Image
          style={styles.thumbnail}
          source={{ uri: book?.volumeInfo?.imageLinks?.thumbnail }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.cardTitle,{textAlign:list?'left':'center'}]} numberOfLines={2}>
          {book?.volumeInfo?.title}
        </Text>
        <Text numberOfLines={1} style={[styles.author,{textAlign:list?'left':'center'}]}>
          {book?.volumeInfo?.authors?.[0]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // borderWidth: 0.5,
    borderColor: "grey",
    margin: 10,
    flex: 1,
    backgroundColor: "#FDFBEE",
    borderRadius:10,
    alignItems: "center",
    // borderWidth:5
  },
  imageContainer: {
    // height: "60%",
    // width:'60%'
    // borderWidth:1
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    // borderWidth: 1,
    marginHorizontal: "auto",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  cardTitle: {
    fontSize: RFValue(12),
    // textAlign: "left",
    fontWeight: 500,
    marginTop: 16,
    // borderWidth:1,
    // flex:1,
    // width:'60%'
  },
  textContainer:{
    // borderWidth:1,
    flex:1,
    flexShrink:1,
    // borderWidth:1

  },
  author: {
    fontSize: RFValue(10),
    // textAlign: "left",
    fontWeight: 300,
    marginTop: 2,
  },
});

// export default ListCard;

export default React.memo(ListCard);
