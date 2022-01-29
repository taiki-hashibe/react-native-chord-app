import { chordDegreeMonoType, chordDegreeType, chordDetailType, suffixType, tensionType, _7thType } from "./@types/chord";
export interface ChordDegree {
    getSuffixDegree(suffix : suffixType): chordDegreeType;
    get7thDegree(_7th : _7thType | null): chordDegreeMonoType | void;
    getTensionDegree(tension : tensionType[] ): chordDegreeType | void;
    getChordDegree(chordDetail : chordDetailType) :chordDegreeType;
}

class ChordDegreeImpl implements ChordDegree {
    getSuffixDegree(suffix : suffixType): chordDegreeType {
        switch(suffix){
            case "":
                return {
                    degree : [1,3,5],
                    chromatic : [1,5,8]
                };
            case "m":
                return {
                    degree : [1,3,5],
                    chromatic : [1,4,8]
                };
            case "dim":
                return {
                    degree : [1,3,5],
                    chromatic : [1,4,7]
                };
            case "aug":
                return {
                    degree : [1,3,5],
                    chromatic : [1,5,9]
                };
            case "sus2":
                return {
                    degree : [1,2,5],
                    chromatic : [1,3,8]
                };
            case "sus4":
                return {
                    degree : [1,4,5],
                    chromatic : [1,6,8]
                };
            case "6":
                return {
                    degree : [1,3,5,6],
                    chromatic : [1,5,8,10]
                };
            case "m6":
                return {
                    degree : [1,3,5,6],
                    chromatic : [1,4,8,10]
                };
            default : return {
                degree : [],
                chromatic : []
            }
        }
    }
    get7thDegree(_7th : _7thType | null): chordDegreeMonoType | void {
        switch(_7th){
            case "7":
                return {
                    degree : 7,
                    chromatic : 11
                }
            case "M7":
                return {
                    degree : 7,
                    chromatic : 12
                }
            default : return;
        }
    }
    getTensionDegree(tension : tensionType[]): void | chordDegreeType {
        let chordDeg :chordDegreeType = {
            degree : [],
            chromatic : []
        };

        tension.map((t) => {
            switch(t){
                case "b9":
                    chordDeg.degree.push(2);
                    chordDeg.chromatic.push(2);
                    break;
                case "9":
                    chordDeg.degree.push(2);
                    chordDeg.chromatic.push(3);
                    break;
                case "#9":
                    chordDeg.degree.push(2);
                    chordDeg.chromatic.push(4);
                    break;
                case "11":
                    chordDeg.degree.push(4);
                    chordDeg.chromatic.push(6);
                    break;
                case "#11":
                    chordDeg.degree.push(4);
                    chordDeg.chromatic.push(7);
                    break;
                case "b13":
                    chordDeg.degree.push(6);
                    chordDeg.chromatic.push(9);
                    break;
                case "13":
                    chordDeg.degree.push(6);
                    chordDeg.chromatic.push(10);
                    break;
                default : break;
            }
        });

        return chordDeg;
    }
    getChordDegree(chordDetail : chordDetailType) :chordDegreeType {
        let chordDegree : chordDegreeType = {
            degree : [],
            chromatic : []
        };
        const suffixDegree : chordDegreeType = this.getSuffixDegree(chordDetail.suffix);
        const _7thDegree : chordDegreeMonoType | void = this.get7thDegree(chordDetail._7th);
        const tensionDegree : chordDegreeType | void = this.getTensionDegree(chordDetail.tension);
        suffixDegree.degree.map((deg,i)=>{
            chordDegree.degree.push(deg);
            chordDegree.chromatic.push(suffixDegree.chromatic[i]);
        });
        if(_7thDegree){
            chordDegree.degree.push(_7thDegree.degree);
            chordDegree.chromatic.push(_7thDegree.chromatic);
        };
        if(tensionDegree){
            tensionDegree.degree.map((deg,i)=>{
                chordDegree.degree.push(deg);
                chordDegree.chromatic.push(tensionDegree.chromatic[i]);
            });
        };
        return chordDegree;
    }
}

export const ChordDegreeRepository = () => {
    return new ChordDegreeImpl();
}