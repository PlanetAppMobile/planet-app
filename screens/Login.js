import { View, TextInput, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import BgLogin from "../assets/bg-login.png";
function Login() {
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
        <Text
          style={{
            fontSize: 17,
            fontFamily: "Jura",
            color: "#768592",
            marginBottom: 9,
          }}
        >
          Username or Email
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 6,
            borderColor: "#768592",
            borderRadius: 3,
            marginBottom: 15,
          }}
        ></TextInput>
        <Text
          style={{
            fontSize: 17,
            fontFamily: "Jura",
            color: "#768592",
            marginBottom: 9,
          }}
        >
          Password
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 6,
            borderColor: "#768592",
            borderRadius: 3,
          }}
        ></TextInput>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            height: 35,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F08D6E",
            marginTop: 25,
          }}
        >
          <Text style={{ fontSize: 18, color: "white" }}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
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
            marginTop: 150,
            fontFamily: "Jura",
          }}
        >
          Don’t have an account?{" "}
          <TouchableOpacity>
            <Text style={{ color: "#E5725D", fontWeight: 500 }}>SIGN UP</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}
export default Login;
