import { initializeApp } from 'firebase/app';

import {
    getFirestore,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCREcaQu8YxvypxcLNeO494Zlf9Fthal_0',
    authDomain: 'todo-list-react-dfff3.firebaseapp.com',
    projectId: 'todo-list-react-dfff3',
    storageBucket: 'todo-list-react-dfff3.appspot.com',
    messagingSenderId: '478701819328',
    appId: '1:478701819328:web:d0fb3171f9df437053e425'
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;