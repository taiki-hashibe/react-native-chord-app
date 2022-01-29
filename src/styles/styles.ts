import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    board_base : {
        flex : 1,
        display : "flex",
    },
    board : {
        flex : 1,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        borderTopWidth : 1,
        borderTopColor : "#626366",
        borderBottomWidth : 1,
        borderBottomColor : "#626366",
    },
    string : {
        display : "flex",
        flexDirection : "row",
        justifyContent : "flex-start",
        alignItems : "flex-start",
    },
    fret : {
        display : "flex",
        backgroundColor : "#EDEDED",
        width : 100,
        height : 36,
        borderLeftWidth : 2,
        borderLeftColor : "#626366",
        borderTopWidth : 1,
        borderTopColor : "#F5F4F4"
    },
    fret_onPress : {
        display : "flex",
        backgroundColor : "#914141",
        width : 100,
        height : 36,
        borderLeftWidth : 2,
        borderLeftColor : "#626366",
        borderTopWidth : 1,
        borderTopColor : "#F5F4F4"
    }
})