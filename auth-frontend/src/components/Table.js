import React from "react";
import "../style/home.css";
import { Button } from "react-bootstrap";

const Table = () => {
  const data = [
    {
      picture: "https://randomuser.me/api/portraits/women/53.jpg",
      name: "Odessa Graves",
      email: "odessagraves@centice.com",
      phone: "+1 (996) 410-2911",
      dob: "02/10/1998",
    },
    {
      picture: "https://randomuser.me/api/portraits/men/82.jpg",
      name: "Lane Fuller",
      email: "lanefuller@centice.com",
      phone: "+1 (862) 431-3414",
      dob: "02/10/1998",
    },
    {
      picture: "https://randomuser.me/api/portraits/women/17.jpg",
      name: "Suzanne Atkins",
      email: "suzanneatkins@centice.com",
      phone: "+1 (856) 586-2764",
      dob: "02/10/1998",
    },
    {
      picture: "https://randomuser.me/api/portraits/men/7.jpg",
      name: "Mccall Vinson",
      email: "mccallvinson@centice.com",
      phone: "+1 (849) 425-2469",
      dob: "02/10/1998",
    },
    {
      picture: "https://randomuser.me/api/portraits/women/75.jpg",
      name: "Celia Washington",
      email: "celiawashington@centice.com",
      phone: "+1 (864) 563-2158",
      dob: "02/10/1998",
    },
  ];

  return (
    <table className="my-table">
      <thead>
        <tr style={{ backgroundColor: "#19A7CE", color: "white" }}>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">DOB</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr className="the-row">
            <th>
              <img
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                src={user.picture}
                alt="profPic"
              />
            </th>
            <td>{user.name}</td>
            <td>{user.dob}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <Button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  margin: "2px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
              </Button>{" "}
              <Button
                style={{
                  backgroundColor: "#3081D0",
                  color: "white",
                  border: "none",
                  margin: "2px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash3-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
