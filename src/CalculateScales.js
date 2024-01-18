const majorIntervals = [2, 2, 1, 2, 2, 2, 1]

//defining C as 0
const sharpNoteMap = {
    'C': 0,
    'C#': 1,
    'D': 2,
    'D#': 3,
    'E': 4,
    'F': 5,
    'F#': 6,
    'G': 7,
    'G#': 8,
    'A': 9,
    'A#': 10,
    'B': 11
}

const flatNoteMap = {
    'C': 0,
    'Db': 1,
    'D': 2,
    'Eb': 3,
    'E': 4,
    'F': 5,
    'Gb': 6,
    'G': 7,
    'Ab': 8,
    'A': 9,
    'Bb': 10,
    'B': 11
}


//first I need to define the central note (probably want it consistent with midi), then making a mapping of multi octave
const extendRegister = (noteMap, offset) => {
    const registerSize = 88 //for 88 key piano for instance
    const octaveNumber = 8
    var extendedNoteMap = {}
    const noteNames = Object.keys(noteMap)
    for (var i = 0; i < octaveNumber; i++) {
        noteNames.forEach(note => {
            extendedNoteMap[note + i.toString()] = noteMap[note] + i * 12 + offset
        }
        )
    }
    return extendedNoteMap
}

//this function is meh
const getOctaveAndNoteName = (note) => {
    return note.split(" ")
}

//unfortunately, as keys  must be strings, I'll have to call toString()
const generateInverseNoteMap = (noteMap) => {
    const noteNames = Object.keys(noteMap)
    var inverseNoteMap = {}
    noteNames.forEach(note => {
        inverseNoteMap[noteMap[note]] = note
    })
    return inverseNoteMap
}

const extendedNoteMap = extendRegister(sharpNoteMap, 12)

console.log(generateInverseNoteMap(extendedNoteMap))