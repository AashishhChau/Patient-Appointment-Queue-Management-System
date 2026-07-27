import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaCalendarCheck, FaUserMd, FaClock, FaArrowRight, FaShieldAlt } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../config";
import img from "../Images/doctor.png";
import Contact from "./contact/Contact";
import "./Home.css";

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/doctors`);
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section py-5 mb-5">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div className="hero-content pe-lg-3">
                {/* Modern subtle badge */}
                <div className="hero-badge-container mb-3">
                  <span className="hero-badge">
                    <FaShieldAlt className="badge-icon" /> Verified Healthcare Network
                  </span>
                </div>
                
                <h1 className="hero-title mb-4">
                  Your Health, Our Priority. <br />
                  <span className="text-teal">Book Doctors Effortlessly.</span>
                </h1>
                
                <p className="hero-subtitle mb-4">
                  Connect with top-rated medical specialists, manage your appointments seamlessly, 
                  and take control of your health journey today.
                </p>

                {/* Primary CTA */}
                <div className="d-flex align-items-center">
                  <Link to="/register" className="text-decoration-none">
                    <Button className="btn-hero-primary btn-lg rounded-pill px-4 py-3 d-inline-flex align-items-center gap-2">
                      <span>Book Your Appointment</span>
                      <FaArrowRight className="cta-arrow" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>

            <Col lg={6} className="text-center">
              <div className="hero-image-container">
                <img
                  src={img}
                  alt="Healthcare Professional"
                  className="img-fluid hero-image"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Feature Highlights */}
      <section className="features-section mb-5">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <Card className="feature-card h-100 border-0 p-3 text-center">
                <Card.Body>
                  <div className="feature-icon-box mb-3 mx-auto">
                    <FaCalendarCheck />
                  </div>
                  <Card.Title className="fw-bold mb-2">Easy Booking</Card.Title>
                  <Card.Text className="text-muted">
                    Schedule consultations in just a few clicks. Pick the specialist, date, and time that fits your schedule.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="feature-card h-100 border-0 p-3 text-center">
                <Card.Body>
                  <div className="feature-icon-box mb-3 mx-auto">
                    <FaUserMd />
                  </div>
                  <Card.Title className="fw-bold mb-2">Verified Specialists</Card.Title>
                  <Card.Text className="text-muted">
                    Access experienced medical professionals across various specialties, all thoroughly vetted.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="feature-card h-100 border-0 p-3 text-center">
                <Card.Body>
                  <div className="feature-icon-box mb-3 mx-auto">
                    <FaClock />
                  </div>
                  <Card.Title className="fw-bold mb-2">Instant Management</Card.Title>
                  <Card.Text className="text-muted">
                    Effortlessly view, reschedule, or manage your upcoming consultations anytime from your dashboard.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Doctors Showcase */}
      <section className="doctors-section py-5 mb-5">
        <Container>
          <div className="text-center mb-5">
            <span className="subtitle-badge">Medical Experts</span>
            <h2 className="section-title mt-2">Meet Our Qualified Doctors</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
              Our team of dedicated healthcare professionals is ready to provide personalized care for you and your family.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-teal" role="status">
                <span className="visually-hidden">Loading doctors...</span>
              </div>
            </div>
          ) : (
            <Row className="g-4">
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <Col key={doctor.id} md={6} lg={4}>
                    <Card className="doctor-card h-100 border-0 shadow-sm">
                      <Card.Body className="p-4 d-flex flex-column">
                        <div className="d-flex align-items-center mb-3">
                          <div className="doctor-avatar me-3">
                            {doctor.User?.name ? doctor.User.name.charAt(0) : "D"}
                          </div>
                          <div>
                            <Card.Title className="mb-0 fw-bold">{doctor.User?.name}</Card.Title>
                            <span className="specialization-badge mt-1 d-inline-block">
                              {doctor.specialization}
                            </span>
                          </div>
                        </div>

                        <div className="doctor-details text-muted mb-4 flex-grow-1">
                          <div className="d-flex justify-content-between mb-1">
                            <span>Experience:</span>
                            <strong className="text-dark">{doctor.experience} Years</strong>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span>Qualifications:</span>
                            <strong className="text-dark">{doctor.qualifications}</strong>
                          </div>
                        </div>

                        <Link to="/login" className="w-100 mt-auto">
                          <Button className="btn-teal w-100 py-2 fw-semibold">
                            Book Appointment
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col className="text-center py-4">
                  <div className="empty-state p-5 rounded-4 bg-white shadow-sm">
                    <p className="text-muted mb-0">No medical specialists are currently available.</p>
                  </div>
                </Col>
              )}
            </Row>
          )}
        </Container>
      </section>

      {/* Embedded Contact Section */}
      <section className="home-contact-section">
        <Contact />
      </section>
    </div>
  );
};

export default Home;