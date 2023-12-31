import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../style/login.css";
import axios from "axios";

const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setEhow] = useState(false);
  const [loading, setEoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history("/home", { state: { id: email } });
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users"); // Update the URL with your server's URL
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);



  const handleSubmit = async (event) => {
    event.preventDefault();
    setEoading(true);
    console.log(email, password);

    try {
      await axios
        .post("http://localhost:8000/", {
          email,
          password,
        })
        .then((res) => {
          if (res.data.token) {
            const name = res.data.name
            localStorage.setItem("jwt", res.data.token);
            localStorage.setItem("user", res.data.name);

            setEoading(false);
            history("/home", { state: { id: "Welcome back, " + name } });
          } else if (!res.data.token) {
            alert(res.data.error);
          }
        });
    } catch (event) {
      console.log(event);
      setEoading(false);
    }
  };

  const handlePassword = () => {};

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: "linear-gradient(180deg, #088395, #27E1C1)" }}
    >
      <div className="sign-in__backdrop"></div>
      <Form
        className="shadow p-4 bg-white rounded"
        onSubmit={handleSubmit}
        style={{ backgroundImage: "linear-gradient(180deg, #434242, #222222)" }}
      >
        <span className="signin">SIGN IN</span>
        <div className="avatar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            fill="currentColor"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        </div>

        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setEhow(false)}
            dismissible
          >
            Incorrect email or password.
          </Alert>
        ) : (
          <div />
        )}

        <Form.Group className="mb-2" controlId="email">
          <div
            class="input-group input-group mb-3"
            style={{ border: "none", backgroundColor: "grey" }}
          >
            <span
              class="input-group-text"
              id="inputGroup-sizing-sm"
              style={{ backgroundColor: "grey", color: "white" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            </span>
            <input
              style={{ backgroundColor: "grey", color: "white" }}
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <div class="input-group input-group mb-3">
            <span
              class="input-group-text"
              id="inputGroup-sizing-sm"
              style={{ backgroundColor: "grey", color: "white" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-lock-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
              </svg>
            </span>
            <input
              style={{ backgroundColor: "grey", color: "white" }}
              type="password"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <div style={{ display: "flex" }}>
            <Form.Check type="checkbox" />{" "}
            <span style={{ color: "#27E1C1", paddingLeft: "3px" }}>
              Remember me
            </span>
          </div>
        </Form.Group>
        {!loading ? (
          <Button
            className="w-100"
            variant="primary"
            type="submit"
            style={{
              background: "#27E1C1",
              color: "grey",
              border: "none",
              marginBottom: "1rem",
            }}
          >
            LOG IN
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
        <span style={{ color: "white", marginLeft: "10rem" }}>OR</span>
        <Button
          className="w-100"
          variant="primary"
          style={{
            background: "#8CA1A5",
            color: "white",
            border: "none",
            marginTop: "1rem",
          }}
          onClick={() => {
            history("/signup");
          }}
        >
          SIGN UP
        </Button>
        <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={handlePassword}
          >
            <span style={{ color: "#27E1C1" }}>Forgot password?</span>
          </Button>
        </div>
      </Form>
      <div className="oval-shadow"></div>
    </div>
  );
};

export default Login;
