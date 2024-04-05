import { initializeApp } from 'firebase/app';
import { ref, getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA5TB8C1WdQoQnel--D7pe_vpnro0Vu2Bg',

  authDomain: 'coolerstation-698c0.firebaseapp.com',

  databaseURL: 'https://coolerstation-698c0-default-rtdb.europe-west1.firebasedatabase.app',

  projectId: 'coolerstation-698c0',

  storageBucket: 'coolerstation-698c0.appspot.com',

  messagingSenderId: '481873393112',

  appId: '1:481873393112:web:37dec0bd63b684a7bbaead',
};

const deviceId = 'ESP32-6413A8E350CC';

const dataPath = `ESPData/${deviceId}/Data`;

// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// const emailAuthProvider = firebase.auth.EmailAuthProvider.PROVIDER_ID;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Get a reference to the database service
const dbRef = ref(db, dataPath);

export { deviceId, db, auth, dbRef };
