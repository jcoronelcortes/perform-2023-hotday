import React, { useEffect, useCallback, useState, useMemo } from "react";
import { DynatraceTenantAPI } from "@dt-esa/dynatrace-api-client";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function HomeView({ props }) {
  const selected = useMemo(() => props.selected, [props]);
  const tenant = useMemo(() => props.tenant, [props]);
  const token = useMemo(() => props.token, [props]);
  const [isValid, setIsvalid] = useState(false);
  const [formComplete, setformComplete] = useState(false);
  const [textColor, setTextColor] = useState('text-gray');
  const [validationMessage, setValidationMessage] = useState(
    "Validate once you've entered a tenant and token"
  );
  // handle tenant and token state
  const handleTenant = useCallback(
    (e) => {
      props.setTenant(e.target.value);
    },
    [props]
  );
  const handleToken = useCallback(
    (e) => {
      props.setToken(e.target.value);
    },
    [props]
  );
  // handle form state change
  useEffect(() => {
    if (tenant.length > 0 && token.length > 0) {
      setformComplete(true);
    } else {
      setformComplete(false);
    }
  }, [props]);
  // validate token
  const handleValidation = useCallback(
    (e) => {
      e.preventDefault();
      try {
        /*let dtAPI = */new DynatraceTenantAPI({ url: tenant, token: token });
        setValidationMessage("You are connected to your Dynatrace instance!");
        setTextColor('text-success fs-4')
      } catch (e) {
        console.log('e:', e)
        setValidationMessage(e);
        setTextColor('text-danger fs-4')
      } finally {
        if (
          validationMessage === "You are connected to your Dynatrace instance!"
        ) {
          setIsvalid(true);
        } else {
          setIsvalid(false);
        }
      }
    },
    [props]
  );
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleValidation}>
            <Form.Group className="mb-3" controlId="formAuth">
              <Form.Label>Tenant</Form.Label>
              <Form.Control
                type="tenant"
                placeholder="Tenant Address"
                onChange={handleTenant}
                value={tenant}
              />
              <Form.Text className="text-muted">
                This is the domain your Dynatrace environment points to. IE:
                abc12345.live.dynatrace.com
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Api-Token</Form.Label>
              <Form.Control
                type="token"
                placeholder="Api-Token"
                value={token}
                onChange={handleToken}
              />
              <Form.Text className="text-muted">
                Tokens can be generated in your Dynatrace tenant. &nbsp;
                <a
                  href="https://www.dynatrace.com/support/help/shortlink/api-authentication"
                  target="_blank"
                  rel="noreferrer"
                >
                  (Docs)
                </a>
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!formComplete}>
              Validate Connection
            </Button>
            <br />
            <Form.Text className={textColor}>{validationMessage}</Form.Text>
          </Form>
        </Col>
        <Col>
          <Card>
            <Card.Header as="h5">How to train your configuration</Card.Header>
            <Card.Body>
              <Card.Title>Blah blah blah</Card.Title>
              <Card.Text>Lorem Ipsum or whatever</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
