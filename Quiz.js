import {
    Box
} from "@mui/system";
import React from "react";
import Likert from "react-likert-scale";

const Scaled = (props) => {
    let quiz = props.quiz;
    console.log(quiz);
    let response = props.response;
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
            {
                value: 6,
                text: 6
            },
            {
                value: 7,
                text: 7
            },
            {
                value: 8,
                text: 8
            },
            {
                value: 9,
                text: 9
            },
            {
                value: 10,
                text: 10
            },
        ],
        onChange: (val) => {
            console.log(val);
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

export default Scaled;