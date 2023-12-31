import React, { useState } from "react";
import "../style/home.css";
import axios from "axios";
import Nav from "../components/Navbar";
import Row from "react-bootstrap/Row";
import Cards from "../components/Card";
import { useEffect } from "react";

const Home = (props) => {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [lentgth, setLength] = useState(0);

  const pull_data = (data) => {
    setSort(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
  };

  const pull_search = (data) => {
    setSearchTerm(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://assignment007-ybu8.onrender.com/users?sort=${sort}&search=${searchTerm}`
        ); // Update the URL with your server's URL
        setData(response.data);
        setLength(response.data.length);

        if (sort) {
          localStorage.setItem("sort", JSON.stringify(sort));
        }

        if (searchTerm) {
          localStorage.setItem("search", JSON.stringify(searchTerm));
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [sort, searchTerm]);

  return (
    <div>
      <Nav func={pull_data} func2={pull_search} />

      <div className="home">
        {lentgth == 0 ? (
          <h2>
            <b>404: </b>No user found!
          </h2>
        ) : (
          <Row xs={1} md={2} className="g-4 row-card">
            {data.map((item) => (
              <Cards data={item} />
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Home;
