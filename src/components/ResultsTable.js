// src/components/ResultsTable.js
import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const ResultsTable = ({ selectedPostcodeData, areas }) => {
  const isAreaGreen = (area) => {
    // Implement your logic to check if the area should be green
    // For example, you can check if the area exists in the selectedPostcodeData
    return selectedPostcodeData && selectedPostcodeData.idArea === area.idArea;
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col lg={12} className="mb-3">
          <Card>
            <Card.Header>
              <h3 className="mb-0">Areas</h3>
            </Card.Header>
            <Card.Body>
              {areas.length > 0 ? (
                <ListGroup variant="flush">
                  {areas.map((area) => (
                    <ListGroup.Item
                      key={`area_${area.idArea}`}
                      className={`${isAreaGreen(area) ? 'bg-success text-white' : 'bg-danger text-white'}`}
                    >
                      <strong>{area.StateName} ({area.StateAb})</strong> - {area.areaType} area
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-muted">No data available.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Copyright label */}
      <p
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          margin: '8px',
          color: '#777', // Adjust color as needed
        }}
      >
        Copyright Nucera 2024
      </p>
    </Container>
  );
};

export default ResultsTable;
