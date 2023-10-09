import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import HeaderPic from "../assets/header-page.png";
import BoxProject from "../components/BoxProject";
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
                    <Text style={{ fontSize: 32, letterSpacing: 3, fontFamily: "JockeyOne" }}>My Project</Text>
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
                            CREATE
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: "#848181", fontFamily: "Jura", fontSize: 16 }}>
                    For manage your project.
                </Text>
                <View style={{ marginTop: 25 }}>
                    {/* Wait Implement API */}
                    <BoxProject obj={{title: "Test1", description:"dsadsadsadasd"}}></BoxProject>
                    <BoxProject obj={{title: "Test2", description:"uythjfgfhgfhfg"}}></BoxProject>
                    <BoxProject obj={{title: "Test3", description:"dsadjyncxcsa"}}></BoxProject>
                    <BoxProject obj={{title: "Tests4", description:"hgfhgffdsdsc"}}></BoxProject>
                </View>
            </View>
        </ScrollView>
    );
}
export default AllNote;
