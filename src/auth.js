import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, inMemoryPersistence, onAuthStateChanged, signOut } from 'firebase/auth';

export default {
  _user: null,
  loggedIn() {
    return !!this._user;
  },

  async logIn(email, password, rememberMe) {
    try {
      const auth = getAuth();
      // Send request
      await setPersistence(auth, rememberMe ? browserSessionPersistence : inMemoryPersistence).then(async () => {
        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
          // Signed in
          this._user = userCredential.user;
        });
      });

      return {
        isOk: true,
        data: this._user,
      };
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error: ' + errorCode + ' ' + errorMessage);
      return {
        isOk: false,
        message: 'Autentifikácia zlyhala',
      };
    }
  },

  async logOut() {
    const auth = getAuth();
    await signOut(auth)
      .then(() => {
        this._user = null;
      })
      .catch(() => {});
  },

  async getUser() {
    return this._user;
  },

  async setUser(user) {
    this._user = user;
  },

  async initOnAuthStateChanged() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this._user = user;
        console.log('User is signed in');
      } else {
        this._user = null;
        console.log('User is signed out');
      }
    });
  },

  async resetPassword(email) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Chyba pri resetovaní hesla',
      };
    }
  },

  async changePassword(email, recoveryCode) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Chyba pri zmene hesla',
      };
    }
  },

  async createAccount(email, password) {
    try {
      // Send request
      console.log(email, password);

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Chyba pri vytváraní účtu',
      };
    }
  },
};
