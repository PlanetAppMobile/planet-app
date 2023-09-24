import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';

const TaskStatusItem = ({ color, title, count, stage }) => {
    return (
        <View style={{ marginTop: 10, marginLeft:15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ ...styles.pointStatus, backgroundColor: color }}></View>
                <Text style={{ fontSize: 18, fontWeight: 'semibold',fontFamily: "JockeyOne", letterSpacing:3 }}>{title}</Text>
            </View>
            <Text style={{ marginLeft: 20, marginTop:3, fontSize:15, fontFamily: "Jura", color:"#8A97A0" }}>{count} {stage ? "completed" : "tasks now"}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    pointStatus: {
        width: 13,
        height: 13,
        borderRadius: 999,
        marginRight: 10,
    }
});
export default TaskStatusItem;

