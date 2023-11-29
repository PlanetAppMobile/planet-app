import { View, TextInput, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import BgLogin from "../assets/bg-login.png";
import FormInput from "../components/TextInput";
import ButtonText from "../components/Button"
import BackIcon from "../assets/icons/back-icon.png";
import axios from "axios";
import path from "../path";
function ResetPassword({ route, navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [validConfirm, setValidConfirm] = useState(false)
  const handleInputChange = (labelText, value) => {
    if (labelText == "Username or email") {
      setEmail(value);
    }
    if (labelText == "Password") {
      setPassword(value);
    }
    if (labelText == "Confirm New Password") {
      if (value == password) {
        setValidConfirm(false)
      } else {
        setValidConfirm(true)
      }
      setCPassword(value);
    }
  };
  function onSubmitChange() {
    if (email != '' && password != '' && cpassword != '' && validConfirm == false) {
      console.log(2);
      try {
        axios
          .put(`${path}/user/changepassword`, {
            email,
            password,
          })
          .then((res) => {
            if (res.data.message != undefined && res.data.message != null) {
              navigation.navigate("Login");
            } else {
              Alert.alert('User not found')
            }
          });
      } catch (er) {
        Alert.alert('User not found')
      }
    }
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FBF7F0",
      }}
    >
      <Image
        style={{ width: "100%", height: 310 }}
        source={BgLogin}
        resizeMode="contain"
      ></Image>
      <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
        <Image
          style={{ width: "100%", height: 40, left: -165, marginTop: 15 }}
          source={BackIcon}
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
      <View style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontSize: 36,
            fontFamily: "JockeyOne",
            letterSpacing: 5,
            color: "#00213F",
            marginBottom: 9,
          }}
        >
          Reset Password
        </Text>
        <FormInput
          handleChange={handleInputChange}
          value={email}
          labelText={"Username or email"}
        />
        <FormInput
          handleChange={handleInputChange}
          value={password}
          labelText={"Password"}
        />
        <FormInput
          handleChange={handleInputChange}
          value={cpassword}
          labelText={"Confirm New Password"}
          valid={validConfirm}
        />
        <TouchableOpacity onPress={onSubmitChange}
          style={{
            borderRadius: 5,
            height: 35,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F08D6E",
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 15, color: "white", fontFamily: 'Copper' }}>RESET PASSWORD</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
export default ResetPassword;
