import { View, ScrollView, Image, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'

import HeaderPic from "../assets/header-page.png"
import CalendarItem from '../components/CalendarItem'
import ListCheckBox from '../components/ListCheckBox'

import DatePicker from '../components/DatePickerTodoList'
import { useIsFocused } from '@react-navigation/native'



function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
function getDayObjects(year, month) {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const dayObjects = [];
    const numDays = daysInMonth(month, year);
    console.log("firstttt date", `month:${month}, year:${year}`);
    for (let day = 1; day <= numDays; day++) {
        const date = new Date(year, month-1 , day);
        const dayOfWeek = date.getDay();
        console.log("date", date, `month:${month}, year:${year}, date:${day}`);
        console.log("days: ", day, "ofweek:", dayOfWeek);
        const dayName = daysOfWeek[dayOfWeek];

        dayObjects.push({ month: month, title: dayName, numDay: day.toString() });
    }

    return dayObjects;
}
function TodoList() {
    const [date, setDate] = useState(new Date())
    const [deadline, setDeadline] = useState(new Date())
    const [month, setMonth] = useState(10)
    const [year, setYear] = useState(2023)

    const scrollViewRef = useRef(null);
    const isFocused = useIsFocused()
    useEffect(() => {
        setTimeout(() => {
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({ x: 75 * (currentDay - 2), animated: true });
            }
        });
    }, [isFocused]);
    const [currentDay, setCurrentDay] = useState(date.getDate())
    const [dayList, setDayList] = useState(getDayObjects(year, month))

    const [focusedItemIndex, setFocusedItemIndex] = useState(null);
    const handleCalendarItemPress = (index) => {
        console.log("deadklds", deadline, `${year}-${month}-${index + 1}`);
        setDeadline(`${year}-${month}-${index + 1}`)
        setCurrentDay(index + 1)
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
                            <Text style={{ fontSize: 32, letterSpacing: 3, fontFamily: "JockeyOne", }}>
                                TO DO LIST
                            </Text>
                        </View>
                        <View >
                            {
                                isFocused &&
                                (<DatePicker
                                    defaultDate={deadline}
                                    onDateChange={(value) => {
                                        setMonth(new Date(value).getMonth() + 1)
                                        setYear(new Date(value).getFullYear())
                                        setCurrentDay(new Date(value).getDate())
                                        setDayList(getDayObjects(new Date(value).getFullYear(), new Date(value).getMonth() + 1))
                                        setDeadline(value)
                                    }}
                                />)
                            }
                        </View>
                    </View>
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    ref={scrollViewRef}
                    style={{
                        marginTop: 20,
                        flexDirection: "row",
                        overflow: "scroll",
                    }}>
                    {isFocused && dayList
                    .filter((item, index) => index < daysInMonth(month, year))
                    .map((item, index) =>
                    (
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
                <ListCheckBox numDay={currentDay} numMonth={month} numYear={year} />

            </View>
        </ScrollView >
    )
}
export default TodoList