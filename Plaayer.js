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
import EnterClassCodeModal from "../../components/Modal/classCode";
import background from "../../img/mapbgedt.jpeg";

const Player = () => {
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
            }
        } >
        <
        Typography variant = "h3"
        color = "white" >
        Play as:
        <
        /Typography> <
        Button sx = {
            {
                mx: 4,
            }
        }
        variant = "contained"
        component = {
            Link
        }
        to = {
            "/player/auth"
        } >
        Individual <
        /Button> <
        EnterClassCodeModal / >
        <
        /Box> <
        /Grid> <
        /Grid>
    );
};

export default Player;