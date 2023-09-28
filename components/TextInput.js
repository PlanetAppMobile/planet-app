import { View, Text, TextInput } from "react-native";
import React from "react";

function FormInput({ labelText }) {
  return (
    <View>
      <Text
        style={{
          fontSize: 17,
          fontFamily: "Jura",
          color: "#768592",
          marginBottom: 9,
        }}
      >
        {labelText}
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 6,
          borderColor: "#768592",
          borderRadius: 3,
          marginBottom: 5,
        }}
      ></TextInput>
      <Text style={{color:'#E5725D', fontSize:15, marginBottom: 8, fontFamily: "Jura",}}>Invalid { labelText }</Text>
    </View>
  );
}
export default FormInput;
