export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    name: string;
}

export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;