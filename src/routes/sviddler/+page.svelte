<script>
  import {draggable,dropzone} from "$lib/dnd"
  import Card from './Card.svelte';

  export let data;
  //draw 5 cards
  //need to implement click an drag
  //https://svelte.dev/repl/b225504c9fea44b189ed5bfb566df6e6?version=3.59.1
  //
  //ideally a new open space appears when you start a drag for current word and new word
  //either dragging or clicking the open space works (select letter, select open space)
  //need to render deck
  //consider skipping the current deck strat:
  // https://www.dstromberg.com/2019/02/tutorial-create-and-shuffle-a-deck-of-cards-in-javascript/
  // https://stackoverflow.com/questions/39967891/dealing-cards-from-a-deck-and-removing-the-cards-from-an-array
  let spaces = Array(5)
</script>

<svelte:head>
	<title>Sviddler</title>
	<meta name="description" content="A Quiddler clone written in SvelteKit" />
</svelte:head>
<div class="board">
  {#each data.cards as card}
    <li><Card letter="0" value="0" empty="1"/></li>
  {/each}
</div>
<div class="hand">
{#each data.cards as card}
    <li><Card letter="{card.letter}" value="{card.value}"/></li>
{/each}
</div>

<style>
  li {
    list-style: none;
  }

  .board {
    width: 100%;
    height: 220px;
    display: flex;
  }

  .hand {
      width: 100%;
      height: 220px;
      display: flex;
  }
</style>
