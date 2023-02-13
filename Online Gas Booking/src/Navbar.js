import { Container, Col, Row } from "react-bootstrap";
import "./App.css";
import { Routes, Route,Link , useLocation} from "react-router-dom";
import Account from "./Account";
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./Login";
import Register from "./Register";

function Navbar(){
  const location=useLocation();
  
    return(
    <Row>
        <Col className="text-center">
          <h1>ONLINE GAS BOOKING</h1>
          
        </Col>
      </Row>
    )
}

export default Navbar;
