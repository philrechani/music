export const NoteBox = ({ pos, text }) => {

    const width = 20
    const height = 20
    return (
        <svg className="note-container">
            <rect className="note-box" width={width} height={height} fill='white' x={pos}/>
            <text className="note-text" x={pos}>cake</text>
        </svg>
    )
}