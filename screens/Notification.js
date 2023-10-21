import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    LogBox,
    Animated
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import path from "../path"

import HeaderPic from "../assets/header-page.png";
import BackIcon from "../assets/icons/back-icon.png";
import PieChartIcon from "../assets/icons/piechart-icon.png"

function formatDate(inputDate) {
    const timeDifference = new Date(inputDate) - new Date()
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(timeDifference).toLocaleDateString(undefined, options);
    return days;
}

export default function Notification({ route, navigation }) {
    const [project, setProject] = useState([])
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerHeight = 65;

    async function getProject() {
        await axios.get(`${path}/project`, {
            user_id: 1,
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
                <TouchableOpacity onPress={() => {
                    navigation.navigate("System")
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
                        <Text style={{ fontSize: 32, letterSpacing: 3, fontFamily: "JockeyOne" }}>
                            My Notification
                        </Text>
                    </View>
                    {project && (<Text style={{ color: "#848181", fontFamily: "Jura", fontSize: 16 }}>
                        You have {project.length} notifications Today.
                    </Text>)
                    }
                    <View style={{ marginTop: 25 }}>
                        {isFocused && project?.sort((a, b) => {
                            const deadlineDateA = new Date(a.project_deadline);
                            const deadlineDateB = new Date(b.project_deadline);

                            return deadlineDateA - deadlineDateB;
                        })
                            .map((item, index) => {
                                return (
                                    <View key={index} style={{ width: "100%", borderColor: "#DDD", borderWidth: 1, marginTop: 10, padding: 15 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Image source={PieChartIcon} style={{ width: 40, height: 40 }} />
                                                <View style={{ paddingHorizontal: 13 }}>
                                                    <Text style={{ fontSize: 20, fontFamily: 'JockeyOne', letterSpacing: 2, color: '#00213F', marginBottom: 2 }}>{item.project_name}</Text>
                                                    <Text style={{ fontSize: 13, fontFamily: 'Jura', color: '#8A97A0' }}>
                                                        {formatDate(item.project_deadline) >= 0 ? (
                                                            <Text style={{ color: '#F08D6E' }}>{formatDate(item.project_deadline)} days</Text>
                                                        ) : (
                                                            <Text style={{ color: '#E5725D' }}>{Math.abs(formatDate(item.project_deadline))} days</Text>
                                                        )}{' '}
                                                        {formatDate(item.project_deadline) >= 0 ? 'remaining' : 'overdues'}
                                                    </Text>

                                                </View>
                                            </View>
                                            <View style={{}}>
                                                <TouchableOpacity onPress={() => {
                                                    navigation.navigate("TaskProject", {
                                                        projectId: item.project_id,
                                                        projectName: item.project_name,
                                                        projectStatus: item.project_status,
                                                        previous: "Notification"
                                                    })
                                                }}
                                                    style={{
                                                        borderRadius: 3,
                                                        height: 25,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderColor: "#F08D6E",
                                                        borderWidth: 2,
                                                        paddingHorizontal: 10,
                                                    }}
                                                >
                                                    <Text style={{ fontSize: 12, color: "#F08D6E", fontFamily: 'Copper' }}>VIEW</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}