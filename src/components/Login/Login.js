import { useRef, useState } from "react";
import { Container, Form, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

import "./Login.scss";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      history.push("/dashboard");
    } catch (e) {
      setError("Failed to log in");
      console.error(e);
    }
  }

  return (
    <div className="wrapper">
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
        }}
      >
        <Card
          className="w-100"
          style={{
            minWidth: "400px",
            boxShadow: "0px 2px 2px 2px #62f99c",
            borderRadius: "20px",
          }}
        >
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  required
                  autoComplete="off"
                />
              </Form.Group>
              <button disabled={loading} type="submit">
                Log In
              </button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password</Link>
            </div>
          </Card.Body>
          <div className="w-100 text-center mt-2 pb-4">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}
