export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healty" = 0, 
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;

}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface Discharge {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
    id: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    name: string;
    entries: Entry[];
}

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
export type NewPatient = Omit<Patient, 'id'>;
export type NewEntry = 
  | Omit<HospitalEntry, 'id'>
  | Omit<OccupationalHealthcareEntry, 'id'>
  | Omit<HealthCheckEntry, 'id'>;