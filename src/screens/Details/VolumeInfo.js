import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native';
const VolumeInfo = ({ book }) => {

  const [fullDesc, setFulldesc] = useState(false);
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Authors
          </Text>
          <Text style={{ fontSize: RFValue(14) }}>:</Text>
        </View>
        <View>
          {
            book?.volumeInfo?.authors?.map?.((item, index) => (
              <Text key={item.index} style={styles.detailText}>
                {item}
              </Text>
            ))
          }
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            categories
          </Text>
          <Text style={{ fontSize: RFValue(14) }}>:</Text>
        </View>
        <View>
          {
            book?.volumeInfo?.categories?.map?.((item) => (
              <Text key={item.index} style={styles.detailText}>
                {item}
              </Text>
            ))
          }
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Version
          </Text>
          <Text style={{ fontSize: RFValue(14) }}>:</Text>
        </View>
        <Text style={styles.detailText}>{book?.volumeInfo?.contentVersion}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Description
          </Text>
          <Text style={{ fontSize: RFValue(14) }}>:</Text>
        </View>


        <View style={[styles.detailText, { flex: 1 }]}>
          <Text style={styles.detailText} numberOfLines={fullDesc ? undefined : 3}>
            {book?.volumeInfo?.description}
          </Text>

          {book?.volumeInfo?.description?.length > 100 && (
            <TouchableOpacity onPress={() => setFulldesc(!fullDesc)}>
              <Text style={{ fontSize: RFValue(12), color: 'blue', marginTop: 4 }}>
                {fullDesc ? 'read less' : 'read more'}
              </Text>
            </TouchableOpacity>
          )}

        </View>

      </View>

      <View style={styles.section}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Page count
          </Text>
          <Text style={{ fontSize: RFValue(14) }}>:</Text>
        </View>
        <Text style={styles.detailText}>{book?.volumeInfo?.pageCount}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Publisher
          </Text>
          <Text style={{ fontSize: RFValue(14) }}>:</Text>
        </View>
        <Text style={styles.detailText}>{book?.volumeInfo?.publisher}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            printType
          </Text>
          <Text style={{ fontSize: RFValue(14) }}>:</Text>
        </View>
        <Text style={styles.detailText}>{book?.volumeInfo?.printType}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Language
          </Text>
          <Text style={{ fontSize: RFValue(14) }}>:</Text>
        </View>
        <Text style={styles.detailText}>{book?.volumeInfo?.language === 'en' ? 'English' : book?.volumeInfo?.language}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            PreviewLink
          </Text>
          <Text style={{ fontSize: RFValue(14) }}>:</Text>
        </View>
      
      
        <TouchableOpacity onPress={()=>navigation.navigate('WebScreen',{uri: book?.volumeInfo?.previewLink || ''})}>
          <Text style={{ color: 'blue', textDecorationLine: 'underline',fontSize:RFValue(12) }}>
            Open Link
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  section: {
    // borderWidth:1,
    flexDirection: 'row',
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
    fontSize: RFValue(12),
    fontWeight: 300,
    color: 'gey',
    // borderWidth:1,
    flex: 1

  }
})

export default VolumeInfo