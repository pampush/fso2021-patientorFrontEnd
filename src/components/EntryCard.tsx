import React from 'react';
import { List, Card } from 'semantic-ui-react';
import { Entry } from '../dianosesTypes';
import { useStateValue } from '../state';

import Hospital from './Hospital';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealthcare';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

type EntryProps = {
  item: Entry;
};

function EntryCard({ item }: EntryProps) {
  const [{ diagnoses }] = useStateValue();

  function matchEntry(entry: Entry) {
    switch (entry.type) {
      case 'Hospital':
        return <Hospital entry={entry} />;
      case 'HealthCheck':
        return <HealthCheck entry={entry} />;
      case 'OccupationalHealthCare':
        return <OccupationalHealthcare entry={entry} />;
      default:
        return assertNever(entry);
    }
  }

  return (
    <Card fluid key={item.id} className="card__container">
      {matchEntry(item)}
      <List bulleted>
        {item.diagnosisCodes?.map((diag) => {
          return (
            <List.Item key={diag}>
              {diag} {diagnoses[diag]?.name}
            </List.Item>
          );
        })}
      </List>
    </Card>
  );
}

export default EntryCard;
