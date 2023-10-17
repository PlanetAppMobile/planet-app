import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderPic from "../assets/header-page.png";
import BoxNote from "../components/BoxNote";
import axios from "axios";
import path from "../path";
function AllNote({ route, navigation }) {
  useEffect(() => {
    axios.get(`${path}/note/1`).then((res) => {
      console.log(res.data);
      setNote(res.data);
    });
  }, []);
  const [note, setNote] = useState([]);
  
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
        <View style={{ marginTop: 25,flexDirection:"row", justifyContent:'space-between', flexWrap:'wrap' }}>
          {note?.map((item, index) => {
            return (
              <TouchableOpacity key={index}
              style={{marginBottom:20}}
                onPress={() => {
                  navigation.navigate("DetailNote", {
                    noteId : item.note_id
                  });
                }}
              >
                <BoxNote key={index} index={index} data={item}></BoxNote>
              </TouchableOpacity>
            );
          })}
          {/* <BoxNote notesText={"eiei"}></BoxNote> */}
        </View>
      </View>
    </ScrollView>
  );
}
export default AllNote;
