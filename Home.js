import React from "react";
import {
    Link
} from "react-router-dom";
import {
    Box,
    Button,
    Grid,
    Typography
} from "@mui/material";
import background from "../../img/techplanetbg.jpeg";

const Home = () => {
    return ( <
        Grid container spacing = {
            0
        }
        direction = "column"
        alignItems = "center"
        justifyContent = "center"
        style = {
            {
                minHeight: "100vh",
                backgroundImage: `url(${background})`,
                fontSize: "50px",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                marginTop: "-30px",
            }
        } >
        <
        Grid item xs = {
            3
        } >
        <
        Box sx = {
            {
                display: "flex",
                flexWrap: "wrap",
                alignContent: "space-between",
                p: 1,
                m: 1,
                Gap: 5,
            }
        } >
        <
        Typography variant = "h3"
        color = "white" >
        Welcome <
        /Typography> <
        Button sx = {
            {
                mx: 6,
            }
        }
        variant = "contained"
        component = {
            Link
        }
        to = {
            "/player"
        } >
        Player <
        /Button> <
        Button variant = "contained"
        component = {
            Link
        }
        to = {
            "/teacher"
        } >
        Teacher <
        /Button> <
        /Box> <
        /Grid> <
        /Grid>
    );
};

export default Home;