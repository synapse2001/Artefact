import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebase } from '../context/firebase';
import { auth } from '../context/firebase';
// export const user = auth.user;
// alert(user)

export function useAuth() {
  const [user, setUser] = useState(null);
  const firebase = useFirebase();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

      } else {
        console.log("You are logged out");
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };

  }, []);

  return { user };
}


export function newUser(){
    

}