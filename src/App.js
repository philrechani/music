import logo from './logo.svg';
import './App.css';
import { Tabs } from './Tabs';

const majorIntervals = [2, 2, 1, 2, 2, 2, 1]

const majorScale = [0, 2, 4, 5, 7, 9, 11]

const standardTuning = ['E3', 'A3', 'D4', 'G4', 'B4', 'E5']

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
const extendRegister = (noteMap) => {
  const registerSize = 88 //for 88 key piano for instance
  const octaveNumber = 8
  const offset = 12
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

const generateCircleOfFifths = (noteMap) => {
  const inverseNoteMap = generateInverseNoteMap(noteMap)
  var cycle = new Array()
  var notecycle = new Array()
  for (var i = 0; i < 12; i++) {
    cycle.push(i * 7 % 12)
    notecycle.push(inverseNoteMap[(i * 7 % 12).toString()])
  }
  return cycle, notecycle
}

//this will generate chords up to a note number skip. Therefore, it does not generate all possible chords. Stacks thirds
const stackThirds = (scale, notenumber) => {
  var chords = new Array()
  for (var i = 0; i < scale.length; i++) {
    var chord = new Array()
    for (var j = 0; j < notenumber; j++) {
      chord.push(scale[(i + 2 * j) % scale.length])

    }
    chords.push(chord)
  }
  return chords
}

function getDepth(arr, depth = 0) {
  if (Array.isArray(arr)) {
    return getDepth(arr[0], depth + 1);
  } else {
    return depth;
  }
}

//object must be an array of integers
const convertToNotes = (object, noteMap) => {
  const depth = getDepth(object)
  var newObject = object
  switch (depth) {
    case 1: {
      newObject = object.map(element => {
        return noteMap[element.toString()]
      })
      break
    }
    case 2: {

      newObject = object.map(element => {
        return element.map(subElement => {
          return noteMap[subElement.toString()]

        })
      })
      break
    }
  }
  return newObject
}

//object must be an array of integers
const convertToStrings = (object, noteMap) => {
  const depth = getDepth(object)

  const inverseNoteMap = generateInverseNoteMap(noteMap)
  var newObject = object
  switch (depth) {
    case 1: {
      newObject = object.map(element => {
        return inverseNoteMap[element.toString()]
      })
      break
    }
    case 2: {

      newObject = object.map(element => {
        return element.map(subElement => {
          return inverseNoteMap[subElement.toString()]

        })
      })
      break
    }
  }
  return newObject
}

const chords = stackThirds(majorScale, 3)


const generateGuitarStrings = (tuning, noteMap) => {

  const fretNumber = 24
  const extendedNoteMap = extendRegister(noteMap, 12)

  var newTuning = tuning.map(note => extendedNoteMap[note.toString()])

  var strings = new Array()
  for (var i = 0; i < tuning.length; i++) {
    var string = new Array()
    for (var j = 0; j < fretNumber + 1; j++) {
      string.push(newTuning[i] + j)
    }
    strings.push(string)
  }

  return strings
}

const applyNotes = (notes, tuning) => {

}

function App() {

  const extendedNoteMap = extendRegister(sharpNoteMap)
  const inverseExtendedNoteMap = generateInverseNoteMap(extendedNoteMap)
  console.log(inverseExtendedNoteMap)
  const tuning = generateGuitarStrings(standardTuning, sharpNoteMap)
  return (
    <div className="music-app">
      <Tabs strings={tuning} noteMap={inverseExtendedNoteMap} />
    </div>
  );
}

export default App;
