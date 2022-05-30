import { useState, useEffect} from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuth = () => {

    const auth = getAuth();

    const [ currentUser, setCurrentUser ] = useState();

    useEffect(()=>{
        const authStatus = () =>{
            const unsub = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setCurrentUser(user);
                }else{
                    setCurrentUser(null);
                }
            });
            return unsub;
        }
        return authStatus();
    },[])

    return currentUser;
}