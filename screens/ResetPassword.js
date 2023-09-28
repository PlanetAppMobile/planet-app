import { View, TextInput, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import BgLogin from "../assets/bg-login.png";
import FormInput from "../components/TextInput";
import ButtonText from "../components/Button"
import BackIcon from "../assets/icons/back-icon.png";
function ResetPassword() {
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
      <TouchableOpacity>
        <Image
          style={{ width: "100%", height: 40, left: -155, marginTop: 15 }}
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
        <FormInput labelText={"Username or email"}/>
        <FormInput labelText={"Password"}/>
        <FormInput labelText={"Confirm New Password"}/>
        <ButtonText buttonText={"RESET PASSWORD"}/>
        
      </View>
    </View>
  );
}
export default ResetPassword;
