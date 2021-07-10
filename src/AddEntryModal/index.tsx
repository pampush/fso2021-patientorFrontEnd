import React from 'react';

import { Modal } from 'semantic-ui-react';

import { EntryValues } from './AddEntryForm';

import AddEntryForm from './AddEntryForm';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: EntryValues) => void;
}

function AddEntryModal({ open, onClose, onSubmit }: Props) {
  return (
    <Modal open={open} onClose={onClose} closeIcon>
      <Modal.Header>Add new entry</Modal.Header>
      <Modal.Content>
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );
}

export default AddEntryModal;
