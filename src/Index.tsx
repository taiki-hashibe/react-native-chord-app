import { useEffect, useState ,useContext, createContext} from "react";

import { StyleSheet ,View ,Text} from "react-native";
import { Strings } from "./Strings";

export function Index() {
    const [inputNotes, setInputNotes] = useState<number[]>([]);

    return(
        <View style={styles.index}>
            <Strings turnings={[29,24,20,15,10,5]}></Strings>
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