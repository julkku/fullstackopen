import { NewPatient, Gender, NewEntry, HealthCheckRating } from './types';
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
        ssn: parseString(object.ssn, 'ssn'),
        entries: []
    } ;
    return newPatientData;
};


const parseType = (string: any): "HealthCheck" | "Hospital" | "OccupationalHealthcare" => {
    if(!string || !isString(string) 
    || !(string === 'HealthCheck' || string === 'OccupationalHealthcare' || string === 'Hospital')
    ) {
        throw new Error(`Incorrect or missing type: ${string}`);
    }
    return string;
}; 

const parseHealthCheckRating = (number: any): number => {
    
    if(!number && isNaN(Number(number))) {
        throw new Error("missing health check rating");
    }
    if(!Object.values(HealthCheckRating).includes(Number(number))) {
        throw new Error("invalid health check rating");
    }

    return Number(number);
};

export const toNewEntry = (object: any): NewEntry => {
    const type = parseType(object.type);
    const baseData = {
        date: parseDate(object.date),
        description: parseString(object.description, 'description'),
        specialist: parseString(object.specialist, 'specialist'),
        diagnosisCodes: object.diagnosisCodes
    };
    switch (type) {
        case 'HealthCheck':
            return {
                ...baseData, 
                type: type,
                healthCheckRating : parseHealthCheckRating(object.healthCheckRating)
            };
            
        case 'Hospital':
            if(!object.discharge) {
                throw new Error("missing discharge");
            }
            return {
            ...baseData, 
            type: type,
            discharge: object.discharge
        };
        case 'OccupationalHealthcare':
            if(!object.employerName) {
                throw new Error("missing employer name");
            }
            return {
                ...baseData,
                type: type,
                employerName: parseString(object.employerName, 'employer name'),
                sickLeave: object.sickLeave
            };
    }
};

