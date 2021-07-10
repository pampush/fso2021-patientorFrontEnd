import { useField } from 'formik';
import React from 'react';
import { Input } from 'semantic-ui-react';

interface CustomTextField {
  label: string;
  name: string;
  type: string;
}

interface CustomSelectProps {
  name: string;
  label: string;
  options: string[];
}

export function CustomTextField({ label, ...props }: CustomTextField) {
  const [field, meta] = useField(props.name);

  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <Input {...props} {...field} placeholder={label} fluid />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
}

export const CustomSelect = ({ options, ...props }: CustomSelectProps) => {
  const [field, meta] = useField(props.name);
  return (
    <React.Fragment>
      <label htmlFor={props.name}>{props.name}</label>
      <select {...field} {...props}>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <span className="lesson-form__select-error">{meta.error}</span>
      ) : null}
    </React.Fragment>
  );
};

interface NumberFieldProps {
  name: string;
  label: string;
  min?: number;
  max?: number;
}

export const NumberField = (props: NumberFieldProps) => {
  const [field, meta] = useField(props.name);
  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <Input type="number" {...props} {...field} fluid />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

// interface NumberProps {
//   label: string;
//   min?: number;
//   max?: number;
//   name: string;
// }

// export const NumberField = ({ label, ...props }: NumberProps) => {
//   const [field, meta] = useField(props.name);

//   return (
//     <>
//       <label htmlFor={props.name}>{label}</label>
//       <Input {...props} {...field} placeholder={label} fluid />
//       {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
//     </>
//   );
// };
