import { collection, getDocs } from "firebase/firestore";
import { writable } from "svelte/store";
import { db } from "../firebaseConfig";

const PollStore = writable([]);

export const getPolls = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "polls"));
    let polls = [];
    querySnapshot.forEach((doc) => {
      polls.push({ ...doc.data(), id: doc.id });
    });
    PollStore.set(polls);
  } catch (e) {
    console.error("Error getting documents: ", e.message);
  }
};

export default PollStore;
