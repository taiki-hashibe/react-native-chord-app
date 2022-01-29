import React, { SetStateAction } from "react";
import { StyleSheet, View , Text} from "react-native";
import { configType } from "../src/Types/config";
import { NoteKeyFactory } from "../src/Service/noteKeyFactory";

export function String (props : {string : number ;config: configType}) {
    const frets : string[] = [];
    const noteKeyFactory = new NoteKeyFactory();
    for(let n : number = 0; n < props.config.fret; n++){
        frets.push("");
    }
    return (
        <View
        style={styles.string}
        >
            {
                frets.map((fret,i)=>{
                    return (
                        <View
                        key={i}
                        style={styles.fret}
                        >
                            <Text>
                                {noteKeyFactory.getNoteAndOctave(props.config.turning[props.string - 1] + i, props.config.defaultAccidental)}
                            </Text>
                            <Text>
                                {noteKeyFactory.getNumber(noteKeyFactory.getNoteAndOctave(props.config.turning[props.string - 1] + i, props.config.defaultAccidental))}
                            </Text>
                            <Text>
                                {props.config.turning[props.string - 1] + i}
                            </Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    string: {
        height: 40,
        flexDirection: "row"
    },
    fret: {
        width: 70,
        backgroundColor:"#DDDDDD",
        borderLeftWidth: 2,
        borderColor: "#444"
    }
})