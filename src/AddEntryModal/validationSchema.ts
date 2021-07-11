import * as yup from 'yup';
import { Type } from '../dianosesTypes';

const common = {
  description: yup
    .string()
    .typeError('Description should be a string')
    .max(500, 'Description should have less than 500 symbols')
    .required('Specify description'),
  date: yup
    .string()
    .typeError('Date should be a string')
    .max(10, 'Incorrect date')
    .required('Specify date'),
  specialist: yup
    .string()
    .typeError('Specialist field should be a string')
    .max(100, 'Specialist should have less than 100 symbols')
    .required('Specify specialist'),
  type: yup
    .mixed()
    .typeError('Type field should be a string')
    .oneOf(Object.values(Type), 'Type should have a proper type')
    .required('Specify type'),
  diagnosisCodes: yup.array().of(yup.string().max(10, 'Incorrect diagnosis code')),
};

const schema = [
  yup.object().shape({
    ...common,
    health: yup.object({
      healthCheckRating: yup
        .number()
        .min(0, 'Incorrect health Check Rating')
        .max(3, 'Incorrect health Check Rating')
        .required('Specify health Check Rating'),
    }),
  }),

  yup.object().shape({
    ...common,
    occupational: yup.object({
      employerName: yup
        .string()
        .typeError('Employer name should be a string')
        .max(100, 'Incorrect employer name')
        .required('Specify employer name'),
      sickLeave: yup.object({
        startDate: yup.string().max(10, 'Incorrect date'),
        endDate: yup.string().max(10, 'Incorrect date'),
      }),
    }),
  }),
];

export default schema;
