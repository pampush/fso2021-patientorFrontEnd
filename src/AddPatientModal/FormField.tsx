import React from 'react';
import { ErrorMessage, Field, FieldProps } from 'formik';
import { Form } from 'semantic-ui-react';
import { Gender } from '../types';

// structure of a single option
export interface TestOption<T> {
  value: T;
  label: string;
}

// props for select field component
type SelectFieldProps<T> = {
  name: string;
  label: string;
  options: TestOption<T>[];
};

interface genericFn<T> {
  (args: SelectFieldProps<T>): JSX.Element;
}

function SelectField<T extends string>({ name, label, options }: SelectFieldProps<T>) {
  return (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );
}

export const Test: genericFn<Gender> = SelectField;

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

