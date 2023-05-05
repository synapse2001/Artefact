import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase"
import { useAuth } from "../controllers/userState";
import HomePage from "../pages/HomePage";
import TestPage from "../pages/Test";
import audio from '../assets/audio.mp3';


// export const podcastData = [
//       {
//         "title": "NCS - test",
//         "url": {audio}
//     },
//     {
//         "title": "Smoke",
//         "url": ""
//     }
// ]



// const PodcastPlayer = (props) => {
//   const {user} =props;
//   const firebase = useFirebase();
//   const [podcastData, setPodcastData] =
//         useState([
//             {
//                 "title": "NCS - test",
//                 "url": ""
//             },
//             {
//                 "title": "Smoke",
//                 "url": ""
//             }]
//         );

//   useEffect(() => {
//     // alert("jendnnndnej");
//     // alert(firebase.podData.pod1)
//     // useEffect(() => {
//         // if (firebase.podData) {
//           setPodcastData(prevState => {
//             const newData = [...prevState];
//             alert()
//             newData[0].url = {audio};
//             return newData;
//           });
//         // }
//     //   }, []);
      
//   }, [firebase.podData]);

//   return (
//     <div>
//       <TestPage 
//         user={user}
//         podcastData={podcastData}
//       />
//     </div>
//   );
// };

// export default PodcastPlayer;

