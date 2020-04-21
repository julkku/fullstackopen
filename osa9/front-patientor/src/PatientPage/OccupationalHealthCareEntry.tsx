import React from 'react';
import { OccupationalHealthcareEntry as Entry } from '../types';
import ShowDiagnosis from './ShowDiagnosis';
import { Segment, Header, Icon } from 'semantic-ui-react';

interface Props {
    entry: Entry;
}

const HospitalEntry: React.FC<Props> = ({entry}) => {
    
    return(
        <Segment>
            <Header as='h3'> {entry.date} <Icon name='stethoscope'/>({entry.employerName})</Header>
             <i>{entry.description}</i> <br />
              <br /> 
            {entry.diagnosisCodes && entry.diagnosisCodes.map((diagnosis,i) => (
               <span key={i}><ShowDiagnosis diagnosisCode={diagnosis}/></span>
            ))}
        </Segment>
    );
};

export default HospitalEntry;