import React from 'react';
import { HospitalEntry as HospitalEntryType } from '../types';
import ShowDiagnosis from './ShowDiagnosis';
import { Segment, Header, Icon } from 'semantic-ui-react';

interface Props {
    entry: HospitalEntryType;
}

const HospitalEntry: React.FC<Props> = ({entry}) => {
    
    return(
        <Segment>
            <Header as='h3'> {entry.date} <Icon name='hospital'></Icon></Header>
             <i>{entry.description}</i> <br />
             <b>Discharge: </b> {entry.discharge.date} ({entry.discharge.criteria}) <br /> 
            {entry.diagnosisCodes && entry.diagnosisCodes.map((diagnosis,i) => (
               <span key={i}><ShowDiagnosis diagnosisCode={diagnosis}/></span>
            ))}
        </Segment>
    );
};

export default HospitalEntry;