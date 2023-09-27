import { View, ScrollView, Image, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import HeaderPic from "../assets/header-page.png"
import CalendarItem from '../components/CalendarItem'
import ListCheckBox from '../components/ListCheckBox'


function TodoList() {
    const [focusedItemIndex, setFocusedItemIndex] = useState(null);
    const handleCalendarItemPress = (index) => {
        if (focusedItemIndex === index) {
            setFocusedItemIndex(null);
        } else {
            setFocusedItemIndex(index);
        }
    };
    return (
        <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: "#FBF7F0" }}>
            <Image
                style={{ width: "100%", height: 65 }}
                source={HeaderPic}
                resizeMode="contain"
            />
            <View style={{ paddingVertical: 24, paddingHorizontal: 25, }}>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                        <View>
                            <Text style={{ fontSize: 28, letterSpacing: 3, fontFamily: "JockeyOne", }}>
                                TO DO LIST
                            </Text>
                        </View>
                        <View >
                            <Text style={{ fontFamily: 'Jura' }}>Feb,2023</Text>
                        </View>
                    </View>
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={{
                        marginTop: 20,
                        flexDirection: "row",
                        overflow: "scroll",
                    }}>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                        <CalendarItem
                            key={index}
                            onPress={() => handleCalendarItemPress(index)}
                            focused={focusedItemIndex === index}
                        />
                    ))}
                </ScrollView>
            </View>
            <ListCheckBox />
        </ScrollView >
    )
}
const styles = StyleSheet.create({

})
export default TodoList