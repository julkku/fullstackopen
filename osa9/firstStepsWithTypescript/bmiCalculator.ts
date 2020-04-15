

const calculateBmi = (cm: number, kg: number): string => {
    const height2: number = Math.pow(cm / 100, 2);
    const bmi: number = kg / height2;
    
    if (bmi >= 40) return "Obese Class III (Very severely obese)";
    else if (bmi >= 35) return "Obese Class II (Severely obese)";
    else if (bmi >= 30) return "Obese Class I (Moderately obese)";
    else if (bmi >= 25) return "Overweight";
    else if (bmi >= 18.5) return "Normal (healthy weight)";
    else if (bmi >= 16) return "Underweight";
    else if (bmi >= 15) return "Severely underweight";
    else return "Very severely underweight";
};

console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));

export default(calculateBmi);