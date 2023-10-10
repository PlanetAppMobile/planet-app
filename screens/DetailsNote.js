import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import HeaderPic from "../assets/header-page.png";
import BackIcon from "../assets/icons/back-icon.png";
import DeleteIcon from "../assets/icons/delete-icon.png";

function DetailsNote() {
  const [onEdit, setOnEdit] = useState(false);
  function handleEdit() {
    setOnEdit(true);
  }
  return (
    <ScrollView style={{ backgroundColor: "#FBF7F0" }}>
      <Image
        style={{ width: "100%", height: 65 }}
        source={HeaderPic}
        resizeMode="contain"
      />
      <TouchableOpacity>
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
                    01
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      color: "#00213F",
                      fontFamily: "Jura",
                      fontWeight: "bold",
                    }}
                  >
                    Send email to ijon&igae.
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
              <Text
                style={{
                  color: "#768592",
                  fontSize: 16,
                  fontFamily: "Jura",
                  letterSpacing: 1,
                  lineHeight: 23,
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Text>
              <Text
                style={{
                  marginTop: 45,
                  color: "#B5B7B9",
                  textAlign: "center",
                  fontSize: 15,
                  fontFamily: "Jura",
                }}
              >
                26 Feb, 2022
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default DetailsNote;
