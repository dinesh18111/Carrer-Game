import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
    createTheme,
    ThemeProvider
} from "@mui/material/styles";
import {
    Button,
    Step,
    StepButton,
    Stepper,
    Typography
} from "@mui/material";
import Dialogue from "./Modal/Dialogue";
import JobWalletModal from "./Modal/JobWalletModal";
import ComparatorModal from "./Modal/ComparatorModal";
import {
    essentials,
    workhabit
} from "../data/survey";
import LevelofPrep from "./Modal/LevelofPrep";

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
});
//const lightTheme = createTheme({ palette: { mode: "light" } });

export default function PaperCard({
    switchMode,
    levelPepJobs
}) {
    const [lvlofPrep, setLvlofPrep] = React.useState();
    React.useEffect(() => {
        setLvlofPrep(levelPepJobs);
    }, [levelPepJobs]);
    return ( <
        Grid container spacing = {
            2
        } > {
            [darkTheme].map((theme, index) => ( <
                >
                <
                Grid item xs = {
                    4
                }
                sx = {
                    {
                        ml: 20,
                        mt: 10
                    }
                }
                key = {
                    index
                } >
                <
                ThemeProvider theme = {
                    theme
                } >
                <
                Typography variant = "h3" > Tool Cupboard < /Typography>

                <
                Box sx = {
                    {
                        p: 2,
                        bgcolor: "background.default",
                        display: "grid",
                        gridTemplateColumns: {
                            md: "1fr"
                        },
                        gap: 2,
                    }
                } >
                <
                Stepper orientation = "vertical"
                activeStep = {
                    5
                } >
                <
                Step >
                <
                StepButton >
                <
                Dialogue sx = {
                    {
                        "& .Mui-completed": {
                            color: "green",
                        },
                    }
                }
                title = "Skills Assesment"
                quiz = {
                    essentials
                }
                /> <
                /StepButton> <
                /Step> <
                Step >
                <
                StepButton >
                <
                Dialogue title = "Work Habit"
                quiz = {
                    workhabit
                }
                /> <
                /StepButton> <
                /Step> <
                Step >
                <
                StepButton >
                <
                LevelofPrep title = "Level of Preparation"
                setLvlofPrep = {
                    setLvlofPrep
                }
                /> <
                /StepButton> <
                /Step> {
                    lvlofPrep > 0 ? ( <
                        >
                        <
                        Step >
                        <
                        StepButton >
                        <
                        JobWalletModal / >
                        <
                        /StepButton> <
                        /Step> <
                        Step >
                        <
                        StepButton >
                        <
                        ComparatorModal / >
                        <
                        /StepButton> <
                        /Step> <
                        />
                    ) : (
                        ""
                    )
                } <
                /Stepper> <
                Box sx = {
                    {
                        ml: 20
                    }
                } >
                <
                Button onClick = {
                    () => switchMode(false)
                }
                variant = "contained"
                borderRadius = {
                    4
                } >
                Exit Cupboard <
                /Button> <
                /Box> <
                /Box> <
                /ThemeProvider> <
                /Grid> <
                />
            ))
        } <
        /Grid>
    );
}