import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Textarea from "react-native-textarea";
import HeaderPic from "../assets/header-page.png";
import Profile from "../assets/profile.png";
import TextField from "../components/TextInput";
import BackIcon from "../assets/icons/back-icon.png";
import DatePicker from "../components/DatePicker";
import FormInput from "../components/TextInput";

function CreateProject({ route, navigation }) {
  const [date, setDate] = useState(new Date());
  return (
    <View style={{ flex: 1, backgroundColor: "#FBF7F0" }}>
      <Image
        style={{ width: "100%", height: 65 }}
        source={HeaderPic}
        resizeMode="contain"
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 32, letterSpacing: 3, fontFamily: "JockeyOne" }}
        >
          Profile
        </Text>
        <Image
          style={{ width: "100%", height: 65 }}
          source={Profile}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 18, letterSpacing: 2, fontFamily: "Jura" }}>
          Somsak #8484
        </Text>
      </View>
      <View style={{paddingHorizontal: 25}}>
        <FormInput labelText={"Full name"}/>
        <FormInput labelText={"Email"} />
        <FormInput labelText={"Phone number"} />
        <TouchableOpacity style={{}}>
          <Text>
            EDIT PROFILE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default CreateProject;
