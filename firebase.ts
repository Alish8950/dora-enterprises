import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDeIqkMKyMCKXCsDPrnBgCv24gECRPumKo",
    authDomain: "dora-enterprises.firebaseapp.com",
    projectId: "dora-enterprises",
    storageBucket: "dora-enterprises.appspot.com",
    messagingSenderId: "154489548573",
    appId: "1:154489548573:web:8e711330aa1dac887ffbf4",
    measurementId: "G-7KKP3FNZDK"
  };

  const provider = new GoogleAuthProvider();
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);


  export const loginSubmit = () => {
      signInWithPopup(auth, provider)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error: any) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, "==> errorMessage")
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }
