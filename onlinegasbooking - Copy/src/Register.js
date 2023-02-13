import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./css/style.css"
import { Link } from "react-router-dom";


export default function Register(){

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");
    const [address,setAddress]=useState("");
    const [register,setRegister]=useState(false);

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // make a popup alert showing the "submitted" text
        const configuration = {
            method: "post",
            url: "http://localhost:3001/register",
            data: {
              name,
              email,
              password,
              address,
            },
          };
          axios(configuration)
          .then((result) => {
            setRegister(true);
          })
          .catch((error) => {
            error = new Error();
            alert("Either Email or Address is already in use!")
          });
      }


    return(
        <>
        <div className="reg">
        <h2>Register</h2>
        <Form onSubmit={(e)=>handleSubmit(e)}>
        {/* name */}
        <Form.Group controlId="formNameName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
        </Form.Group>

        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </Form.Group>

        {/* address */}
        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
        </Form.Group>
        {/* submit button */}
        <Form.Group className="mb-2">
        <Button className="submitbtn" variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
        </Form.Group>
        <Form.Group className="mb-3">
        <Link to="/login">Already Have An Account? Have Gas?</Link>
        </Form.Group>
        {/* display success message */}
        {register ? (
          <p className="text-success">You Are Registered Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Registered</p>
        )}
        </Form>
        </div>
        </>
    )
}