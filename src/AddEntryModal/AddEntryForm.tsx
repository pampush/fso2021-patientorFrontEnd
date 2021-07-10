import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Grid } from 'semantic-ui-react';

import FormFields from './FormFields';
import { Type } from '../dianosesTypes';
// FOrm field
interface Props {
  onSubmit: (values: EntryValues) => void;
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

function AddEntryForm({ onSubmit, onCancel }: Props) {
  // TODO: Change validation scheme on type change
  // const validationScheme

  // React.useEffect(() => {

  // })

  return (
    <Formik
      initialValues={{
        description: '',
        date: '2021-07-11',
        specialist: '',
        type: Type.HealthCheck,
        diagnosisCodes: [],
        health: { healthCheckRating: '' },
        occupational: { employerName: '', sickLeave: { startDate: '', endDate: '' } },
      }}
      onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Grid columns={16}>
            <FormFields />
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
