<script>
    import { fade, slide, scale } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import PollDetails from "./PollDetails.svelte";
    import { PollStore, unsubscribe } from "../stores/PollStore";
    import { onDestroy } from 'svelte';

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="poll-list">
    <!-- This gives access to the store data and it automatically
    unsubscribes from the store when component is destroyed-->
    {#each $PollStore as poll (poll.id)}
        <div in:scale out:scale|local animate:flip={{duration:500}}>
            <PollDetails {poll}/>
        </div>
    {/each}
</div>

<style>
    .poll-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }
</style>