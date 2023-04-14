import {
    initializeApp
} from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import {
    getStorage
} from "firebase/storage";
import {
    doc,
    getDocs,
    getFirestore,
    setDoc,
    addDoc,
    collection,
    where,
} from "firebase/firestore";
import {
    initializeFirestore
} from "firebase/firestore";
import {
    v4 as uuidv4
} from "uuid";
import {
    useContext,
    useId,
    useState
} from "react";

const firebaseConfig = {
    apiKey: "AIzaSyCvO7TW4VcdH8NSCx7fel0vfCCNcjENrzs",
    authDomain: "job-game-be30b.firebaseapp.com",
    projectId: "job-game-be30b",
    storageBucket: "job-game-be30b.appspot.com",
    messagingSenderId: "174933301688",
    appId: "1:174933301688:web:c1d6beabedf00be565d74d",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

function mapAuthCodeToMessage(authCode) {
    switch (authCode) {
        case "auth/invalid-password":
            return "Password is not correct";

        case "auth/invalid-email":
            return "Email is invalid";

            // Many more authCode mapping here...

        default:
            return "";
    }
}

export function signIn(formData) {
    return signInWithEmailAndPassword(auth, formData.email, formData.password); //.then((auth) => setUser(auth.user));
}

// export function signInPlayer(formData) {
//   return signInWithEmailAndPassword(auth, formData.email, formData.password);

// }

export function signUp(formData) {
    return createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
    ).then((userCredential) => {
        setDoc(doc(db, "teachers", userCredential.user.uid), {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            type: "teacher",
        });
    });
}

export function signUpPlayer(formData) {
    return createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
    ).then((userCredential) => {
        setDoc(doc(db, "players", userCredential.user.uid), {
            username: formData.username,
            email: formData.email,
            levelofPrep: 0,
            type: "student",
        });
    });
}

export function crateClass(clasData, user) {
    return createUserWithEmailAndPassword(auth, user.email, user.password).then(
        (userCredential) => {
            setDoc(doc(db, "classes", userCredential.user.uid), {
                uuid: uuidv4(),
                classData: clasData.code,
            });
        }
    );
}

const jobsCollectionRef = collection(db, "jobs");

export const getJobs = async () => {
    const data = await getDocs(jobsCollectionRef);
    return data;
    //setjobs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

export function createClass(formData) {
    db.ref("classes").push(formData);
}

export function createass(formData) {
    const ref = collection(getFirestore(app), "classes");
    let data = {
        uuid: uuidv4(),
        classData: formData,
    };
    try {
        addDoc(ref, data);
    } catch (err) {
        console.log(err.message);
    }
}

// export const createJob = async () => {
//   await addDoc(jobsCollectionRef, formData);
// };