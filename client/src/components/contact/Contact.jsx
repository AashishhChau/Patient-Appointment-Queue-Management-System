import React, { useState } from 'react';
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, 
  FaPaperPlane, FaAmbulance, FaSpinner, FaChevronDown 
} from 'react-icons/fa';
import { Container, Row, Col, Card, Form, Button, Accordion } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneNumber = '+977-97xxxxxxxx';
  const emergencyNumber = '102 / +977-1-4xxxxxx';
  const emailAddress = 'admin@example.com';
  const secondaryEmail = 'patient@example.com';
  const hospitalAddress = 'ABC Hospital, New Baneshwor, Kathmandu';
  const googleMapsLink = 'https://www.google.com/maps/search/?api=1&query=Civil+Hospital+New+Baneshwor+Kathmandu';

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="contact-page-wrapper py-5">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-5 header-section">
          <span className="subtitle-badge">Get In Touch</span>
          <h1 className="display-5 fw-bold page-title mt-2">Contact Our Healthcare Team</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '640px' }}>
            Have questions about appointments, general consultations, or medical services? Send us a message or contact us directly.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="emergency-banner mb-5 p-4 rounded-4 text-center text-md-start d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="d-flex align-items-center mb-3 mb-md-0 gap-3">
            <div className="emergency-icon-box">
              <FaAmbulance size={28} />
            </div>
            <div>
              <h5 className="mb-1 text-danger fw-bold">Medical Emergency?</h5>
              <p className="mb-0 text-muted">For immediate critical care or emergency assistance, call our 24/7 hotline.</p>
            </div>
          </div>
          <a href={`tel:${emergencyNumber}`} className="btn btn-danger btn-lg rounded-pill px-4 fw-bold shadow-sm">
            Call Emergency: {emergencyNumber}
          </a>
        </div>
        
        {/* Contact Info Cards */}
        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="h-100 contact-card border-0" onClick={() => window.location.href = `tel:${phoneNumber}`} role="button">
              <Card.Body className="p-4 text-center d-flex flex-column align-items-center">
                <div className="icon-container mb-3">
                  <FaPhone className="contact-icon" />
                </div>
                <Card.Title className="fw-bold mb-2 title-text">Call Us</Card.Title>
                <div className="card-info text-muted">
                  <span className="fw-semibold text-dark">{phoneNumber}</span>
                  <div className="mt-2 text-sm d-flex align-items-center justify-content-center gap-1 opacity-75">
                    <FaClock size={12} /> Mon-Fri: 9am-5pm
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 contact-card border-0">
              <Card.Body className="p-4 text-center d-flex flex-column align-items-center">
                <div className="icon-container mb-3">
                  <FaEnvelope className="contact-icon" />
                </div>
                <Card.Title className="fw-bold mb-2 title-text">Email Us</Card.Title>
                <div className="card-info d-flex flex-column gap-1">
                  <span className="email-link" onClick={() => window.location.href = `mailto:${emailAddress}`}>
                    {emailAddress}
                  </span>
                  <span className="email-link" onClick={() => window.location.href = `mailto:${secondaryEmail}`}>
                    {secondaryEmail}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 contact-card border-0" onClick={() => window.open(googleMapsLink, '_blank')} role="button">
              <Card.Body className="p-4 text-center d-flex flex-column align-items-center">
                <div className="icon-container mb-3">
                  <FaMapMarkerAlt className="contact-icon" />
                </div>
                <Card.Title className="fw-bold mb-2 title-text">Visit Us</Card.Title>
                <div className="card-info text-muted">
                  <span>{hospitalAddress}</span>
                  <div className="mt-2 text-teal fw-semibold text-sm">Open in Google Maps →</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Form and Map/FAQ Section */}
        <Row className="g-4 mb-5">
          {/* Contact Form */}
          <Col lg={7}>
            <Card className="form-card border-0 p-4 p-md-5">
              <h3 className="fw-bold mb-1">Send Us a Message</h3>
              <p className="text-muted mb-4">Fill out the form below and our team will get back to you within 24 hours.</p>
              
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="formName">
                      <Form.Label className="fw-semibold text-secondary small">Your Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        isInvalid={!!errors.name}
                        className="custom-input"
                      />
                      <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="formEmail">
                      <Form.Label className="fw-semibold text-secondary small">Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. john@example.com"
                        isInvalid={!!errors.email}
                        className="custom-input"
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group controlId="formSubject">
                      <Form.Label className="fw-semibold text-secondary small">Subject</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Appointment Inquiry"
                        isInvalid={!!errors.subject}
                        className="custom-input"
                      />
                      <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group controlId="formMessage">
                      <Form.Label className="fw-semibold text-secondary small">Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        isInvalid={!!errors.message}
                        className="custom-input"
                      />
                      <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={12} className="mt-4">
                    <Button 
                      type="submit" 
                      className="submit-btn w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="spinner-icon" /> Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane /> Send Message
                        </>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>

          {/* Frequently Asked Questions */}
          <Col lg={5}>
            <div className="h-100 d-flex flex-column justify-content-between">
              <Card className="faq-card border-0 p-4 p-md-4 mb-4">
                <h4 className="fw-bold mb-3">Frequently Asked Questions</h4>
                <Accordion defaultActiveKey="0" flush className="custom-accordion">
                  <Accordion.Item eventKey="0" className="border-0 mb-2">
                    <Accordion.Header>How do I book an appointment?</Accordion.Header>
                    <Accordion.Body className="text-muted small">
                      You can book directly by calling our desk, or fill out the contact form specifying your preferred department and schedule.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1" className="border-0 mb-2">
                    <Accordion.Header>What are visiting hours for admitted patients?</Accordion.Header>
                    <Accordion.Body className="text-muted small">
                      General visiting hours are daily from 4:00 PM to 7:00 PM. Special passes are required for ICU visits.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2" className="border-0 mb-2">
                    <Accordion.Header>Do you offer online report delivery?</Accordion.Header>
                    <Accordion.Body className="text-muted small">
                      Yes! You can view and download lab test results directly through our Patient Portal after logging in.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card>

              {/* Quick Hours Summary */}
              <Card className="hours-card border-0 p-4">
                <h5 className="fw-bold mb-2">OPD Working Hours</h5>
                <ul className="list-unstyled mb-0 text-muted small d-flex flex-column gap-2">
                  <li className="d-flex justify-content-between"><span>Sunday - Friday:</span> <span className="fw-semibold text-dark">8:00 AM - 6:00 PM</span></li>
                  <li className="d-flex justify-content-between"><span>Saturday:</span> <span className="fw-semibold text-dark">9:00 AM - 1:00 PM</span></li>
                  <li className="d-flex justify-content-between"><span>Emergency Care:</span> <span className="fw-semibold text-danger">24/7 Available</span></li>
                </ul>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;