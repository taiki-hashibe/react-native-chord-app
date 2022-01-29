
import { noteObjectType } from "../../lib/chord-tone-theory/@types/note";
import { chordType } from "../../lib/chord-tone-theory/@types/chord";
import { noteObjects } from "./noteObjects";

type chordStyle =
"C"|
"C7"|
"CM7"|
"Db"|
"Db7"|
"DbM7"|
"C#m"|
"C#m7";

export interface ChordFactory {
    getChordNotes(style : chordStyle): noteObjectType[];
    // getChordObject(style : chordStyle): chordType;
}

class ChordFactoryImpl implements ChordFactory {
    getChordNotes(style: chordStyle): noteObjectType[] {
        switch(style){
            case "C":
                return [
                    noteObjects.C,
                    noteObjects.E,
                    noteObjects.G
                ]
            case "C7":
                return [
                    noteObjects.C,
                    noteObjects.E,
                    noteObjects.G,
                    noteObjects.Bb
                ]
            case "CM7":
                return [
                    noteObjects.C,
                    noteObjects.E,
                    noteObjects.G,
                    noteObjects.B
                ]
            case "Db":
                return [
                    noteObjects.Db,
                    noteObjects.F,
                    noteObjects.Ab
                ]
            case "Db7":
                return [
                    noteObjects.Db,
                    noteObjects.F,
                    noteObjects.Ab,
                    noteObjects.Cb
                ]
            case "DbM7":
                return [
                    noteObjects.Db,
                    noteObjects.F,
                    noteObjects.Ab,
                    noteObjects.C
                ]
            default :
            console.error("cannot find object " + style)
            return [
                noteObjects.C,
                noteObjects.E,
                noteObjects.G
            ];
        }
    }
    // getChordObject(style: chordStyle): chordType {
    //     switch(style){
    //         case "C":
    //             return {
    //                 root : noteObjects.C,
    //                 chordDetail : chordObjects.chordDetail.M,

    //             }
    //         case "C7":
    //             return [
    //                 noteObjects.C,
    //                 noteObjects.E,
    //                 noteObjects.G,
    //                 noteObjects.Bb
    //             ]
    //         case "CM7":
    //             return [
    //                 noteObjects.C,
    //                 noteObjects.E,
    //                 noteObjects.G,
    //                 noteObjects.B
    //             ]
    //         case "Db":
    //             return [
    //                 noteObjects.Db,
    //                 noteObjects.F,
    //                 noteObjects.Ab
    //             ]
    //         case "Db7":
    //             return [
    //                 noteObjects.Db,
    //                 noteObjects.F,
    //                 noteObjects.Ab,
    //                 noteObjects.Cb
    //             ]
    //         case "DbM7":
    //             return [
    //                 noteObjects.Db,
    //                 noteObjects.F,
    //                 noteObjects.Ab,
    //                 noteObjects.C
    //             ]
    //         default :
    //         console.error("cannot find object " + style)
    //         return [
    //             noteObjects.C,
    //             noteObjects.E,
    //             noteObjects.G
    //         ];
    // }
}

export const ChordFactoryRepository = () => {
    return new ChordFactoryImpl();
}