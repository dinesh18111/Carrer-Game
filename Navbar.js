import {
    AppBar,
    Box,
    Button
} from "@mui/material";
import React from "react";
import {
    useNavigate
} from "react-router-dom";
import {
    useContext
} from "react";
import {
    UserContext
} from "./../UserContext";

const Navbar = () => {
    const navigate = useNavigate();
    const {
        setUser
    } = useContext(UserContext);

    const handleLogout = () => {
        localStorage.clear();
        console.log("logout");
        setUser(null);
    };

    return ( <
        AppBar position = "static" >
        <
        Box sx = {
            {
                flexDirection: "row-reverse",
                ml: 138,
                mt: 1,
                mb: 1
            }
        } >
        <
        Button variant = "contained"
        color = "success"
        sx = {
            {
                borderRadius: 5
            }
        }
        onClick = {
            handleLogout
        } >
        Logout <
        /Button> <
        /Box> <
        /AppBar>
    );
};

export default Navbar;