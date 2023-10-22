import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  TextArea,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderPic from "../assets/header-page.png";
import BackIcon from "../assets/icons/back-icon.png";
import Textarea from "react-native-textarea";
import axios from "axios";
import path from "../path";

export default function AddNote({ route, navigation }) {
  const [topicValue, setTopicValue] = useState("")
  const [descValue, setDescValue] = useState("")
  const numNote = addLeadingZero(route.params.numNote || 1)
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
  async function onSubmitCreateNote() {
    if (topicValue != '') {
      axios.post(`${path}/note`, {
        topic: topicValue,
        description: descValue,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: await getUserIdFromStorage()
      }).then((res) => {
        navigation.navigate("Note")
        setTopicValue('')
        setDescValue('')
      })
    }
    else {
      Alert.alert(
        'Please Input Topic or description Project',
      )
    }
  }
  return (
    <ScrollView style={{ backgroundColor: "#FBF7F0" }}>
      <Image
        style={{ width: "100%", height: 65 }}
        source={HeaderPic}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => { navigation.navigate("Note") }}>

        <Image
          style={{ width: "100%", height: 40, left: -165 }}
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
                    {numNote}
                  </Text>

                  <TextInput
                    onChangeText={(value) => { setTopicValue(value) }}
                    value={topicValue}
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

                <TouchableOpacity style={{ padding: 10 }} onPress={onSubmitCreateNote}>
                  <Text style={{ color: "#E5725D", fontFamily: "Copper" }}>
                    DONE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ padding: 15 }}>
              <Textarea
                onChangeText={(value) => { setDescValue(value) }}
                value={descValue}
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
                placeholder="Enter your description here..."
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
                {formatDate(new Date())}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
