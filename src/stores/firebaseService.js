import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

// Add a new poll
export async function addPoll(newPoll) {
  await addDoc(collection(db, "polls"), newPoll);
}

// Delete a poll
export async function deletePoll(id) {
  await deleteDoc(doc(db, "polls", id));
}

// Add a vote to a poll
export async function addVote(pollId, option) {
  const pollRef = doc(db, "polls", pollId);
  // Use Firestore's increment function to atomically increment the vote count
  await updateDoc(pollRef, {
    [option]: increment(1), // Increment the specific option field by 1
  });
}
