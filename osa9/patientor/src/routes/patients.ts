import express from 'express';
import { toNewPatient, toNewEntry } from '../utils';

import patientService from '../services/patientService';
const router = express.Router();

router.get('/', (_req, res)  => {
    res.send(patientService.getNonSensitiveData());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/:id', (req, res) => {
    const patient = patientService.getPatientById(req.params.id);
    res.send(patient);
});

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry(req.body);
        
        
        const entry = patientService.addEntry(req.params.id, newEntry);
        res.send(entry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;