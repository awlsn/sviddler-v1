<script>
    import {draggable} from "$lib/dnd"

    export let letter;
    export let value;
    export let empty;
    console.log(empty);

</script>

{#if empty}
    <div use:dropzone={{
      on_dropzone(letter) {
        console.log(letter);
      }
  }} class="space">
  </div>
{:else}
<div use:draggable={letter} class="card">
    <div class="top">
        <div>{letter}</div>
        <div>{value}</div>
    </div>

    <div class="main">{letter}</div>

    <div class="btm">
        <div>{letter}</div>
        <div>{value}</div>
    </div>
</div>
{/if}

<style>
    .card {
        width: 6rem;
        background: #fff;
        padding: 1rem;
        border-radius: .5rem;
        font-weight: 400;
        margin: .5rem;
    }
    .main {
        font-size: 5rem;
        text-align: center;
        padding: .5rem .25rem;
    }

    .top {
        text-align: left;
    }

    .btm {
        transform: scale(-1,1);
        visibility: hidden;
    }

    .space {
        width: 6rem;
        margin: .5rem;
        padding: 1rem;
        border: 3px dashed #aaa;
    }

    :global(.droppable) {
        outline: 3px dashed red;
        background: red;
    }
</style>