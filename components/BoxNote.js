import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function BoxNote({data, index}) {
  function formatDate(inputDate) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(undefined, options);
    return formattedDate;
}
  return (
    <View style={{}}>
      <View
        style={{
          borderColor: "#D9DADA",
          width: "50%",
          borderWidth: 2,
          padding: 5,
          borderRadius: 3,
          justifyContent: "space-between",
        }}
      >
        <View style={{ padding: 10 }}>
          <View>
            <Text
              style={{ fontSize: 50, fontFamily: "Jura", color: "#8A97A0" }}
            >
              {index+1}
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: "#00213F",
                fontFamily: "Jura",
                fontWeight: "bold",
              }}
            >
              {data.topic}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 15,
              color: "#B5B7B9",
              fontFamily: "Jura",
              marginTop: 26,
            }}
          >
            {formatDate(data.updated_at)}
          </Text>
        </View>
      </View>
    </View>
  );
}
