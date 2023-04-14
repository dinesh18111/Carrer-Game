import {
    Avatar,
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import React, {
    useState,
    useEffect
} from "react";
import {
    useContext
} from "react";
import {
    UserContext
} from "../../UserContext";
import {
    useNavigate
} from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
    auth,
    signIn,
    signUp
} from "../../firebase";
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./icon";
import {
    useDispatch
} from "react-redux";
import {
    Alert
} from "@mui/material";
import background from "../../img/logbg.jpg";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "teacher",
};

const Authteacher = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState("");
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        setUser
    } = useContext(UserContext);

    const handleChange = (e) => {
        setFormData({ ...formData,
            [e.target.name]: e.target.value
        });
    };
    console.log(formData);

    const handleSubmit = async (e) => {
        setError("");
        e.preventDefault();
        if (isSignup) {
            if (formData.password !== formData.confirmPassword) {
                return setError("Passwords do not match");
            }
            await signUp(formData);
            switchMode();
        } else {
            await signIn(formData);
            setUser(formData);
            navigate("/classes");
        }
    };

    const handleShowPassword = () => {
        setShowPassword((prevShowPass) => !prevShowPass);
    };
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
        console.log("switch mode");
    };

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
        Container component = "main"
        maxWidth = "xs" >
        <
        Paper className = {
            classes.paper
        }
        elevation = {
            3
        } >
        <
        Avatar className = {
            classes.avatar
        } >
        <
        LockOutlinedIcon / >
        <
        /Avatar> <
        Typography variant = "h5" > {
            isSignup ? "Teacher Registration" : "Teacher Login"
        } <
        /Typography> <
        form className = {
            classes.form
        }
        onSubmit = {
            handleSubmit
        } >
        <
        Grid container spacing = {
            2
        } > {
            isSignup && ( <
                > {
                    error && ( <
                        Alert onClose = {
                            () => {
                                setError("");
                            }
                        }
                        severity = "warning" >
                        {
                            error
                        } <
                        /Alert>
                    )
                } <
                Input name = "firstName"
                label = "First Name"
                handleChange = {
                    handleChange
                }
                autoFocus half /
                >
                <
                Input name = "lastName"
                label = "Last Name"
                handleChange = {
                    handleChange
                }
                half /
                >
                <
                />
            )
        } <
        Input name = "email"
        label = "Email Address"
        handleChange = {
            handleChange
        }
        type = "email" /
        >
        <
        Input name = "password"
        label = "Password"
        handleChange = {
            handleChange
        }
        type = {
            showPassword ? "text" : "password"
        }
        handleShowPassword = {
            handleShowPassword
        }
        /> {
            isSignup && ( <
                Input name = "confirmPassword"
                label = "Confirm Password"
                handleChange = {
                    handleChange
                }
                type = {
                    showPassword ? "text" : "password"
                }
                handleShowPassword = {
                    handleShowPassword
                }
                />
            )
        } <
        /Grid> <
        Button type = "submit"
        fullWidth variant = "contained"
        color = "primary"
        className = {
            classes.submit
        } >
        {
            isSignup ? "Sign Up" : "Sign In"
        } <
        /Button> <
        Grid container justifyContent = "flex-end" >
        <
        Grid item >
        <
        Button variant = "contained"
        onClick = {
            switchMode
        } > {
            isSignup ?
            "Already have an account? Sign In" :
                "Dont have an account? Sign Up"
        } <
        /Button> <
        /Grid> <
        /Grid> <
        /form> <
        /Paper> <
        /Container> <
        /Grid>
    );
};

export default Authteacher;