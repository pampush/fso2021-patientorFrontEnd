import React from 'react';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import { Icon, Card } from 'semantic-ui-react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { toNewPatientEntry } from '../utils/patient';
//import { useStateValue } from '../state';

function PatientCard() {
  //const [{ patients }] = useStateValue();
  const [patient, setPatient] = React.useState<Patient>();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    async function getById(id: string) {
      console.log('ok');
      const response = await axios.get(`${apiBaseUrl}/patients/${id}`);
      const receivedPatient = toNewPatientEntry(response.data);
      setPatient(receivedPatient);
    }

    void getById(id);
  }, []);

  //const filteredPatient = Object.values(patients).find((item) => item.id === id);

  function matchGender(entry: Patient | undefined) {
    switch (entry?.gender) {
      case 'male':
        return <Icon name="mars" />;
      case 'female':
        return <Icon name="venus" />;
      default:
        return null;
    }
  }

  return (
    <div>
      <Card
        header={patient?.name}
        meta={patient?.occupation ? <span>occupation: {patient.occupation}</span> : null}
        description={patient?.ssn ? <span>ssn: {patient.ssn}</span> : null}
        extra={matchGender(patient)}
      />
    </div>
  );
}

export default PatientCard;
