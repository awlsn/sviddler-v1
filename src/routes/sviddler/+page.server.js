import { cardData } from './cards.server';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	//build new array with entries for how many of each card exist
	let allCards = [];
	for (const cardEntry of cardData) {
		//console.log(cardEntry);
		const { letter, value, quantity } = cardEntry;
		for (let i = 0; i < quantity; i++) {
			allCards.push({ letter, value });
		}
	}
	//const cards = shuffle(allCards).slice(0, 3);

	const cards = shuffle(allCards);

	return {
		cards
	};
}

function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}
