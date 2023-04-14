import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Input from "../Auth/Input";
import firebase from "../../firebase";
import "firebase/database";
import {
    createClass,
    db
} from "../../firebase";
import {
    Navigate,
    useNavigate
} from "react-router-dom";
import {
    addDoc,
    collection,
    query,
    where,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import {
    getDatabase,
    ref,
    child,
    get
} from "firebase/database";
import {
    Alert
} from "@mui/material";

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
    className: "",
    students: [],
};

export default function AddClassModal() {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState("");
    const [clas, setClas] = React.useState([]);
    const [formData, setFormData] = React.useState(initialState);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const id = React.useId();
    const navigate = useNavigate();

    console.log(formData);

    const className = formData.className; // Name of the class to check
    const jobsCollectionRef = collection(db, "classes");

    const handleCreateClass = async () => {
        const className = formData.className; // Name of the class to check
        const jobsCollectionRef = collection(db, "classes");
        const q = query(jobsCollectionRef, where("className", "==", className));
        getDocs(q)
            .then((querySnapshot) => {
                if (querySnapshot.size > 0) {
                    return setError(`Class ${className} already exists`);
                    console.log(`Class "${className}" exists in the database`);
                } else {
                    handleCreate();
                    handleClose();
                    console.log(`Class "${className}" does not exist in the database`);
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };

    // // const handleCreate = () => {
    // //   console.log(formData);
    // //   //createClass(formData);
    // //   handleClose();
    // // };

    const handleCre = () => {
        const itemName = formData.className; //.toLocaleLowerCase; // Name of the item to check
        //const itemsRef = firebase.database().ref("items");

        jobsCollectionRef
            .orderByChild("className")
            .equalTo(itemName)
            .once("value", (snapshot) => {
                if (snapshot.exists()) {
                    console.log(`Item "${itemName}" exists in the database`);
                } else {
                    console.log(`Item "${itemName}" does not exist in the database`);
                }
            });
    };

    const handleCreate = async () => {
        console.log(formData);
        await addDoc(jobsCollectionRef, formData);
        handleClose();
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
        Set a new class <
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
        Set up a new class <
        /Typography> {
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
        Input name = "className"
        label = "Class Name"
        handleChange = {
            handleChange
        }
        autoFocus /
        >
        <
        Button sx = {
            {
                ml: 24,
                mt: 2
            }
        }
        onClick = {
            handleCreateClass
        }
        variant = "contained" >
        Save <
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