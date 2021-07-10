import React from 'react';

type PropsArgs = {
  a: string;
  b: string;
};

interface Props {
  children: JSX.Element | JSX.Element[] | ((obj: PropsArgs) => JSX.Element);
}

interface InnerProps {
  name: string;
}

function Inner({ name }: InnerProps) {
  const [value, dispatch] = useField(name);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const a = e.target.value;
    console.log(a);

    dispatch({ type: 'TEST', payload: { name, value: a } });
  }
  return (
    <div>
      <input type="text" value={value.value} name={name} onChange={handleChange} />

      <button
        onClick={() => {
          console.log(value.value);
        }}>
        get
      </button>
    </div>
  );
}

interface OuterProps {
  children: JSX.Element;
  // reducer: (
  //   state: returnType,
  //   action: { type: 'TEST'; payload: { name: string; value: string } },
  // ) => returnType;
}

const initialState = {} as returnType;

const MiddleContext = React.createContext<
  [returnType, React.Dispatch<{ type: 'TEST'; payload: { name: string; value: string } }>]
>([initialState, () => initialState]);

interface returnType {
  [key: string]: {
    value: string;
    set: (a: string) => string;
  };
}

function closure(children: JSX.Element, initialInput: { [key: string]: string }): returnType {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const state = children.props.children.reduce((accum: { [key: string]: any }, next: any) => {
    let value = initialInput[next.props.name];

    function set(val: string): void {
      value = val;
    }

    return {
      ...accum,
      [next.props.name]: { set, value },
    };
  }, {}) as returnType;
  return state;
}

/** TODO: ADD onChange in hook */
const useField = (
  name: string,
): [
  { value: string; set: (a: string) => void },
  React.Dispatch<{
    type: 'TEST';
    payload: { name: string; value: string };
  }>,
] => {
  const [state, dispatch] = React.useContext(MiddleContext);
  return [state[name], dispatch];
};

const initialInput = {
  first: '',
  second: '',
};

const OuterContext = React.createContext<returnType>(initialState);

function OuterProvider({ children }: OuterProps) {
  const a = closure(children, initialInput);
  return <OuterContext.Provider value={a}>{children}</OuterContext.Provider>;
}

interface MiddleProps {
  children: JSX.Element[];
}

function Middle({ children }: MiddleProps) {
  const a = React.useContext(OuterContext);

  const [state, dispatch] = React.useReducer(reducer, a);

  return <MiddleContext.Provider value={[state, dispatch]}>{children}</MiddleContext.Provider>;
}

function reducer(
  state: returnType,
  action: { type: 'TEST'; payload: { name: string; value: string } },
): returnType {
  switch (action.type) {
    case 'TEST': {
      const newEntry = { ...state[action.payload.name], value: action.payload.value };

      return {
        ...state,
        [action.payload.name]: newEntry,
      };
    }
    default:
      return state;
  }
}

function Main() {
  return (
    <OuterProvider>
      <Middle>
        <Inner name="first" />
        <Inner name="second" />
      </Middle>
    </OuterProvider>
  );
}

function TestContainer(props: Props) {
  const a = 'hello',
    b = 'world';
  if (typeof props.children === 'function') return <div>{props.children({ a, b })}</div>;
  return <Main />;
}

export default TestContainer;
