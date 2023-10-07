import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  TextArea,
} from "react-native";
import React from "react";
import HeaderPic from "../assets/header-page.png";
import BackIcon from "../assets/icons/back-icon.png";
import DeleteIcon from "../assets/icons/delete-icon.png";
import Textarea from "react-native-textarea";
export default function AddNote() {
  return (
    <ScrollView style={{ backgroundColor: "#FBF7F0" }}>
      <Image
        style={{ width: "100%", height: 65 }}
        source={HeaderPic}
        resizeMode="contain"
      />
      <TouchableOpacity>
        <Image
          style={{ width: "100%", height: 40, left: -155 }}
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
            Add Notes
          </Text>
        </View>
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

                  <TextInput
                    style={{
                      padding: 3,
                      outline: "none",
                      marginBottom: 5,
                      color: "#00213F",
                      fontSize: 17,
                      fontFamily: "Jura",
                    }}
                    placeholder="Enter your topic here..."
                    placeholderTextColor={"#B5B7B9"}
                  ></TextInput>
                </View>

                <TouchableOpacity style={{ padding: 10 }}>
                  <Text style={{ color: "#E5725D", fontFamily: "Copper" }}>
                    DONE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ padding: 15 }}>
              <Textarea
                containerStyle={{
                  height: 350,
                }}
                style={{
                  padding: 3,
                  outline: "none",
                  marginBottom: 5,
                  color: "#768592",
                  fontSize: 17,
                  fontFamily: "Jura",
                  height: 570,
                }}
                placeholder="Enter your topic here..."
                maxLength={500}
                placeholderTextColor={"#B5B7B9"}
              ></Textarea>
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
