import React, { useRef, useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Animated, Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderPic from "../assets/header-page.png";
import BoxProject from "../components/BoxProject";
import { useIsFocused } from "@react-navigation/native";
import path from "../path";
import axios from "axios";

function Project({ route, navigation }) {
    const [project, setProject] = useState()
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerHeight = 65;
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
    async function getProject() {
        await axios.get(`${path}/project/${await getUserIdFromStorage()}`, {
        }).then((res) => {
            setProject(res.data)
            console.log(res.data);
        })
    }
    const isFocused = useIsFocused()
    useEffect(() => {
        getProject()
    }, [isFocused])

    return (
        <View style={{ flex: 1 }}>
            <Image
                style={{
                    width: "100%",
                    height: 65,
                    position: "absolute",
                    zIndex: 10,
                    backgroundColor: '#FBF7F0'
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
                onScrollEndDrag={(event) => {
                    let offsetY = event.nativeEvent.velocity.y;
                    if (offsetY > 0) {
                        navigation.setOptions({ tabBarStyle: { display: "none" }, });
                    } else {
                        navigation.setOptions({
                            tabBarStyle: {
                                display: 'block',
                                position: 'absolute',
                                width: '100%',
                                height: 100,
                                paddingTop: 0,
                                paddingHorizontal: 5,
                                elevation: 0,
                                borderTopWidth: 0,
                                backgroundColor: '#FBF7F0'
                            }
                        });
                    }
                }}
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
                    {
                        project && project.length > 0 && (
                            <View style={{ marginTop: 25 }}>
                                {isFocused && project.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => {
                                            try {
                                                const itemString = JSON.stringify(item);
                                                AsyncStorage.setItem(
                                                    '@ProjectLatest:active',
                                                    itemString,
                                                );
                                            } catch (error) {
                                                console.log(error)
                                            }
                                            navigation.navigate("TaskProject", {
                                                projectId: item.project_id,
                                                projectName: item.project_name,
                                                projectStatus: item.project_status
                                            })
                                        }}>
                                            <BoxProject data={item} />
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        )

                    }
                </View>
            </ScrollView>
        </View>
    );
}

export default Project;
