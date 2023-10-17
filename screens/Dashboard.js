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
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import TaskStatusItem from "../components/TaskStatusItem";
import CalendarPiechart from "../components/CalendarPiechart";
import Checkbox from "expo-checkbox";

import HeaderPic from "../assets/header-page.png";
import NotificationIcon from "../assets/icons/notification-icon.png";
import UserIcon from "../assets/icons/user-icon.png";

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
      <Image
        style={{ width: 30, height: 30, marginLeft: 20 }}
        source={require("../assets/edit.png")}
      />
    </View>
  );
}

function GenerateCheckBox(props) {
  const [isChecked, setChecked] = useState(false);
  return (
    <View
      style={{
        borderColor: "#D9DADA",
        borderTopWidth: 1,
        padding: 24,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Checkbox
        style={{}}
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? props.color : undefined}
      />
      <Text style={{ marginLeft: 15, color: "#B7BBBB", fontFamily: "Jura" }}>
        {props.text}
      </Text>
    </View>
  );
}

function Dashboard({route, navigation}) {
  const series = [14, 12, 18];
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        backgroundColor: "#FBF7F0",
      }}
    >
      {/* profile container */}
      <Image
        style={{ width: "100%", height: 65 }}
        source={HeaderPic}
        resizeMode="contain"
      />
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
                fontSize: 28,
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
            <Image
              style={{ width: 35, height: 35 }}
              source={NotificationIcon}
              resizeMode="contain"
            />
            <Image
              style={{ width: 45, height: 45, marginLeft: 15 }}
              source={UserIcon}
              resizeMode="contain"
            />
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
          <CalendarPiechart type={"Dashboard"} />
          <View>
            <TaskStatusItem color="#FFAA9B" title="TODO" count={series[0]} />
            <TaskStatusItem
              color="#CFCFAB"
              title="IN PROGRESS"
              count={series[1]}
            />
            <TaskStatusItem
              color="#75C9A8"
              title="DONE"
              stage={true}
              count={series[2]}
            />
          </View>
        </View>
      </View>
      {/* todo list container */}

      <View style={styles.containerBox}>
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>Today</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate("CreateProject")}}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/button.png")}
            />
          </TouchableOpacity>
        </View>
        <GenerateCheckBox color={"#4630EB"} text={"Send email to meaw."} />
        <GenerateCheckBox color={"#4630EB"} text={"Clean the room."} />
        <GenerateCheckBox color={"#4630EB"} text={"Order new dress."} />
        <GenerateCheckBox color={"#4630EB"} text={"Call manager."} />
      </View>
      <View style={{ marginTop: 30, ...styles.containerBox }}>
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>Note</Text>
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../assets/button.png")}
          />
        </View>
        <GenerateEdit color={"#4630EB"} text={"I burb foodie."} />
        <GenerateEdit color={"#4630EB"} text={"Chun rak mama."} />
      </View>
    </ScrollView>
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
        fontWeight: 'semibold',
        fontFamily: "JockeyOne",
        letterSpacing: 3
    }
});

export default Dashboard;
