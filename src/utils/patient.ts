import { Entry, Type } from '../dianosesTypes';
import { Patient, Gender } from '../types';

export const parseText = (text: unknown): string => {
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

const parseEntry = (entries: unknown): Entry[] => {
  if (!isEntry(entries)) throw new Error('Incorrect or missing entry');
  return entries;
};

export const parseType = (type: unknown): Type => {
  if (!(type && isType(type))) throw new Error('Incorrect or missing entry');
  return type;
};

const isType = (type: unknown): type is Type => {
  return Object.values(Type).includes(type as Type);
};

function isEntry(entries: any): entries is Entry[] {
  if (entries.length === 0) return true;
  return Object.values(Type).includes(entries[0].type as Type);
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
    entries: parseEntry(object.entries),
  };

  return newEntry;
};
