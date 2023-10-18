import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CheckboxTask from './CheckBoxTask';
import Checkboxs from "expo-checkbox";
import path from "../path"


function ListCheckBox({ data, type, title, projectId, getTask }) {
    const [tasks, setTasks] = useState();
    const [addChecked, setAddChecked] = useState(false)
    const [input, setInput] = useState('')
    useEffect(()=>{
        setTasks(data)
    })
    function handleCheckboxChange(taskId, taskStatus) {
        const updatedTasks = tasks.map((task) => {
            if (task.task_id === taskId) {
                axios.put(`${path}/task/${task.task_id}`, {
                    task_status: taskStatus
                }).then(() => {
                    getTask()
                })
                return false
            }
            return task;
        });
        getTask()
        setTasks(updatedTasks);
    };
    async function handleRemove(taskId) {
        try {
            await axios.delete(`${path}/task/${taskId}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task.task_id !== taskId));
        } catch (error) {
            console.error("Error removing task:", error);
        }
        getTask()
    }
    async function onPressCreateTask() {
        if (addChecked && input != '') {
            try {
                let datas = {
                    task_name: input,
                    task_status: "todo",
                    project_id: projectId,
                }
                await axios.post(`${path}/task`, datas).then((res) => {
                    setTasks((prevTasks) => [...prevTasks, res.data]);
                })
            } catch (error) {
                console.log(error)
            }
        }
        getTask()
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
            {tasks && tasks
                .filter((item) => item.task_status === type)
                .map((item, _) => (
                    <CheckboxTask
                        key={item.task_id}
                        item={item}
                        type={"done"}
                        onValueChange={() => handleCheckboxChange(item.task_id, item.task_status)}
                        onRemove={() => handleRemove(item.task_id)}
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
