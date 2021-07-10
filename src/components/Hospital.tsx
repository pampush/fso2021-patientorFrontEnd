import React from 'react';
import { Icon, Header } from 'semantic-ui-react';
import { HospitalEntry } from '../dianosesTypes';

type HospitalProps = {
  entry: HospitalEntry;
};

function Hospital({ entry }: HospitalProps) {
  return (
    <>
      <Header as="h3">
        {entry.date} <Icon name="doctor" size="big" />
      </Header>
      {entry.description}
    </>
  );
}

export default Hospital;
