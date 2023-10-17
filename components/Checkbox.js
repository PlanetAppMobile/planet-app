import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Checkbox from "expo-checkbox";

function CustomCheckbox({ item, isChecked, onValueChange }) {
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
                value={item.todo_checked}
                onValueChange={(newValue) => {
                    onValueChange(newValue, item);
                }}
                color={item.todo_checked ? "blue" : undefined}
            />
            <Text style={{ marginLeft: 15, color: "#B7BBBB", fontFamily: "Jura" }}>
                {item.todo_desc}
            </Text>
        </View>
    );
}
export default CustomCheckbox;