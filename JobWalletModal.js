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
import Appliedjobs from "../Appliedjobs/Appliedjobs";
import {
    useLocation,
    useParams
} from "react-router-dom";

export default function JobWalletModal(props) {
    const [open, setOpen] = React.useState(false);

    const location = useLocation();
    console.log(location.pathname);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return ( <
        div > {
            location.pathname === "/JobListPage" ? ( <
                Button variant = "contained"
                onClick = {
                    handleClickOpen
                } >
                Job Wallet <
                /Button>
            ) : ( <
                Button variant = "text"
                onClick = {
                    handleClickOpen
                } >
                Job Wallet <
                /Button>
            )
        }

        <
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
                    width: "100%",
                    color: "grey",
                },
            }
        } >
        <
        DialogTitle id = "alert-dialog-title" > {
            props.title
        } < /DialogTitle> <
        DialogContent >
        <
        >
        <
        Appliedjobs setOpen = {
            setOpen
        }
        /> <
        Divider variant = "li" / >
        <
        /> <
        /DialogContent> <
        DialogActions >
        <
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