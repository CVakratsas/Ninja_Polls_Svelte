// import { writable } from "svelte/store";

// const PollStore = writable([
//   {
//     id: 1,
//     question: "Python or JavaScript?",
//     answerA: "Python",
//     answerB: "JavaScript",
//     votesA: 9,
//     votesB: 15,
//   },
// ]);

// export default PollStore;

import { writable } from "svelte/store";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

const PollStore = writable([]);

// collection ref
const pollsColRef = collection(db, "polls");

// Subscribe to changes in Firestore and update the Svelte store
const unsubscribe = onSnapshot(pollsColRef, (snapshot) => {
  let polls = [];
  snapshot.docs.forEach((doc) => {
    polls.push({ ...doc.data(), id: doc.id });
  });

  PollStore.set(polls);
});

// Export the store and the unsubscribe function
export { PollStore, unsubscribe };
