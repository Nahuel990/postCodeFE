// src/components/Tables.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Alert, Row, Col } from 'react-bootstrap';
import './Tables.css'; // Import your custom styles

const Tables = ({ postcode }) => {
  const [allIndustries, setAllIndustries] = useState([]);
  const [allAreas, setAllAreas] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [stateName, setStateName] = useState('');
  const [showHospitalityDetails, setShowHospitalityDetails] = useState(false);

  useEffect(() => {
    // Fetch all industries and areas
    axios.get('http://localhost:3001/industries')
      .then((response) => {
        setAllIndustries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get('http://localhost:3001/areas')
      .then((response) => {
        setAllAreas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch industries and areas based on the selected postcode
    if (postcode) {
      axios.get(`http://localhost:3001/postcode/${postcode}`)
        .then((response) => {
          const { industries, areas, stateName } = response.data;
          setSelectedIndustries(industries);
          setSelectedAreas(areas);
          setStateName(stateName);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [postcode]);

  const isIndustrySelected = (industry) => selectedIndustries.includes(industry);
  const isAreaSelected = (area) => selectedAreas.includes(area);

  const handleHospitalityClick = () => {
    setShowHospitalityDetails(!showHospitalityDetails);
  };

  return (
    <div className="mt-4 tables-container">
      {postcode ? (
        <>
          <Row className="mt-4">
            <Col>
              <h5>State: {stateName}</h5> 
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              {allIndustries.length > 0 ? (
                <Table striped bordered hover className="custom-table">
                  <thead>
                    <tr>
                      <th>Industries</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allIndustries.map((industry, index) => (
                      <tr key={index} className={`industry-row ${isIndustrySelected(industry.IndustryName) ? 'table-success' : 'table-danger'}`}>
                        <td onClick={industry.IndustryName === 'Tourism and Hospitality' ? handleHospitalityClick : null}>
                          {industry.IndustryName}
                          {industry.IndustryName === 'Tourism and Hospitality' && showHospitalityDetails && (
                            <ul>
                              <li>Tourist guides and operators</li>
                              <li>Outdoor adventure or activity instructors</li>
                              <li>Tourist transport services</li>
                              <li>Gallery or museum managers, curators or guides</li>
                              <li>Hospitality workers, such as in hotels or other accommodation facilities, restaurants, cafes, bars and casinos</li>
                              <li>Conference and event organisers</li>
                            </ul>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info">No industries available.</Alert>
              )}
            </Col>
            <Col>
              {allAreas.length > 0 ? (
                <Table striped bordered hover className="custom-table">
                  <thead>
                    <tr>
                      <th>Areas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allAreas.map((area, index) => (
                      <tr key={index} className={`area-row ${isAreaSelected(area.areaType) ? 'table-success' : 'table-danger'}`}>
                        <td>{area.areaType}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info">No areas available.</Alert>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row className="mt-4">
            <Col>
              <h5>State:</h5>
              <p>{stateName}</p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              {allIndustries.length > 0 ? (
                <Table striped bordered hover className="custom-table">
                  <thead>
                    <tr>
                      <th>Industries</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allIndustries.map((industry, index) => (
                      <tr key={index} className="industry-row">
                        <td>{industry.IndustryName}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info">No industries available.</Alert>
              )}
            </Col>
            <Col>
              {allAreas.length > 0 ? (
                <Table striped bordered hover className="custom-table">
                  <thead>
                    <tr>
                      <th>Areas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allAreas.map((area, index) => (
                      <tr key={index} className="area-row">
                        <td>{area.areaType}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info">No areas available.</Alert>
              )}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Tables;
