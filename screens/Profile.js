import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
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
  const handleInputChange = (labelText, value) => {
    if (labelText == "Full name") {
      setNewName(value);
    }
    if (labelText == "Email") {
      setNewEmail(value);
    }
    if (labelText == "Phone number") {
      setNewPhone(value);
    }
  };
  useEffect(() => {
    axios.get(`${path}/user/1`).then((res) => {
      console.log(res.data);
      setProfile(res.data.users);
      setNewName(res.data.users.user_fullname);
      setNewPhone(res.data.users.user_phoneNumber);
      setNewEmail(res.data.users.user_email);
    });
  }, []);
  const [profile, setProfile] = useState([]);
  function handleEdit() {
    if (onEdit == false) {
      axios
        .put(`${path}/user`, {
          fullName: newName,
          email: newEmail,
          phoneNumber: newPhone,
          userId: profile.user_id,
        })
        .then((res) => {
          console.log(res.data);
        });
    } else {
      Alert.alert("Please Input Topic or description Project");
    }
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
            letterSpacing: 1,
            fontFamily: "Jura",
            color: "#00213F",
            marginTop: 10,
          }}
        >
          {newName} #00{profile.user_id}
        </Text>
      </View>
      <View style={{ paddingHorizontal: 25, marginTop: 20 }}>
        <FormInput
          labelText={"Full name"}
          handleChange={handleInputChange}
          value={newName}
          disabled={onEdit}
        />
        <FormInput
          labelText={"Email"}
          handleChange={handleInputChange}
          value={newEmail}
          disabled={onEdit}
        />
        <FormInput
          labelText={"Phone number"}
          handleChange={handleInputChange}
          value={newPhone}
          disabled={onEdit}
        />
        <TouchableOpacity
          onPress={handleEdit}
          style={{
            borderColor: "#F08D6E",
            borderWidth: 1,
            borderRadius: 3,
            marginTop: 12,
            backgroundColor: onEdit ? "transparent" : "#F08D6E",
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
        {onEdit && (
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
            <Text
              style={{ fontSize: 15, color: "white", fontFamily: "Copper" }}
            >
              LOGOUT
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
export default CreateProject;
