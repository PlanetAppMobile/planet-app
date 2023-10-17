import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import HeaderPic from "../assets/header-page.png";
import Profile from "../assets/profile.png";
import FormInput from "../components/TextInput";

function CreateProject({ route, navigation }) {
  const [date, setDate] = useState(new Date());
  const [onEdit, setOnEdit] = useState(false);
  function handleEdit() {
    setOnEdit(!onEdit);
  }
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
          style={{
            fontSize: 32,
            letterSpacing: 3,
            fontFamily: "JockeyOne",
            color: "#00213F",
          }}
        >
          Profile
        </Text>
        <Image
          style={{ width: "100%", height: 65, marginTop: 10 }}
          source={Profile}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: 18,
            letterSpacing: 2,
            fontFamily: "Jura",
            color: "#00213F",
            marginTop: 10,
          }}
        >
          Somsak #8484
        </Text>
      </View>
      <View style={{ paddingHorizontal: 25, marginTop: 20 }}>
        <FormInput labelText={"Full name"} />
        <FormInput labelText={"Email"} />
        <FormInput labelText={"Phone number"} />
        <TouchableOpacity
          onPress={handleEdit}
          style={{
            borderColor: "#F08D6E",
            borderWidth: 1,
            borderRadius: 3,
            marginTop: 12,
            backgroundColor: onEdit ? "#F08D6E" : "transparent",
          }}
        >
          <Text
            style={{
              color: onEdit ? "#FBF7F0" : "#F08D6E",
              fontFamily: "Copper",
              textAlign: "center",
              padding: 7,
            }}
          >
            {onEdit ? "DONE" : "EDIT PROFILE"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default CreateProject;
