
import * as uuid from 'uuid';
import { Patient, PublicPatient, NewPatient, Entry, NewEntry } from '../types';
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

const addEntry = (id: string, entry: NewEntry): Entry => {
    const newEntry: Entry = {
        id: uuid.v4(),
        ...entry
    };
    patients.find(p=> p.id === id)?.entries.push(newEntry);
    return newEntry;
};

export default {
    getData, getNonSensitiveData: getPublicData, addPatient, getPatientById, addEntry
};