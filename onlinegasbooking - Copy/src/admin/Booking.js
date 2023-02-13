import React, { useState,useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import '../css/style.css';
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
function Booking() {
  useEffect(() => {
    return () => {
      setEmail("hello")
    }
  }, [2])
  
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    localStorage.clear();
    window.location.href = "/";
  };

  const [email,setEmail]=useState();
  const refresh = (e) => {
    console.log(e);
    setEmail(e);
    handleSubmit(e);
    setTimeout(() => {
      console.log(email);
    }, 1000);
    
  };
  const back = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.href="/admin";
    }, 1000);
    
  };

  
  const handleSubmit = (e) => {
    setEmail(e);
    const configuration = {
      method: "post",
      url: "http://localhost:3001/deletebooking",
      data: {
        email,
      },
    };
    axios(configuration)
      .then((result) => {
        alert("Booking Approved");
      })
      .catch((error) => {
        error = new Error();
      });
  };
  
  const [state, setState] = useState(localStorage.getItem("Bookings"));
  console.log(state.length);
  if(state != null && state.length > 2){return (
    <>
      <div >
        <table className="table table-striped table-dark">
          <tbody key={"header"}>
            {JSON.parse(state).map((item,key) => {
              return (
                <tr key={key}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>{item.payment}</td>
                  <td>
                    <Button type="submit" onClick={()=>{refresh(item.email)}}>
                      ACCEPT
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mb-2">
      <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
      </div>
      <div>
      <Button type="submit" variant="success" onClick={() => back()}>
        Back
      </Button>
      </div>
    </>
  );}
  else{
    return(
      <><h1>NO BOOKINGS</h1>
      <div className="mb-2">
      <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
      </div>
      <div>
      <Button type="submit" variant="success" onClick={() => back()}>
        Back
      </Button>
      </div>
      </>
    );
  }
}

export default Booking;
