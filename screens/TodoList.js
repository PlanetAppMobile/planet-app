import { View, ScrollView, Image, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import HeaderPic from "../assets/header-page.png"
import CalendarItem from '../components/CalendarItem'
import ListCheckBox from '../components/ListCheckBox'



function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
function getDayObjects(year, month) {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const dayObjects = [];
    const numDays = daysInMonth(month, year);

    for (let day = 1; day <= numDays; day++) {
        const date = new Date(year, month - 1, day); // month - 1 because months are zero-indexed
        const dayOfWeek = date.getDay();
        const dayName = daysOfWeek[dayOfWeek];

        dayObjects.push({ month: month, title: dayName, numDay: day.toString() });
    }

    return dayObjects;
}
function TodoList({route, navigation}) {
    // let date = new Date('2023-09-01');
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const [currentDay, setCurrentDay] = useState(date.getDate())
    const dayList = getDayObjects(year, month);

    const [focusedItemIndex, setFocusedItemIndex] = useState(null);
    const handleCalendarItemPress = (index) => {
        setCurrentDay(index+1)
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
                    {dayList.map((item, index) => (
                        <CalendarItem
                            isChecked={currentDay}
                            key={index}
                            data={item}
                            onPress={() => handleCalendarItemPress(index)}
                            focused={focusedItemIndex === index}
                        />
                    ))}
                </ScrollView>
            </View>
            <View style={{ marginHorizontal: 25, }}>
                <ListCheckBox numDay={currentDay} numMonth={month}/>

            </View>
        </ScrollView >
    )
}
const styles = StyleSheet.create({

})
export default TodoList