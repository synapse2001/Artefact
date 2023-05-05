import { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set,push, update,get,child} from "firebase/database";

import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    GoogleAuthProvider,
    signInWithRedirect, 
} from "firebase/auth";

// import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADTaH11XtXtGukJycLHCTMvA7Voe6wONo",
  authDomain: "artefact-afd9c.firebaseapp.com",
  projectId: "artefact-afd9c",
  storageBucket: "artefact-afd9c.appspot.com",
  messagingSenderId: "835758993180",
  appId: "1:835758993180:web:3cf54c9b3d17fdbf9d94d9",
  measurementId: "G-MJNM422M8E",
  databaseURL : "https://artefact-afd9c-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const firebaseapp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseapp);
const database = getDatabase(firebaseapp);
const googleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }; 
    const putData = (key,data) => {
        return update(ref(database, key),data);
    };

    const [podData,setpodData] = useState("");

    // const fetchData = async (key) =>{

    //     await( get(child(ref(database),key))
    //     .then((snapshot)=>
    //         setpodData(snapshot.val())));
    // }/////////////////////////////////// imp

    const fetchData = async (key) => {
        const snapshot = await get(child(ref(database), key));
        // setpodData(snapshot.val());
        console.log("data is fetched",snapshot.val());
        return (snapshot.val());
      };

      const fetchPoddata = async () => {
        const snapshot = await get(child(ref(database), "podcast"));
        const data = snapshot.val();
        setpodData(data);
        console.log("poddata is fetched", data);
        return data;
      };
      
      
 

    // const fetchData = async (key) =>{
    //     const snapshot = await get(child(ref(database), key));
    //     return snapshot.val();
    //   }
      

    const signinUser = (email2, password2) => {
        return signInWithEmailAndPassword(auth, email2, password2)
    };
    const signinwithGoogle = () =>{
        return signInWithRedirect(auth, googleProvider);
    }

    return (
        <FirebaseContext.Provider value ={{createUser, putData, signinUser,signinwithGoogle,fetchData, podData,fetchPoddata}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}