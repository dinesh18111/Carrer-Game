import {
    Box,
    Button,
    Typography,
    useTheme
} from "@mui/material";
import {
    DataGrid
} from "@mui/x-data-grid";
import {
    Link,
    NavLink,
    useNavigate
} from "react-router-dom";
import TransitionsModal from "../Modal/Modal";
import Navbar from "../Navbar";
//import Header from "../../components/Header";

const Classes = ({
    setCurrUser,
    clases
}) => {
    const navigate = useNavigate();
    console.log(clases);
    const manageClass = (row) => {
        navigate("/classes/classeDetails", {
            state: {
                clasData: row
            },
        });
    };
    const columns = [{
            field: "className",
            headerName: "Class Code",
            flex: 1,
        },
        {
            field: "",
            flex: 1,
            renderCell: ({
                row
            }, params) => {
                console.log("row data:", row);

                return ( <
                    Box width = "20%"
                    m = "0 auto"
                    display = "flex"
                    justifyContent = "center"
                    backgroundColor = "#3da58a"
                    borderRadius = "4px" >
                    {
                        /* <NavLink
                                      style={{ textDecoration: "none" }}
                                      to={`/classes/${classes.mapclass.id}
                                    >
                                      
                                    </NavLink> */
                    } { /* <Link to={`/classes/${rowData.id}`}>{rowData.id}</Link> */ } <
                    Button onClick = {
                        () => manageClass(row)
                    } >
                    <
                    Typography color = "#141414"
                    sx = {
                        {
                            ml: "5px"
                        }
                    } >
                    Manage <
                    /Typography> <
                    /Button> <
                    /Box>
                );
            },
        },
    ];

    return ( <
        Box m = "20px" >
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
                    backgroundColor: "green",
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: "#f2f0f0",
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: "green",
                },
                "& .MuiCheckbox-root": {
                    color: `"#1e5245" !important`,
                },
            }
        } >
        <
        Box sx = {
            {
                flexDirection: "row-reverse",
                ml: 138,
                mb: 2
            }
        } >
        <
        TransitionsModal / >
        <
        /Box> <
        DataGrid rows = {
            clases
        }
        columns = {
            columns
        }
        /> <
        /Box> <
        /Box>
    );
};

export default Classes;