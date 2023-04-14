import {
    Box,
    Typography
} from "@mui/material";
import {
    DataGrid
} from "@mui/x-data-grid";
import {
    Button
} from "@material-ui/core";
import {
    useLocation,
    useNavigate
} from "react-router-dom";
import Navbar from "../../components/Navbar";

const ManageClass = ({
    setCurrUser
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedClass = location.state.clasData;

    console.log(selectedClass.students);
    selectedClass.students.map((students) => {
        console.log(students);
    });



    const stude = [{
            id: 1,
            name: "Jon Snow",
            email: "jonsnow@gmail.com",
            score: 35,
        },
        {
            id: 1,
            name: "Jon Snow",
            email: "jonsnow@gmail.com",
            score: 35,
        },
        {
            id: 1,
            name: "Jon Snow",
            email: "jonsnow@gmail.com",
            score: 35,
        },
    ];

    const columns = [{
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            cellClassName: "name-column--cell",
        },
    ];

    return ( <
        Box m = "20px" >
        <
        Navbar / >
        <
        Box m = "40px 0 0 0"
        height = "75vh"
        sx = {
            {
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: "#2e7c67",
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "blue",
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: "#f2f0f0",
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: "blue",
                },
                "& .MuiCheckbox-root": {
                    color: `"#1e5245" !important`,
                },
            }
        } >
        <
        Button sx = {
            {
                mb: 5
            }
        }
        onClick = {
            () => {
                navigate(-1);
            }
        }
        variant = "contained" >
        Back <
        /Button> <
        Typography color = "white" >
        Class Name: {
            selectedClass.className
        } <
        /Typography> <
        DataGrid rows = {
            selectedClass.students
        }
        columns = {
            columns
        }
        /> <
        /Box> <
        /Box>
    );
};

export default ManageClass;