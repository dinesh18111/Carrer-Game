import {
    Alert,
    Button,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import {
    Box
} from "@mui/system";
import React from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";
import "./style.css";

const JobDetails = ({
    jobs,
    streetName
}) => {
    const jobsData = jobs;
    console.log(jobsData);

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleAddNewwJob = () => {
        navigate("/Map");
    };

    const handleItemClicked = (job) => {
        navigate("/SingleJobPage", {
            state: {
                jobData: job,
                length: jobsData.length
            },
        });
    };

    const randomSalary = () => {
        const min = 120000;
        const max = 800000;
        const salary = Math.floor(Math.random() * (max - min + 1)) + min;

        return `$${salary.toLocaleString()} USD`;
    };

    return ( <
        Box gridColumn = "span 4"
        gridRow = "span 2"
        backgroundColor = "primary"
        overflow = "auto" >
        <
        Box display = "flex"
        justifyContent = "space-between"
        alignItems = "center"
        borderBottom = {
            `4px solid grey`
        }
        colors = "grey"
        p = "15px" >
        <
        Typography color = "grey"
        variant = "h5"
        fontWeight = "600" > {
            streetName
        } <
        /Typography> <
        /Box>

        <
        TableContainer component = {
            Paper
        }
        sx = {
            {
                mx: 5,
                mt: 3
            }
        } >
        <
        Table >
        <
        TableHead sx = {
            {
                backgroundColor: "green"
            }
        } >
        <
        TableRow >
        <
        TableCell > < /TableCell> <
        TableCell >
        <
        Typography sx = {
            {
                color: "white",
                fontWeight: 500
            }
        } >
        Job Name <
        /Typography> <
        /TableCell> <
        TableCell >
        <
        Typography sx = {
            {
                color: "white",
                fontWeight: 500
            }
        } >
        Salary <
        /Typography> <
        /TableCell> <
        TableCell >
        <
        Typography sx = {
            {
                color: "white",
                fontWeight: 500
            }
        } >
        Action <
        /Typography> <
        /TableCell> <
        /TableRow> <
        /TableHead> <
        TableBody > {
            jobsData.map((item, index) => ( <
                TableRow style = {
                    index % 2 === 0 ?
                    {
                        background: "grey"
                    } :
                    {
                        background: "white"
                    }
                } >
                <
                TableCell > {
                    index + 1
                } < /TableCell> <
                TableCell > {
                    item.jobname
                } < /TableCell> <
                TableCell > {
                    randomSalary()
                } < /TableCell> <
                TableCell >
                <
                Button onClick = {
                    () => handleItemClicked(item)
                }
                variant = "contained"
                color = "primary"
                borderRadius = "4px" >
                View <
                /Button> <
                /TableCell> <
                /TableRow>
            ))
        } <
        /TableBody> <
        /Table> <
        /TableContainer> <
        /Box>
    );
};

export default JobDetails;