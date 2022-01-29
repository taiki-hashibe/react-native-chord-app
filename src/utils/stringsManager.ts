import { strings, stringsType } from "../@types/strings";

export interface StringsManager {
    config : stringsType;
    setUpStrings(): number[][];
}

class StringsManagerImpl implements StringsManager {
    config: stringsType;
    constructor(config : stringsType){
        this.config = config;
    }

    setUpStrings(): number[][] {
        let strings : number[][] = [];
        this.config.turning.map((strTurning, t) => {
            let frets : number[] = [];
            for(let f : number = strTurning; f < (strTurning + this.config.frets); f++){
                frets.push(f);
            };
            strings.push(frets);
        });
        return strings;
    }
}

export const StringsManagerRepository = (config : stringsType) => {
    return new StringsManagerImpl(config);
}