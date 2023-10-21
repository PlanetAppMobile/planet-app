import { View, Text, ScrollView, Image, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import HeaderPic from "../assets/header-page.png";
import BoxNote from "../components/BoxNote";
import axios from "axios";
import path from "../path";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
function AllNote({ route, navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  async function getUserIdFromStorage() {
    try {
      const value = await AsyncStorage.getItem('@UserId');
      if (value != null) {
        return parseInt(JSON.parse(value))
      }
      console.log(value);
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };
  async function getNote() {
    await axios.get(`${path}/note/${await getUserIdFromStorage()}`).then((res) => {
      setNote(res.data);
    });
  }
  const isFocused = useIsFocused()
  useEffect(() => {
    getNote()
  }, [isFocused])
  const [note, setNote] = useState([]);

  return (
    <View style={{ flex: 1 }} onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: false }
    )}>
      <Image
        style={{
          width: "100%",
          height: 65,
          zIndex: 10,
          backgroundColor: '#FBF7F0'
        }}
        source={HeaderPic}
        resizeMode="contain"

      />
      <ScrollView style={{ backgroundColor: "#FBF7F0" }}>
        <View style={{ paddingVertical: 24, paddingHorizontal: 25 }} >
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
                navigation.navigate("AddNote", {
                  numNote: note.length + 1
                });
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
          <View style={{ marginTop: 25, flexDirection: "row", justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {note?.map((item, index) => {
              return (
                <TouchableOpacity key={index}
                  style={{ marginBottom: 20 }}
                  onPress={() => {
                    navigation.navigate("DetailNote", {
                      noteId: item.note_id,
                      noNote: index
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

    </View>
  );
}
export default AllNote;
