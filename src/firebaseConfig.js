import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVGGZ7XRKxE3FS6rj2vlXQZADevpG7-Ns",
  authDomain: "ninja-polls-8cb3e.firebaseapp.com",
  projectId: "ninja-polls-8cb3e",
  storageBucket: "ninja-polls-8cb3e.appspot.com",
  messagingSenderId: "190286936542",
  appId: "1:190286936542:web:64a2d3943633b6fc45454f",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
export const db = getFirestore();

// // collection ref
// const pollsColRef = collection(db, "polls");

// // get collection data
// getDocs(pollsColRef)
//   .then((snapshot) => {
//     let polls = [];
//     snapshot.docs.forEach((doc) => {
//       polls.push({ ...doc.data(), id: doc.id });
//     });
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
