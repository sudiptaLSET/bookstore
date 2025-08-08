import { View, Text,StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview';
import React from 'react'

const WebScreen = ({route}) => {

  // console.log("web -------> ", route.params.uri)
  const uri = route.params.uri
  return (
    <View style = {styles.container}>
    
          <WebView source={{ uri :uri}} />
    
    </View>
  )
}
const styles  = StyleSheet.create({
  container : {
    flex:1,
  }
})

export default WebScreen
