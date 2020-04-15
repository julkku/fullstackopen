import express from 'express';
const app = express();
import exerciseCalculator from './exerciseCalculator';
import bmiCalculator from './bmiCalculator';

app.use(express.json());


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

interface BmiResult {
    weight?: number;
    height?: number;
    bmi?: string;
}

app.get('/bmi', (req, res) => {
    const weight = req.query.weight;
    const height = req.query.height;
    console.log(weight, height);



    if (!weight || !height) {
        res.status(400).send({ error: "missing arguments!" });
    }

    if (isNaN(Number(weight)) || isNaN(Number(height))) {
        res.status(400).send({ error: "provided values were not numbers!" });
    }

    const result: BmiResult = {};
    result.weight = Number(weight);
    result.height = Number(height);
    result.bmi = bmiCalculator(result.height, result.weight);

    res.send(result);
});

app.post('/exercises', (req, res) => {
    // console.log(req.body.target);
    const exes = req.body.daily_exercises;
    const target = req.body.target;

    if (!exes || !target)
        res.status(400).send({ error: "parameters missing" });

    if (!Array.isArray(exes))
        res.status(400).send({ error: "daily_exercises not array" });
        
    if (isNaN(Number(target)))
        res.status(400).send({ error: "malformatted parameters" });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exes.forEach((day: any) => {
        if (isNaN(Number(day)))
            res.status(400).send({ error: "malformatted parameters" });
    });


    res.send(exerciseCalculator(exes, target));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});