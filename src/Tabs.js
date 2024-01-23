import { NoteBox } from "./NoteBox"

export const Tabs = ({ strings, notes, noteMap }) => {
    //tuning should be an array of notes

    const width = 1000
    const height = 20
    const spacing = height / 2
    const indexScale = width / strings[0].length
    console.log(indexScale)
    
    function reverseArray(arr) {
        let reversed = [];
        for (let i = arr.length - 1; i >= 0; i--) {
            reversed.push(arr[i]);
        }
        return reversed;
    }

    const reversedStrings = reverseArray(strings)

    console.log(reversedStrings)

    return (
        <div className="strings-container">
            {reversedStrings.map((element) => {
                return (
                    <div className="string-container">
                        <text className="string-label">
                            {noteMap[element[0].toString()]}
                        </text>
                        <svg height={height} width={width}>
                            <line className='string-line' x1="0" y1={spacing} x2={width} y2={spacing} />
                            {element.map((subElement, index) => <NoteBox pos ={10+index*indexScale}/>)}
                        </svg>
                    </div>
                )
            })}
        </div>
    )
}