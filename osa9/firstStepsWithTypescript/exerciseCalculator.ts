interface excersizeResult {
    trainingDays?: number;
    periodLength?: number;
    success?: boolean;
    rating?: number;
    ratingDescription?: string;
    target?: number;
    average?: number;
};

const exerciseCalculator = (dailyHours: Array<number>): excersizeResult => {
    const results: excersizeResult = {};
    results.target = 2
    results.periodLength = dailyHours.length
    results.trainingDays = dailyHours.filter(day => day > 0).length;
    results.average = dailyHours.reduce((a, b) => a + b) / dailyHours.length;
    results.success = results.average > results.target;
    results.rating = results.success ? 3 : (results.average / results.target) > 0.5 ? 2 : 1
    switch (results.rating) {
        case 1:
            results.ratingDescription = "not good, try better!"
            break;
        case 2:
            results.ratingDescription = "not good, not terrible"
            break;
        case 3:
            results.ratingDescription = "good job!!"
    }
    return results;
};

// const excersizeHours: Array<number> = [3, 0, 2, 4.5, 0, 3, 1];
const values = process.argv.splice(2);
const input : Array<number> = values.map(i => Number(i));
console.log(exerciseCalculator(input));
