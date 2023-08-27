// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { 
  Timestamp,
  addDoc, 
  collection, 
  getDocs, 
  getFirestore, 
  query, 
  where
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9EjSCT93MiLze6XqJOVRGAJYKWBV1I3E",
  authDomain: "blog-platform-a753c.firebaseapp.com",
  projectId: "blog-platform-a753c",
  storageBucket: "blog-platform-a753c.appspot.com",
  messagingSenderId: "406809418364",
  appId: "1:406809418364:web:5b58ac6948651762b607f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
// export default app;

// Auth functionalities 

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if(docs.docs.length === 0){
      await addDoc(collection(db, 'users'),{
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        created: Timestamp.now(),
        modified: Timestamp.now(),
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message)
  }
};

const logInWithEmailAndPassword = async (email, password) =>{
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message)
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db,"users"),{
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      created: Timestamp.now(),
      modified: Timestamp.now(),
    });
  } catch (err) {
    console.error(err);
    alert(err.message)
  }
};

const sendPasswordReset = async(email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent.");
  } catch (err) {
    console.error(err);
    alert(err.message)
  }
};

const logout = () => {
  signOut(auth);
}

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
}