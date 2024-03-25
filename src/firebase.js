import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA5TB8C1WdQoQnel--D7pe_vpnro0Vu2Bg ',
  databaseURL: 'https://coolerstation-698c0-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'coolerstation-698c0',
};

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const emailAuthProvider = firebase.auth.EmailAuthProvider.PROVIDER_ID;

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, googleAuthProvider, emailAuthProvider, database };
