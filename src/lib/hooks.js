import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUserData(doc.data());
      });
    } else {
      setUserData(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, loading, userData };
}
