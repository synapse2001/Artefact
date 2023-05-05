import { useState,useEffect } from 'react';
import "../styles/Certificate.css"
import certificateBadge from '../assets/cert.png';
import { useFirebase, auth} from '../context/firebase';
import { signOut } from "firebase/auth";

function Certificate({user}) {
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[uid,setUid] = useState("");
    const[timetaken,setTimetaken] = useState(0);
    const [starttime,setStarttime] = useState(0)
    const [endtime,setEndtime] = useState(0)
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
        firebase.fetchData("users"+user.uid).then(
            data => {
                const st = (data.startTime.now);
                const et = (data.endTime.now);
                console.log(st);
                console.log(et);
                const start = new Date(st);
                const end = new Date(et);
                const diffMs = end.getTime() - start.getTime(); // get difference in milliseconds
                const durationMin = Math.floor(diffMs / 60000); // divide by 60000 to convert to minutes
                console.log(durationMin); 
                setTimetaken(durationMin);
                firebase.putData('users' + user.uid, { timeTaken : {durationMin}});
            }
        )
    }
    }, [user]);

return (
    <div className="certificate-container">
      <img src={certificateBadge} alt="Certificate Badge" className="certificate-badge" />
      <div className="certificate-text">
        <h2>Congratulations, {name} !</h2>
        <p>You have successfully completed all levels.</p>
        <p>Email : <strong>{email}</strong>.</p>
        <p>Time taken : {timetaken} minutes</p>
        <div className="certificate-links">
            <a href = "#" onClick={handleLogout}>Logout</a>
            <a href = "#" onClick={handlePlayAgain}>Play Again</a>
        </div>
      </div>
    </div>
  );
}
export default Certificate;