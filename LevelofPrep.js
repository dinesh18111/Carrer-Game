import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
    Box,
    Divider,
    Paper,
    Stack
} from "@mui/material";
import {
    styled
} from "@mui/material/styles";
import Scaledlevl from "../Scaledlevl";
import {
    auth,
    db
} from "../../firebase";
import {
    doc,
    updateDoc
} from "firebase/firestore";
import {
    UserContext
} from "../../UserContext";

export default function LevelofPrep({
    title,
    setLvlofPrep
}) {
    const [open, setOpen] = React.useState(false);
    const [levelofPrep, setLevelofPrep] = React.useState(0);
    const {
        user
    } = React.useContext(UserContext);
    console.log(user);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log(levelofPrep);

    const handleSaveLevelofPrep = () => {
        const user = auth.currentUser;
        const userId = user.uid;
        console.log(user);
        const updateData = {
            levelofPrep: levelofPrep.value,
        };
        setLvlofPrep(updateData.levelofPrep);
        const userCollectionRef = doc(db, "players", userId);

        updateDoc(userCollectionRef, updateData)
            .then(() => {
                console.log("Document updated successfully");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });

        handleClose();
    };

    const Item = styled(Paper)(({
        theme
    }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    const text = [
        "Level 1:	0 to < 1 year",
        "Level 2:	1 to < 2 years",
        "Level 3:	2 to 4 years",
        "Level 4:	> 4 years and less than 8 years",
        "Level 5:	8 years and more",
    ];

    return ( <
        div >
        <
        Button variant = "text"
        onClick = {
            handleClickOpen
        } > {
            title
        } <
        /Button> <
        Dialog open = {
            open
        }
        onClose = {
            handleClose
        }
        aria - labelledby = "alert-dialog-title"
        aria - describedby = "alert-dialog-description"
        fullWidth = {
            true
        }
        sx = {
            {
                "& .MuiDialog-container": {
                    width: "70%",
                },
            }
        } >
        <
        DialogTitle id = "alert-dialog-title" > {
            title
        } < /DialogTitle> <
        DialogContent >
        <
        Box sx = {
            {
                width: "100%"
            }
        } >
        <
        Stack spacing = {
            2
        } > {
            text.map((value) => ( <
                Item > {
                    value
                } < /Item>
            ))
        } <
        /Stack> <
        /Box> <
        Scaledlevl setLevelofPrep = {
            setLevelofPrep
        }
        /> <
        Divider variant = "li" / >
        <
        /DialogContent> <
        DialogActions >
        <
        Button onClick = {
            handleSaveLevelofPrep
        } > SUBMIT < /Button> <
        Button onClick = {
            handleClose
        }
        autoFocus >
        CANCEL <
        /Button> <
        /DialogActions> <
        /Dialog> <
        /div>
    );
}