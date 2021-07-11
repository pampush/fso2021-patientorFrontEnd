import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { Button, Grid } from 'semantic-ui-react';

import FormFields from './FormFields';
import { Type } from '../dianosesTypes';
import initialValues from './initialValues';
import validationSchema from './validationSchema';

interface FormProps {
  onSubmit: (values: EntryValues, helpers: FormikHelpers<EntryValues>) => void;
  onCancel: () => void;
}

export interface EntryValues {
  description: string;
  date: string;
  specialist: string;
  type: Type;
  diagnosisCodes: string[];
  health: { healthCheckRating: string };
  occupational: { employerName: string; sickLeave: { startDate: string; endDate: string } };
}

function AddEntryForm({ onSubmit, onCancel }: FormProps) {
  const [currentType, setCurrentType] = React.useState<Type>(Type.HealthCheck);
  const [indexOfValidationSchema, setIndexOfValidationSchema] = React.useState<number>(0);

  React.useEffect(() => {
    switch (currentType) {
      case Type.HealthCheck:
        setIndexOfValidationSchema(0);
        break;
      case Type.OccupationalHealthCare:
        setIndexOfValidationSchema(1);
        break;
      default:
        break;
    }
  }, [currentType]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema[indexOfValidationSchema]}
      onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Grid columns={16}>
            <FormFields currentType={currentType} setCurrentType={setCurrentType} />
          </Grid>
          <Grid>
            <Grid.Column floated="left" width={5}>
              <Button type="button" onClick={onCancel} color="red">
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Button type="submit" floated="right" color="green" disabled={isSubmitting}>
                Add
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default AddEntryForm;
