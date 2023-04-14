import {
    Box
} from "@mui/material";
import React from "react";
import {
    useLocation
} from "react-router-dom";
import Accord from "../../components/Accord";

const SingleJobPage = () => {
    const location = useLocation();
    const job = location.state.jobData;
    const stat = location.state;

    console.log(job);
    console.log(stat);

    return ( <
        Box sx = {
            {
                color: "grey"
            }
        } >
        <
        Accord job = {
            job
        }
        /> <
        /Box>
    );
};

export default SingleJobPage;