import React from 'react';
import Part from './Part';
import { CoursePart } from '../types'



interface ContentProps {
    parts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = (props) => {
    return (
        <div>{props.parts.map((part, i) => 
            <span key={i}>
                <Part part={part} />
            </span>
            
        )}
        </div>
    )
}

export default Content;