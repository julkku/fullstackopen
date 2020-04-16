import patientData from '../../data/patients.json';
import * as uuid from 'uuid';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
const patients: Array<Patient> = patientData;

const getData = (): Array<Patient> => {
    return patients;
};

const getNonSensitiveData = (): NonSensitivePatient [] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( patient: NewPatient ): Patient => {
    const newPatient: Patient = {
        id: uuid.v4(),
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getData, getNonSensitiveData, addPatient
};