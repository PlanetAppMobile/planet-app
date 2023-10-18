import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage
} from "react-native";
import PieChart from 'react-native-pie-chart'
import React from 'react'

function CalendarPiechart({ data, type }) {
    const todoTask = data.filter((task) => task.task_status === "todo")
    const inprogressTask = data.filter((task) => task.task_status === "inprogress")
    const doneTask = data.filter((task) => task.task_status === "done")
    const widthAndHeight = type == "Dashboard" ? 150 : 140
    let sliceColor
    let series
    if (todoTask.length + inprogressTask.length + doneTask.length == 0){
        sliceColor = ["#B5B7B9"]
        series = [1]
    }
    else{
        sliceColor = ['#FFAA9B', "#CFCFAB", "#75C9A8"]
        series = [todoTask.length, inprogressTask.length, doneTask.length]
    }
    const donePercentage = Math.round((doneTask.length / (todoTask.length + inprogressTask.length + doneTask.length)) * 100) || 0;
    return (
        <View style={{ position: "relative", justifyContent: "center", alignItems: "center" }}>
            {type == "Dashboard" && (
                <TouchableOpacity
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
                {type == "Project" && (
                <View
                    style={{
                        position: "absolute",
                        borderRadius: 999,
                        zIndex: 4,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={{color: donePercentage == 0 ? '#8A97A0' : "#75C9A8", fontFamily:"JockeyOne", fontSize:28}}>{donePercentage}%</Text>
                </View>)}
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