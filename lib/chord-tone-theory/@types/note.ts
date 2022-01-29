export type naturalNoteType = "C"|"D"|"E"|"F"|"G"|"A"|"B";
export type fullNoteType  =
"C+"|"C++"|"C-"|"C--"|
"D+"|"D++"|"D-"|"D--"|
"E+"|"E++"|"E-"|"E--"|
"F+"|"F++"|"F-"|"F--"|
"G+"|"G++"|"G-"|"G--"|
"A+"|"A++"|"A-"|"A--"|
"B+"|"B++"|"B-"|"B--"| naturalNoteType;

export type accidentalType = null|"+"|"++"|"-"|"--";
export type accidentalFormatType = ""|"#"|"##"|"b"|"bb";
export type accidentalAttributeType = "n"|"s"|"f";
export type octaveType = number;

export type noteObjectType = {
    note : naturalNoteType,
    accidental : accidentalType,
    octave : octaveType
}