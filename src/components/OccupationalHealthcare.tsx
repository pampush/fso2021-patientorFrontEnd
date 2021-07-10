import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { OccupationalHealthCareEntry } from '../dianosesTypes';

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthCareEntry }> = ({ entry }) => {
  return (
    <>
      <Header className="header__container">
        {entry.date} <Icon name="osi" size="big" />
        <b>{entry.employerName}</b>
      </Header>
      {entry.description}
    </>
  );
};

export default OccupationalHealthcare;
