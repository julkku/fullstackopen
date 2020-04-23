export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
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

export type HealthCheckTypes = "OccupationalHealthcare" | "HealthCheck" | "Hospital";

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: SickLeave;

}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type Entry =
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;

export interface Patient {
    id: string;
    dateOfBirth?: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
    name: string;
    entries?: Entry[];
}

export interface FullPatient {
  id: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  name: string;
  entries: Entry[];
}
