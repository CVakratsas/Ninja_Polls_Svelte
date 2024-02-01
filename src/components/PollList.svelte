<script>
    import PollDetails from "./PollDetails.svelte";
    import PollStore from "../stores/PollStore";
</script>

<div class="poll-list">
    <!-- This gives access to the store data and it automatically
    unsubscribes from the store when component is destroyed-->
    {#each $PollStore as poll (poll.id)}
        <div>
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