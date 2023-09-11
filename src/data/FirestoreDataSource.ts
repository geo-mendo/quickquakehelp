import { addDoc, collection, getDoc, onSnapshot, query, doc } from 'firebase/firestore';
import { useFirestoreDb } from "./useFirestoreDb";

export const useFirebaseDataSource = () => {
    const db = useFirestoreDb();
    
    
        const set = async (collectionName: string, data: any) => {
            return await addDoc(collection(db, collectionName), data);
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
            getById,
            getRealtimeDocs
        }
    
}