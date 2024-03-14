import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import './Dropdown.css';

const Dropdown = ({ onSelect }) => {
  const [selectedPostcode, setSelectedPostcode] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');
  const [postcodes, setPostcodes] = useState([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      onSelect(debouncedInput);
    }, 300);

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
    const input = event.target.value;
    if (input.length <= 4) {
      setSelectedPostcode(input);
      setDebouncedInput(input);
    }
  };

  return (
    <Form>
      <Form.Group controlId="postcodeDropdown" className="custom-dropdown">
        <Form.Label className="label">Select Postcode:</Form.Label>
        <div className="autocomplete">
          <input
            type="text"
            value={selectedPostcode}
            onChange={handlePostcodeChange}
            placeholder="Type the Post Code"
            className="search-box"
          />
        </div>
      </Form.Group>
    </Form>
  );
};

export default Dropdown;
