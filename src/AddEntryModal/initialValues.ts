import { Type } from '../dianosesTypes';
import { EntryValues } from './AddEntryForm';

const initialValues: EntryValues = {
  description: '',
  date: '2021-07-11',
  specialist: '',
  type: Type.HealthCheck,
  diagnosisCodes: [],
  health: { healthCheckRating: '0' },
  occupational: { employerName: '', sickLeave: { startDate: '', endDate: '' } },
};

export default initialValues;
