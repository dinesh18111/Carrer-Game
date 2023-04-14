import React from "react";
import {
    Grid
} from "@mui/material";
import background from "../../img/mapbgedt.jpeg";
import Planets from "../../components/Planets/Planets";
import {
    useNavigate
} from "react-router-dom";
import {
    jobs
} from "../../data/survey";

const Map = () => {
    const navigate = useNavigate();
    console.log("jobs");
    console.log(jobs);
    jobs.map((job) => console.log(job.planetName));
    return ( <
        Grid container alignItems = "center"
        justifyContent = "center"
        style = {
            {
                backgroundImage: `url(${background})`,
                fontSize: "50px",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh",
            }
        } >
        <
        Grid item xs = {
            3
        }
        sx = {
            {
                mt: 10,
                ml: -9
            }
        } >
        <
        >
        <
        Planets jobs = {
            jobs
        }
        /> <
        /> <
        /Grid> <
        /Grid>
    );
};

export default Map;