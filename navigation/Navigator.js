import { PUBLIC_ASSET_ICONS_URL } from '@env'
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { AntDesign, Ionicons } from "@expo/vector-icons";

import Homepage from "../screens/Homepage"
import Dashboard from "../screens/Dashboard"
import MenuTab from "../components/MenuTab"

const MNavigator = createNativeStackNavigator();
const BottomTabNavigator = createBottomTabNavigator();

function MainNavigator() {
    return (
        <MNavigator.Navigator initialRouteName="System" screenOptions={{ headerShown: false }}>
            <MNavigator.Screen name="Homepage" component={Homepage} />
            <MNavigator.Screen name="System" component={MenuNavigator} />
        </MNavigator.Navigator>
    )
}
function MenuNavigator() {
    return (
        <BottomTabNavigator.Navigator initialRouteName="Dashboard" screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                left: 10,
                right: 10,
                bottom: 30,
                elevation: 0,
                borderTopWidth: 0,
                backgroundColor: 'transparant'
            }
        }}>
            <BottomTabNavigator.Screen name="Dashboard" component={Dashboard} options={{
                tabBarIcon: ({ focused }) => (
                    <MenuTab focused={focused} iconSource={require(`${PUBLIC_ASSET_ICONS_URL}/home-icon.svg`)} />
                )
            }} />
            <BottomTabNavigator.Screen name="Todolist" component={Dashboard} options={{
                tabBarIcon: ({ focused }) => (
                    <MenuTab focused={focused} iconSource={require(`${PUBLIC_ASSET_ICONS_URL}/todo-list-icon.svg`)} />
                )
            }} />
            <BottomTabNavigator.Screen name="Project" component={Dashboard} options={{
                tabBarIcon: ({ focused }) => (
                    <MenuTab focused={focused} iconSource={require(`${PUBLIC_ASSET_ICONS_URL}/project-icon.svg`)} />
                )
            }} />
            <BottomTabNavigator.Screen name="Note" component={Dashboard} options={{
                tabBarIcon: ({ focused }) => (
                    <MenuTab focused={focused} iconSource={require(`${PUBLIC_ASSET_ICONS_URL}/note-icon.svg`)} />
                )
            }} />
            <BottomTabNavigator.Screen name="Profile" component={Dashboard} options={{
                tabBarIcon: ({ focused }) => (
                    <MenuTab focused={focused} iconSource={require(`${PUBLIC_ASSET_ICONS_URL}/profile-icon.svg`)} />
                )
            }} />
        </BottomTabNavigator.Navigator>
    )
}
export default function MyNavigator() {
    return (
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    );
}
