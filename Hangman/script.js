const wordElement = document.getElementById('word');
const wrongLetterElement = document.getElementById('wrong-letters');
const playButton = document.getElementById('play-button');
const popup = document.getElementById('popup-message');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figurePart = document.querySelectorAll('.figure-part');

const words = ['representative', 'country', 'grate', 'uncovered', 'balance', 'calculate', 'moldy', 'fallacious', 'selfish', 'weary'];

//to-do: implement function to fetch from api
// async function getRandom(){

	
// 	
//const response = await fetch('https://random-word-api.herokuapp.com/word')

// 	if(response.ok){
// 		const json = await response.json();
		
// 		return json;
// 	}	

// }



// const words = getRandom();
// words.then(data => console.log(data));
// const words = ['representative', 'country', 'grate', 'uncovered', 'balance', 'calculate', 'moldy', 'fallacious', 'selfish', 'weary'];

// 
// const words = fetch('https://random-word-api.herokuapp.com/word');
// 
// .then(res => res.json())
// .then(data => newRandom(data))

let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLetters = [];
const wrongLetters = [];

function displayWord(){
  wordElement.innerHTML = `
  ${selectedWord
    .split('') //making each letter of the word an item in the array
    .map(letter => `
    <span class= "letter">
      ${correctLetters.includes(letter) ? letter : ''} 
    </span>`).join('') //checks if the letter is included in the array, if it is the letter is shown if not it displays an empty string. join turns it back into a string
  }
  `;

  const innerWord = wordElement.innerText.replace(/\n/g, '') 
  //checks if the letters match the selected word 
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'You win!';
    popup.style.display = 'flex';
  }
}

function updateWrongLetters() {
  wrongLetterElement.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong Letters entered: </p>' : ''}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  figurePart.forEach((part, index) => {
    const noOfErrors = wrongLetters.length;

    if (index < noOfErrors) {
      part.style.display = 'block';
    } else{
      part.style.display = 'none';
    }
  });

  //checks if the hangman has been fully drawn meaning the game is over
  if (wrongLetters.length === figurePart.length) {
    finalMessage.innerText = 'You lose...';
    //to-do: repopulate display to show correct word
    popup.style.display = 'flex';
  }
}

function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show')

  }, 3000);
}

window.addEventListener('keydown', e =>{
  //checking if the keypressed is a letter
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      //checking if the letter has already been entered
      if (!correctLetters.includes(letter)) {
        
        correctLetters.push(letter);

        displayWord();
      }else{
        showNotification();
      }
    }
    else{
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetters();
        
      } else{
        showNotification();
      }
    }
    
  }
});

//Play again

playButton.addEventListener('click', () => {
  //emptying the array of right and wrong letters
  correctLetters.splice(0);
  wrongLetters.splice(0);

  //selecting a new word
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetters();
  popup.style.display = 'none';

  
});

displayWord();