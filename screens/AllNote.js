import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderPic from "../assets/header-page.png";
import BoxNote from "../components/BoxNote";
import axios from "axios";
import path from "../path";
function AllNote({ route, navigation }) {
  const [user, setUser] = useState();
  useEffect(() => {
    axios.get(`${path}/user/1`).then((res) => {
      setUser(res.data.users);
      console.log(res.data.users);
    });
  }, []);
  return (
    <ScrollView style={{ backgroundColor: "#FBF7F0" }}>
      <Image
        style={{ width: "100%", height: 65 }}
        source={HeaderPic}
        resizeMode="contain"
      />
      <View style={{ paddingVertical: 24, paddingHorizontal: 25 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {user && (
            <Text
              style={{
                fontSize: 32,
                letterSpacing: 3,
                fontFamily: "JockeyOne",
              }}
            >
              {" "}
              {user.user_id}
            </Text>
          )}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddNote");
            }}
            style={{
              backgroundColor: "#F08D6E",
              width: 100,
              height: 27,
              borderRadius: 3,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                marginTop: 6,
                fontFamily: "Copper",
              }}
            >
              ADD
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: "#848181", fontFamily: "Jura", fontSize: 16 }}>
          Every notes you wrote.
        </Text>
        <View style={{ marginTop: 25 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DetailNote");
            }}
          >
            <BoxNote notesText={"eiei"}></BoxNote>
          </TouchableOpacity>
          {/* <BoxNote notesText={"eiei"}></BoxNote> */}
        </View>
      </View>
    </ScrollView>
  );
}
export default AllNote;
