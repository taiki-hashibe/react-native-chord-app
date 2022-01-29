import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from "react";
import { TouchableHighlight, View } from "react-native"
import { Text } from "react-native"
import { styles } from "./styles/styles"
import { ChordToneTheoryHandlerRepository } from "../lib/chord-tone-theory/chordToneTheoryHandler";
import { formatChordType } from "../lib/chord-tone-theory/@types/chord";
export function Piano() {
    const [input , setInput] = useState<number[]>([]);
    const setInputFunction = (num : number): boolean => {
        const index = input.indexOf(num);
        if(index != -1){
            let removeInput : number[] = input;
            removeInput.splice(index,1);
            setInput(removeInput);
            const chord : { chord : formatChordType; score: number; }[] = ChordToneTheoryHandlerRepository(input.sort()).chordAppHandler();
            chord.map((c) => {
                if(c.chord.chordRoot == c.chord.root){
                    console.log(c.chord.chordName)
                }else{
                    console.log(c.chord.chordName + "/" + c.chord.root);
                }
            })
            return false;
        }else{
            let newInput : number[] = input;
            newInput.push(num);
            setInput(newInput);
            const chord : { chord : formatChordType; score: number; }[] = ChordToneTheoryHandlerRepository(input.sort()).chordAppHandler();
            chord.map((c) => {
                if(c.chord.chordRoot == c.chord.root){
                    console.log(c.chord.chordName)
                }else{
                    console.log(c.chord.chordName + "/" + c.chord.root);
                }
            })
            return true;
        }
    }
    useLayoutEffect(()=>{
        console.log(input);
        const chord : { chord : formatChordType; score: number; }[] = ChordToneTheoryHandlerRepository(input.sort()).chordAppHandler();
        chord.map((c) => {
            if(c.chord.chordRoot == c.chord.root){
                console.log(c.chord.chordName)
            }else{
                console.log(c.chord.chordName + "/" + c.chord.root);
            }
        })
    },[input])
    let pianoKeyboards : number[] = [];
    for(let p : number = 10; p <= 34; p ++){
        pianoKeyboards.push(p)
    };
    const keyboardRenderHelper = (num : number) : JSX.Element => {
        let formatNum : number = num % 12;
        if(formatNum == 0){
            formatNum = 1;
        }
        console.log(num)
        console.log(formatNum)
        if(formatNum == 2 || formatNum == 4 || formatNum == 7 || formatNum == 9 || formatNum == 11){
            return (<BlackKeyboard keyboardNote={num}></BlackKeyboard>);
        }else{
            return  (<WhiteKeyboard keyboardNote = {num} setInput={setInputFunction}></WhiteKeyboard>);
        }
    }
    return(
        <View style={styles.piano_keyboard}>
            {
                pianoKeyboards.map((keyboardNote)=>{
                    return (keyboardRenderHelper(keyboardNote))
                })
            }
        </View>
    )
}

function WhiteKeyboard(props : {keyboardNote : number, setInput : (num : number) => boolean}){
    const [keyboardState , setKeyboardState] = useState<boolean>(false);
    const keyboardOnPress = () => {
        setKeyboardState(props.setInput(props.keyboardNote));
    }
    return (
        <TouchableHighlight onPress={keyboardOnPress}>
            {
                keyboardState ?
                <View style={styles.piano_white_keyboard_active}>
                    <Text>{props.keyboardNote}</Text>
                </View>
                :
                <View style={styles.piano_white_keyboard}>
                    <Text>{props.keyboardNote}</Text>
                </View>
            }
        </TouchableHighlight>
    )
}

function BlackKeyboard(props : {keyboardNote : number}){
    return (
        <TouchableHighlight>
            <View style={styles.piano_black_keyboard}>
                <Text>{props.keyboardNote}</Text>
            </View>
        </TouchableHighlight>
    )
}