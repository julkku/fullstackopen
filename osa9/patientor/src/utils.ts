import { NewPatient, Gender } from './types';
/* eslint-disable @typescript-eslint/no-explicit-any */

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (string: any, field: string): string => {
    if(!string || !isString(string)) {
        throw new Error(`Incorrect or missing ${field}: ${string}`);
    }
    return string;
};

const isDate = (date: string): boolean => {
    console.log(Date.parse(date));
    return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};




export const toNewPatient = (object: any): NewPatient => {
    const newPatientData: NewPatient = {
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        name: parseString(object.name, 'name'),
        occupation: parseString(object.occupation, 'occupation'),
        ssn: parseString(object.ssn, 'ssn')
    } ;
    return newPatientData;
};

