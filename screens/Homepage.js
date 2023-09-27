import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Head from "../assets/head-homepage.png";
import Right from "../assets/homepage-right.png";
import Left from "../assets/homepage-left.png";
function Homepage() {
  return (
    <ScrollView
      style={{
        flex:1,
        backgroundColor: "#FBF7F0",
      }}
    >
      <View style={{
        backgroundColor:"red",
        justifyContent: "center",
          alignItems: "center",
      }}>
        <Image
          style={{ width: "100%", height: 130, marginTop:150 }}
          source={Head}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={{
            borderRadius: 5,
            width: 150,
            height: 38,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F08D6E",
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
                fontSize:18,
                color:"#00213F",
                letterSpacing: 2,
            }}
        >
        I never dreamed about success.
        </Text>
        <Text
            style={{
                fontSize:18,
                color:"#00213F",
                letterSpacing: 2,
            }}
        >I worked for it.</Text>
      </View>
      <Text>dfdfdf</Text>
      <View
        style={{
          flexDirection: "row",
          height: 45,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{ width: 160, height: 145 }}
          source={Left}
          resizeMode="contain"
        />
        <Image
          style={{ width: 160, height: 145 }}
          source={Right}
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );
}

export default Homepage;
