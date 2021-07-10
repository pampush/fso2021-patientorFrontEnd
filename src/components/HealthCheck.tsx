import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import { HealthCheckEntry } from '../dianosesTypes';

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  let hearthShapedRating: JSX.Element;
  switch (entry.healthCheckRating) {
    case 0:
      hearthShapedRating = <Icon name="heart" color="red" />;
      break;
    case 1:
      hearthShapedRating = <Icon name="heart" color="orange" />;
      break;
    case 2:
      hearthShapedRating = <Icon name="heart" color="yellow" />;
      break;
    case 3:
      hearthShapedRating = <Icon name="heart" color="green" />;
      break;
    default:
      hearthShapedRating = <></>;
  }

  return (
    <>
      <Header>
        {entry.date} <Icon name="assistive listening systems" />
      </Header>
      {entry.description}
      {hearthShapedRating}
    </>
  );
};

export default HealthCheck;
