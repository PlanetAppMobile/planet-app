import React, { useRef } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Animated } from "react-native";
import HeaderPic from "../assets/header-page.png";
import BoxProject from "../components/BoxProject";

function Project({ route, navigation }) {
    // Create an Animated.Value for tracking scroll position
    const scrollY = useRef(new Animated.Value(0)).current;

    // Define the header height
    const headerHeight = 65;

    // Calculate the header's translateY based on scroll position
    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -headerHeight],
        extrapolate: "clamp",
    });

    return (
        <View style={{ flex: 1 }}>
            <Image
                style={{
                    width: "100%",
                    height: headerHeight,
                    position: "absolute",
                    zIndex: 10,
                    transform: [{ translateY: headerTranslateY }], // Apply translation
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
                    {/* Rest of your content */}
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
                            onPress={() => navigation.navigate("Homepage")}
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
                        {/* Wait Implement API */}
                        <BoxProject obj={{ title: "Test1", description: "dsadsadsadasd" }} />
                        <BoxProject obj={{ title: "Test2", description: "uythjfgfhgfhfg" }} />
                        <BoxProject obj={{ title: "Test3", description: "dsadjyncxcsa" }} />
                        <BoxProject obj={{ title: "Tests4", description: "hgfhgffdsdsc" }} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Project;
