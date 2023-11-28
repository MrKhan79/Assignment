import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import axios from "axios";
import "../style/login.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dob, setDob] = useState("");

  const handleDateChange = (date) => {
    if (date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const selectedDateWithoutTime = day + "/" + month + "/" + year;

      setDob(selectedDateWithoutTime);
    }
  };
  const register = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/signup", {
          username,
          password,
          name,
          dob,
        })
        .then(async (res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            await axios
              .post("http://localhost:8000/", {
                username,
                password,
              })
              .then((res) => {
                if (res.data.token) {
                  localStorage.setItem("jwt", res.data.token);
                }
              });
            history("/home", { state: { id: "Nice to meet you, " + name } });
            alert(res.data.message);
          }
        });
    } catch (event) {}
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: "linear-gradient(180deg, #088395, #27E1C1)" }}
    >
      <div className="sign-in__backdrop"></div>

      <Form
        className="shadow p-4 bg-white rounded"
        onSubmit={register}
        style={{ backgroundImage: "linear-gradient(180deg, #434242, #222222)" }}
      >
        <span className="signin">SIGN UP</span>
        <div className="avatar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            fill="currentColor"
            class="bi bi-person-plus-fill"
            viewBox="0 0 16 16"
          >
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            <path
              fill-rule="evenodd"
              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
            />
          </svg>
        </div>

        <Form.Group className="mb-2" controlId="name">
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
              value={name}
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-2" controlId="name">
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
                class="bi bi-cake2-fill"
                viewBox="0 0 16 16"
              >
                <path d="m2.899.804.595-.792.598.79A.747.747 0 0 1 4 1.806v4.886c-.354-.06-.689-.127-1-.201V1.813a.747.747 0 0 1-.1-1.01ZM13 1.806v4.685a15.19 15.19 0 0 1-1 .201v-4.88a.747.747 0 0 1-.1-1.007l.595-.792.598.79A.746.746 0 0 1 13 1.806m-3 0a.746.746 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 9 1.813v5.17c.341-.013.675-.031 1-.055zm-3 0v5.176c-.341-.012-.675-.03-1-.054V1.813a.747.747 0 0 1-.1-1.01l.595-.79.598.789A.747.747 0 0 1 7 1.806" />
                <path d="M4.5 6.988V4.226a22.6 22.6 0 0 1 1-.114V7.16c0 .131.101.24.232.25l.231.017c.332.024.672.043 1.02.055l.258.01a.25.25 0 0 0 .26-.25V4.003a29.015 29.015 0 0 1 1 0V7.24a.25.25 0 0 0 .258.25l.259-.009c.347-.012.687-.03 1.019-.055l.231-.017a.25.25 0 0 0 .232-.25V4.112c.345.031.679.07 1 .114v2.762a.25.25 0 0 0 .292.246l.291-.049c.364-.061.71-.13 1.033-.208l.192-.046a.25.25 0 0 0 .192-.243V4.621c.672.184 1.251.409 1.677.678.415.261.823.655.823 1.2V13.5c0 .546-.408.94-.823 1.201-.44.278-1.043.51-1.745.696-1.41.376-3.33.603-5.432.603-2.102 0-4.022-.227-5.432-.603-.702-.187-1.305-.418-1.745-.696C.408 14.44 0 14.046 0 13.5v-7c0-.546.408-.94.823-1.201.426-.269 1.005-.494 1.677-.678v2.067c0 .116.08.216.192.243l.192.046c.323.077.669.147 1.033.208l.292.05a.25.25 0 0 0 .291-.247ZM1 8.82v1.659a1.935 1.935 0 0 0 2.298.43.935.935 0 0 1 1.08.175l.348.349a2 2 0 0 0 2.615.185l.059-.044a1 1 0 0 1 1.2 0l.06.044a2 2 0 0 0 2.613-.185l.348-.348a.938.938 0 0 1 1.082-.175c.781.39 1.718.208 2.297-.426V8.833l-.68.907a.938.938 0 0 1-1.17.276 1.938 1.938 0 0 0-2.236.363l-.348.348a1 1 0 0 1-1.307.092l-.06-.044a2 2 0 0 0-2.399 0l-.06.044a1 1 0 0 1-1.306-.092l-.35-.35a1.935 1.935 0 0 0-2.233-.362.935.935 0 0 1-1.168-.277z" />
              </svg>
            </span>
            <DatePicker
              style={{ color: "grey" }}
              onChange={handleDateChange}
              value={selectedDate}
            />
          </div>
        </Form.Group>

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
                class="bi bi-envelope-at-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
              </svg>
            </span>
            <input
              style={{ backgroundColor: "grey", color: "white" }}
              type="email"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={username}
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
          SIGN UP
        </Button>
        <span style={{ color: "white", marginLeft: "10rem" }}>OR</span>

        <Button
          className="w-100"
          variant="primary"
          onClick={() => {
            history("/");
          }}
          style={{
            background: "#8CA1A5",
            color: "white",
            border: "none",
            marginTop: "1rem",
          }}
        >
          LOG IN
        </Button>

        <div className="d-grid justify-content-end"></div>
      </Form>
      <div className="oval-shadow"></div>
    </div>
  );
};

export default Register;
