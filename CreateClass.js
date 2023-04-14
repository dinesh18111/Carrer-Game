import React, {
    useEffect,
    useState
} from "react";
import {
    Box
} from "@mui/material";
import Classes from "../../components/Classes/Classes";
import {
    collection,
    getDocs
} from "firebase/firestore";
import {
    db
} from "../../firebase";
import Navbar from "../../components/Navbar";

const CreateClass = ({
    setCurrUser
}) => {
    const [clases, setClases] = useState([]);
    const clasesCollectionRef = collection(db, "classes");
    console.log(clases);
    const filteredClasses = clases.filter(
        (classObj) => classObj.className === "gggg"
    );
    console.log(filteredClasses);

    useEffect(() => {
        const getClasses = async () => {
            const clases = await getDocs(clasesCollectionRef);
            setClases(clases.docs.map((doc) => ({ ...doc.data(),
                id: doc.id
            })));
        };

        getClasses();
    }, []);

    return ( <
        Box sx = {
            {
                mt: 2
            }
        } >
        <
        Navbar / >
        <
        Classes clases = {
            clases
        }
        /> <
        /Box>
    );
};

export default CreateClass;