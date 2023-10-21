import { View, TextInput, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import BgLogin from "../assets/bg-login.png";
import FormInput from "../components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import path from "../path";

function Login({ route, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPass] = useState(false);

  function isEmailValid(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
  const handleInputChange = (labelText, value) => {
    if (labelText == "Email") {
      if (!isEmailValid(value)) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
      }
      setEmail(value);
    }
    if (labelText == "Password") {
      setPassword(value);
      setValidPass(false);
    }
  };
  function onSubmitVerify() {
    if (!email && !password) {
      setValidEmail(true);
      setValidPass(true);
      console.log("sai input ekwai")
    } else if (!isEmailValid(email)) {
      setValidEmail(true);
      console.log("Emailllll ekwai")
    } else if (!password) {
      setValidPass(true);
      console.log("Passworddddd ekwai")
    }else{
      axios
      .post(`${path}/login`, {
        email,
        password,
      })
      .then(async(res) => {
        if(res.data.message == "Login successful"){
          await AsyncStorage.setItem('@UserId',JSON.stringify(res.data.userId)).then(()=>{
            navigation.navigate("System");
          })
        }else{
          Alert.alert("Your email or Password is invalid")
        }
      });
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
        <FormInput
          handleChange={handleInputChange}
          valid={validEmail}
          value={email}
          labelText={"Email"}
        />
        <FormInput
          handleChange={handleInputChange}
          valid={validPassword}
          value={password}
          labelText={"Password"}
        />
        <TouchableOpacity
          onPress={onSubmitVerify}
          style={{
            borderRadius: 5,
            height: 35,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F08D6E",
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 15, color: "white", fontFamily: "Copper" }}>
            LOGIN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ResetPassword");
          }}
        >
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={{ color: "#E5725D", fontWeight: 500 }}>SIGN UP</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}

export default Login;
