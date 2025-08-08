import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize';
import { Bookid, Bookkind, Etag, NoData } from '../../constants/constant';

const BasicDetail = ({ book }) => {

  // console.log("book---> ", book);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{Bookid}</Text>
        <Text style={styles.detailText}>: {book?.id || `${NoData}`} </Text>
      </View>
       <View style={styles.textContainer}>
        <Text style={styles.heading}>{Etag}</Text>
        <Text style={styles.detailText}>: {book?.etag || `${NoData}`} </Text>
      </View>
       <View style={styles.textContainer}>
        <Text style={styles.heading}>{Bookkind}</Text>
        <Text style={styles.detailText}>: {book?.kind || `${NoData}`} </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  heading: {
    fontSize: RFValue(14),
    fontWeight: 500,
    // borderWidth:1,
    width:'30%'
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom:20
  },
  detailText: {
    fontSize: RFValue(14),
    fontWeight: 300,
    color:'gey'

  }

})

export default BasicDetail