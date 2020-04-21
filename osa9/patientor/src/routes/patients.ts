import express from 'express';
import { toNewPatient } from '../utils';

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

export default router;