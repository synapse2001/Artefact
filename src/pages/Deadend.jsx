import { useState,useEffect } from 'react';
import "../styles/Deadend.css"
import deadendBadge from '../assets/deadend.png';
import { useFirebase, auth} from '../context/firebase';
import { signOut } from "firebase/auth";

function Deadend({user}) {
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[uid,setUid] = useState("");
    const firebase =  useFirebase();

    const handleLogout = () => {
        signOut(auth)
      };
      
      const handlePlayAgain = () => {
        if(user){
            firebase.putData('users' + user.uid, { level : 0});
            window.location.href = "/";
        }
      };

      useEffect(() => {
        if(user){
            setName(user.displayName);
            setEmail(user.email);
            setUid(user.uid);
        }
        }, [user]);

return (
    <div className="deadend-container">
      <img src={deadendBadge} alt="deadend Badge" className="deadend-badge" />
      <div className="deadend-text">
        <h2>You have reached a Deadend, <br/>{name} !</h2>
        <p>The answer you choose led you here, Try again !</p>
        <p>Email : <strong>{email}</strong></p>
        <div className="deadend-links">
            <a href = "#" onClick={handleLogout}>Logout</a>
            <a href = "#" onClick={handlePlayAgain}>Play Again</a>
        </div>
      </div>
    </div>
  );
}
export default Deadend;