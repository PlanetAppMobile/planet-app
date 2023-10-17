import React, { useRef, useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Animated } from "react-native";
import HeaderPic from "../assets/header-page.png";
import BoxProject from "../components/BoxProject";
import path from "../path";
import axios from "axios";

function Project({ route, navigation }) {
    const [project, setProject] = useState([])
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerHeight = 65;

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -headerHeight],
        extrapolate: "clamp",
    });
    async function getProject() {
        await axios.get(`${path}/project`, {
            user_id: 1,
        }).then((res) => {
            console.log(res.data)
            setProject(res.data)
        })
    }
    useEffect(() => {
        getProject()
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <Image
                style={{
                    width: "100%",
                    height: headerHeight,
                    position: "absolute",
                    zIndex: 10,
                    transform: [{ translateY: headerTranslateY }],
                }}
                source={HeaderPic}
                resizeMode="contain"
            />
            <ScrollView
                style={{ backgroundColor: "#FBF7F0", marginTop: headerHeight }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            >
                <View style={{ paddingVertical: 24, paddingHorizontal: 25 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ fontSize: 32, letterSpacing: 3, fontFamily: "JockeyOne" }}>
                            My Project
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("CreateProject")}
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
                        For managing your projects.
                    </Text>
                    <View style={{ marginTop: 25 }}>
                        {project?.map((item, index) => {
                            return (
                                <BoxProject key={index} data={item} />
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Project;
