import React from 'react';
import { Entry } from '../types';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthCareEntry from './OccupationalHealthCareEntry';
import HealthCheckEntry from './HealthCheckEntry';

interface Props {
    entry: Entry;
}

const PatientEntry: React.FC<Props> = ({entry}) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
            );
        };
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthCareEntry entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntry entry = {entry} />;
        default: 
            return assertNever(entry);
        }
};

export default PatientEntry;