import {
    Box
} from "@mui/system";
import React from "react";
import Likert from "react-likert-scale";

const Scaledlevl = ({
    setLevelofPrep
}) => {
    let quiz = "Level of Preparaation";
    console.log(quiz);
    const likertOptions = {
        question: quiz,
        responses: [{
                value: 1,
                text: 1
            },
            {
                value: 2,
                text: 2
            },
            {
                value: 3,
                text: 3,
                checked: true
            },
            {
                value: 4,
                text: 4
            },
            {
                value: 5,
                text: 5
            },
        ],
        onChange: (val) => {
            console.log(val);
            setLevelofPrep(val);
        },
    };

    return ( <
        Box sx = {
            {
                my: 5
            }
        } >
        <
        Likert { ...likertOptions
        }
        /> <
        /Box>
    );
};

export default Scaledlevl;