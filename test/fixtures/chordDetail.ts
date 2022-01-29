import { chordDetailType, tensionType } from "../../lib/chord-tone-theory/@types/chord"

type chordDetailsData = {
    M : chordDetailType
    M7 : chordDetailType
    m : chordDetailType
    dim : chordDetailType
    aug : chordDetailType
    sus2 : chordDetailType
    sus4 : chordDetailType
    _6 : chordDetailType
    m6 : chordDetailType
}
export const chordDetails : chordDetailsData = {
    M: {
        suffix: "",
        _7th: null,
        tension: [],
    },
    M7: {
        suffix: "",
        _7th: "M7",
        tension: []
    },
    m: {
        suffix: "m",
        _7th: null,
        tension: []
    },
    dim: {
        suffix: "dim",
        _7th: null,
        tension: []
    },
    aug: {
        suffix: "aug",
        _7th: null,
        tension: []
    },
    sus2 :{
        suffix: "sus2",
        _7th: null,
        tension: []
    },
    sus4 :{
        suffix: "sus4",
        _7th: null,
        tension: []
    },
    _6: {
        suffix: "6",
        _7th: null,
        tension: []
    },
    m6: {
        suffix: "m6",
        _7th: null,
        tension: []
    }
}

export const chordDetailsDataTension = (chordDetail : chordDetailType,tension : tensionType[]) => {
    return chordDetail.tension = tension;
}