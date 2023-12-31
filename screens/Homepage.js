import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Head from "../assets/head-homepage.png";
import Right from "../assets/homepage-right.png";
import Left from "../assets/homepage-left.png";
function Homepage({ route, navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FBF7F0",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: "100%", height: 140, marginTop: 230 }}
          source={Head}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={{
            marginTop:50,
            borderRadius: 5,
            width: 150,
            height: 38,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F08D6E",
          }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: "white",
              textDecorationLine: "underline",
              fontWeight: 500,
            }}
          >
            Get start
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            marginTop:120,
            fontSize: 18,
            color: "#00213F",
            letterSpacing: 2,
          }}
        >
          I never dreamed about success.
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#00213F",
            letterSpacing: 2,
          }}
        >
          I worked for it.
        </Text>
      </View>
      
        <View
          style={{
            // backgroundColor: "red",
            flexDirection: "row",
            height:170,
            width: "100%",
            position: "absolute",
            bottom: 0,
            justifyContent: "space-between",
          }}
        >
          <Image
            style={{ width: 160, height: 165 }}
            source={Left}
            resizeMode="contain"
          />
          <Image
            style={{ width: 160, height: 165 }}
            source={Right}
            resizeMode="contain"
          />
        </View>
      </View>
  );
}

export default Homepage;
