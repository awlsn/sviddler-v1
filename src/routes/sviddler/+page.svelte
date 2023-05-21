<script>
  import Card from './Card.svelte';
  import {draggable, dropzone} from "$lib/dnd"
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

  //need to have two arrays: the board and the hand, and when either is updated we need to re-render
  //drop needs to be able to update the board on drop

  //need to check what is used on the board, can only play each card once
  //board needs to support multiple words, spaces should render on select, drag

  $: board = [{letter:'',value:'',empty:1},{letter:'',value:'',empty:1},{letter:'',value:'',empty:1},{letter:'',value:'',empty:1},{letter:'',value:'',empty:1}]
  $: hand = data.cards

  function swapWith(card) {
	if (draggingCard === card || animatingCards.has(card)) return;
	//dragging card set by dragstart
	const cardAIndex = cards.indexOf(draggingCard);
	//card set by dragenter
	const cardBIndex = cards.indexOf(card);
	//update the arrays
	cards[cardAIndex] = card;
	cards[cardBIndex] = draggingCard;
}
</script>

<svelte:head>
	<title>Sviddler</title>
	<meta name="description" content="A Quiddler clone written in SvelteKit" />
</svelte:head>
<div class="board">
  {#each board as card}
    <li use:dropzone={{
      on_dropzone(letter) {
        console.log(letter);
        card.letter = letter;
        card.empty = 0;
        const handIndex = hand.findIndex(card => card.letter===letter);
        card.value = hand[handIndex].value
        hand[handIndex].empty = 1;
      }
  }}><Card letter="{card.letter}" value="{card.value}" empty="{card.empty}"/></li>
  {/each}
</div>
<div class="hand">
{#each hand as card}
    <li use:draggable={card.letter}><Card letter="{card.letter}" value="{card.value}" empty="{card?.empty}"/></li>
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

  :global(.droppable) {
        outline: 3px dashed red;
        background: red;
    }
</style>
