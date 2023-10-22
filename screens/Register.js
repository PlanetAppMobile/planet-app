import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import BgRegister from "../assets/bg-register.png";
import BackIcon from "../assets/icons/back-icon.png";
import FormInput from "../components/TextInput";
import ButtonText from "../components/Button";
import axios from "axios";
import path from "../path";

export default function Register({ route, navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [validFullName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPhoneNumber, setValidPhone] = useState(false);
  const [validPassword, setValidPass] = useState(false);
  const [validConfirm, setValidConfirm] = useState(false);

  const handleInputChange = (labelText, value) => {
    if (labelText == "Full name") {
      setFullName(value);
      setValidName(false);
    }
    if (labelText == "Email") {
      if (!isEmailValid(value)) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
      }
      setEmail(value);
    }
    if (labelText == "Phone number") {
      if(!isPhoneNumberValid(value)){
        setValidPhone(true)
      }else{
        setValidPhone(false)
      }
      setPhone(value);
    }
    if (labelText == "Password") {
      setPassword(value);
      setValidPass(false)
    }
    if (labelText == "Confirm Password") {
      if(value == password){
        setValidConfirm(false)
      }else{
        setValidConfirm(true)
      }
      setConfirm(value);
    }
  };
  function isEmailValid(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
  function isPhoneNumberValid(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber.replace(/\D/g, ""));
  }
  function onSubmitCreateUser() {
    if (!fullName && !email && !password && !phoneNumber) {
      setValidName(true);
      setValidEmail(true);
      setValidPass(true);
      setValidPhone(true);
      setValidConfirm(true);
      Alert.alert("Please enter all required information.");
    } else if (!fullName) {
      setValidName(true);
    } else if (!isEmailValid(email)) {
      setValidEmail(true);
    } else if (password != confirm) {
      setValidConfirm(true);
    } else if (!phoneNumber) {
      setValidPhone(true);
    } else {
      axios
        .post(`${path}/user`, {
          fullName,
          email,
          password,
          phoneNumber,
        })
        .then((res) => {
          navigation.navigate("Login");
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
        style={{ width: "100%", height: 115 }}
        source={BgRegister}
        resizeMode="contain"
      ></Image>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Image
          style={{ width: "100%", height: 40, left: -165 }}
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
          }}
        >
          REGISTER
        </Text>
        <FormInput
          handleChange={handleInputChange}
          value={fullName}
          labelText={"Full name"}
          valid={validFullName}
        />
        {/* <Text style={{color:'red'}}>Please enter your full namme</Text> */}
        <FormInput
          handleChange={handleInputChange}
          value={email}
          labelText={"Email"}
          valid={validEmail}
        />
        <FormInput
          handleChange={handleInputChange}
          value={phoneNumber}
          labelText={"Phone number"}
          valid={validPhoneNumber}
        />
        <FormInput
          handleChange={handleInputChange}
          value={password}
          labelText={"Password"}
          valid={validPassword}
        />
        <FormInput
          handleChange={handleInputChange}
          value={confirm}
          labelText={"Confirm Password"}
          valid={validConfirm}
        />
        <TouchableOpacity
          onPress={onSubmitCreateUser}
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
            REGISTER
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "black",
            fontSize: 17,
            textAlign: "center",
            marginTop: 45,
            fontFamily: "Jura",
          }}
        >
          Already have any account?{" "}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "#E5725D", fontWeight: 500 }}>SIGN IN</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}
