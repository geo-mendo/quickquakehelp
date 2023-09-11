import { addDoc, collection, getDoc, onSnapshot, query, doc, setDoc } from 'firebase/firestore';
import { useFirestoreDb } from "./useFirestoreDb";

export const useFirebaseDataSource = () => {
    const db = useFirestoreDb();
    
    
        const set = async (collectionName: string, data: any) => {
            return await addDoc(collection(db, collectionName), data);
        }

        const update = async (collectionName: string, id: string, dataToUpdate: any) => {
            return await setDoc(doc(db, collectionName, id), dataToUpdate, { merge: true });
        }

        const getRealtimeDocs = (collectionName: string, setNeeds: any) => {
            const q = query(collection(db, collectionName)) ;
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const docs = querySnapshot.docs.map(doc => {
                    return {id: doc.id, ...doc.data()}
                });
                
                setNeeds(docs);
            });
            return unsubscribe;
        }

        const getById = async (collectionName: string, id: string) => {
            return await getDoc(doc(db, collectionName,id));
        }

        return {
            set,
            update,
            getById,
            getRealtimeDocs
        }
    
}