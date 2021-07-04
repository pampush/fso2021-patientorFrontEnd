import { Patient, Gender } from '../types';

const parseText = (text: unknown): string => {
  if (!(text && isString(text))) throw new Error('Incorrect or missing text');
  return text;
};

function isString(text: unknown): text is string {
  return typeof text === 'string' || text instanceof String;
}

const parseGender = (gender: unknown): Gender => {
  if (!(gender && isString(gender) && isGender(gender)))
    throw new Error('Incorrect or missing gender');
  return gender;
};

function isGender(str: string): str is Gender {
  return Object.values(Gender).includes(str as Gender);
}

type Fields = {
  id: unknown;
  name: unknown;
  gender: unknown;
  occupation: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  entries: unknown;
};

export const toNewPatientEntry = (object: Fields): Patient => {
  const newEntry: Patient = {
    id: parseText(object.id),
    name: parseText(object.name),
    gender: parseGender(object.gender),
    occupation: parseText(object.occupation),
    dateOfBirth: parseText(object.dateOfBirth),
    ssn: parseText(object.ssn),
    entries: [],
  };

  return newEntry;
};
