import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Textarea from "react-native-textarea";;
import HeaderPic from "../assets/header-page.png"
import TextField from "../components/TextInput";
import BackIcon from "../assets/icons/back-icon.png";
import DatePicker from '../components/DatePicker';

function CreateProject({ route, navigation }) {
    const [date, setDate] = useState(new Date())
    return (
        <View style={{ flex: 1, backgroundColor: "#FBF7F0" }}>
            <Image
                style={{ width: "100%", height: 65 }}
                source={HeaderPic}
                resizeMode="contain"
            />
            <TouchableOpacity onPress={()=>{navigation.navigate("Project")}}>
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
                    <Text style={{ fontSize: 32, letterSpacing: 3, fontFamily: "JockeyOne" }}>Create Project</Text>
                </View>
                <Text style={{ color: "#848181", fontFamily: "Jura", fontSize: 16 }}>
                    For manage your project.
                </Text>
                <View style={{ marginTop: 30 }}>
                    <TextField labelText={"Title"} />
                    <Text
                        style={{
                            fontSize: 17,
                            fontFamily: "Jura",
                            color: "#768592",
                            marginBottom: 9,
                        }}
                    >Description</Text>
                    <Textarea
                        containerStyle={{
                            padding: 5,
                            borderWidth: 1,
                            borderRadius: 3,
                            borderColor: "#768592",
                            marginBottom: 10,
                            height: 180,
                        }}
                        style={{
                            color: "#768592",
                            fontSize: 17,
                            fontFamily: "Jura",
                            height: 370,
                        }}
                        maxLength={500}
                        placeholderTextColor={"#B5B7B9"}
                        underlineColorAndroid={'transparent'}
                    ></Textarea>
                    <Text
                        style={{
                            fontSize: 17,
                            fontFamily: "Jura",
                            color: "#768592",
                            marginBottom: 9,
                        }}
                    >
                        Deadline
                    </Text>
                    <DatePicker
                        defaultDate={Date.now()}
                        onDateChange={(value) => console.log(value)}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ width: '50%' }}>
                        <TouchableOpacity onPress={()=>{navigation.navigate("Project")}}
                            style={{
                                borderRadius: 5,
                                height: 35,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#F08D6E",
                                marginTop: 15,
                                marginRight: 5
                            }}
                        >
                            <Text style={{ fontSize: 15, color: "white", fontFamily: 'Copper' }}>CREATE</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '50%' }}>
                        <TouchableOpacity onPress={()=>{navigation.navigate("Project")}}
                            style={{
                                borderRadius: 5,
                                height: 35,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 2,
                                borderColor: "#F08D6E",
                                backgroundColor: "transparent",
                                marginTop: 15,
                                marginLeft: 5
                            }}
                        >
                            <Text style={{ fontSize: 15, color: "#F08D6E", fontFamily: 'Copper' }}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    );
}
export default CreateProject;
