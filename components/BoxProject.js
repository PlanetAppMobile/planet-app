import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import CalendarPiechart from "./CalendarPiechart";
import { AirbnbRating } from 'react-native-ratings';
import axios from "axios";
import path from "../path";

function formatDate(inputDate) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(undefined, options);
    return formattedDate;
}

function BoxProject({ data }) {
    async function getTaskInProject() {
        await axios.get(`${path}/task/${project_id}`, {
            user_id: 1,
        }).then((res) => {
            setTaskProject(res.data)
        })
    }
    const [taskProject, setTaskProject] = useState([])
    const {
        project_id,
        project_name,
        project_description,
        project_end_date,
        project_rating,
        project_deadline,
        project_status,
        assigned_to
    } = data
    useEffect(() => {
        getTaskInProject()
    }, [])
    return (
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <View
                style={{
                    borderColor: "#D9DADA",
                    width: "100%",
                    height: 180,
                    borderWidth: 2,
                    padding: 5,
                    borderRadius: 3,
                    position: "relative",
                    justifyContent: "space-between",
                }}
            >
                <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 22,
                                    color: "#00213F",
                                    fontFamily: "Jura",
                                    fontWeight: "bold",
                                }}
                            >
                                {project_name}
                            </Text>
                        </View>
                        <View style={{ width: 150 }}>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: "#B5B7B9",
                                    fontFamily: "Jura",
                                    marginTop: 6,
                                }}
                            >
                                {project_description}
                            </Text>

                        </View>
                        <AirbnbRating
                            starContainerStyle={{ margin: 0, padding: 0 }}
                            ratingContainerStyle={{ marginVertical: 10, marginHorizontal: 0, padding: 0, alignItems: 'flex-start' }}
                            count={5}
                            onFinishRating={(value) => { setRating(value) }}
                            defaultRating={project_rating || 0}
                            size={20}
                            showRating={false}
                            isDisabled={true}

                        />
                        <View style={{ position: "absolute", bottom: 0 }}><Text style={{ color: "#E5725D", fontFamily: "Jura", }}>{formatDate(project_deadline)}</Text></View>
                        {/* <View style={{ position: "absolute", bottom: 0 }}><Text style={{ color: "#E5725D", fontFamily: "Jura", }}>End {formatDate(project_end_date)}</Text></View> */}
                    </View>
                    <CalendarPiechart data={taskProject} type={"Project"} />
                </View>
            </View>
        </View>
    );
}

export default BoxProject
