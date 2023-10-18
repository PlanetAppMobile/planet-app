import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import HeaderPic from "../assets/header-page.png";
import BackIcon from "../assets/icons/back-icon.png";
import DeleteIcon from "../assets/icons/delete-icon.png";
import axios from "axios";
import path from "../path";
import Textarea from "react-native-textarea/src/Textarea";
function DetailsNote({route, navigation}) {
  const [onEdit, setOnEdit] = useState(false);
  const {noteId} = route.params
  useEffect(() => {
    axios.get(`${path}/note/1/${noteId}`).then((res) => {
      console.log(res.data);
      setNote(res.data);
    });
  }, []);
  const [note, setNote] = useState([]);
  // console.log(noteId)
  function addLeadingZero(number) {
    let strNumber = number.toString();
    if (strNumber.length < 2) {
      strNumber = '0' + strNumber;
    }
    return strNumber;
  }
  function formatDate(inputDate) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(undefined, options);
    return formattedDate;
  }
  function handleEdit() {
    setOnEdit(!onEdit);
  }
  return (
    <ScrollView style={{ backgroundColor: "#FBF7F0" }}>
      <Image
        style={{ width: "100%", height: 65 }}
        source={HeaderPic}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={()=>{navigation.navigate("Note")}}>
        <Image
          style={{ width: "100%", height: 40, left: -175 }}
          source={BackIcon}
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
      <View style={{ paddingHorizontal: 25 }}>
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
            onPress={handleEdit}
            style={{
              borderColor: "#F08D6E",
              width: 100,
              height: 27,
              borderWidth: 1,
              padding: 6,
              borderRadius: 3,
              backgroundColor: onEdit ? "#F08D6E" : "transparent",
            }}
          >
            <Text
              style={{
                color: onEdit ? "#FBF7F0" : "#F08D6E",
                textAlign: "center",
                fontFamily: "Copper",
              }}
            >
              {onEdit ? "DONE" : "EDIT"}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: "#848181", fontFamily: "Jura", fontSize: 16 }}>
          Every notes you wrote.
        </Text>
        <View
          style={{
            marginTop: 25,
            borderWidth: 1,
            borderColor: "#D9DADA",
            borderRadius: 5,
          }}
        >
          <View style={{}}>
            {" "}
            <View
              style={{ borderBottomWidth: 1, borderBottomColor: "#D9DADA" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: 15,
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 40,
                      fontFamily: "Jura",
                      color: "#8A97A0",
                    }}
                  >
                    {addLeadingZero(noteId-1)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      color: "#00213F",
                      fontFamily: "Jura",
                      fontWeight: "bold",
                    }}
                  >
                    {note.topic}
                  </Text>
                </View>

                <TouchableOpacity>
                  <Image
                    style={{ width: 40, height: 55 }}
                    source={DeleteIcon}
                    resizeMode="contain"
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ padding: 15 }}>
              <Textarea value={note.description}
                style={{
                  color: "#768592",
                  fontSize: 16,
                  fontFamily: "Jura",
                  letterSpacing: 1,
                  lineHeight: 23,
                }}
              >
                {note.description}
              </Textarea>
              <Text
                style={{
                  marginTop: 45,
                  color: "#B5B7B9",
                  textAlign: "center",
                  fontSize: 15,
                  fontFamily: "Jura",
                }}
              >
                {formatDate(note.updated_at)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default DetailsNote;
