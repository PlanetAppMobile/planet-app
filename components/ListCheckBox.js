import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Checkbox from '../components/Checkbox'

function ListCheckBox() {
    return (
        <View style={styles.containerBox}>
            <View
                style={styles.headerBox}
            >
                <Text style={styles.headerText}>Today</Text>
                <Image
                    style={{ width: 30, height: 30 }}
                    source={require("../assets/button.png")}
                />
            </View>
            <Checkbox />
            <Checkbox />
            <Checkbox />
        </View>
    )
}
const styles = StyleSheet.create({
    containerBox: {
        marginHorizontal: 25,
        borderWidth: 1,
        borderColor: "#D9DADA",
        borderRadius: 10,
    },
    headerBox: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingVertical: 13,
        borderColor: "#D9DADA",
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'semibold',
        fontFamily: "JockeyOne",
        letterSpacing: 3
    }
});
export default ListCheckBox;