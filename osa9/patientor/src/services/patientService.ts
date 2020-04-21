
import * as uuid from 'uuid';
import { Patient, PublicPatient, NewPatient } from '../types';
import patients from '../../data/patients';

const getData = (): Patient [] => {
    return patients;
};

const getPublicData = (): PublicPatient [] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
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

const getPatientById = (id: string): Patient => {
    const patient = patients.find(p => p.id === id);
    if(!patient) {
        throw new Error("patient does not exist");
    }

    return patient;
};

export default {
    getData, getNonSensitiveData: getPublicData, addPatient, getPatientById
};