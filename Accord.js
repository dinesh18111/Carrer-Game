import {
    Alert,
    Box,
    Button,
    Snackbar,
    useTheme
} from "@mui/material";
//import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    EditOutlined
} from "@material-ui/icons";
import {
    useNavigate
} from "react-router-dom";
import {
    useEffect,
    useState
} from "react";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import {
    db
} from "../firebase";
//import { tokens } from "../../theme";

const Accord = ({
    job
}) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [appliedjobs, setAppliedjobs] = useState([]);

    const jobssCollectionRef = collection(db, "jobs");

    const navigate = useNavigate();
    const jobsCollectionRef = collection(db, "jobs");
    console.log(job);

    useEffect(() => {
        const getJobs = async () => {
            const jobs = await getDocs(jobssCollectionRef);
            setAppliedjobs(jobs.docs.map((doc) => ({ ...doc.data(),
                id: doc.id
            })));
        };

        getJobs();
    }, []);

    const handleAddtoWallet = async (id) => {
        if (appliedjobs.length >= 3) {
            console.log("Fail to add to wallet");
            setError(true);
        } else {
            console.log("Added to wallet");
            job.applied = true;
            console.log(job);
            await addDoc(jobsCollectionRef, job);
            setOpen(true);
            navigate(-1);
        }
    };

    const randomSalary = () => {
        const min = 120000;
        const max = 800000;
        const salary = Math.floor(Math.random() * (max - min + 1)) + min;

        return `$${salary.toLocaleString()} USD`;
    };

    console.log("title");
    console.log(job);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
        setError(false);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return ( <
        Box sx = {
            {
                m: "40px"
            }
        } >
        <
        Snackbar open = {
            error
        }
        autoHideDuration = {
            3000
        }
        onClose = {
            handleClose
        } >
        <
        Alert onClose = {
            handleClose
        }
        severity = "error"
        sx = {
            {
                width: "100%"
            }
        } >
        Sorry the Job wallet is full <
        /Alert> <
        /Snackbar> <
        Button variant = "contained"
        onClick = {
            () => {
                handleGoBack();
            }
        } >
        Back <
        /Button> <
        Box sx = {
            {
                mt: 3,
                ml: 125
            }
        } >
        <
        Button onClick = {
            () => {
                handleAddtoWallet();
            }
        }
        variant = "contained" >
        Add to job wallet <
        /Button> <
        /Box> <
        Snackbar open = {
            open
        }
        autoHideDuration = {
            6000
        }
        onClose = {
            handleClose
        } >
        <
        Alert onClose = {
            handleClose
        }
        severity = "success"
        sx = {
            {
                width: "100%"
            }
        } >
        Job Added Successfully <
        /Alert> <
        /Snackbar> <
        >
        <
        Accordion defaultExpanded >
        <
        AccordionSummary expandIcon = { < ExpandMoreIcon / >
        } >
        <
        Typography color = "green"
        variant = "h5" >
        Title:
        <
        /Typography> <
        /AccordionSummary> <
        AccordionDetails >
        <
        Typography > {
            job.jobname
        } < /Typography> <
        /AccordionDetails> <
        /Accordion> <
        Accordion defaultExpanded >
        <
        AccordionSummary expandIcon = { < ExpandMoreIcon / >
        } >
        <
        Typography color = "green"
        variant = "h5" >
        Salary <
        /Typography> <
        /AccordionSummary> <
        AccordionDetails >
        <
        Typography > {
            randomSalary()
        } < /Typography> <
        /AccordionDetails> <
        /Accordion> <
        Accordion defaultExpanded >
        <
        AccordionSummary expandIcon = { < ExpandMoreIcon / >
        } >
        <
        Typography color = "green"
        variant = "h5" >
        Description <
        /Typography> <
        /AccordionSummary> <
        AccordionDetails >
        <
        Typography >
        Keeps an eye on the property by walking around it consistently and making sure nothing suspicious is happening. <
        /Typography> <
        /AccordionDetails> <
        /Accordion> <
        Accordion defaultExpanded >
        <
        AccordionSummary expandIcon = { < ExpandMoreIcon / >
        } >
        <
        Typography color = "green"
        variant = "h5" >
        Responsibility <
        /Typography> <
        /AccordionSummary> <
        AccordionDetails >
        <
        Typography component = "div" >
        <
        ul >
        <
        li > Inspect and patrol premises regularly. < /li> <
        li > Monitor property entrance. < /li> <
        li > Secure all exits, doors and windows. < /li> <
        li > Monitor surveillance cameras. < /li> <
        li > Report any suspicious behaviors and happenings. < /li> <
        li > Authorize entrance of people and vehicles. < /li> <
        /ul> <
        /Typography> <
        /AccordionDetails> <
        /Accordion> <
        Accordion defaultExpanded >
        <
        AccordionSummary expandIcon = { < ExpandMoreIcon / >
        } >
        <
        Typography color = "green"
        variant = "h5" >
        Essential Skills Required <
        /Typography> <
        /AccordionSummary> <
        AccordionDetails >
        <
        Typography >
        <
        AccordionDetails >
        <
        Typography component = "div" >
        <
        ul >
        <
        li > Lifting < /li> <
        li > Manage Multiple Tasks < /li> <
        li > Following Complex Instructions < /li> <
        li > Emotional Control < /li> <
        li > Patrolling < /li> <
        li > Attention to Detail < /li> <
        /ul> <
        /Typography> <
        /AccordionDetails> <
        /Typography> <
        /AccordionDetails> <
        /Accordion> <
        Accordion defaultExpanded >
        <
        AccordionSummary expandIcon = { < ExpandMoreIcon / >
        } >
        <
        Typography color = "green"
        variant = "h5" >
        Personal Skills Required(habits) <
        /Typography> <
        /AccordionSummary> <
        AccordionDetails >
        <
        Typography >
        <
        AccordionDetails >
        <
        Typography component = "div" >
        <
        ul >
        <
        li > Professionalism < /li> <
        li > Integrity < /li> <
        li > Safety Management < /li> <
        li > Objectivity < /li> <
        li > Reporting Skills < /li> <
        li > Dependability < /li> <
        /ul> <
        /Typography> <
        /AccordionDetails> <
        /Typography> <
        /AccordionDetails> <
        /Accordion> <
        Accordion defaultExpanded >
        <
        AccordionSummary expandIcon = { < ExpandMoreIcon / >
        } >
        <
        Typography color = "green"
        variant = "h5" >
        Personal Characteristics <
        /Typography> <
        /AccordionSummary> <
        AccordionDetails >
        <
        Typography component = "div" >
        <
        ul >
        <
        li > Physical fitness / strength < /li> <
        li > Alertness / vigilance / mind on the job < /li> <
        li > Communication skills < /li> <
        li > Honesty / integrity < /li> <
        li > Judgement < /li> <
        li > Vigilance < /li> <
        /ul> <
        /Typography> <
        /AccordionDetails> <
        /Accordion> <
        />; <
        Box sx = {
            {
                mt: 3,
                ml: 125
            }
        } >
        <
        Button onClick = {
            handleAddtoWallet
        }
        variant = "contained" >
        Add to job wallet <
        /Button> <
        /Box> <
        /Box>
    );
};

export default Accord;