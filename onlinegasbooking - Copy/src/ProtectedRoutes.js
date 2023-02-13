import React from "react";
import { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Account from "./Account";
import AuthComponent from "./AuthComponent";
const cookies = new Cookies();
const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = cookies.get("TOKEN");
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/');
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
            checkUserToken();
        }, [isLoggedIn]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;