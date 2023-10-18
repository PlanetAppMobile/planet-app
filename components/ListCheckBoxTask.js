import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CheckboxTask from './CheckBoxTask';
import Checkboxs from "expo-checkbox";
import path from "../path"


function ListCheckBox({ projectId, type, title }) {
    const [tasks, setTasks] = useState([]);
    const [addChecked, setAddChecked] = useState(false)
    const [input, setInput] = useState('')
    useEffect(() => {
        axios.get(`${path}/task/${projectId}`).then((res) => {
            setTasks(res.data)
        })
    }, [])

    function handleCheckboxChange(taskId, taskStatus) {
        const updatedTasks = tasks.map((task) => {
            if (task.task_id === taskId) {
                axios.put(`${path}/task/${task.task_id}`, {
                    task_status: taskStatus
                }).then((res) => {
                    console.log("result:", res.data)
                })
                return false
            }
            return task;
        });
        setTasks(updatedTasks);
    };
    async function handleRemove(todoId) {
        try {
            await axios.delete(`${path}/todolist/${todoId}`);
            setTasks((prevTasks) => prevTasks.filter((todo) => todo.todo_id !== todoId));
        } catch (error) {
            console.error("Error removing task:", error);
        }
    }
    async function onPressCreateTask() {
        if (addChecked && input != '') {
            try {
                let data = {
                    task_name: input,
                    task_status: "todo",
                    project_id: projectId,
                }
                await axios.post(`${path}/task`, data).then((res) => {
                    setTasks((prevTasks) => [...prevTasks, res.data]);
                })
            } catch (error) {
                console.log(error)
            }
        }
        setInput('')
        setAddChecked(!addChecked)
    }
    return (
        <View style={styles.containerBox}>
            <View style={styles.headerBox}>
                <Text style={styles.headerText}>{title}</Text>
                {type == "todo" && (
                    <TouchableOpacity onPress={onPressCreateTask}>
                        {!addChecked ? (<Image
                            style={{ width: 30, height: 30 }}
                            source={require("../assets/button.png")}
                        />) : <Text style={{ fontFamily: 'copper', color: "#E5725D" }}>Done</Text>}
                    </TouchableOpacity>

                )}
            </View>
            {tasks
                .filter((item) => item.task_status === type)
                .map((item, _) => (
                    <CheckboxTask
                        key={item.task_id}
                        item={item}
                        type={"done"}
                        onValueChange={() => handleCheckboxChange(item.task_id, item.task_status)}
                        onRemove={() => handleRemove(todoItem.project_id)}
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
                        <Checkboxs />
                        <TextInput
                            value={input}
                            onChangeText={(val) => setInput(val)}
                            placeholder='Enter Your task here...'
                            style={{ marginLeft: 15, color: "#B7BBBB", fontFamily: "Jura", padding: '4px 10px', }}>
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
        marginTop: 10
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
