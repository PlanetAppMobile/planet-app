import { View, TextInput, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import BgLogin from "../assets/bg-login.png";
import FormInput from "../components/TextInput";
import ButtonText from "../components/Button"
function Login({route, navigation}) {
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
      <View style={{ padding: 25 }}>
        <Text
          style={{
            fontSize: 36,
            fontFamily: "JockeyOne",
            letterSpacing: 5,
            color: "#00213F",
            marginBottom: 9,
          }}
        >
          LOGIN
        </Text>
        <FormInput labelText={"Username or email"}/>
        <FormInput labelText={"Password"}/>
        <TouchableOpacity onPress={()=>{navigation.navigate("System")}}
          style={{
            borderRadius: 5,
            height: 35,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F08D6E",
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 15, color: "white", fontFamily:'Copper' }}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate("ResetPassword")}}>
          <Text
            style={{
              color: "#848181",
              fontSize: 17,
              textAlign: "center",
              marginTop: 18,
              fontFamily: "Jura",
              fontWeight: 100,
            }}
          >
            Reset your password ?
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "black",
            fontSize: 17,
            textAlign: "center",
            marginTop: 120,
            fontFamily: "Jura",
          }}
        >
          Don’t have an account?{" "}
          <TouchableOpacity onPress={()=>{navigation.navigate("Register")}}>
            <Text style={{ color: "#E5725D", fontWeight: 500 }}>SIGN UP</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}
export default Login;
