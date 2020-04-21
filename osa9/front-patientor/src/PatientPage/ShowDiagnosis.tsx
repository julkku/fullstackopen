import React from 'react';
import { useStateValue } from '../state';

interface Props {
    diagnosisCode: string;
}

const ShowDiagnosis: React.FC<Props> = ({diagnosisCode}) => {
    const [{ diagnoses }] = useStateValue();
    const diagnosis = diagnoses[diagnosisCode];
    
    
    return(
        <div>
            {diagnosis && <li><b>{diagnosis.code}</b> {diagnosis.name}</li> } 
        </div>
    );
};

export default ShowDiagnosis;