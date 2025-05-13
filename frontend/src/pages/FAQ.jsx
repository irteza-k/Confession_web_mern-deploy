import { Container, Card, Accordion } from 'react-bootstrap';

function FAQ() {
  return (
    <Container className="my-5 d-flex justify-content-center align-items-center min-vh-100">
      <Card className="glass-card" style={{ maxWidth: '800px', width: '100%' }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-center mb-4 text-muted">
            Find answers to common questions about our confession platform
          </p>
          
          <Accordion defaultActiveKey="0" className="mt-4">
            <Accordion.Item eventKey="0" className="mb-3">
              <Accordion.Header className="fw-bold">Is my identity really anonymous?</Accordion.Header>
              <Accordion.Body className="p-3">
                Yes! We never display or share your identity. All confessions and comments are anonymous.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1" className="mb-3">
              <Accordion.Header className="fw-bold">Can I delete or edit my confession?</Accordion.Header>
              <Accordion.Body className="p-3">
                Currently, confessions cannot be edited or deleted to preserve the integrity of the conversation. Please be thoughtful before posting.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2" className="mb-3">
              <Accordion.Header className="fw-bold">How are confessions moderated?</Accordion.Header>
              <Accordion.Body className="p-3">
                We use a combination of automated filters and manual review to keep the community safe and supportive. Inappropriate content will be removed.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3" className="mb-3">
              <Accordion.Header className="fw-bold">Can I react or comment more than once?</Accordion.Header>
              <Accordion.Body className="p-3">
                You can react and comment as much as you like! All interactions remain anonymous.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4" className="mb-3">
              <Accordion.Header className="fw-bold">How do I report a problem?</Accordion.Header>
              <Accordion.Body className="p-3">
                Please use the Contact page to send us feedback or report any issues.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default FAQ; 