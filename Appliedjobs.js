import {
    Alert,
    Button,
    Snackbar,
    Typography
} from "@mui/material";
import {
    Box
} from "@mui/system";
import {
    collection,
    deleteDoc,
    doc,
    getDocs
} from "firebase/firestore";
import React, {
    useEffect,
    useState
} from "react";
import {
    useNavigate
} from "react-router-dom";
import {
    db
} from "../../firebase";

const Appliedjobs = ({
    setOpen
}) => {
    const [appliedjobs, setAppliedjobs] = useState([]);
    const [removed, setRemoved] = useState(false);

    const jobssCollectionRef = collection(db, "jobs");

    useEffect(() => {
        //const jobs = getJobs();
        const getJobs = async () => {
            const jobs = await getDocs(jobssCollectionRef);
            setAppliedjobs(jobs.docs.map((doc) => ({ ...doc.data(),
                id: doc.id
            })));
        };

        getJobs();
    }, []);

    //console.log(appliedjobs.length);
    console.log(appliedjobs);

    const navigate = useNavigate();

    const handleAddNewwJob = () => {
        navigate("/Map");
    };

    const handleDeleteAppliedJob = async (id) => {
        try {
            let jobs = await deleteDoc(doc(jobssCollectionRef, id));
            setRemoved(true);
            setAppliedjobs(jobs);
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setRemoved(true);
    };

    return ( <
        Box gridColumn = "span 4"
        gridRow = "span 2"
        backgroundColor = "primary"
        overflow = "auto" >
        <
        Snackbar open = {
            removed
        }
        autoHideDuration = {
            3000
        }
        onClose = {
            handleClose
        } >
        <
        Alert onClose = {
            handleClose
        }
        severity = "info"
        sx = {
            {
                width: "100%"
            }
        } >
        Job removed succesfully <
        /Alert> <
        /Snackbar> <
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
        fontWeight = "600" >
        Applied Jobs <
        /Typography> {
            appliedjobs ? .length >= 3 ? (
                ""
            ) : ( <
                Button onClick = {
                    handleAddNewwJob
                }
                variant = "contained"
                color = "info"
                borderRadius = "4px" >
                Add <
                /Button>
            )
        } <
        /Box> {
            appliedjobs ? .map((job, id) => ( <
                Box display = "flex"
                justifyContent = "space-between"
                alignItems = "center"
                borderBottom = {
                    `4px solid primary`
                }
                p = "15px" >
                {
                    appliedjobs.length === 0 ? ( <
                        Typography color = "green"
                        variant = "h5"
                        fontWeight = "100" >
                        No data to show <
                        /Typography>
                    ) : (
                        ""
                    )
                } <
                >
                <
                Typography color = "gray"
                variant = "h5"
                fontWeight = "100" > {
                    job.jobname
                } <
                /Typography> <
                Typography color = "white"
                variant = "h5"
                fontWeight = "100" > {
                    job.levelofPrep
                } <
                /Typography> <
                />

                <
                Button variant = "contained"
                color = "error"
                borderRadius = "4px"
                onClick = {
                    () => handleDeleteAppliedJob(job.id)
                } >
                Remove <
                /Button> <
                /Box>
            ))
        } <
        /Box>
    );
};

export default Appliedjobs;