import express from 'express';

import patientService from '../services/patientService';
const router = express.Router();

router.get('/', (_req, res)  => {
    res.send(patientService.getNonSensitiveData());
});

router.post('/', (req, res) => {
    const { dateOfBirth, ssn, gender, occupation, name } = req.body;
    const newPatient = patientService.addPatient({
        dateOfBirth, ssn, gender, occupation, name
    }

    );
    res.json(newPatient);
});

export default router;