import React from "react";
import { useEffect } from "react";
import Table from "./Table";
import "../style/home.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      history("/");
    }
  });

  const logoutHandler = (e) => {
    localStorage.removeItem("jwt");
    history("/");
  };

  return (
    <div className="home">
      <h1>{location.state.id} </h1>
      <Table />
      <div>
        <Button
          className="w-100"
          variant="primary"
          type="submit"
          style={{
            background: "red",
            color: "white",
            border: "none",
            marginBottom: "1rem",
            width: "30% !important",
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={logoutHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-power"
            viewBox="0 0 16 16"
            style={{
              paddingRight: "10px",
            }}
          >
            <path d="M7.5 1v7h1V1z" />
            <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
          </svg>
          LOG OUT
        </Button>
      </div>
    </div>
  );
};

export default Home;
