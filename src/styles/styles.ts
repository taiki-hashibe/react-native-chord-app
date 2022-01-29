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
    },
    piano_keyboard : {
        display : "flex",
        flexDirection : "row",
        justifyContent : "flex-start",
        alignItems : "flex-start"

    },
    piano_white_keyboard : {
        width : 72,
        height : 140,
        backgroundColor : "#FAF8E6",
        borderWidth : 1,
        borderColor : "#1C2225",
        display : "flex",
        justifyContent : "flex-end",
        alignItems : "center"
    },
    piano_white_keyboard_active : {
        width : 72,
        height : 140,
        backgroundColor : "#BCD9EA",
        borderWidth : 1,
        borderColor : "#cccccc",
        display : "flex",
        justifyContent : "flex-end",
        alignItems : "center"
    },
    piano_black_keyboard : {
        width : 35,
        height : 82,
        backgroundColor : "#171717",
        position : "absolute",
        left : -17,
        display : "flex",
        justifyContent : "flex-end",
        alignItems : "center"
    }
})