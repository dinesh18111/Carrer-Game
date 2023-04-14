import React, {
    useContext
} from "react";
import "./Works.css";
//import { themeContext } from "../../Context";
import {
    motion
} from "framer-motion";
import {
    Box,
    Button
} from "@mui/material";
import {
    useNavigate
} from "react-router-dom";
//import { Link } from "react-scroll";
const Planets = (props) => {
    let jobs = props.jobs;
    console.log(jobs[0].planetName);
    // context
    //   const theme = useContext(themeContext);
    //   const darkMode = theme.state.darkMode;

    // transition
    const navigate = useNavigate();

    const handlePlanetClicked = (planet) => {
        console.log("planet clicked");
        console.log(planet.planetName);
        if (planet.planetName === "Home planet self assesment") {
            console.log("go no where");
            navigate("/planethome");
        } else {
            navigate("/PlanetPage", {
                state: {
                    planetData: planet
                }
            });
        }
    };
    return ( <
        div className = "works"
        id = "works" > { /* left side */ } <
        div className = "w-right" >
        <
        motion.div initial = {
            {
                rotate: 45
            }
        }
        whileInView = {
            {
                rotate: 0
            }
        }
        transition = {
            {
                duration: 3.5,
                type: "spring"
            }
        }
        className = "w-mainCircle" >
        <
        Box className = "w-secCircle" >
        <
        Button onClick = {
            () => handlePlanetClicked(jobs[0])
        }
        color = "warning"
        variant = "contained" >
        {
            jobs[0].planetName
        } <
        /Button> <
        /Box>

        <
        Box className = "w-secCircle" >
        <
        Button onClick = {
            () => handlePlanetClicked(jobs[1])
        }
        color = "primary"
        variant = "contained" >
        {
            jobs[1].planetName
        } <
        /Button> <
        /Box> <
        Box className = "w-secCircle" >
        <
        Button onClick = {
            () => handlePlanetClicked(jobs[2])
        }
        color = "success"
        variant = "contained" >
        {
            jobs[2].planetName
        } <
        /Button> <
        /Box> <
        Box className = "w-secCircle" >
        <
        Button onClick = {
            () => handlePlanetClicked(jobs[3])
        }
        color = "info"
        variant = "contained" >
        {
            jobs[3].planetName
        } <
        /Button> <
        /Box> <
        Box className = "w-secCircle" >
        <
        Button onClick = {
            () => handlePlanetClicked(jobs[4])
        }
        color = "error"
        variant = "contained" >
        {
            jobs[4].planetName
        } <
        /Button> <
        /Box> <
        Box className = "w-secCircle" >
        <
        Button onClick = {
            () => handlePlanetClicked(jobs[5])
        }
        color = "secondary"
        variant = "contained" >
        {
            jobs[5].planetName
        } <
        /Button> <
        /Box> <
        /motion.div> <
        /div> <
        /div>
    );
};

export default Planets;