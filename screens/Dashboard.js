import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  LogBox,
  Animated,
  Modal
} from "react-native";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import path from "../path"
import { useIsFocused, useNavigation } from "@react-navigation/native";
import TaskStatusItem from "../components/TaskStatusItem";
import CalendarPiechart from "../components/PiechartDashboard";
import AsyncStorage from '@react-native-async-storage/async-storage';

import HeaderPic from "../assets/header-page.png";
import NotificationIcon from "../assets/icons/notification-icon.png";
import UserIcon from "../assets/icons/user-icon.png";
import ListCheckBox from "../components/ListCheckBox";

LogBox.ignoreAllLogs();
function GenerateEdit(props) {
  return (
    <View
      style={{
        borderColor: "#D9DADA",
        borderTopWidth: 1,
        padding: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ marginLeft: 15, color: "#B7BBBB" }}>{props.text}</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate("DetailNote", {
        noteId: props.noteId,
        noNote: props.noo
      })}>
        <Image
          style={{ width: 30, height: 30, marginLeft: 20 }}
          source={require("../assets/edit.png")}
        />

      </TouchableOpacity>
    </View>
  );
}


function Dashboard({ route, navigation }) {
  const [task, setTask] = useState([])
  const [todoTask, setTodoTask] = useState(0)
  const [inprogressTask, setInprogressTask] = useState(0)
  const [doneTask, setDoneTask] = useState(0)
  const [activeProject, setActiveProject] = useState()

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = 65;
  const getItemFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('@ProjectLatest:active');
      if (value !== null) {
        setActiveProject(JSON.parse(value))
        let projectId = JSON.parse(value).project_id
        await axios.get(`${path}/task/${projectId}`).then((res) => {
          setTodoTask(res.data.filter((task) => task.task_status === "todo").length)
          setInprogressTask(res.data.filter((task) => task.task_status === "inprogress").length)
          setDoneTask(res.data.filter((task) => task.task_status === "done").length)
          setTask(res.data)
        })
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };
  async function getUserIdFromStorage() {
    try {
      const value = await AsyncStorage.getItem('@UserId');
      if (value != null) {
        return parseInt(JSON.parse(value))
      }
      console.log(value);
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };
  const isFocused = useIsFocused()
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentDay = currentDate.getDate()


  async function getNote() {
    await axios.get(`${path}/note/${await getUserIdFromStorage()}`).then((res) => {
      setNote(res.data);
    });
  }
  useEffect(() => {
    getItemFromStorage()
    getNote()
  }, [isFocused])
  const [note, setNote] = useState()
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{
          width: "100%",
          height: 65,
          position: "absolute",
          zIndex: 10,
          backgroundColor: '#FBF7F0'
        }}
        source={HeaderPic}
        resizeMode="contain"
      />
      <ScrollView
        style={{ backgroundColor: "#FBF7F0", marginTop: headerHeight }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        onScrollEndDrag={(event) => {
          let offsetY = event.nativeEvent.velocity.y;
          if (offsetY > 0) {
            navigation.setOptions({ tabBarStyle: { display: "none" }, });
          } else {
            navigation.setOptions({
              tabBarStyle: {
                display: 'block',
                position: 'absolute',
                width: '100%',
                height: 100,
                paddingTop: 0,
                paddingHorizontal: 5,
                elevation: 0,
                borderTopWidth: 0,
                backgroundColor: '#FBF7F0'
              }
            });
          }
        }}
      >
        {/* profile container */}
        <View style={{ paddingVertical: 24, paddingHorizontal: 25 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 32,
                  letterSpacing: 3,
                  fontFamily: "JockeyOne",
                }}
              >
                Hi, Soksak
              </Text>
              <Text style={{ fontSize: 18, marginTop: 5, fontFamily: "Jura" }}>
                What's Up Today?
              </Text>
            </View>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <TouchableOpacity onPress={() => { navigation.navigate("Notification") }}>
                <Image
                  style={{ width: 35, height: 35 }}
                  source={NotificationIcon}
                  resizeMode="contain"
                />

              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("Profile") }}>
                <Image
                  style={{ width: 45, height: 45, marginLeft: 15 }}
                  source={UserIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Chart Container */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 30,
            }}
          >
            <CalendarPiechart type={"Dashboard"} task={task} navigation={navigation} project={activeProject} />
            <View>
              <TaskStatusItem color="#FFAA9B" title="TODO" count={todoTask} />
              <TaskStatusItem
                color="#CFCFAB"
                title="IN PROGRESS"
                count={inprogressTask}
              />
              <TaskStatusItem
                color="#75C9A8"
                title="DONE"
                stage={true}
                count={doneTask}
              />
            </View>
          </View>
        </View>
        {/* todo list container */}

        <View style={{ marginHorizontal: 25, }}>
          <ListCheckBox numDay={currentDay} numMonth={currentMonth} numYear={'2023'} />
        </View>
        {note && (
          <View style={{ marginTop: 30, ...styles.containerBox }}>
            <View style={styles.headerBox}>
              <Text style={styles.headerText}>Note</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("AddNote", {
                    numNote: note.length + 1
                  });
                }}
              >
                <Image
                  style={{ width:30, height: 30 }}
                  source={require("../assets/button.png")}
                />
              </TouchableOpacity>
            </View>
            {note?.map((item, index) => (
              <GenerateEdit color={"#4630EB"} text={item.topic} noteId={item.note_id} key={index} noo={index} navigation={navigation} />

            ))}
          </View>

        )}
      </ScrollView>

    </View>
  );
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
    fontWeight: "semibold",
    fontFamily: "JockeyOne",
    letterSpacing: 3,
  },
});

export default Dashboard;
