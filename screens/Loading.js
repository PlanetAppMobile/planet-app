import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import BgLoading from "../assets/background_loading.png";
import LogoPlanet from "../assets/logo.png";
function Loading() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FBF7F0",
        // position:'relative'
      }}
    >
      <View style={{justifyContent:'space-between',height:'67%', marginTop: 280}}>
        <Image
          style={{ width: "100%", height: 85 }}
          source={LogoPlanet}
          resizeMode="contain"
        />
        <Image
          style={{ width: "100%", height: 305}}
          source={BgLoading}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
export default Loading;
