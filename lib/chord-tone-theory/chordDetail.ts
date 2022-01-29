import { chordDetailType } from "./@types/chord";

export interface ChordDetail {
    inputNotes : number[]
    getChordDetail(inputNotes : number[]): chordDetailType | void;
}

export class ChordDetailImpl implements ChordDetail {
    inputNotes: number[];
    constructor(inputNotes : number[]){
        this.inputNotes = inputNotes;
    }
    getChordDetail(): void | chordDetailType {
        let chordDetail : chordDetailType = {
            suffix : "test",
            _7th : null,
            tension : []
        }

        // if(!inputNotesValidation(this.inputNotes).validation()){
        //     return;
        // }

        /**
         * M2 が存在する
         */
         if(this.inputNotes.indexOf(3) != -1){
            if(this.existCheck({
                contain : [1,3,8],
                non : [2,4,5,6,7,9,10,12]
            })){
                if(chordDetail.suffix != "test"){
                console.log("error, \n" +this.inputNotes + "\n"+chordDetail.suffix + "\n sus2")

                }
                chordDetail.suffix = "sus2";
            }
        }

        /**
         * m3 が存在する
         */
            if(this.inputNotes.indexOf(4) != -1){
            if(this.existCheck({
                contain : [1,4,7],
                non : [2,3,5,6,8,9,11,12]
            })){
                if(chordDetail.suffix != "test"){
                console.log("error, \n" +this.inputNotes + "\n"+chordDetail.suffix + "\ndim")

                }
                chordDetail.suffix = "dim";
            }else if(this.existCheck({
                contain : [1,4,10],
                non : [2,3,5,6,7,9,11,12]
            })){
                if(chordDetail.suffix != "test"){
                console.log("error, sus2 \n" +this.inputNotes + "\n"+chordDetail.suffix + "\nm6")

                }
                chordDetail.suffix = "m6";
            }else if(this.existCheck({
                contain : [1,4],
                non : [5,7,9]
            })){
                if(chordDetail.suffix != "test"){
                console.log("error, sus2 \n" +this.inputNotes + "\n"+chordDetail.suffix + "\nm")

                }
                chordDetail.suffix = "m";
            }
        }


        /**
         * M3 が存在する
         */
        if(this.inputNotes.indexOf(5) != -1){
            if(this.existCheck({
                contain : [1,5,9],
                non : [2,4,6,7,8,10]
            })){
                if(chordDetail.suffix != "test"){
                    console.log("error, sus2 \n" +this.inputNotes + "\n"+chordDetail.suffix + "\naug")
                }
                chordDetail.suffix = "aug";
            }else if(this.existCheck({
                contain : [1,5,10],
                non : [2,3,4,6,7,9,11,12]
            })){
                if(chordDetail.suffix != "test"){
                    console.log("error, sus2 \n" +this.inputNotes + "\n"+chordDetail.suffix + "\n6")

                }
                chordDetail.suffix = "6";
            }else if(this.existCheck({
                contain : [1,5],
                non : [6]
            })){
                if(chordDetail.suffix != "test"){
                    console.log("error, sus2 \n" +this.inputNotes + "\n"+chordDetail.suffix + "\n''")

                }
                chordDetail.suffix = "";
            }
        }

        /**
         * P4 が存在する
         */
        if(this.inputNotes.indexOf(6) != -1){
            if(this.existCheck({
                contain : [1,6,8],
                non : [2,3,4,5,7,9,10,12]
            })){
                if(chordDetail.suffix != "test"){
            console.log("error, sus2 \n" +this.inputNotes + "\n"+chordDetail.suffix + "\nsus4")

                }
                chordDetail.suffix = "sus4";
            }
        }



        /**
         * 7
         */
         if(this.inputNotes.indexOf(11) != -1){
            if(this.existCheck({
                contain : [1],
                non : []
            })){
                if(chordDetail.suffix != "dim"){
                    chordDetail._7th = "7";
                }
            }
        }

        /**
         * M7
         */
         if(this.inputNotes.indexOf(12) != -1){
            if(this.existCheck({
                contain : [1],
                non : []
            })){
                chordDetail._7th = "M7";
            }
        }

        /**
         * b9
         */
        if(this.inputNotes.indexOf(2) != -1){
            if(this.existCheck({
                contain : [1,2],
                non : [3,4,6,12]
            })){
                chordDetail.tension.push("b9");
            }
        }

        /**
         * 9
         */

        if(this.inputNotes.indexOf(3) != -1){
            if(this.existCheck({
                contain : [1,3],
                non : []
            })){
                if(chordDetail.suffix != "sus2"){
                    chordDetail.tension.push("9");
                }
            }
        }

        /**
         * 11
         */

         if(this.inputNotes.indexOf(6) != -1){
            if(this.existCheck({
                contain : [1,5,6],
                non : []
            })){
                chordDetail.tension.push("11");
            }
        }

        /**
         * #11
         */

         if(this.inputNotes.indexOf(7) != -1){
            if(this.existCheck({
                contain : [1,7],
                non : [4,6]
            })){
                chordDetail.tension.push("#11");
            }
        }

        /**
         * b13
         */

        if(this.inputNotes.indexOf(9) != -1){
            if(this.existCheck({
                contain : [1,9],
                non : []
            })){
                if(chordDetail.suffix != "aug"){
                    chordDetail.tension.push("b13");
                }
            }
        }

        /**
         * 13
         */
         if(this.inputNotes.indexOf(10) != -1){
            if(this.existCheck({
                contain : [1,10],
                non : []
            })){
                if(chordDetail.suffix != "6" && chordDetail.suffix != "dim"){
                    chordDetail.tension.push("13");
                }else if(chordDetail.suffix != "6"){
                    chordDetail._7th = "7";
                }
            }
        }
        if(chordDetail.suffix != "test"){
            return chordDetail;
        }else{
            return;
        }
    }

    private existCheck(check:{contain : number[], non : number[]}): boolean{
        let contain : boolean = true;
        let non : boolean = true;
        check.contain.map((c)=>{
            if(this.inputNotes.indexOf(c) == -1){
                contain = false;
            }
        });

        check.non.map((n : number) => {
            if(this.inputNotes.indexOf(n) != -1){
                non = false;
            }
        });

        return (contain && non);
    }
}

export const ChordDetailRepository = (inputNotes : number[]) => {
    return new ChordDetailImpl(inputNotes)
}
