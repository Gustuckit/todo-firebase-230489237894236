import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
    query,
    where
} from 'firebase/firestore';

import db from './firebase';

// Create ToDo
export const addToDoDB = async (todo) => {
    try {
        const docRef = await addDoc(collection(db, 'todos'), todo);
        console.log('Document written with ID: ', docRef.id);
    } catch (err) {
        console.error('Error adding document: ', err);
    }
}

// Read ToDo
export const fetchFromDB = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'todos'));
        const docs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            completed: doc.data().completed,
            ...doc.data()
        }));
        return docs.sort((a, b) => b.date - a.date);
    } catch (err) {
        console.error('Error fetching documents: ', err);
        throw err;
        return [];
    }
}

// Update ToDo
export const updateToDoDB = async (id, todo) => {
    try {
        const docRef = doc(db, 'todos', id);
        await updateDoc(docRef, todo);
    } catch (err) {
        console.error('Error updating document: ', err);
    }
}

// Delete ToDo
export const deleteToDoDB = async (id) => {
    try {
        const docRef = doc(db, 'todos', id);
        await deleteDoc(docRef);
    } catch (err) {
        console.error('Error removing document: ', err);
    }
}