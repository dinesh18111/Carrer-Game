import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Scaled from "../Quiz";
import {
    Divider,
    Typography
} from "@mui/material";
import Comparator from "../Comparator";
import CsvDownloader from "react-csv-downloader";
import Compfin from "../Compfin";
import CustomBarChart from "../Charts/BarChart";
import {
    Box
} from "@mui/system";
import CompTaable from "../Tables/CompTable";
import AccrossJobChart from "../Charts/AccrossJobChart";
import autoTable from "jspdf-autotable";
import moment from "moment/moment";
import {
    UserContext
} from "../../UserContext";

export default function ComparatorModal(props) {
    const [open, setOpen] = React.useState(false);

    const {
        user
    } = React.useContext(UserContext);
    console.log(user);

    const pdfTableRef = React.useRef();
    const pdfChartRef = React.useRef();
    const pdfChartWeightedRef = React.useRef();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [{
            id: "first",
            displayName: "Name",
        },
        {
            id: "second",
            displayName: "Value",
        },
    ];

    const jobs = [{
            jobName: "Cashier",
            preps: 85,
            interest: 70,
            habits: 75,
            skills: 90
        },
        {
            jobName: "Lawyer",
            preps: 80,
            interest: 75,
            habits: 85,
            skills: 90
        },
        {
            jobName: "Nurse",
            preps: 90,
            interest: 80,
            habits: 85,
            skills: 95
        },
    ];

    const compOutput = [{
            jobName: "Cashier",
            preps: 85,
            interest: 70,
            habits: 75,
            skills: 90,
        },
        {
            jobName: "Lawyer",
            preps: 80,
            interest: 75,
            habits: 85,
            skills: 90,
        },
        {
            jobName: "Nurse",
            preps: 90,
            interest: 80,
            habits: 85,
            skills: 95,
        },
    ];

    const datas = [{
            first: "Working Safety",
            second: 5,
        },
        {
            first: "Teamwork",
            second: 7,
        },
        {
            first: "Reliability",
            second: 5,
        },
        {
            first: "Organizations",
            second: 6,
        },
        {
            first: "Working independently",
            second: 3,
        },
        {
            first: "Initiative",
            second: 4,
        },
        {
            first: "Self-advocacy",
            second: 9,
        },
        {
            first: "Enterpreneurship",
            second: 6,
        },
        {
            first: "Interest Score",
            second: 2,
        },
        {
            first: "Prep Level",
            second: 9,
        },
        {
            first: "Action Plan",
            second: 6,
        },
        {
            first: "Leadership Skills",
            second: 2,
        },
    ];

    const getPdfData = async () => {
        let pdfData = [];

        var table = pdfTableRef.current.querySelector("#table-comp");
        const chart = pdfChartRef.current.querySelector("#chart-comp");
        var chartWeighted =
            pdfChartWeightedRef.current.querySelector("#chart-accros");

        const tableCanvas = await html2canvas(table);
        const chartCanvas = await html2canvas(chart);
        const chartWeightedCanvas = await html2canvas(chartWeighted);
        const tableData = tableCanvas.toDataURL("image/png");
        const chartImgData = chartCanvas.toDataURL("image/png");
        const chartWeightedImgData = chartWeightedCanvas.toDataURL("image/png");
        let boxWidth = 210;
        let boxHeight = 50;
        let imgWidth = 210;
        var imgHeight = 200;

        pdfData.push(
            chartImgData,
            tableData,
            chartWeightedImgData,
            boxHeight,
            boxWidth,
            imgHeight,
            imgWidth
        );

        const pdf = new jsPDF();

        html2canvas(table, {
            scale: 2
        }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pageWidth = pdf.internal.pageSize.getWidth() / 2;

            pdf.text("Comparater Report", pageWidth, 5, null, "center");
            pdf.text(`Name: ${user.username}`, pageWidth, 20, null, "center");
            pdf.text(
                `Email: ${user.email ? user.email : "NA"}`,
                pageWidth,
                30,
                null,
                "center"
            );
            pdf.text(`Class code: ${user.classcode}`, pageWidth, 40, null, "center");
            // pdf.text(username, pageWidth, 30, null, "center");

            pdf.addImage(imgData, "PNG", 30, 50, 140, 80);

            pdf.addImage(pdfData[0], "JPEG", 10, 150, 100, 100);

            pdf.addImage(pdfData[2], "JPEG", 100, 150, 100, 100);
            pdf.save(moment().format("lll"));
        });
    };

    return ( <
        div >
        <
        Button variant = "text"
        onClick = {
            handleClickOpen
        } >
        Comparator <
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
                "& .MuiDialog-container": {},
            }
        } >
        <
        DialogTitle id = "alert-dialog-title" > {
            props.title
        } < /DialogTitle> <
        DialogContent >
        <
        div ref = {
            pdfTableRef
        } >
        <
        Box sx = {
            {
                justifyContent: "center",
                mt: 5,
                mb: 2
            }
        } >
        <
        Typography > Applied Jobs Comparator List < /Typography> <
        /Box> <
        div id = "table-comp" >
        <
        CompTaable jobs = {
            compOutput
        }
        /> <
        /div> <
        /div>

        <
        Box sx = {
            {
                width: "100%",
                flexDirection: "row"
            }
        } >
        <
        Box >
        <
        Box sx = {
            {
                justifyContent: "center",
                mt: 5,
                mb: 2
            }
        } >
        <
        Typography > Comparison by Applied Jobs < /Typography> <
        /Box> <
        div ref = {
            pdfChartRef
        } >
        <
        div id = "chart-comp" >
        <
        CustomBarChart compOutput = {
            compOutput
        }
        /> <
        /div> <
        /div> <
        /Box> <
        Box sx = {
            {
                justifyContent: "center",
                mt: 5,
                mb: 2
            }
        } >
        <
        Typography > Matching Accross three Jobs < /Typography> <
        /Box> <
        div ref = {
            pdfChartWeightedRef
        } >
        <
        div id = "chart-accros" >
        <
        AccrossJobChart compOutput = {
            compOutput
        }
        /> <
        /div> <
        /div> <
        /Box> <
        /DialogContent> <
        DialogActions >
        <
        Button onClick = {
            getPdfData
        }
        autoFocus >
        Download Report <
        /Button>

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