import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import HeaderPic from "../assets/header-page.png";
import Profile from "../assets/profile.png";
import FormInput from "../components/TextInput";
import axios from "axios";
import path from "../path";

function CreateProject({ route, navigation }) {
  const [date, setDate] = useState(new Date());
  const [onEdit, setOnEdit] = useState(true);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    axios.get(`${path}/user/1`).then((res) => {
      console.log(res.data);
      setProfile(res.data);
      setNewName(res.data.user_fullname);
      setNewPhone(res.data.phoneNumber);
      setNewEmail(res.data.user_email);
    });
  }, []);
  const [profile, setProfile] = useState([]);
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
            backgroundColor: onEdit ?  "transparent":"#F08D6E",
          }}
        >
          <Text
            style={{
              color: onEdit ? "#F08D6E" : "#FBF7F0",
              fontFamily: "Copper",
              textAlign: "center",
              padding: 7,
            }}
          >
            {!onEdit ? "DONE" : "EDIT PROFILE"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            height: 35,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F08D6E",
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 15, color: "white", fontFamily:'Copper' }}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default CreateProject;
