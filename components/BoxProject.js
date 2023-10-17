import { View, Text } from "react-native";
import React from "react";
import CalendarPiechart from "./CalendarPiechart";

function formatDate(inputDate) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(undefined, options);
    return formattedDate;
}

function BoxProject({ data }) {
    const {
        project_name,
        project_description,
        project_deadline,
        project_start_date,
        project_end_date,
        project_status,
        assigned_to
    } = data
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
                        <View style={{ position: "absolute", bottom: 0 }}><Text style={{ color: "#E5725D", fontFamily: "Jura", }}>{formatDate(project_end_date)}</Text></View>
                    </View>
                    <CalendarPiechart type={"Project"} />
                </View>
            </View>
        </View>
    );
}

export default BoxProject
