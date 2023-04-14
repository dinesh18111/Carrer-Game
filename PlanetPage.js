import {
    Box,
    Fab,
    Grid,
    Tooltip,
    Typography
} from "@mui/material";
import React, {
    useContext,
    useState
} from "react";
import {
    useLocation,
    useNavigate
} from "react-router-dom";
import {
    Stack
} from "@mui/system";
import {
    jobs
} from "../../data/survey";
import {
    UserContext
} from "./../../UserContext";

const PlanetPage = () => {
    const navigate = useNavigate();
    //const [jobs, setJobs] = useState([]);
    const location = useLocation();

    // Get the planetData state from the location object
    const planetData = location.state;
    const streets = location.state.planetData.planetStreets;
    const {
        setUser
    } = useContext(UserContext);

    //setJobs(jobs);
    console.log("jobs");
    console.log(jobs);
    const imgBg = {
        jobs
    };
    console.log(planetData.planetData);
    console.log(streets); {
        streets.map((s, i) => {
            console.log("s.jobs");
            console.log(s.jobs);
        });
    }

    const handleMap = () => {
        setshowCupB(false);
        navigate("/Map");
    };
    const [showCupB, setshowCupB] = useState(false);

    const handleExit = () => {
        setshowCupB(false);
        setUser(null);
    };

    const handleOpenRoad = (street) => {
        setshowCupB(false);
        navigate("/JobListPage", {
            state: {
                streetData: street
            }
        });
    };

    const buttons = [ <
        Fab variant = "extended"
        onClick = {
            handleMap
        } >
        Map <
        /Fab>, <
        Fab variant = "extended"
        onClick = {
            handleExit
        } >
        Exit <
        /Fab>,
    ];

    const switchMode = () => {
        setshowCupB((prevIsSignup) => !prevIsSignup);
    };

    return ( <
        > {
            /* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                        This is a success message!
                      </Alert>
                    </Snackbar> */
        } {
            !showCupB && ( <
                Grid container spacing = {
                    2
                }
                style = {
                    {
                        backgroundImage: `url(${planetData.planetData.bgImg})`,
                        fontSize: "50px",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        height: "100vh",
                    }
                } >
                <
                Grid item xs = {
                    3
                } >
                <
                Tooltip title = "Open Cupboard" >
                <
                Box sx = {
                    {
                        mt: 40,
                        ml: 10
                    }
                } >
                <
                Stack spacing = {
                    2
                } > {
                    streets.map((s, i) => {
                        return ( <
                            Fab variant = "extended"
                            onClick = {
                                () => handleOpenRoad(s)
                            } > {
                                s.streetName
                            } <
                            /Fab>
                        );
                    })
                } <
                /Stack> <
                /Box> <
                /Tooltip> <
                /Grid> <
                Grid item xs = {
                    5
                }
                sx = {
                    {
                        mt: 10,
                        ml: 5
                    }
                } >
                <
                Typography sx = {
                    {
                        textTransform: "uppercase"
                    }
                }
                variant = "h4"
                color = "white" >
                {
                    planetData.planetData.planetName
                } <
                /Typography> <
                /Grid> <
                Grid item xs = {
                    3
                } >
                <
                Box sx = {
                    {
                        mt: 40
                    }
                } >
                <
                Stack spacing = {
                    2
                } > {
                    buttons
                } < /Stack> <
                /Box> <
                /Grid> <
                /Grid>
            )
        } <
        />
    );
};

export default PlanetPage;