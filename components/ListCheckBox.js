import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Checkbox from '../components/Checkbox';
import Checkboxs from "expo-checkbox";
import path from "../path"

function addLeadingZero(number) {
    let strNumber = number.toString();
    if (strNumber.length < 2) {
        strNumber = '0' + strNumber;
    }
    return strNumber;
}

function ListCheckBox({ numDay, numMonth }) {
    const [tasks, setTasks] = useState([]);
    const [addChecked, setAddChecked] = useState(false)
    useEffect(() => {
        axios.post(`${path}/todolist/searchByDate`, {
            todo_date: `2023-${addLeadingZero(numMonth)}-${addLeadingZero(numDay)}`,
            user_id: 1,
        }).then((res) => {
            console.log(res.data)
            setTasks(res.data)
        })
    }, [numDay])
    const handleCheckboxChange = (taskId) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, todo_checked: !task.todo_checked };
            }
            return task;
        });
        setTasks(updatedTasks);
    };
    function onPressCreateToDO() {
        setAddChecked(true)
    }
    return (
        <View style={styles.containerBox}>
            <View style={styles.headerBox}>
                <Text style={styles.headerText}>Today</Text>
                <TouchableOpacity onPress={onPressCreateToDO}>
                    {!addChecked ? (<Image
                        style={{ width: 30, height: 30 }}
                        source={require("../assets/button.png")}
                    />) : <Text>Done</Text>}
                </TouchableOpacity>
            </View>
            {tasks?.map((task) => (
                <Checkbox
                    key={task.todo_id}
                    item={task}
                    onValueChange={() => handleCheckboxChange(task.todo_id)}
                />
            ))}
            {
                addChecked &&
                (<View
                    style={{
                        borderColor: "#D9DADA",
                        borderTopWidth: 1,
                        padding: 24,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                        <Checkboxs
                            style={{}}
                        />

                        <TextInput placeholder='Enter Your task here...' style={{ marginLeft: 15, color: "#B7BBBB", fontFamily: "Jura" }}>
                        </TextInput>

                    </View>
                </View>)
            }
        </View>
    );
}

const styles = StyleSheet.create({
    containerBox: {
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
        letterSpacing: 3,
    },
});

export default ListCheckBox;
