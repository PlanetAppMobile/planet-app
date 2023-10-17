import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Checkbox from "expo-checkbox";
import Swipeout from 'react-native-swipeout';

function CustomCheckbox({ item, onValueChange, onRemove }) {
    var swipeoutBtns = [
        {
            text: 'Delete',
            backgroundColor:"#FFAA9B",
            onPress: onRemove
        }
    ]
    return (
        <Swipeout style={{backgroundColor:'transparent'}} right={swipeoutBtns}>
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
                    color={item.todo_checked ? "#FFAA9B" : undefined}
                />
                <Text style={{ marginLeft: 15, color: "#B7BBBB", fontFamily: "Jura", textDecorationLine: item.todo_checked ? 'line-through' : 'none' }}>
                    {item.todo_desc}
                </Text>
            </View>
        </Swipeout>
    );
}
export default CustomCheckbox;