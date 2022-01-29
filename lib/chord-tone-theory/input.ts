export interface Input {
    planeInputNumbers : number[];
    compressOctaveNumbers : number[];
    chordInputNumbers : {planeRootNumber : number,inputNumbers : number[]}[];
    chordInputDiff : number;
    compressIntoOctave(): number[];
    getCompressOctaveNumbers(): number[]
    formatChordInputNumbers() : {planeRootNumber : number,inputNumbers : number[]}[];
    getPlaneInputNumbers(): number[];
    getPlaneRootNumber(): number;
    getRootNumber(): number;
    sortByOrder(ary : number[]): number[];
}

class InputImpl implements Input {
    planeInputNumbers: number[];
    compressOctaveNumbers: number[];
    chordInputNumbers: {planeRootNumber : number,inputNumbers : number[]}[];
    chordInputDiff: number;
    constructor(planeInputNumbers : number[]){
        this.planeInputNumbers = planeInputNumbers;
        this.compressOctaveNumbers = this.compressIntoOctave();
        this.chordInputNumbers = this.formatChordInputNumbers();
        this.chordInputDiff = this.getRootNumber() - 1;
    }
    private aryMin (a : number, b : number) {return Math.min(a, b);}
    compressIntoOctave(): number[] {
        let octave : number[] = [];
        this.planeInputNumbers.map((input) => {
            let compress : number = input;
            if(compress > 12){
                compress = compress % 12;
                if(compress == 0){
                    compress = 12;
                }
            }
            if(octave.indexOf(compress) == -1){
                octave.push(compress);
            }
        });
        return this.sortByOrder(octave);
    }
    getCompressOctaveNumbers(): number[] {
        return this.compressOctaveNumbers;
    }
    formatChordInputNumbers(): {planeRootNumber : number,inputNumbers : number[]}[] {
        const sort = (inputNotes: number[]): number[][] => {
            let inputNotesArray : number[][] = [];
            inputNotes.map((_, i) => {
                let sortedArray : number[] = inputNotes.slice(i);
                sortedArray = sortedArray.concat(inputNotes.slice(0,i))
                inputNotesArray.push(sortedArray);
            });
            return inputNotesArray
        }
        const compression = (inputNotes: number[]): number[] => {
            let compressionNotes : number[] = [];
            inputNotes.map((input) => {
                let compressionNote : number = input - inputNotes[0] + 1;
                if(compressionNote < 1){
                    compressionNote += 12;
                }
                compressionNotes.push(compressionNote);
            });
            return compressionNotes;
        }
        const patterns : number[][] = sort(this.compressOctaveNumbers);
        let compPatterns : {planeRootNumber : number,inputNumbers : number[]}[] = [];
        patterns.map((pattern) => {
            compPatterns.push({
                planeRootNumber : pattern[0],
                inputNumbers : compression(pattern)
            });
        });
        return compPatterns;
    }
    getPlaneInputNumbers(): number[] {
        return this.planeInputNumbers;
    }
    getPlaneRootNumber(): number {
        return this.planeInputNumbers[0];
    }
    getRootNumber(): number {
        // let root : number = this.planeInputNumbers[0];
        // if(root > 12){
        //     root = root % 12;
        //     if(root == 0){
        //         root = 12;
        //     }
        // }
        // return root;
        return this.planeInputNumbers[0];
    }
    sortByOrder(ary : number[]): number[] {
        const extension = (num_1 : number, num_2 : number) => {
            return num_1 - num_2;
        }

        return ary.sort(extension);
    }
}

export const InputRepository = (planeInputNumbers: number[]) => {
    return new InputImpl(planeInputNumbers);
}

