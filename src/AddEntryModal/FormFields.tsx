import React from 'react';
import { Dropdown, Form, Grid, Header } from 'semantic-ui-react';
import { useField, useFormikContext } from 'formik';

import { Diagnosis } from '../types';
import { useStateValue } from '../state';
import { Type } from '../dianosesTypes';

import { CustomTextField, NumberField } from '../components/CustomInput';
import { parseType } from '../utils/patient';

interface FormField {
  currentType: string;
  setCurrentType: (a: Type) => void;
}

function FormFields({ currentType, setCurrentType }: FormField) {
  const [{ diagnoses }] = useStateValue();

  function dynamicFields() {
    switch (currentType) {
      case Type.HealthCheck:
        return (
          <Form.Field>
            <NumberField label="health rating" name="health[healthCheckRating]" min={0} max={3} />
          </Form.Field>
        );
      case Type.OccupationalHealthCare:
        return (
          <Form.Field>
            <CustomTextField type="text" label="Employer name" name="occupational[employerName]" />

            <Header as="h4">Sick Leave</Header>
            <Grid>
              <Grid.Column width={8}>
                <CustomTextField
                  type="date"
                  label="start date"
                  name="occupational[sickLeave][startDate]"
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <CustomTextField
                  type="date"
                  label="end date"
                  name="occupational[sickLeave][endDate]"
                />
              </Grid.Column>
            </Grid>
          </Form.Field>
        );
      default:
        break;
    }
  }

  return (
    <Grid.Column width={16}>
      <Form>
        <Form.Field>
          <CustomTextField name="description" label="Description" type="text" />
        </Form.Field>
        <Form.Field>
          <CustomTextField name="date" label="Date" type="date" />
        </Form.Field>
        <Form.Field>
          <CustomTextField name="specialist" label="Specialist" type="text" />
        </Form.Field>
        <Form.Field>
          <DiagnosisSelection name="diagnosisCodes" label="Diagnoses" diagnoses={diagnoses} />
        </Form.Field>
        <Form.Field>
          <TypeSelection
            name="type"
            label="Type"
            types={Object.values(Type)}
            setCurrentType={setCurrentType}
          />
        </Form.Field>
        {dynamicFields()}
      </Form>
    </Grid.Column>
  );
}

interface TypeSelectionProps {
  name: string;
  label: string;
  types: string[];
  setCurrentType: (type: Type) => void;
}

export const TypeSelection = ({ setCurrentType, ...props }: TypeSelectionProps) => {
  const [field] = useField(props.name);
  const { setFieldValue, setFieldTouched, resetForm } = useFormikContext();
  const stateOptions = props.types.map((type) => ({
    key: type,
    text: type,
    value: type,
  }));

  return (
    <>
      <label>Types</label>
      <Dropdown
        fluid
        selection
        {...props}
        {...field}
        onChange={(e, data) => {
          resetForm();
          setFieldValue(props.name, data.value);
          const str = parseType(data.value);
          setCurrentType(str);
        }}
        onBlur={() => setFieldTouched(props.name, true, false)}
        options={stateOptions}
      />
    </>
  );
};

interface DiagnosisSelectionProps {
  diagnoses: {
    [key: string]: Diagnosis;
  };
  name: string;
  label: string;
}

export const DiagnosisSelection = ({ diagnoses, ...props }: DiagnosisSelectionProps) => {
  const [field] = useField(props.name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const options = Object.values(diagnoses).map((item) => ({
    key: item.code,
    text: `${item.code} - ${item.name}`,
    value: item.code,
  }));

  return (
    <>
      <label htmlFor={props.name}>Diagnoses</label>
      <Dropdown
        fluid
        selection
        multiple
        {...props}
        {...field}
        options={options}
        onChange={(evt, data) => {
          setFieldValue(props.name, data.value);
        }}
        onBlur={() => setFieldTouched(props.name, true, false)}
      />
    </>
  );
};

export default FormFields;
