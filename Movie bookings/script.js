// gets the container class from HTML
// if you want to get id, use # before the name
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.rows .seat:not(.occupied)'); //get all the seats in the row that are not occupied

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

//saves the selected movie and its price in local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//updates theprice of the seats based on the number selected
function updateSeatsSelected(){
  const selectedSeats = document.querySelectorAll('.rows .seat.selected'); //puts all the selected seats into a nodelist

  //Copies the selected seats into the array using the spread operator(...) and returns new array indexes
  const seatsIndex = [...selectedSeats].map(function (seat) {
    return[...seats].indexOf(seat);
  });
  
  //JSON.stringify turns the seat indexes to a string which is saved in local storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;

  //innerText is used to change the text on the webpage from the HTML file
  count.innerText = selectedSeatsCount; //updates no of seats selected
  total.innerText = selectedSeatsCount * ticketPrice; //updates total price of the seats

}

function populateUI() {
  //JSON.parse parses the selected seats back into an array
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null  && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      //checking if the seatSelected is present in the array
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}


//adds an event listener to movieSelect so that when the movie is changed, the price updates aswell
movieSelect.addEventListener('change', function(e){
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSeatsSelected();
})

container.addEventListener('click', function(e) {
  
  //checks if the portion of the container selected has the seat class and is not occupied
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    //adds or removes selected from the seat class name depending on what the user clicks
    e.target.classList.toggle('selected');

    updateSeatsSelected();
  }
});

updateSeatsSelected();