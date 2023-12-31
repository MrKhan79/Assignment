import './App.css';
import Register from './Screens/Register';
import Login from './Screens/Login';
import Home from './Screens/Home';
import UpdateUser from './Screens/UpdateUser'
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


function App() {
  const sort_local = JSON.parse(localStorage.getItem('sort'));

  return (
    <div >
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Home {...sort_local}/>} />
        <Route path="/update-user/:userId" element={<UpdateUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
