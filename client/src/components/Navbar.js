import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/home.css";

function Header(props) {
  const history = useNavigate();
  const [search, setSearch] = useState("");

  const sortHandler = (e) => {
    e.preventDefault();
    props.func(e.currentTarget.getAttribute("data-value"));
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setSearch(e.currentTarget.value);
  };
  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      history("/");
    }
  });

  useEffect(() => {
    props.func2(search);
  }, [search]);

  const logoutHandler = (e) => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");

    history("/");
  };

  const onClickHandler = (e) =>{
    history("/signup")
  }

  return (
    <>
      <Navbar
        key="xl"
        expand="xl"
        className="bg-body-tertiary mb-3"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container
          fluid
          style={{ width: "80%" }}
          className="d-flex justify-content-between"
        >
          <Navbar.Brand placement="end" href="#">
            {/* {location.state.id} */}
          </Navbar.Brand>
          <>
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="sort"
              >
                Sort By
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  href="#/action-1"
                  data-value="az"
                  onClick={sortHandler}
                >
                  {" "}
                  A - Z
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-2"
                  data-value="za"
                  onClick={sortHandler}
                >
                  {" "}
                  Z - A
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-3"
                  data-value="created"
                  onClick={sortHandler}
                >
                  Last Created
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-3"
                  data-value="modified"
                  onClick={sortHandler}
                >
                  Last Modified
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={searchHandler}
            />
            <Button
              variant="outline-success"
              style={{
                borderColor: "#27E1C1",
                color: "#27E1C1",
              }}
              className="srch-btn"
            >
              Search
            </Button>
          </Form>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-xl`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
             
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link  onClick={onClickHandler}>Add New User</Nav.Link>
                <Button
                  className="w-2"
                  variant="primary"
                  type="submit"
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
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
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
