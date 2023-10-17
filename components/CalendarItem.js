import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

function CalendarItem({ data, focused, onPress, isChecked }) {

    const handleOnPress = () => {
        onPress();
    };
    return (
        <TouchableOpacity onPress={handleOnPress} style={{ ...styles.boxCalendar, backgroundColor: focused || isChecked == data.numDay ? "#FFAA9B" : "#FBF7F0", borderColor: focused || isChecked == data.numDay ? "transparent" : "#D9D9D9" }}>
            <Text style={{ ...styles.textCalendar, color: focused || isChecked == data.numDay ? "white" : "#B5B7B9", fontSize: 23, }}>{data.numDay}</Text>
            <Text style={{ ...styles.textCalendar, color: focused || isChecked == data.numDay ? "white" : "#B5B7B9", fontSize: 16, textTransform: 'uppercase', marginTop: 10 }}>{data.title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    boxCalendar: {
        width: 60,
        height: 120,
        borderRadius: 30,
        borderWidth: 2,
        marginRight: 15,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    },
    textCalendar: {
        fontFamily: "Jua",
    }
})
export default CalendarItem;