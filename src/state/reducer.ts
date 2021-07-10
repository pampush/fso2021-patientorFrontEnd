import { State } from './state';
import { Diagnosis, Patient } from '../types';
import { Entry } from '../dianosesTypes';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'ADD_PUBLIC_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSES_LIST';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_ENTRY';
      payload: {
        id: string;
        entry: Entry;
      };
    };

export const addPatientList = (payload: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload,
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload,
  };
};

export const addPublicPatient = (payload: Patient): Action => {
  return {
    type: 'ADD_PUBLIC_PATIENT',
    payload,
  };
};

export const addDiagnosesList = (payload: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES_LIST',
    payload,
  };
};

export const addEntry = (payload: { id: string; entry: Entry }): Action => {
  return {
    type: 'ADD_ENTRY',
    payload,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce((memo, patient) => ({ ...memo, [patient.id]: patient }), {}),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'ADD_PUBLIC_PATIENT':
      return {
        ...state,
        publicPatients: {
          ...state.publicPatients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSES_LIST': {
      const newState = action.payload.map((diagnosis) => ({ [diagnosis.code]: diagnosis }));
      const test = Object.assign({}, ...newState) as { [code: string]: Diagnosis };
      return {
        ...state,
        diagnoses: test,
      };
    }
    case 'ADD_ENTRY': {
      const newEntries = state.publicPatients[action.payload.id].entries.concat(
        action.payload.entry,
      );
      const newPublicPatient = { ...state.publicPatients[action.payload.id], entries: newEntries };
      const newPublicPatients = { ...state.publicPatients, [action.payload.id]: newPublicPatient };
      return {
        ...state,
        publicPatients: newPublicPatients,
      };
    }
    default:
      return state;
  }
};
