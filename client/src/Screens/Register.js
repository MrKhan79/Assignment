import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "../style/login.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [enquiry, setEnquiry] = useState("");

  useEffect(()=>{
    if(city === "Mumbai" || city === "Pune"){
      setState("Maharashtra")
    }
    else if(city === "Ahmedabad"){
      setState("Gujrat")
    }
  }, [city, state])

  const register = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/signup", {
          email,
          password,
          name,
          phone,
          gender,
          enquiry,
          city,
          state,
        })
        .then(async (res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            await axios
              .post("http://localhost:8000/", {
                email,
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
    <div className="form-container">
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: "linear-gradient(180deg, #088395, #27E1C1)", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div className="sign-in__backdrop"></div>

      <Form
        className="shadow p-4 bg-white rounded"
        onSubmit={register}
        style={{ backgroundImage: "linear-gradient(180deg, #434242, #222222)" }}
      >
        <span className="signup">SIGN UP</span>

        <Form.Group className="mb-2" controlId="name">
          <div
            class="input-group input-group mb-3"
            style={{ border: "none", backgroundColor: "grey" }}
          >
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

        <Form.Group className="mb-2" controlId="email">
          <div
            class="input-group input-group mb-3"
            style={{ border: "none", backgroundColor: "grey" }}
          >
            <input
              style={{ backgroundColor: "grey", color: "white" }}
              type="email"
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

        <Form.Group className="mb-2" controlId="phone">
          <div class="input-group input-group mb-3">
            <input
              style={{ backgroundColor: "grey", color: "white" }}
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={phone}
              placeholder="phone"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </Form.Group>

        <Form.Group
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="mb-3">
            {["Male", "Female", "Others"].map((item) => (
              <>
                <span style={{ color: "white", fontSize: "1.2rem" }}>
                  {item}{" "}
                </span>

                <Form.Check
                  inline
                  name="group1"
                  type="radio"
                  id={`inline-radio-1`}
                  onClick={() => {
                    setGender(item);
                  }}
                />
              </>
            ))}
          </div>
        </Form.Group>

        <Form.Group
          className="mb-2"
          controlId="phone"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div class="input-group input-group mb-3">
            <h4 style={{ color: "white" }}>How did you hear about this?</h4>
            <div className="mb-3">
              {["Linkedin", "Friends", "Job Portal", "Others"].map((item) => (
                <div>
                  <Form.Check
                    inline
                    name="group2"
                    type="radio"
                    id={`inline-radio-1`}
                    onClick={() => {
                      setEnquiry(item);
                    }}
                  />
                  <span style={{ color: "white", fontSize: "1.3rem" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Form.Group>
        <Form.Group style={{marginBottom: "1rem"}}>
          <span style={{ color: "white", fontSize: "1.2rem" }}>
            <b>City: </b>
          </span>
          <Form.Select aria-label="Default select example" onChange={(e)=>setCity(e.target.value)}>
            <option>Select City</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Ahmedabad">Ahmedabad</option>
          </Form.Select>
        </Form.Group>

        <Form.Group style={{marginBottom: "1rem"}}>
          <span style={{ color: "white", fontSize: "1.2rem" }}>
            <b>State: </b>
          </span>
          <Form.Select aria-label="Default select example" onChange={(e)=>setState(e.target.value)}>
            <option>{state}</option>
            <option value="Gujrat">Gujrat</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
          </Form.Select>
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
            marginTop: "1rem"
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
    </div>
  );
};

export default Register;
