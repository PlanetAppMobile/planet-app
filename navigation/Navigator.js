import { PUBLIC_ASSET_ICONS_URL } from '@env'
import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MenuTab from "../components/MenuTab"
import Homepage from "../screens/Homepage"
import Dashboard from "../screens/Dashboard"
import TodoList from '../screens/TodoList';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ResetPassword from '../screens/ResetPassword';
import AllNote from '../screens/AllNote';
import DetailsNote from '../screens/DetailsNote';
import AddNote from '../screens/AddNote';
import Project from "../screens/Project"
import CreateProject from "../screens/CreateProject"
import TaskProject from "../screens/TaskProject"
import Loading from "../screens/Loading"
import Profile from "../screens/Profile"

const MNavigator = createNativeStackNavigator();
const BottomTabNavigator = createBottomTabNavigator();
const NoteStackNavigator = createNativeStackNavigator();

function MainNavigator() {
    return (
        <MNavigator.Navigator initialRouteName="System" screenOptions={{ headerShown: false }}>
            <MNavigator.Screen name="Loading" component={Loading} />
            <MNavigator.Screen name="Homepage" component={Homepage} />
            <MNavigator.Screen name="Login" component={Login} />
            <MNavigator.Screen name="Register" component={Register} />
            <MNavigator.Screen name="CreateProject" component={CreateProject} />
            <MNavigator.Screen name="ResetPassword" component={ResetPassword} />
            <MNavigator.Screen name="TaskProject" component={TaskProject} />
            <MNavigator.Screen name="System" component={MenuNavigator} />
        </MNavigator.Navigator>
    )
}
function NoteNavigator() {
    return (
        <NoteStackNavigator.Navigator initialRouteName='Note' screenOptions={{headerShown:false}}>
            <NoteStackNavigator.Screen name="Note" component={AllNote} />
            <NoteStackNavigator.Screen name="DetailNote" component={DetailsNote} />
            <NoteStackNavigator.Screen name="AddNote" component={AddNote} />
        </NoteStackNavigator.Navigator>
    );
}
function MenuNavigator() {
    return (
        <BottomTabNavigator.Navigator initialRouteName="Note" screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                width: '100%',
                height: 100,
                paddingTop: 0,
                paddingHorizontal: 5,
                elevation: 0,
                borderTopWidth: 0,
                backgroundColor: '#FBF7F0'
            }
        }}>
            <BottomTabNavigator.Screen name="Dashboard" component={Dashboard}  options={{
                tabBarIcon: ({ focused }) => (
                    <MenuTab focused={focused} iconSource={require(`${PUBLIC_ASSET_ICONS_URL}/home-icon.png`)} />
                )
            }} />
            <BottomTabNavigator.Screen name="Todolist" component={TodoList} options={{
                tabBarIcon: ({ focused }) => (
                    <MenuTab focused={focused} iconSource={require(`${PUBLIC_ASSET_ICONS_URL}/todo-list-icon.png`)} />
                )
            }} />
            <BottomTabNavigator.Screen name="Project" component={Project} options={{
                tabBarIcon: ({ focused }) => (
                    <MenuTab focused={focused} iconSource={require(`${PUBLIC_ASSET_ICONS_URL}/project-icon.png`)} />
                ),
            }} />
            <BottomTabNavigator.Screen name="Note" component={NoteNavigator} options={{
                tabBarIcon: ({ focused }) => (
                    <MenuTab focused={focused} iconSource={require(`${PUBLIC_ASSET_ICONS_URL}/note-icon.png`)} />
                )
            }} />
            <BottomTabNavigator.Screen name="DetailNote" component={DetailsNote} options={{
                tabBarButton: () => null,
            }} />
            <BottomTabNavigator.Screen name="AddNote" component={AddNote} options={{
                tabBarButton: () => null,
            }} />
            <BottomTabNavigator.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ focused }) => (
                    <MenuTab focused={focused} iconSource={require(`${PUBLIC_ASSET_ICONS_URL}/profile-icon.png`)} />
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
