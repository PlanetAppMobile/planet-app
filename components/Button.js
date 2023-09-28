import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

function Button({ buttonText }) {
  return (
    <View>
      <TouchableOpacity
          style={{
            borderRadius: 5,
            height: 35,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F08D6E",
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 15, color: "white", fontFamily:'Copper' }}>{ buttonText }</Text>
        </TouchableOpacity>
    </View>
  )
}
export default Button