import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import PieChart from 'react-native-pie-chart'
import React, { useEffect, useState } from 'react'

function CalendarPiechart({ task, type, navigation, project }) {
    useEffect(() => {
        setData(task)
    })
    const [data, setData] = useState([])
    const todoTask = data.filter((task) => task.task_status === "todo")
    const inprogressTask = data.filter((task) => task.task_status === "inprogress")
    const doneTask = data.filter((task) => task.task_status === "done")
    const widthAndHeight = type == "Dashboard" ? 150 : 140
    let sliceColor
    let series
    if (todoTask.length + inprogressTask.length + doneTask.length == 0) {
        sliceColor = ["#B5B7B9"]
        series = [1]
    }
    else {
        sliceColor = ['#FFAA9B', "#CFCFAB", "#75C9A8"]
        series = [todoTask.length, inprogressTask.length, doneTask.length]
    }
    return (
        <View style={{ position: "relative", justifyContent: "center", alignItems: "center" }}>
            {type == "Dashboard" && (
                <TouchableOpacity
                    onPress={() => {
                        if (project){
                            navigation.navigate("TaskProject", {
                                projectId: project.project_id,
                                projectName: project.project_name,
                                previous: "Dashboard"
                            })
                        }else{
                            navigation.navigate("CreateProject")
                        }
                    }}
                    style={{
                        position: "absolute",
                        borderRadius: 999,
                        borderWidth: 1,
                        width: 35,
                        height: 35,
                        zIndex: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: "#B5B7B9",
                    }}
                >
                    <Text style={{ fontSize: 18, color: "#8A97A0" }}>+</Text>
                </TouchableOpacity>)}

            <PieChart
                widthAndHeight={widthAndHeight}
                series={series}
                sliceColor={sliceColor}
                coverRadius={0.8}
                style={{ transform: 'rotate(-30deg)' }}

            />
        </View>
    )
}

export default CalendarPiechart
