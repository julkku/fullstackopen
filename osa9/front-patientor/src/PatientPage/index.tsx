import React from 'react';
import { FullPatient } from '../types';
import { useStateValue, addPatientData } from '../state';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Header, Icon } from 'semantic-ui-react';
import PatientEntry from './PatientEntry';



const PatientPage: React.FC = () => {
    const [{ patientData }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {    
        const fetchPatientData = async () => {
          try {
            const { data: patientFromApi } = await axios.get<FullPatient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch(addPatientData(patientFromApi));
          } catch (e) {
            console.error(e);
          }
        };

        if (!patientData[id]) {
            fetchPatientData();
        }
        
        
      }, [dispatch, id, patientData]);

      if(!patientData[id]) return(<div>loading...</div>);

      const patient = patientData[id];
      const genderIcon = patient.gender === 'male' ? 'mars' : patient.gender === 'female' ? 'venus' : 'genderless'; 

    return(
        <div>
            <Header as="h3">{patient.name}<Icon name={genderIcon}/></Header>
            <div>
                ssn: {patient.ssn} <br/>
                occupation: {patient.occupation}
            </div>
            <Header as="h4">entries</Header>
            {patient.entries.map((entry, i) => (
              <div key={i}><PatientEntry entry = {entry}/></div>
            ))}
        </div>
    );
};

export default PatientPage;