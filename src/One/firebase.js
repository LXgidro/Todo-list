import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyB9N9CPj3w6L0kv4TL2EQuHCLPIGGyUQeo',
  authDomain: 'todo-list-dc034.firebaseapp.com',
  projectId: 'todo-list-dc034',
  storageBucket: 'todo-list-dc034.firebasestorage.app',
  messagingSenderId: '147659059184',
  appId: '1:147659059184:web:b149d92ab4c95a1462b735',
  databaseURL:
    'https://todo-list-dc034-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
