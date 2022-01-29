import { View, ScrollView ,Text, TouchableHighlight} from "react-native"
import { useState ,Dispatch ,SetStateAction, useEffect, useLayoutEffect} from "react";
import { styles } from "./styles/styles";
import { ChordAppHandlerRepository } from "../lib/chord-tone-theory/chordAppHandler";
import { NoteObjectsRepository } from "../lib/chord-tone-theory/noteObject";
import { formatChordType } from "../lib/chord-tone-theory/@types/chord";
import { InputRepository } from "../lib/chord-tone-theory/input";

export function Strings (props : {turnings : number[]}) {
    let stringObj : {
        string : number,
        turning : number,
        input? : number
    }[] = [];
    props.turnings.map((turning, t) => {
        stringObj.push({
            string : t + 1,
            turning : turning,
            input : undefined
        });
    });
    const [stringInputs, setStringInputs] = useState<{
        string : number,
        turning : number,
        input? : number
    }[]>(stringObj);
    const formatInputNumbersForStrings = () => {
        let numbers : number [] = [];
        stringInputs.map((stringInput) => {
            if(stringInput.input){
                if(!(numbers.indexOf(stringInput.input) != -1)){
                    numbers.push(stringInput.input);
                }
            }
        });
        numbers = numbers.sort();
        const chord : { chord : formatChordType; score: number; }[] = ChordAppHandlerRepository(numbers).chordAppHandler();
        chord.map((c) => {
            if(c.chord.chordRoot == c.chord.root){
                console.log(c.chord.chordName)
            }else{
                console.log(c.chord.chordName + "/" + c.chord.root);
            }
        })
    }
    const setStringInputsHelper = (string : number,num : number | undefined): void => {
        let clone = stringInputs;
        clone[string - 1] = {...clone[string -1], input : num};
        setStringInputs(clone);

        formatInputNumbersForStrings();
    };
    useLayoutEffect(()=>{
        console.log(stringInputs)
    },[stringInputs])
    return(
        <>
            {
                stringObj.map((obj) => {
                    return(
                        <String
                        string={obj.string}
                        turning={obj.turning}
                        input={obj.input}
                        setStringInputs={setStringInputsHelper}
                        />
                    )
                })
            }
        </>
    )
}
export function String(props :{string : number,turning : number, input? : number, setStringInputs : (string : number,num : number | undefined) => void}){
    let fretNoteNumbers : number[] = [];
    for(let f : number = 0;f <= 21; f++){
        fretNoteNumbers.push(f);
    };
    const [stringInput, setStringInput] = useState<number | undefined>();
    useLayoutEffect(()=>{
        props.setStringInputs(props.string,stringInput);
    },[stringInput]);
    return (
        <View style={styles.string}>
            {
                fretNoteNumbers.map((fret, i) => {
                    return(
                        <Fret
                        key={fret}
                        string = {props.string}
                        turning = {props.turning}
                        status = {stringInput == i + props.turning}
                        fretNumber= {i}
                        setStringInput = {setStringInput}
                        />
                    )
                })
            }
        </View>
    )
}
export function Fret(props : {string : number, turning : number,status : boolean ,fretNumber : number, setStringInput : Dispatch<SetStateAction<number | undefined>>}){
    const fretOnPress = () => {
        const noteNum : number = props.turning + props.fretNumber;
        if(props.status){
            props.setStringInput(undefined);
        }else{
            props.setStringInput(noteNum);
        }
    };
    let testView = (props.turning + props.fretNumber) % 12
    if(testView == 0){
        testView = 12
    }
    testView = props.turning + props.fretNumber;
    return(
            <TouchableHighlight key={props.turning} onPress={fretOnPress}>
            {
                props.status ?
                <View style={styles.fret_onPress}>
                    <Text>
                    {testView}
                    </Text>
                </View>
                :
                <View style={styles.fret}>
                    <Text>
                    {testView}
                    </Text>
                </View>
            }
        </TouchableHighlight>
    )
}

