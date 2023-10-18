import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import HeaderPic from "../assets/header-page.png";
import BackIcon from "../assets/icons/back-icon.png";
import DeleteIcon from "../assets/icons/delete-icon.png";
import ListCheckBoxTask from "../components/ListCheckBoxTask";

function DetailsNote({route, navigation}) {
    const [onEdit, setOnEdit] = useState(false);
    const projectId = route.params.projectId
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
            <TouchableOpacity onPress={()=>{
                navigation.navigate("Project")
            }}>
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
                        style={{ fontSize: 32, letterSpacing: 3, fontFamily: "JockeyOne", color: '#00213F' }}
                    >
                        MyProject
                    </Text>
                </View>
                <Text style={{ color: "#848181", fontFamily: "Jura", fontSize: 16 }}>
                    Every notes you wrote.
                </Text>
                <View style={{width:'100%',marginTop:20}}>
                    <ListCheckBoxTask projectId={projectId} />
                </View>
            </View>
        </ScrollView>
    );
}
export default DetailsNote;
