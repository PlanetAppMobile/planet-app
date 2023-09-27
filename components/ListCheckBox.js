import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Checkbox from '../components/Checkbox'

function ListCheckBox() {
    const [task, setTask] = useState({
        todo1: { text: "Send email to meaw." },
        todo2: { text: "Send email to meaw.1" },
        todo3: { text: "Send email to meaw.2" },
    });

    const handleCheckboxChange = (newValue, item) => {
        console.log("Checkbox changed:", newValue);
        if (newValue) {
            const updatedTask = { ...task };
            delete updatedTask[item];
            console.log("Updated task:", updatedTask);
            setTask(updatedTask);
        }
    };
    return (
        <View style={styles.containerBox}>
            <View
                style={styles.headerBox}
            >
                <Text style={styles.headerText}>Today</Text>
                <Image
                    style={{ width: 30, height: 30 }}
                    source={require("../assets/button.png")}
                />
            </View>
            {Object.keys(task).map((key, index) => (
                <Checkbox
                    key={index}
                    item={task[key]}
                    isChecked={false}
                    onValueChange={handleCheckboxChange}
                />
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    containerBox: {
        marginHorizontal: 25,
        borderWidth: 1,
        borderColor: "#D9DADA",
        borderRadius: 10,
    },
    headerBox: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingVertical: 13,
        borderColor: "#D9DADA",
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'semibold',
        fontFamily: "JockeyOne",
        letterSpacing: 3
    }
});
export default ListCheckBox;