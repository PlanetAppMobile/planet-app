import React from "react";
import { View, Text, TextInput } from "react-native";

function FormInput({ labelText, handleChange, value }) {
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
        value={value} // Pass the value to the TextInput
        onChangeText={(value) => handleChange(labelText, value)} // Capture changes and call handleChange
      ></TextInput>
      <Text style={{ color: '#E5725D', fontSize: 15, marginBottom: 8, fontFamily: "Jura" }}>
        Invalid {labelText}
      </Text>
    </View>
  );
}

export default FormInput;
