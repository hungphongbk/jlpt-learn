import {GoogleAuthProvider, signInWithPopup} from "@firebase/auth";
import {auth} from "@/src/firebase/config";

const provider = new GoogleAuthProvider();

export const login = () => signInWithPopup(auth, provider)
  .then(result => {
    //
  }).catch(err => {
    console.log(err.message);
  })

export const logout = () => {
  auth.signOut();
}
