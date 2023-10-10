import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    useWindowDimensions,
    Dimensions,
    FlatList,
    LogBox,
} from "react-native";
import PieChart from 'react-native-pie-chart'
import React from 'react'

function CalendarPiechart({ type }) {
    const widthAndHeight = type == "Dashboard" ? 150 : 140
    const series = [14, 12, 18]
    const sliceColor = ['#FFAA9B', "#CFCFAB", "#75C9A8"]
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
                        width: 35,
                        height: 35,
                        zIndex: 4,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={{color:"#75C9A8", fontFamily:"JockeyOne", fontSize:28}}>43%</Text>
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