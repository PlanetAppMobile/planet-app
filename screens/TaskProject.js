import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderPic from "../assets/header-page.png";
import BackIcon from "../assets/icons/back-icon.png";
import DeleteIcon from "../assets/icons/delete-icon.png";
import ListCheckBoxTask from "../components/ListCheckBoxTask";
import axios from "axios";
import path from "../path";

function TaskProject({ route, navigation }) {
    const projectId = route.params.projectId
    const projectName = route.params.projectName
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        axios.get(`${path}/task/${projectId}`).then((res) => {
            console.log("task:", res.data)
            setTasks(res.data)
        })
    }, [])
    return (
        <ScrollView style={{ backgroundColor: "#FBF7F0" }}>
            <Image
                style={{ width: "100%", height: 65 }}
                source={HeaderPic}
                resizeMode="contain"
            />
            <TouchableOpacity onPress={() => {
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
                        {projectName}
                    </Text>
                </View>
                <Text style={{ color: "#848181", fontFamily: "Jura", fontSize: 16 }}>
                    Every notes you wrote.
                </Text>
                <View style={{ width: '100%', marginTop: 20 }}>
                    <ListCheckBoxTask projectId={projectId} type={"todo"} title={"To do"} />
                    <ListCheckBoxTask projectId={projectId} type={"inprogress"} title={"In progress"} />
                    <ListCheckBoxTask projectId={projectId} type={"done"} title={"Done"} />
                </View>
                <View>
                    <TouchableOpacity
                        style={{
                            borderRadius: 5,
                            height: 35,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 2,
                            borderColor: '#F08D6E',
                            backgroundColor: "transaprent",
                            marginTop: 15,
                        }}
                    >
                        <Text style={{ fontSize: 15, color: "#F08D6E", fontFamily: 'Copper' }}>END PROJECT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
export default TaskProject;
