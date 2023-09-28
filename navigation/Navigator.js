import { PUBLIC_ASSET_ICONS_URL } from '@env'
import React from "react";

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

const MNavigator = createNativeStackNavigator();
const BottomTabNavigator = createBottomTabNavigator();

function MainNavigator() {
    return (
        <MNavigator.Navigator initialRouteName="Register" screenOptions={{ headerShown: false }}>
            <MNavigator.Screen name="Homepage" component={Homepage} />
            <MNavigator.Screen name="Login" component={Login} />
            <MNavigator.Screen name="Register" component={Register} />
            <MNavigator.Screen name="ResetPassword" component={ResetPassword} />
            <MNavigator.Screen name="System" component={MenuNavigator} />
        </MNavigator.Navigator>
    )
}
function MenuNavigator() {
    return (
        <BottomTabNavigator.Navigator initialRouteName="Todolist" screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                width:'100%',
                height:100,
                paddingTop:10,
                paddingHorizontal:5,
                elevation: 0,
                borderTopWidth: 0,
                backgroundColor: '#FBF7F0'
            }
        }}>
            <BottomTabNavigator.Screen name="Dashboard" component={Dashboard} options={{
                tabBarIcon: ({ focused }) => (
                    <MenuTab focused={focused} iconSource={require(`${PUBLIC_ASSET_ICONS_URL}/home-icon.png`)} />
                )
            }} />
            <BottomTabNavigator.Screen name="Todolist" component={TodoList} options={{
                tabBarIcon: ({ focused }) => (
                    <MenuTab focused={focused} iconSource={require(`${PUBLIC_ASSET_ICONS_URL}/todo-list-icon.png`)} />
                )
            }} />
            <BottomTabNavigator.Screen name="Project" component={Dashboard} options={{
                tabBarIcon: ({ focused }) => (
                    <MenuTab focused={focused} iconSource={require(`${PUBLIC_ASSET_ICONS_URL}/project-icon.png`)} />
                )
            }} />
            <BottomTabNavigator.Screen name="Note" component={Dashboard} options={{
                tabBarIcon: ({ focused }) => (
                    <MenuTab focused={focused} iconSource={require(`${PUBLIC_ASSET_ICONS_URL}/note-icon.png`)} />
                )
            }} />
            <BottomTabNavigator.Screen name="Profile" component={Dashboard} options={{
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
