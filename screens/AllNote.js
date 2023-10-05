import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import HeaderPic from "../assets/header-page.png";
import BoxNote from "../components/BoxNote";
function AllNote() {
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
          <Text
            style={{ fontSize: 32, letterSpacing: 3, fontFamily: "JockeyOne" }}
          >
            My Notes
          </Text>
          <TouchableOpacity
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
        <View style={{ marginTop:25}}>
          <BoxNote>notesText={"eiei"}</BoxNote>
          {/* <BoxNote>notesText={"eiei"}</BoxNote> */}
        </View>
      </View>
    </ScrollView>
  );
}
export default AllNote;
