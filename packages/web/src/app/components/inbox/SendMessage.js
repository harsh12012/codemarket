import React, { useState } from 'react';
import { Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import { MdSend } from 'react-icons/md';

export default function SendMessage2({ onSend }) {
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setDisabled(true);
      await onSend(message);
      setMessage('');
      setDisabled(false);
    } catch (error) {
      // console.log('Error', error);
      setDisabled(false);
    }
  };
  return (
    <div className="send-message container mb-0">
      <form onSubmit={onSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Type a message"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <InputGroup.Append>
            <Button
              disabled={message === '' ? true : false}
              style={{ pointerEvents: disabled ? 'none' : 'auto' }}
              type="submit"
              variant="primary">
              {disabled ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                <MdSend size={26} />
              )}
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </form>
    </div>
  );
}
