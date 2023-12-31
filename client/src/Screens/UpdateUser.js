import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "../style/login.css";
import { useNavigate, useParams } from "react-router-dom";

const Register = () => {
    const { userId } = useParams();
    const history = useNavigate();
    let user
  
    const [editFormData, setEditFormData] = useState({
      name: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      enquiry: ''
    });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${userId}`);
        user = response.data;

        setEditFormData({
          name: user.name,
          email: user.email,
          phone: user.phone,
          city: user.city,
          state: user.state,
          gender: user.gender,
          enquiry: user.enquiry,
        });

      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    fetchUserDetails();
  }, [userId]);


  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:8000/users/${userId}`, editFormData);
      console.log("Successfull")
      history('/home');
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: "linear-gradient(180deg, #088395, #27E1C1)", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div className="sign-in__backdrop"></div>

      <Form
        className="shadow p-4 bg-white rounded"
        onSubmit={handleUpdate}
        style={{ backgroundImage: "linear-gradient(180deg, #434242, #222222)" }}
      >
        <span className="signup">Update User</span>

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
              value={editFormData.name}
              placeholder="name"
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
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
              value={editFormData.email}
              placeholder="email"
              onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
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
              value={editFormData.phone}
              placeholder="phone"
              onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
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
                    setEditFormData({ ...editFormData, gender: item });
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
                        setEditFormData({ ...editFormData, enquiry: item });
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
          <Form.Select aria-label="Default select example" onChange={(e)=>setEditFormData({ ...editFormData, city: e.target.value })}>
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
          <Form.Select aria-label="Default select example" onChange={(e)=>setEditFormData({ ...editFormData, state: e.target.value })}>
            <option>{editFormData.state}</option>
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
          Update
        </Button>
        <span style={{ color: "white", marginLeft: "10rem" }}>OR</span>

        <Button
          className="w-100"
          variant="primary"
          onClick={() => {
            history("/home");
          }}
          style={{
            background: "red",
            color: "white",
            border: "none",
            marginTop: "1rem",
          }}
        >
          CANCEL EDIT
        </Button>

        <div className="d-grid justify-content-end"></div>
      </Form>
      <div className="oval-shadow"></div>
    </div>
  );
};

export default Register;
