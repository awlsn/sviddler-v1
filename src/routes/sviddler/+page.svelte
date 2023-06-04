<script>
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

  //need to have two arrays: the board and the hand, and when either is updated we need to re-render
  //drop needs to be able to update the board on drop

  //need to check what is used on the board, can only play each card once
  //board needs to support multiple words, spaces should render on select, drag

  const hand = data.cards.splice(0, 3);

  //findNextPlayer();
  //getNextHand();
  //deal();

  console.log(data.cards);

  let rows;
  let rowLoc;
  function setup() {
    console.log(hand);
    rows = [
      {name:"hand",letters:[...hand]},
      {name:"word1",letters:["","",""]}
    ];
    
  }

  function draw() {
    //rows[0].letters.push(data.cards.splice(0,1)[0]);
    hand.push(data.cards.splice(0,1)[0]);
    setup();
  }

  function checkWord() {
    //get word
    //see if it exists in dictionary
  }

  setup();
  


  //add location data to hand -- the letters can only ever exist in one place anyway
  //foreach row output spaces or hand cards
  function dragStart(event, rowIndex, letterIndex) {
		// The data we want to make available when the element is dropped
    // is the index of the item being dragged and
    // the index of the basket from which it is leaving.
		const data = {rowIndex, letterIndex};
   	event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}

  function drop(e, dropRowIndex, dropLetterIndex) {
		event.preventDefault();
    //console.log(e);
    //console.log(dropLoc);
    
    const json = event.dataTransfer.getData("text/plain");
		const data = JSON.parse(json);
		console.log(data);
		// Remove the item from one basket.
		// Splice returns an array of the deleted elements, just one in this case.
    console.log(rows[data.rowIndex]);
		const [letterA] = rows[data.rowIndex].letters.splice(data.letterIndex, 1);
    let letterB = "";
    console.log("dropROW") 
 
    if (rows[dropRowIndex]) {
      [letterB] = rows[dropRowIndex].letters.splice(dropLetterIndex, 1);
    }
		//rows[data.rowIndex].letters.push();
    console.log("letterA",letterA)
    console.log("letterB",letterB)
    // Add the item to the drop target basket.
		rows[dropRowIndex].letters.splice(dropLetterIndex, 0, letterA)
    rows[data.rowIndex].letters.splice(data.letterIndex, 0, letterB);
    //rows[data.rowIndex].letters.push(letterB);
    //TODO: if we put a letter on top of another letter, they need to swap places
		rows = rows;
		
		rowLoc = null;

    //console.log(rows);
	}
  
  function reset() {
    setup();
    //rows=rows;
  }
</script>

<svelte:head>
	<title>Sviddler</title>
	<meta name="description" content="A Quiddler clone written in SvelteKit" />
</svelte:head>

{#each rows as row, rowIndex}
<div class="row">
  <!--Deck here-->
  <!--discard pile here-->
  <ul>
    {#each row.letters as letter, letterIndex}


        <li
        on:dragenter={(e) => {rowLoc = row.name; e.target.classList.add("droppable");}}
        on:dragleave={(e) => {rowLoc = null; e.target.classList.remove("droppable");}}
        on:drop={event => drop(event, rowIndex, letterIndex)}
        ondragover="return false" 
        draggable={true}
        on:dragstart={event => dragStart(event, rowIndex, letterIndex)}
        >
          <Card letter="{letter?.letter}" value="{letter?.value}" empty="{letter.letter?0:1}"/>
        </li>
    
    {/each}
  </ul>
  </div>
 {/each}
<div class="row">
  <button on:click={reset}>Reset</button>
  <button on:click={draw}>Draw from deck</button>
  <button>Draw from discard pile</button>
  <button>Check word</button>
  <button>Discard</button>
</div>

<style>
  ul {
    display: flex;
  }

  li {
    list-style: none;
  }

  .board {
    display: flex;
  }

  .row {
      width: 100%;
      display: block;
  }

  .hovering {
		outline: 3px dashed red;
    background: red;
    
	}

  :global(.droppable) {
        outline: 3px dashed red;
        background: red;
    }
</style>
