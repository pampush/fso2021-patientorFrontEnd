import React from 'react';
import { useParams } from 'react-router-dom';
import { Icon, Card, Button } from 'semantic-ui-react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

import { Patient } from '../types';
import { EntryValues } from '../AddEntryModal/AddEntryForm';

import { toNewPatientEntry } from '../utils/patient';
//eslint-disable-next-line @typescript-eslint/no-unused-vars
import { addEntry, addPublicPatient, useStateValue } from '../state';
import EntryCard from './EntryCard';
import AddEntryModal from '../AddEntryModal';
//eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entry, Type } from '../dianosesTypes';

function PatientCard() {
  const [{ publicPatients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModelOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (publicPatients[id] !== undefined) return;
    async function getById(id: string) {
      const response = await axios.get(`${apiBaseUrl}/patients/${id}`);

      const receivedPatient = toNewPatientEntry(response.data);
      dispatch(addPublicPatient(receivedPatient));
    }

    void getById(id);
  }, []);

  const handleModalOpen = () => {
    setModelOpen(true);
  };

  const handleSubmit = async (values: EntryValues) => {
    let payload: {
      description: string;
      date: string;
      type: Type;
      specialist: string;
      diagnosisCodes: string[];
      healthCheckRating?: string;
      employerName?: string;
      sickLeave?: {
        startDate: string;
        endDate: string;
      };
    } = {
      description: values.description,
      date: values.date,
      type: values.type,
      specialist: values.type,
      diagnosisCodes: values.diagnosisCodes,
    };

    switch (values.type) {
      case Type.HealthCheck:
        payload = { ...payload, healthCheckRating: values.health.healthCheckRating };
        break;
      case Type.OccupationalHealthCare:
        payload = {
          ...payload,
          employerName: values.occupational.employerName,
          sickLeave: {
            startDate: values.occupational.sickLeave.startDate,
            endDate: values.occupational.sickLeave.endDate,
          },
        };
        break;

      default:
        break;
    }

    const { data: addedEntry } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      payload,
    );

    dispatch(addEntry({ id, entry: addedEntry }));
    setModelOpen(false);
  };

  function matchGender(entry: Patient | undefined) {
    switch (entry?.gender) {
      case 'male':
        return <Icon name="mars" />;
      case 'female':
        return <Icon name="venus" />;
      case 'other':
        return <Icon name="heart" />;
      default:
        return null;
    }
  }

  return (
    <div>
      <Button onClick={handleModalOpen} color="teal">
        Add entry
      </Button>
      <AddEntryModal
        open={modalOpen}
        onClose={() => setModelOpen(false)}
        onSubmit={handleSubmit}></AddEntryModal>
      <Card>
        <Card.Content>
          <Card.Header>{publicPatients[id]?.name}</Card.Header>
          <Card.Meta>
            {publicPatients[id]?.occupation ? (
              <span>occupation: {publicPatients[id].occupation}</span>
            ) : null}
          </Card.Meta>
          <Card.Description>
            {publicPatients[id]?.ssn ? <>ssn: {publicPatients[id].ssn}</> : null}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>{matchGender(publicPatients[id])}</Card.Content>
      </Card>
      <Card.Group>
        {publicPatients[id]?.entries.map((item) => (
          <EntryCard key={item.id} item={item} />
        ))}
      </Card.Group>
    </div>
  );
}

export default PatientCard;
