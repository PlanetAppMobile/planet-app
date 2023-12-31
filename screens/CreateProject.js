import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import Textarea from "react-native-textarea";;
import HeaderPic from "../assets/header-page.png"
import TextField from "../components/TextInput";
import BackIcon from "../assets/icons/back-icon.png";
import DatePicker from '../components/DatePicker';
import CalendarIcon from "../assets/icons/calendar-icon.png"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import path from "../path";

function CreateProject({ route, navigation }) {
    const [date, setDate] = useState(new Date())
    const [inputValue, setInputValue] = useState("")
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState(new Date())
    const handleInputChange = (labelText, value) => {
        if (labelText == "Title") {
            setInputValue(value)
        }
    };
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
    async function onSubmitCreateProject() {
        if (inputValue != '') {
            console.log(deadline);
            axios.post(`${path}/project`, {
                name: inputValue,
                description: description,
                deadline: deadline,
                start_date: date,
                end_date: date,
                status: "On going",
                assigned_to: await getUserIdFromStorage(),
            }).then((res) => {
                console.log(res.data)
                navigation.navigate("Project")
            })
        }
        else {
            Alert.alert(
                'Please Input Title Project',
            )
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#FBF7F0" }}>
            <Image
                style={{ width: "100%", height: 65 }}
                source={HeaderPic}
                resizeMode="contain"
            />
            <TouchableOpacity onPress={() => { navigation.navigate("Project") }}>
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
                    <Text style={{ fontSize: 32, letterSpacing: 3, fontFamily: "JockeyOne" }}>Create Project</Text>
                </View>
                <Text style={{ color: "#848181", fontFamily: "Jura", fontSize: 16 }}>
                    For manage your project.
                </Text>
                <View style={{ marginTop: 30 }}>
                    <TextField labelText={"Title"} value={inputValue} handleChange={handleInputChange} />
                    <Text
                        style={{
                            fontSize: 17,
                            fontFamily: "Jura",
                            color: "#768592",
                            marginBottom: 9,
                        }}
                    >Description</Text>
                    <Textarea
                        value={description}
                        onChangeText={(value) => { setDescription(value) }}
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
                            fontSize: 16,
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
                    <View style={{ position: 'relative', }}>
                        <DatePicker
                            defaultDate={Date.now()}
                            onDateChange={(value) => setDeadline(value)}
                        />
                        <Image
                            style={{ width: 20, height: 20, right: 5, top: 8, position: 'absolute' }}
                            source={CalendarIcon}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ width: '50%' }}>
                        <TouchableOpacity onPress={onSubmitCreateProject}
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
                        <TouchableOpacity onPress={() => { navigation.navigate("Project") }}
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
