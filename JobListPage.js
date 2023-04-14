import {
    Alert,
    Button,
    Divider,
    Fab,
    Snackbar,
    Typography,
} from "@mui/material";
import {
    Box
} from "@mui/system";
import {
    collection,
    doc,
    getDoc
} from "firebase/firestore";
import React, {
    useEffect,
    useState
} from "react";
import {
    useLocation,
    useNavigate
} from "react-router-dom";
import JobDetails from "../../components/Appliedjobs/JobDetails";
import JobWalletModal from "../../components/Modal/JobWalletModal";
import {
    auth,
    db
} from "../../firebase";

const JobListPage = () => {
    const [levelPepJobs, setLevelPepJobs] = useState([]);

    const location = useLocation();

    const jobsData = location.state.streetData.jobs;
    const streetName = location.state.streetData.streetName;
    const user = auth.currentUser;
    const usersCollectionRef = collection(db, "players");
    const currentUserDocRef = doc(usersCollectionRef, user.uid);

    const jobsWithUserLevelOfPrep = jobsData.filter(
        (job) => job.levelofPrep <= levelPepJobs
    );

    console.log(jobsData);
    console.log(jobsWithUserLevelOfPrep);

    const handlePassport = () => {
        navigate("/planethome");
    };

    useEffect(() => {
        getDoc(currentUserDocRef)
            .then((doc) => {
                if (doc.exists()) {
                    const user = doc.data();
                    const levelofPrep = user.levelofPrep;
                    setLevelPepJobs(levelofPrep);
                } else {
                    console.log("User does not exist");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [currentUserDocRef]);

    const navigate = useNavigate();
    return ( <
        >
        <
        Box sx = {
            {
                mt: 5,
                display: "flex"
            }
        } >
        <
        Button onClick = {
            () => {
                navigate(-1);
            }
        }
        variant = "contained" >
        Back <
        /Button> <
        Box sx = {
            {
                ml: 70
            }
        } >
        <
        Typography variant = "h4"
        color = "grey"
        fontWeight = "600" >
        Job List <
        /Typography> <
        /Box> <
        Box sx = {
            {
                ml: 42
            }
        } >
        <
        JobWalletModal / >
        <
        /Box> <
        /Box> {
            jobsWithUserLevelOfPrep ? .length > 0 ? ( <
                >
                <
                JobDetails jobs = {
                    jobsWithUserLevelOfPrep
                }
                streetName = {
                    streetName
                }
                />; <
                Divider variant = "li"
                color = "grey" / > ; <
                />
            ) : ( <
                Box sx = {
                    {
                        mt: 25,
                        ml: 73
                    }
                } >
                <
                Typography color = "white" >
                Please fill your passport to view jobs <
                /Typography> <
                Box sx = {
                    {
                        mt: 5,
                        ml: 5
                    }
                } >
                <
                Fab variant = "extended"
                onClick = {
                    handlePassport
                } >
                Fill passport <
                /Fab> <
                /Box> <
                /Box>
            )
        }; <
        />
    );
};

export default JobListPage;