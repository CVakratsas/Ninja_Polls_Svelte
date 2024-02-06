<script>
    import { PollStore } from "../stores/PollStore";
    import { createEventDispatcher } from "svelte";
    import Button from "../shared/Button.svelte";
    import { addDoc, collection } from "firebase/firestore";
    import { db } from "../firebaseConfig";

    let dispatch = createEventDispatcher();
    
    let fields = { question: '', answerA: '', answerB: '' };
    let errors = { question: '', answerA: '', answerB: '' };
    let poll = { ...fields, votesA: 0, votesB: 0 };
    let valid = false;
  
    let submitHandler = async () => {
        valid = true;
      // validate question
      if (fields.question.trim().length < 5) {
        valid = false;
        errors.question = 'Question must be at least 5 characters long';
      } else {
        errors.question = '';
      }

      // validate answer A
      if (fields.answerB.trim().length < 1) {
        valid = false;
        errors.answerA = 'Answer A can not be empty';
      } else {
        errors.answerA = '';
      }

      // validate answer B
      if (fields.answerB.trim().length < 1) {
        valid = false;
        errors.answerB = 'Answer B can not be empty';
      } else {
        errors.answerB = '';
      }

      // add new poll
      if (valid) {
        let poll = {...fields, votesA: 0, votesB: 0, id: Math.random()};
        // save poll to store
        PollStore.update(currentPolls => {
          return [poll, ...currentPolls];
        });

        // Save poll to Firebase
        try {
          const docRef = await addDoc(collection(db, "polls"), poll);
          console.log("Poll added with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding poll to Firestore: ", e.message);
        }


        dispatch('add');
      }
    }
  </script>
  
  <form on:submit|preventDefault={submitHandler}>
    <div class="form-field">
        <label for="question">Poll Question:</label>
        <input type="text" id="question" bind:value={fields.question}>
        <div class="error">{errors.question}</div>
    </div>
    <div class="form-field">
        <label for="answer-a">Answer A value:</label>
        <input type="text" id="answer-a" bind:value={fields.answerA}>
        <div class="error">{errors.answerA}</div>
    </div>
    <div class="form-field">
        <label for="answer-b">Answer B value:</label>
        <input type="text" id="answer-b" bind:value={fields.answerB}>
        <div class="error">{errors.answerB}</div>
    </div>
    <Button type="secondary" flat={true}>Add Poll</Button>
  </form>

<style>
    form {
        width: 400px;
        margin: 0 auto;
       text-align: center;
    }

    .form-field {
        margin: 18px auto;
    }

    input {
        width: 100%;
        border-radius: 6px;
        height: 30px;
    }

    label {
        margin: 10px auto;
        display: block;
        text-align: left;
    }

    .error {
        font-weight: bold;
        font-size: 12px;
        color: #d91b42;
    }
  </style>