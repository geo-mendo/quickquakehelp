import {getFirestore} from "firebase/firestore";
import { firebaseApp } from "./initializeFirebase";

export const useFirestoreDb = () => {
    return getFirestore(firebaseApp);
}