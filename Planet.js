import {
    Alert,
    Box,
    Button,
    Fab,
    Grid,
    Snackbar,
    Tooltip,
} from "@mui/material";
import React, {
    useContext,
    useEffect,
    useState
} from "react";
import {
    useNavigate
} from "react-router-dom";
import {
    PolygonCard
} from "react-awesome-shapes/dist/shapes/polygonCard";
import HandymanTwoToneIcon from "@mui/icons-material/HandymanTwoTone";
import PaperCard from "../../components/PaperCard";
import {
    Stack
} from "@mui/system";
import JobWalletModal from "../../components/Modal/JobWalletModal";
import background from "../../img/mapbgedt.jpeg";
import {
    jobs
} from "../../data/survey";
import {
    collection,
    doc,
    getDoc
} from "firebase/firestore";
import {
    auth,
    db
} from "../../firebase";
import {
    UserContext
} from "./../../UserContext";

const Planet = () => {
    const [levelPepJobs, setLevelPepJobs] = useState();
    console.log("jobs");
    console.log(jobs);
    const usersCollectionRef = collection(db, "players");
    const currentUserDocRef = doc(usersCollectionRef, auth.currentUser.uid);
    const navigate = useNavigate();
    const [showCupB, setshowCupB] = useState(false);
    const {
        setUser
    } = useContext(UserContext);

    useEffect(() => {
        getDoc(currentUserDocRef)
            .then((doc) => {
                if (doc.exists()) {
                    const user = doc.data();
                    const levelofPrep = user.levelofPrep;
                    console.log(levelofPrep);
                    setLevelPepJobs(levelofPrep);
                } else {
                    console.log("User does not exist");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleMap = () => {
        setshowCupB(false);
        navigate("/Map");
    };
    const handleInvetory = () => { <
        JobWalletModal / > ;
    };

    const handleExit = () => {
        setshowCupB(false);
        setUser(null);
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
            handleInvetory
        } >
        <
        JobWalletModal / >
        <
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

    const handleClose = () => {};

    return ( <
        >
        <
        Snackbar anchorOrigin = {
            {
                vertical: "top",
                horizontal: "center"
            }
        }
        open = {
            levelPepJobs > 0 ? false : true
        } >
        <
        Alert severity = "info"
        sx = {
            {
                width: "100%"
            }
        } >
        Fill your passport to apply
        for jobs <
        /Alert> <
        /Snackbar> {
            !showCupB && ( <
                Grid container spacing = {
                    2
                }
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
                Tooltip title = "Open Cupboard" >
                <
                Box sx = {
                    {
                        mt: 30,
                        ml: 10
                    }
                } >
                <
                >
                <
                Button variant = "label"
                color = "info"
                size = "large"
                onClick = {
                    switchMode
                }
                sx = {
                    {
                        fontSize: 16,
                        padding: "6px 12px",
                        lineHeight: 1.5,
                        fontFamily: [
                            "-apple-system",
                            "BlinkMacSystemFont",
                            '"Segoe UI"',
                            "Roboto",
                            '"Helvetica Neue"',
                            "Arial",
                            "sans-serif",
                            '"Apple Color Emoji"',
                            '"Segoe UI Emoji"',
                            '"Segoe UI Symbol"',
                        ].join(","),
                    }
                } >
                <
                HandymanTwoToneIcon sx = {
                    {
                        mr: 2
                    }
                }
                /> <
                Box zIndex = {
                    2
                }
                sx = {
                    {
                        mr: 2
                    }
                } >
                Tool Cupboard <
                /Box> <
                PolygonCard height = "350px"
                width = "250px"
                zIndex = {
                    1
                }
                color = "linear-gradient(135deg, #753a00, #ff7b00c9)" /
                >
                <
                /Button> <
                /> <
                /Box> <
                /Tooltip> <
                /Grid> <
                Grid item xs = {
                    6
                } > < /Grid> <
                Grid item xs = {
                    3
                } >
                <
                Box sx = {
                    {
                        mt: 35
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
        } {
            showCupB && ( <
                Grid container spacing = {
                    2
                } >
                <
                Grid item xs = {
                    10
                } >
                <
                PaperCard switchMode = {
                    switchMode
                }
                levelPepJobs = {
                    levelPepJobs
                }
                /> <
                /Grid> <
                Grid item xs = {
                    2
                } >
                <
                Box sx = {
                    {
                        mt: 35
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

export default Planet; {
    /* <ButtonGroup
                  orientation="vertical"
                  aria-label="vertical contained button group"
                  variant="contained"
                  fullWidth="true"
                  color="info"
                  sx={{
                    "& .MuiButtonGroup-grouped": {
                      minWidth: "40px",
                    },
                  }}
                ></ButtonGroup> */
}