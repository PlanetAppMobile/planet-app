import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Checkbox from "../components/CheckboxTodo";
import Checkboxs from "expo-checkbox";
import path from "../path";
import AsyncStorage from "@react-native-async-storage/async-storage";

function addLeadingZero(number) {
  let strNumber = number.toString();
  if (strNumber.length < 2) {
    strNumber = "0" + strNumber;
  }
  return strNumber;
}


function ListCheckBox({ numDay, numMonth, numYear }) {
  const [tasks, setTasks] = useState([]);
  const [addChecked, setAddChecked] = useState(false);
  const [input, setInput] = useState("");
  useEffect(() => {
    getTodoList();
  }, [numDay, numMonth, numYear]);

  function checkToday() {
    if (
      numDay == new Date().getDate() &&
      numMonth == new Date().getMonth() + 1 &&
      numYear == new Date().getFullYear()
    ) {
      return true;
    }
    return false;
  }

  async function getTodoList() {
    axios
      .post(`${path}/todolist/searchByDate`, {
        todo_date: `${numYear}-${addLeadingZero(numMonth)}-${addLeadingZero(
          numDay
        )}`,
        user_id: await getUserIdFromStorage(),
      })
      .then((res) => {
        setTasks(res.data);
      });
  }
  async function getUserIdFromStorage() {
    try {
      const value = await AsyncStorage.getItem("@UserId");
      if (value !== null) {
        return parseInt(value);
      }
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  }
  function handleCheckboxChange(taskId) {
    const updatedTasks = tasks.map((task) => {
      if (task.todo_id === taskId) {
        axios
          .put(`${path}/todolist/${task.todo_id}`, {
            todo_checked: !task.todo_checked,
          })
          .then((res) => {
            console.log("result:", res.data);
          });
        return { ...task, todo_checked: !task.todo_checked };
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  async function handleRemove(todoId) {
    try {
      await axios.delete(`${path}/todolist/${todoId}`);
      setTasks((prevTasks) =>
        prevTasks.filter((todo) => todo.todo_id !== todoId)
      );
    } catch (error) {
      console.error("Error removing task:", error);
    }
  }
  async function onPressCreateToDO() {
    if (addChecked && input != "") {
      try {
        let data = {
          todo_desc: input,
          todo_date: `${numYear}-${addLeadingZero(numMonth)}-${addLeadingZero(
            numDay
          )}`,
          user_id: await getUserIdFromStorage(),
        };
        await axios.post(`${path}/todolist`, data).then((res) => {
          setTasks((prevTasks) => [...prevTasks, res.data]);
        });
      } catch (error) {
        console.log(error);
      }
    }
    setInput("");
    setAddChecked(!addChecked);
  }
  return (
    <View style={styles.containerBox}>
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>
          {checkToday()
            ? 'Today':`${numYear}-${addLeadingZero(numMonth)}-${addLeadingZero(numDay)}`
            }
        </Text>
        <TouchableOpacity onPress={onPressCreateToDO}>
          {!addChecked ? (
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../assets/button.png")}
            />
          ) : (
            <Text
              style={{
                fontSize: 14,
                fontFamily: "copper",
                color: "#E5725D",
                fontFamily: "Copper",
              }}
            >
              DONE
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {tasks?.map((todoItem, _) => (
        <Checkbox
          key={todoItem.todo_id}
          item={todoItem}
          onValueChange={() => handleCheckboxChange(todoItem.todo_id)}
          onRemove={() => handleRemove(todoItem.todo_id)}
        />
      ))}
      {addChecked && (
        <View
          style={{
            borderColor: "#D9DADA",
            borderTopWidth: 1,
            padding: 18,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Checkboxs />
            <TextInput
              value={input}
              onChangeText={(val) => setInput(val)}
              placeholder="Enter Your task here..."
              style={{
                fontSize: 16,
                marginLeft: 15,
                color: "#768592",
                fontFamily: "Jura",
                padding: "4px 10px",
              }}
            ></TextInput>
          </View>
        </View>
      )}
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
    fontWeight: "semibold",
    fontFamily: "JockeyOne",
    letterSpacing: 3,
  },
});

export default ListCheckBox;
