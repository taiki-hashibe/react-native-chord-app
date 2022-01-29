import { useEffect, useState ,useContext, createContext} from "react";

import { StyleSheet ,View ,Text} from "react-native";
import { Guitar } from "./Guitar";
import { Bass } from "./Bass";
import { Piano } from "./Piano";

export function Index() {
    return(
        <View style={styles.index}>
            <Piano/>
        </View>
    )
}

const styles = StyleSheet.create({
    index : {
        flex : 1,
        display : "flex",
        justifyContent : "center",
        alignItems : "flex-start",

    }
});