import { Container, Col, Row } from "react-bootstrap";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Account from "./Account";
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./Login";
import Register from "./Register";
import Navbar from "./Navbar";
import Admin from "./Admin";
import Users from "./admin/Users";
import Booking from "./admin/Booking";
import Connection from "./admin/Connection";

function App() {
  return (
    <Container>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Account/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/free" element={<FreeComponent/>} />
        <Route path="/auth" element={
          <ProtectedRoutes>
            <AuthComponent/>
          </ProtectedRoutes>
        } />
        <Route path="/admin" element={
          <ProtectedRoutes>
            <Admin/>
          </ProtectedRoutes>
        } />
        <Route path="/showusers" element={
          <ProtectedRoutes>
            <Users/>
          </ProtectedRoutes>
        } />
        <Route path="/showtransfers" element={
          <ProtectedRoutes>
            <Admin/>
          </ProtectedRoutes>
        } />
        <Route path="/showconnection" element={
          <ProtectedRoutes>
            <Connection/>
          </ProtectedRoutes>
        } />
        <Route path="/showbooking" element={
          <ProtectedRoutes>
            <Booking/>
          </ProtectedRoutes>
        } />
  
      </Routes>
    </Container>
  );
}

export default App;
