import { View, Text, StyleSheet, SafeAreaView ,FlatList,Image} from "react-native";
import React, { useContext } from "react";
import BookContext from "../context/store";

const Practice = () => {
  const array = "My name is sudipta";
  const change = array.split(" ").reverse().join(" ");

  const array2 = [4, 5, [93], [25, [6, 87], [4, 5, 7, 54], 87, 47, 4]];
  const change2 = array2.flat(1);

    const { book} = useContext(BookContext);
  
  console.log("1-----", book);
  console.log("2-----", change2);


  if (!book) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No book added yet.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
       {book.imageUri ? (
        <Image source={{ uri: book.imageUri }} style={styles.image} />
      ) : (
        <Text style={styles.noImage}>No image provided.</Text>
      )}
     <View style={styles.container}>
      <Text style={styles.title}>Title : {book.title}</Text>
      <Text style={styles.description}> Description : {book.description}</Text>
      <Text style={styles.price}>₹ {book.price}</Text>
     
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: 'green',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  noImage: {
    color: '#888',
    fontStyle: 'italic',
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});

export default Practice;
