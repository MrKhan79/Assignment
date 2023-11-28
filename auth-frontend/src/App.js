import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Home />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

// test