import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const weights = {
    skills: 0.4,
    habits: 0.3,
    interest: 0.2,
    preps: 0.1,
};

function getWeightedAverage(job) {
    let weightedSum = 0;
    Object.keys(weights).forEach((category) => {
        weightedSum += job[category] * weights[category];
    });
    return weightedSum.toFixed(1);
}

const CompTaable = ({
    jobs
}) => {
    return ( <
        TableContainer component = {
            Paper
        } >
        <
        Table >
        <
        TableHead >
        <
        TableRow >
        <
        TableCell > Job < /TableCell> <
        TableCell > Skills < /TableCell> <
        TableCell > Habits < /TableCell> <
        TableCell > Interests < /TableCell> <
        TableCell > Preparation < /TableCell> <
        TableCell > Weighted < /TableCell> <
        /TableRow> <
        /TableHead> <
        TableBody > {
            jobs.map((job) => ( <
                TableRow key = {
                    job.jobName
                } >
                <
                TableCell > {
                    job.jobName
                } < /TableCell> <
                TableCell > {
                    job.skills
                } < /TableCell> <
                TableCell > {
                    job.habits
                } < /TableCell> <
                TableCell > {
                    job.interest
                } < /TableCell> <
                TableCell > {
                    job.preps
                } < /TableCell> <
                TableCell > {
                    getWeightedAverage(job)
                } < /TableCell> <
                /TableRow>
            ))
        } <
        /TableBody> <
        /Table> <
        /TableContainer>
    );
};

export default CompTaable;