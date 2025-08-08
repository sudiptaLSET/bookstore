import { View, Text } from 'react-native'
import React from 'react'
import { searchInfo } from '../../constants/constant'

const SearchInfo = () => {
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
      <Text>{searchInfo}</Text>
    </View>
  )
}

export default SearchInfo