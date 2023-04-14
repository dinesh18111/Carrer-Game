import {
    Avatar,
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import {
    doc,
    getDocs,
    collection,
    where,
    query,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import background from "../../img/logbg.jpg";
import React, {
    useState,
    useEffect,
    useContext
} from "react";
import {
    useNavigate
} from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./icon";
import {
    useDispatch
} from "react-redux";
import {
    auth,
    db,
    signUp,
    signUpPlayer
} from "../../firebase";
import {
    Alert
} from "@mui/material";
import {
    signInWithEmailAndPassword
} from "firebase/auth";
import {
    UserContext
} from "../../UserContext";
import {
    v4 as uuidv4
} from "uuid";

//import { signIn, signUp } from "../../actions/auth";

const initialState = {
    username: "",
    email: "",
    classcode: "",
    password: "",
    confirmPassword: "",
    type: "student",
};

const Authplayer = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState("");
    const [selectedClass, setSelectedClass] = useState();
    console.log(selectedClass);
    const {
        user
    } = useContext(UserContext);
    console.log(user);

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
        console.log(formData);
    };

    const handleShowPassword = () => {
        setShowPassword((prevShowPass) => !prevShowPass);
    };
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
        console.log("switch mode");
    };

    const handleSubmit = async (e) => {
        setError("");
        e.preventDefault();
        if (isSignup) {
            if (formData.password !== formData.confirmPassword) {
                return setError("Passwords do not match");
            }
            await signUpPlayer(formData);
            switchMode();
        } else {
            try {
                await signInPlayer(formData, setError);
            } catch (exceptionVar) {}
        }
    };

    // const classesCollectionRef = collection(db, "classes");
    // const query = query(
    //   classesCollectionRef,
    //   where("className", "==", formData.classcode)
    // );

    // getDocs(query).then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id, " => ", doc.data());
    //     // Use doc.data() to access the data of the class document
    //   });
    // });

    // Define a function to get the class with the given className
    console.log(selectedClass);
    console.log(formData);
    let dar = selectedClass;
    console.log(dar);
    //console.log(selectedClass.students.push(formData.username));
    const AddPlayertoClass = (player, daro) => {
        console.log(player);
        console.log(daro ? .students.push(formData.username));
    };

    const signInPlayer = async (formData, setError) => {
        const classCode = formData.classcode; // Name of the class to check
        const userName = formData.username; // Name of the class to check
        const pass = formData.password; // Name of the class to check
        const classesCollectionRef = collection(db, "classes");
        const playersCollectionRef = collection(db, "players");
        const qclass = query(
            classesCollectionRef,
            where("className", "==", classCode)
        );
        console.log(qclass);
        const qplayer = query(
            playersCollectionRef,
            where("username", "==", userName)
        );
        const qpass = query(playersCollectionRef, where("password", "==", pass));
        getDocs(qplayer)
            .then((querySnapshot) => {
                if (querySnapshot.size > 0) {
                    getDocs(qclass).then((querySnapshot) => {
                        if (querySnapshot.size > 0) {
                            querySnapshot.forEach((docSnapshot) => {
                                console.log(docSnapshot.id);
                                setSelectedClass(docSnapshot.data());
                                // Get a reference to the "classes" collection
                                //const classesRef = collection(db, "classes");

                                // Get a reference to the specific class document
                                const clasesCollectionRef = collection(db, "classes");

                                const classDocRef = doc(clasesCollectionRef, docSnapshot.id);

                                // Add a player to the "students" field of the class document
                                // Update the "students" field of the class document
                                const newStudent = {
                                    id: uuidv4(),
                                    name: formData.username,
                                    email: formData.email,
                                };
                                updateDoc(classDocRef, {
                                        students: arrayUnion(newStudent),
                                    })
                                    .then(() => {
                                        console.log("Player added to class successfully!");
                                        console.log("exist");
                                        navigate("/planethome");
                                        setUser(formData);
                                    })
                                    .catch((error) => {
                                        console.error("Error adding player to class: ", error);
                                    });
                            });
                        } else {
                            console.log("never");
                            return setError(`Class ${classCode} does not exist exists`);
                        }
                    });
                } else {
                    return setError(`Username ${userName} does not exist exists`);
                }
            })

            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
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
            isSignup ? "Player Registration" : "Player Login"
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
        }

        {
            isSignup && ( <
                >
                <
                Input name = "username"
                label = "Username"
                handleChange = {
                    handleChange
                }
                /> <
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
                /> <
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
                /> <
                />
            )
        }

        {
            !isSignup && ( <
                >
                <
                Input name = "username"
                label = "Username"
                handleChange = {
                    handleChange
                }
                /> {
                    /* <Input
                                        name="email"
                                        label="Email Address"
                                        handleChange={handleChange}
                                        type="email"
                                      /> */
                } <
                Input name = "classcode"
                label = "Class Code "
                handleChange = {
                    handleChange
                }
                type = "classcode" /
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
                /> <
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
        Button onClick = {
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

export default Authplayer;