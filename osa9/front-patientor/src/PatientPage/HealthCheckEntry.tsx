import React from 'react';
import { HealthCheckEntry as Entry } from '../types';
import ShowDiagnosis from './ShowDiagnosis';
import { Segment, Header, Icon } from 'semantic-ui-react';

interface Props {
    entry: Entry;
}

const HealthCheckEntry: React.FC<Props> = ({entry}) => {
    let heartColor = 'grey';
    switch (entry.healthCheckRating) {
        case 0:
            heartColor = 'green';
            break;
        case 1: 
            heartColor = 'yellow';
            break;
        case 2: 
            heartColor = 'red;';
            break;
        case 3: 
            heartColor = 'black';
            break;
        default:
            heartColor = 'grey';
    }
    
    return(
        <Segment>
            <Header as='h3'> {entry.date} <Icon name='user md'></Icon></Header>
             <i>{entry.description}</i> <br />
            <br /> 
            <Icon className={`heart ${heartColor}`} />
            {entry.diagnosisCodes && entry.diagnosisCodes.map((diagnosis,i) => (
               <span key={i}><ShowDiagnosis diagnosisCode={diagnosis}/></span>
            ))}
        </Segment>
    );
};

export default HealthCheckEntry;