import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Scaled from "../Quiz";
import {
    Divider
} from "@mui/material";

export default function Dialogue(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return ( <
        div >
        <
        Button variant = "text"
        onClick = {
            handleClickOpen
        } > {
            props.title
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
            props.title
        } < /DialogTitle> <
        DialogContent > {
            props.quiz.map((item) => ( <
                >
                <
                Scaled quiz = {
                    item.quiz
                }
                /> <
                Divider variant = "li" / >
                <
                />
            ))
        } <
        /DialogContent> <
        DialogActions >
        <
        Button onClick = {
            handleClose
        } > SUBMIT < /Button> <
        Button onClick = {
            handleClose
        }
        autoFocus >
        cANCEL <
        /Button> <
        /DialogActions> <
        /Dialog> <
        /div>
    );
}