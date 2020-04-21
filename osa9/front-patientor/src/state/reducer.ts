import { State } from "./state";
import { Patient, FullPatient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }  
  | {
      type: "ADD_PATIENT_DATA";
      payload: FullPatient;
  }
  | {
    type: "SET_DIAGNOSIS_DATA";
    payload: Diagnosis[];
  };



export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_DATA":
      return {
        ...state,
        patientData: {
          ...state.patientData,
          [action.payload.id]: action.payload
        }
      };
      case "SET_DIAGNOSIS_DATA":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
              {}
            ),
            ...state.diagnoses
          }
        };
  
    
      default:
      return state;
    
  }
};

export const setPatientList = (patients: Patient []): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients
  };
};

export const addPatientData = (patient: FullPatient ): Action => {
  return {
    type: "ADD_PATIENT_DATA",
    payload: patient
  };
};


export const addPatient = (patient: Patient ): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const setDiagnosisData = (diagnoses: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_DATA',
    payload: diagnoses
  };
};