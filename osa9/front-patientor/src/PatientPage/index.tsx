import React from 'react';
import { FullPatient, Entry } from '../types';
import { useStateValue, addPatientData, addEntry } from '../state';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Header, Icon, Button } from 'semantic-ui-react';
import PatientEntry from './PatientEntry';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from "../AddEntryModal";



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

      const [modalOpen, setModalOpen] = React.useState<boolean>(false);
      const [error, setError] = React.useState<string | undefined>();
    
      const openModal = (): void => setModalOpen(true);
    
      const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
      };

      if(!patientData[id]) return(<div>loading...</div>);
      const patient = patientData[id];

      const SubmitNewEntry = async (values: EntryFormValues) => {
        console.log(values)
        try {
          const { data: newEntry } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${patient.id}/entries`,
            values
          );
          dispatch(addEntry(patient.id, newEntry));
          closeModal();
        } catch (e) {
          console.error(e.response.data);
          setError(e.response.data.error);
        }
      };
    


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
                  <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={SubmitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>

        </div>
    );
};

export default PatientPage;