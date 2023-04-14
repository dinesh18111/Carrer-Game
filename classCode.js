import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "../Auth/Input";
import {
    auth,
    createClass,
    db
} from "../../firebase";
import {
    Navigate,
    useNavigate
} from "react-router-dom";
import {
    v4 as uuidv4
} from "uuid";
import {
    addDoc,
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    getDoc,
    doc,
    arrayUnion,
} from "firebase/firestore";
import {
    Alert,
    Grid
} from "@mui/material";
import {
    UserContext
} from "../../UserContext";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    spacing: 4,
};

const initialState = {
    classCode: "",
    userName: "",
};

export default function EnterClassCodeModal() {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState("");
    const [clas, setClas] = React.useState([]);
    const [formData, setFormData] = React.useState(initialState);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {
        setUser
    } = React.useContext(UserContext);
    console.log(formData);

    const id = React.useId();

    const navigate = useNavigate();

    const signInPlayer = async () => {
        console.log(formData);
        const classCode = formData.classCode; // Name of the class to check
        const userName = formData.userName; // Name of the class to check
        console.log(classCode, userName);
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
        getDocs(qplayer)
            .then((querySnapshot) => {
                if (querySnapshot.size > 0) {
                    getDocs(qclass).then((querySnapshot) => {
                        if (querySnapshot.size > 0) {
                            querySnapshot.forEach((docSnapshot) => {
                                console.log(docSnapshot.id);
                                const clasesCollectionRef = collection(db, "classes");

                                const classDocRef = doc(clasesCollectionRef, docSnapshot.id);
                                const newStudent = {
                                    id: uuidv4(),
                                    name: formData.userName,
                                    email: `${formData.userName}@gmail.com`,
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

    const handleCheckClasscode = async () => {
        const className = formData.className; // Name of the class to check
        const userName = formData.userName; // Name of the class to check
        const classesCollectionRef = collection(db, "classes");
        const playersCollectionRef = collection(db, "players");
        const qclas = query(
            classesCollectionRef,
            where("className", "==", className)
        );
        const qplayer = query(
            playersCollectionRef,
            where("username", "==", userName)
        );
        getDocs(qclas)
            .then((querySnapshot) => {
                if (querySnapshot.size > 0) {
                    getDocs(qplayer).then((querySnapshot) => {
                        if (querySnapshot.size > 0) {
                            handleCreate(qplayer.firestore._authCredentials.currentUser.uid);
                        } else {
                            return setError(`Player ${userName} does not exists`);
                        }
                    });
                } else {
                    return setError(`Class ${className} does not exists`);
                    console.log(`Class "${className}" exists in the database`);
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };

    const handleCreate = (id) => {
        const userCollectionRef = doc(db, "players", id);
        getDoc(userCollectionRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    console.log(userData);
                    setUser(userData);
                    handleClose();
                    navigate("/planethome");
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    };

    const handleChange = (e) => {
        setFormData({ ...formData,
            [e.target.name]: e.target.value
        });
    };

    return ( <
        div >
        <
        Button onClick = {
            handleOpen
        }
        variant = "contained" >
        Class <
        /Button> <
        Modal aria - labelledby = "transition-modal-title"
        aria - describedby = "transition-modal-description"
        open = {
            open
        }
        onClose = {
            handleClose
        }
        closeAfterTransition BackdropComponent = {
            Backdrop
        }
        BackdropProps = {
            {
                timeout: 500,
            }
        } >
        <
        Fade in = {
            open
        } >
        <
        Box sx = {
            style
        } >
        <
        Typography sx = {
            {
                marginBottom: 2
            }
        }
        id = "transition-modal-title"
        variant = "h6"
        component = "h2" >
        Enter Player name and class code <
        /Typography> {
            error && ( <
                Alert sx = {
                    {
                        mb: 2
                    }
                }
                onClose = {
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
        Grid container spacing = {
            2
        } >
        <
        Input name = "userName"
        label = "User Name"
        handleChange = {
            handleChange
        }
        autoFocus /
        >
        <
        Input name = "classCode"
        label = "Class Name"
        handleChange = {
            handleChange
        }
        autoFocus /
        >
        <
        /Grid>

        <
        Button sx = {
            {
                ml: 24,
                mt: 2
            }
        }
        onClick = {
            signInPlayer
        }
        variant = "contained" >
        Enter <
        /Button> <
        Button sx = {
            {
                ml: 4,
                mt: 2
            }
        }
        onClick = {
            handleClose
        }
        variant = "contained" >
        Cancel <
        /Button> <
        /Box> <
        /Fade> <
        /Modal> <
        /div>
    );
}