import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
const cookies = new Cookies();

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const handleSubmit = (e) => {
      // prevent the form from refreshing the whole page
      e.preventDefault();
      // make a popup alert showing the "submitted" text
      
      const configuration = {
        method: "post",
        url: "http://localhost:3001/login",
        data: {
          email,
          password,
        },
      };
      axios(configuration)
      .then((result) => {
        setLogin(true);
        // set the cookie
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        var email=result.data.email;
        var name=result.data.name;
        var address=result.data.address;
        var connection=result.data.connection;
        var admin=result.data.employee;
        localStorage.setItem('Email', email);
        localStorage.setItem('Name', name);
        localStorage.setItem('Address', address);
        localStorage.setItem('Connection', connection);
        // redirect user to the auth page
        if(admin<1){
          window.location.href = "/auth";
        }else{
          window.location.href = "/admin";
        }
        
      })
      .catch((error) => {
        error = new Error();
      });
      alert("Submited");
      
    }
    return(
        <>
        <div className="reg">
<Form onSubmit={(e)=>handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        {/* password */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        {/* submit button */}
        <Form.Group className="mb-2">
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
        </Form.Group>
        <Form.Group>
        <Link to="/register">Don't Have An Account? no gas?</Link>
        </Form.Group>
        {/* display success message */}
        {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}
      </Form>
      </div>
        </>
    )
}