import React, {
    useContext,
    useEffect,
    useState
} from "react";
import {
    Container
} from "@material-ui/core";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import {
    onAuthStateChanged
} from "firebase/auth";
import {
    auth
} from "./firebase";
import {
    UserContext,
    UserProvider
} from "./UserContext";
import Home from "./pages/Player/Home";
import Authteacher from "./pages/Authteacher/Authteacher";
import Authplayer from "./pages/Authplayer/Authplayer";
import CreateClass from "./pages/Teacher/CreateClass";
import ManageClass from "./pages/Teacher/ManageClass";
import {
    Typography
} from "@mui/material";
import PageNotfound from "./pages/PageNotfound";
import Player from "./pages/Player/Plaayer";
import Map from "./pages/Player/Map";
import Planet from "./pages/Player/Planet";
import PlanetPage from "./pages/Player/PlanetPage";
import JobListPage from "./pages/Player/JobListPage";
import SingleJobPage from "./pages/Player/SingleJobPage";
import Navbar from "./components/Navbar";

const App = () => {
    const [currUser, setCurrUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const user = JSON.parse(localStorage.getItem("user"));
    // const userProfile = user.providerData[0];
    const {
        user
    } = useContext(UserContext);
    console.log(user);
    //console.log(userProfile);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false);
            if (user) {
                setCurrUser(user);
                localStorage.setItem("user", JSON.stringify(user));
            }
        });
        return () => unsubscribe();
    }, [user]);

    if (loading) {
        return <Typography > Loading... < /Typography>;
    }
    console.log(user);
    return ( <
        BrowserRouter >
        <
        Container maxWidth = "xl" >
        <
        Routes >
        <
        Route path = "/"
        exact element = { < Home / >
        }
        /> <
        Route path = "player"
        exact element = { < Player / >
        }
        /> <
        Route path = "/player/auth"
        exact element = { < Authplayer / >
        }
        /> <
        Route path = "/teacher"
        exact element = { < Authteacher / >
        }
        /> <
        >
        <
        Route path = "/classes"
        exact element = {
            user && user.type === "teacher" ? ( <
                CreateClass / >
            ) : ( <
                Navigate replace to = "/teacher" / >
            )
        }
        /> <
        Route path = "/classes/classeDetails"
        exact element = {
            user && user.type === "teacher" ? ( <
                ManageClass / >
            ) : ( <
                Navigate replace to = "/teacher" / >
            )
        }
        /> <
        Route path = "/planethome"
        exact element = {
            user ? < Planet / > : < Navigate replace to = "/player/auth" / >
        }
        /> <
        Route path = "/Map"
        exact element = {
            user && user.type === "student" ? ( <
                Map / >
            ) : ( <
                Navigate replace to = "/player/auth" / >
            )
        }
        /> <
        Route path = "/PlanetPage"
        exact element = {
            user && user.type === "student" ? ( <
                PlanetPage / >
            ) : ( <
                Navigate replace to = "/player/auth" / >
            )
        }
        /> <
        Route path = "/JobListPage"
        exact element = {
            user && user.type === "student" ? ( <
                JobListPage / >
            ) : ( <
                Navigate replace to = "/player/auth" / >
            )
        }
        /> <
        Route path = "/SingleJobPage"
        exact element = {
            user && user.type === "student" ? ( <
                SingleJobPage / >
            ) : ( <
                Navigate replace to = "/player/auth" / >
            )
        }
        /> <
        /> <
        Route path = "*"
        exact element = { < PageNotfound / >
        }
        /> <
        /Routes> <
        /Container> <
        /BrowserRouter>
    );
};

export default App;