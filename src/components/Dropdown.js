import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import './Dropdown.css';

const Dropdown = ({ onSelect }) => {
  const [postcodes, setPostcodes] = useState([]);
  const [selectedPostcode, setSelectedPostcode] = useState('');

  // Debouncing input changes
  const [debouncedInput, setDebouncedInput] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      onSelect(debouncedInput);
    }, 300); // Adjust the delay as needed

    return () => clearTimeout(delay);
  }, [debouncedInput, onSelect]);

  useEffect(() => {
    // Fetch all postcodes
    axios.get('http://localhost:3001/postcodes')
      .then((response) => {
        setPostcodes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePostcodeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPostcode(selectedValue);
    setDebouncedInput(selectedValue);
  };

  const memoizedPostcodes = useMemo(() => postcodes, [postcodes]);

  return (
    <Form>
      <Form.Group controlId="postcodeDropdown" className="custom-dropdown">
        <Form.Label>Select Postcode:</Form.Label>
        <Form.Control as="select" value={selectedPostcode} onChange={handlePostcodeChange}>
          <option value="">-- Select Postcode --</option>
          {memoizedPostcodes.map((postcode) => (
            <option key={postcode.postCode} value={postcode.postCode}>
              {postcode.postCode}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default Dropdown;
