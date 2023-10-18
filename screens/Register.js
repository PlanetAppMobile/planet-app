import { View, Text, Image, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import BgRegister from "../assets/bg-register.png";
import BackIcon from "../assets/icons/back-icon.png";
import FormInput from "../components/TextInput";
import ButtonText from "../components/Button";
export default function Register({ route, navigation }) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")

  const handleInputChange = (labelText, value) => {
    if (labelText == 'Full name'){
      setFullName(value)
      console.log(fullName)
    }
    if (labelText == 'Email'){
      setEmail(value)
      console.log(email)
    }
  };
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
          style={{ width: "100%", height: 40, left: -155 }}
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
        <FormInput handleChange={handleInputChange} value={fullName} labelText={"Full name"} />
        {/* <Text style={{color:'red'}}>Please enter your full namme</Text> */}
        <FormInput handleChange={handleInputChange} value={email} labelText={"Email"} />
        {/* <FormInput labelText={"Phone number"} />
        <FormInput labelText={"Password"} />
        <FormInput labelText={"Confirm Password"} /> */}
        <TouchableOpacity onPress={() => { navigation.navigate("Login") }}
          style={{
            borderRadius: 5,
            height: 35,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F08D6E",
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 15, color: "white", fontFamily: 'Copper' }}>REGISTER</Text>
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
