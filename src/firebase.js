
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyA0nAn3PR_lhM2EQfYdDu0ESNvSLVhKShU",
  authDomain: "netflix-clone-a53f7.firebaseapp.com",
  projectId: "netflix-clone-a53f7",
  storageBucket: "netflix-clone-a53f7.firebasestorage.app",
  messagingSenderId: "16511638031",
  appId: "1:16511638031:web:540616b284b6d69f20617a"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db= getFirestore(app);
const signup = async(name,email , password)=>{
    try{
       const res= await createUserWithEmailAndPassword(auth,email,password);
       const user =res.user;
       await addDoc(collection(db,"user"),{
        uid: user.uid,
        name,
        authProvider:"local",
        email,
       });
    }catch(error) {
        console.log(error);
        alert(error);

    } 
}
const login =async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch(error){
        console.log(error);
        alert (error);
    }
    
}
const logout= ()=>{
    signOut(auth);
}
export {auth,db,login,signup,logout}