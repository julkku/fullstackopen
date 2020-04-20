import React from 'react'
import { CoursePart } from '../types'

interface PartProps {
    part: CoursePart;
}


const Part: React.FC<PartProps> = (props) => {
    const part = props.part;

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    switch(part.name) {
        case "Fundamentals" : 
            return (
            <p>
                <b>{part.name}</b> [exercises: {part.exerciseCount}] 
                <br/> <i>{part.description}</i>   
            </p>
            )
        case "Using props to pass data":
            return (<p><b>{part.name}</b> [exercises: {part.exerciseCount}] [group projects: {part.groupProjectCount}]</p>)
        case "Deeper type usage":
            return (
                <p>
                    <b>{part.name}</b> [exercises: {part.exerciseCount}] 
                    <br/> <i>{part.description}</i>
                    <br/> <a href={part.exerciseSubmissionLink}>Exercize submission link</a>
                </p>
                )
        case "Extracurricular type exercise": {
            return (
                <p>
                    <b>{part.name}</b> [exercises: {part.exerciseCount}] 
                    <br/> <i>{part.description}</i>   
                </p>
                )
        }
        default: 
            return assertNever(part); 
        }


}

export default Part;