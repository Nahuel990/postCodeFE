// src/App.js
import React, { useState } from 'react';
import Dropdown from './components/Dropdown';
import Tables from './components/Tables';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import the CSS file

function App() {
  const [selectedPostcode, setSelectedPostcode] = useState('');

  const handlePostcodeSelect = (postcode) => {
    setSelectedPostcode(postcode);
  };

  return (
    <div className="App">
      <div className="container mt-4"> {/* Added container class */}
        <h1>Postcode Validator</h1>
        <Dropdown onSelect={handlePostcodeSelect} />
        <Tables striped bordered hover className="custom-table rounded-circle" postcode={selectedPostcode} />
      </div>
    </div>
  );
}

export default App;
