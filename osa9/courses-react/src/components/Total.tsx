import React from 'react';

interface Part {
    name: string;
    exerciseCount: number;
}   

interface TotalProps {
    parts: Array<Part>;
}

const Total: React.FC<TotalProps> = (props) => {
    return (
        <div>{props.parts.map((part, i) => 
            <p key={i}> {part.name} {part.exerciseCount}</p>
        )}
        </div>
    )
}

export default Total;