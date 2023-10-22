import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

function FormInput({ labelText, handleChange, value, valid, disabled }) {
  const regex = /password/i;
  var disable = false
  if(disabled){
    disable = true
  }
  var rulePassword = false
  if (regex.test(labelText)) {
    rulePassword = true
  }

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
        secureTextEntry={rulePassword}
        style={{
          borderWidth: 1,
          padding: 6,
          borderColor: "#768592",
          borderRadius: 3,
          marginBottom: 15,
          fontFamily: 'Jura',
          color: "#768592",
          fontSize:16
        }}
        disabled={disable}
        value={value} // Pass the value to the TextInput
        onChangeText={(value) => handleChange(labelText, value)} // Capture changes and call handleChange
      ></TextInput>
      {valid && (<Text style={{ color: '#E5725D', fontSize: 15, marginBottom: 8, fontFamily: "Jura" }}>
        Invalid {labelText}
      </Text>)}
    </View>
  );
}

export default FormInput;
