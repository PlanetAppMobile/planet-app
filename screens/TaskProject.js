import { View, Text, ScrollView, Image, TouchableOpacity, Modal, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import HeaderPic from "../assets/header-page.png";
import BackIcon from "../assets/icons/back-icon.png";
import DeleteIcon from "../assets/icons/delete-icon.png";
import ListCheckBoxTask from "../components/ListCheckBoxTask";
import { Rating, AirbnbRating } from 'react-native-ratings';
import axios from "axios";
import path from "../path";
import { useState } from "react";

function TaskProject({ route, navigation }) {
    const projectId = route.params.projectId
    const projectName = route.params.projectName
    const WATER_IMAGE = require('../assets/rateing_icon.png')
    const previousNavigate = route.params.previous || "Project"
    const [tasks, setTasks] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    async function getTask() {
        await axios.get(`${path}/task/${projectId}`).then((res) => {
            setTasks(res.data)
        })
    }
    useEffect(() => {
        getTask()
    }, [])
    function onRatingProject(value) {
        console.log(value);
    }
    async function handleEndTask() {
        setModalVisible(false)
        // await axios.put(`${path}/endTask/${projectId}`).then((res) => {
        //     getTask()
        // })
    }
    return (
        <ScrollView style={{ backgroundColor: "#FBF7F0" }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            style={{ width: '100%', height: 55 }}
                            source={HeaderPic}
                            resizeMode="contain"
                        />
                        <View style={{ padding: 0, justifyContent: "center" }}>
                            <Text style={styles.modalText}>RATE YOUR PROJECT</Text>
                            <Text style={{ fontFamily: 'Jura', fontSize: 24, textAlign: 'center', color: '#00213F' }}>{projectName}</Text>
                            <AirbnbRating
                                count={5}
                                reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
                                defaultRating={0}
                                size={20}
                                showRating={false}
                            />
                            {/* <Rating
                                type='star'
                                // ratingImage={WATER_IMAGE}
                                // ratingColor='#CCCCCC'
                                ratingBackgroundColor='transparent'
                                ratingCount={5}
                                imageSize={40}
                                ratingContainerStyle={{ marginHorizontal: 10, marginTop: 20, }}
                                onFinishRating={onRatingProject}
                                style={{ paddingVertical: 10, }}
                            /> */}

                        </View>
                        <View style={{ flexDirection: "row", width: '80%', justifyContent: "space-between", marginTop: 20 }}>
                            <View style={{ width: '50%' }}>
                                <TouchableOpacity onPress={() => { setModalVisible(false) }}
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
                            <View style={{ width: '50%', marginLeft: 5 }}>
                                <TouchableOpacity
                                onPress={handleEndTask}
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
                                    <Text style={{ fontSize: 15, color: "white", fontFamily: 'Copper' }}>SUBMIT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Image
                style={{ width: "100%", height: 65 }}
                source={HeaderPic}
                resizeMode="contain"
            />
            <TouchableOpacity onPress={() => {
                navigation.navigate(previousNavigate)

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
                {tasks && (
                    <View style={{ width: '100%', marginTop: 20 }}>
                        <ListCheckBoxTask data={tasks} projectId={projectId} getTask={getTask} type={"todo"} title={"To do"} />
                        <ListCheckBoxTask data={tasks} projectId={projectId} getTask={getTask} type={"inprogress"} title={"In progress"} />
                        <ListCheckBoxTask data={tasks} projectId={projectId} getTask={getTask} type={"done"} title={"Done"} />
                    </View>
                )}
                <View>
                    <TouchableOpacity
                        onPress={()=>{setModalVisible(true)}}
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
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(109, 109, 104, 0.5)'
    },
    modalView: {
        backgroundColor: '#FBF7F0',
        width: 330,
        height: 300,
        borderRadius: 20,
        alignItems: 'center',
        overflow: 'hidden'
    },
    button: {
        fontFamily: 'Copper',
        borderRadius: '0.1875rem',
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 28,
        fontFamily: 'JockeyOne',
        letterSpacing: 3
    },
});
export default TaskProject;
