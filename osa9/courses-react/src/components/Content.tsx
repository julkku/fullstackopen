import React from 'react';

interface Part {
    name: string;
    exerciseCount: number;
}   

interface ContentProps {
    parts: Array<Part>;
}

const Content: React.FC<ContentProps> = (props) => {
    return (
        <p>
        Number of exercises{" "}
        {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
}

export default Content;