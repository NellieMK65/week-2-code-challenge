const BASE_URL = 'http://localhost:3000';
const headers = {
	'Content-Type': 'application/json',
};

document.addEventListener('DOMContentLoaded', () => {
	fetchCharacters();
});

// Fetch characters from db.json then display/render them on our html
function fetchCharacters() {
	fetch(`${BASE_URL}/characters`, {
		method: 'GET',
		headers,
	})
		.then((res) => res.json())
		.then(renderCharacters)
		.catch((err) => {
			console.log(err);
		});
}

// Attach or render characters on the html
function renderCharacters(characters) {
	const listCharactersDiv = document.getElementById('list-characters');

	characters.forEach((character) => {
		// Create a new div element for each character
		const card = document.createElement('div');
		card.innerText = character.name;
		card.classList.add('list-character-item');

		// Add an onclick listener
		card.addEventListener('click', () => {
			renderCharacterDetails(character);
		});

		// Append each new card to the listCharactersDiv
		listCharactersDiv.appendChild(card);
	});
}

// Render one character on the html
async function renderCharacterDetails(passedCharacter) {
	const response = await fetch(
		`${BASE_URL}/characters/${passedCharacter.id}`,
		{
			method: 'GET',
			headers,
		}
	);

	const character = await response.json();

	const characterDetailsDiv = document.getElementById('character-details');

	// Reset character details div
	characterDetailsDiv.innerHTML = '';

	// Name element
	const nameParagraph = document.createElement('p');
	nameParagraph.innerText = `Name: ${character.name}`;

	// Image element
	const imageElement = document.createElement('img');
	imageElement.src = character.image;
	imageElement.classList.add('character-image');

	// Votes element
	const voteParagraph = document.createElement('p');
	voteParagraph.innerText = `Votes: ${character.votes}`;

	// Add votes button
	const addVotesButton = document.createElement('button');
	addVotesButton.innerText = 'Add votes';

	addVotesButton.addEventListener('click', () => {
		const newVote = (character.votes += 1);
		voteParagraph.innerText = `Votes: ${newVote}`;
	});

	// Attach all elements
	characterDetailsDiv.appendChild(nameParagraph);
	characterDetailsDiv.appendChild(imageElement);
	characterDetailsDiv.appendChild(voteParagraph);
	characterDetailsDiv.appendChild(addVotesButton);
}
