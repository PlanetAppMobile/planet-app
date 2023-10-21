import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import HeaderPic from "../assets/header-page.png";
import BackIcon from "../assets/icons/back-icon.png";
import DeleteIcon from "../assets/icons/delete-icon.png";
import axios from "axios";
import path from "../path";
import Textarea from "react-native-textarea/src/Textarea";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function DetailsNote({ route, navigation }) {
  const [onEdit, setOnEdit] = useState(true);
  const { noteId, noNote } = route.params;
  const [newTopic, setNewTopic] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const [newDate, setNewDate] = useState("");

  useEffect(() => { getNote() }, [isFocused]);
  const [note, setNote] = useState([]);
  // console.log(noteId)
  function addLeadingZero(number) {
    let strNumber = number.toString();
    if (strNumber.length < 2) {
      strNumber = "0" + strNumber;
    }
    return strNumber;
  }
  async function getNote() {
    await axios.get(`${path}/note/${await getUserIdFromStorage()}/${noteId}`).then((res) => {
      console.log(res.data);
      setNote(res.data);
      setNewTopic(res.data.topic);
      setNewDesc(res.data.description);
      setNewDate(res.data.updated_at);
    });
  }
  function formatDate(inputDate) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  }
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
  async function handleEdit() {
    if (onEdit == false) {
      axios
        .put(`${path}/note/${await getUserIdFromStorage()}/${note.note_id}`, {
          topic: newTopic,
          description: newDesc,
          updated_at: new Date(),
          user_id: await getUserIdFromStorage(),
        })
        .then((res) => {
          console.log(res.data);
        });
    }
    setOnEdit(!onEdit);
  }
  async function deleteNote() {
    await axios.delete(`${path}/note/${note.note_id}`).then(() => {
      setModalVisible(false);
      navigation.navigate("Note");
    });
  }
  return (
    <ScrollView style={{ backgroundColor: "#FBF7F0" }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{ width: "100%", height: 55 }}
              source={HeaderPic}
              resizeMode="contain"
            />
            <View
              style={{
                padding: 0,
                justifyContent: "center",
                alignItems: "center",
                flexDirection:"row"
              }}
            >
              <Text style={styles.modalText}>
                Are you sure you want to delete?
              </Text>
              <Text
                style={{
                  fontFamily: "Jura",
                  fontSize: 24,
                  textAlign: "center",
                  color: "#00213F",
                }}
              ></Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "80%",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <View style={{ width: "50%" }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  style={{
                    borderRadius: 5,
                    height: 35,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: "#F08D6E",
                    backgroundColor: "transparent",
                    marginLeft: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#F08D6E",
                      fontFamily: "Copper",
                    }}
                  >
                    CANCEL
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: "50%", marginLeft: 5 }}>
                <TouchableOpacity
                  onPress={deleteNote}
                  style={{
                    borderRadius: 5,
                    height: 35,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F08D6E",
                    marginRight: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "white",
                      fontFamily: "Copper",
                    }}
                  >
                    DELETE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Image
        style={{ width: "100%", height: 65 }}
        source={HeaderPic}
        resizeMode="contain"
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Note");
        }}
      >
        <Image
          style={{ width: "100%", height: 40, left: -175 }}
          source={BackIcon}
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
      <View style={{ paddingHorizontal: 25 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 32, letterSpacing: 3, fontFamily: "JockeyOne" }}
          >
            My Notes
          </Text>
          <TouchableOpacity
            onPress={handleEdit}
            style={{
              borderColor: "#F08D6E",
              width: 100,
              height: 27,
              borderWidth: 1,
              padding: 6,
              borderRadius: 3,
              backgroundColor: onEdit ? "#F08D6E" : "transparent",
            }}
          >
            <Text
              style={{
                color: onEdit ? "#FBF7F0" : "#F08D6E",
                textAlign: "center",
                fontFamily: "Copper",
              }}
            >
              {!onEdit ? "DONE" : "EDIT"}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: "#848181", fontFamily: "Jura", fontSize: 16 }}>
          Every notes you wrote.
        </Text>
        <View
          style={{
            marginTop: 25,
            borderWidth: 1,
            borderColor: "#D9DADA",
            borderRadius: 5,
          }}
        >
          <View style={{}}>
            <View
              style={{ borderBottomWidth: 1, borderBottomColor: "#D9DADA" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: 15,
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 40,
                      fontFamily: "Jura",
                      color: "#8A97A0",
                    }}
                  >
                    {addLeadingZero(noNote + 1)}
                  </Text>
                  <TextInput
                    onChangeText={(value) => {
                      setNewTopic(value);
                    }}
                    style={{
                      fontSize: 17,
                      color: "#00213F",
                      fontFamily: "Jura",
                      fontWeight: "bold",
                    }}
                    value={newTopic}
                    disabled={onEdit}
                  ></TextInput>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <Image
                    style={{ width: 40, height: 55 }}
                    source={DeleteIcon}
                    resizeMode="contain"
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ padding: 15 }}>
              <Textarea
                onChangeText={(value) => {
                  setNewDesc(value);
                }}
                value={newDesc}
                style={{
                  color: "#768592",
                  fontSize: 16,
                  fontFamily: "Jura",
                  letterSpacing: 1,
                  lineHeight: 23,
                  height: 350,
                }}
                disabled={onEdit}
              ></Textarea>
              <Text
                style={{
                  marginTop: 45,
                  color: "#B5B7B9",
                  textAlign: "center",
                  fontSize: 15,
                  fontFamily: "Jura",
                }}
              >
                {formatDate(newDate)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(109, 109, 104, 0.5)",
  },
  modalView: {
    backgroundColor: "#FBF7F0",
    width: 330,
    height: 230,
    borderRadius: 20,
    alignItems: "center",
    overflow: "hidden",
  },
  button: {
    fontFamily: "Copper",
    borderRadius: "0.1875rem",
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    width: "80%",
    marginTop: 10,
    textAlign: "center",
    fontSize: 28,
    flexShrink:1,
    fontFamily: "JockeyOne",
    letterSpacing: 2,
  },
});
export default DetailsNote;
