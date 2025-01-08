import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const PageLoad = () => {
  return (
    <>
    <div className="shimmer-component">
      <Container>
        <Row className="py-2">
          <Col xs={12}>
            <div className="d-flex" style={{ columnGap: "4px" }}>
              <div className="d-flex w-100" style={{ columnGap: "4px" }}>
                <div className="items" style={{ width: "100%", height: "36px", borderRadius: "8px" }}></div>
                <div className="items" style={{ width: "100%", height: "36px", borderRadius: "8px" }}></div>
                <div className="items" style={{ width: "100%", height: "36px", borderRadius: "8px" }}></div>
              </div>
              <div>
                <div className="items" style={{ width: "42px", height: "36px", borderRadius: "8px" }}></div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12}>
            <div className="items" style={{ width: "100%", height: "130px", borderRadius: "8px" }}></div>
            <div className="items mt-4" style={{ width: "220px", height: "24px", borderRadius: "8px" }}></div>
            <div className="items mt-2 mb-4" style={{ width: "110px", height: "32px", borderRadius: "8px" }}></div>
            <div className="items mb-3" style={{ width: "90px", height: "21px", borderRadius: "8px" }}></div>
          </Col>
        </Row>
        <Row className="px-2">
          <Col xs={6} className="px-1">
            <div className="items mb-4" style={{ width: "100%", height: "191px", borderRadius: "8px" }}></div>
          </Col>
          <Col xs={6} className="px-1">
            <div className="items mb-4" style={{ width: "100%", height: "191px", borderRadius: "8px" }}></div>
          </Col>
          <Col xs={6} className="px-1">
            <div className="items mb-4" style={{ width: "100%", height: "191px", borderRadius: "8px" }}></div>
          </Col>
          <Col xs={6} className="px-1">
            <div className="items mb-4" style={{ width: "100%", height: "191px", borderRadius: "8px" }}></div>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  )
};

export default PageLoad;