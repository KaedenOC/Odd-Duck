'use strict';


let state = []; // array for the imgs

let roundVotes = 25;


function Image (name, source) {
  this.name = name;
  this.source = source;
  this.timeShown = 0;
  this.timesClicked = 0;
}


let retrieveState = localStorage.getItem('state');
// The getItem method takes a single parameter, which is the name of the item you want to retrieve. The method returns the value of the item as a string, or null if the item does not exist.


// this code is checking whether there is stored data to restore the application's previous state, and if not, it initializes the state array with a predefined set of Image objects.

if (retrieveState) {
  let parsedState = JSON.parse(retrieveState); 
  state = parsedState;
} else {
  state.push(new Image('bag', 'img/bag.jpg'));
  state.push(new Image('banana', 'img/banana.jpg'));
  state.push(new Image('bathroom', 'img/bathroom.jpg'));
  state.push(new Image('boots', 'img/boots.jpg'));
  state.push(new Image('breakfast', 'img/breakfast.jpg'));
  state.push(new Image('bubblegum', 'img/bubblegum.jpg'));
  state.push(new Image('chair', 'img/chair.jpg'));
  state.push(new Image('cthulhu', 'img/cthulhu.jpg'));
  state.push(new Image('dog-duck', 'img/dog-duck.jpg'));
  state.push(new Image('dragon', 'img/dragon.jpg'));
  state.push(new Image('pen', 'img/pen.jpg'));
  state.push(new Image('pet-sweep', 'img/pet-sweep.jpg'));
  state.push(new Image('scissors', 'img/scissors.jpg'));
  state.push(new Image('shark', 'img/shark.jpg'));
  state.push(new Image('sweep', 'img/sweep.png'));
  state.push(new Image('tauntaun', 'img/tauntaun.jpg'));
  state.push(new Image('unicorn', 'img/unicorn.jpg'));
  state.push(new Image('water-can', 'img/water-can.jpg'));
  state.push(new Image('wine-glass', 'img/wine-glass.jpg'));
  //these are pushed to the front of the array

}

console.log(localStorage);

let imgEls = document.querySelectorAll("img"); //this will grab all the images
let voteTrackerEl = document.getElementById("vote-tracker")
// console.log(state);
// console.log(imgEls);

// create algorithm that will randomly generate three unique images from the directory and display them side by side in the browser window.

renderImg();

function generateRandomImg () {
  let randomIndex = Math.floor(Math.random() * state.length);
  let randomImg = state[randomIndex]; //this will grab the random image from the state array
  
  while (randomImg.name === imgEls[0].id || randomImg.name === imgEls[1].id || randomImg.name === imgEls[2].id) {
    randomIndex = Math.floor(Math.random() * state.length);
    randomImg = state[randomIndex];
  }
  
  return randomImg;
}

function renderImg () {
  let img1 = generateRandomImg();
  let img2 = generateRandomImg();
  let img3 = generateRandomImg();
  
  while (img1 === img2 || img1 === img3 || img2 === img3) { //this will check to see if the images are the same or not
    img1 = generateRandomImg();
    img2 = generateRandomImg();
    img3 = generateRandomImg();
  }
  
  imgEls[0].src = img1.source;
  imgEls[0].id = img1.name;
  img1.timeShown += 1;
  
    imgEls[1].src = img2.source;
    imgEls[1].id = img2.name;
    img2.timeShown += 1;
    
    imgEls[2].src = img3.source;
    imgEls[2].id = img3.name;
    img3.timeShown += 1;
  }
  
  function handleClick (event) {
    console.log(event.target); //event.target always represents the exact element where an event occured.
    
    // identify which img was clicked
    let imgClicked = event.target.id; //event.target.id is the id of the img that was clicked.
    state.forEach(image => {
      if (image.name === imgClicked) {
        image.timesClicked += 1;
      }
    });
    
    // re render the new img from img state
    if (roundVotes) {
      renderImg();
      roundVotes--; //this will decrement the roundVotes by 1
      
    } else {
      voteTrackerEl.removeEventListener('click', handleClick);
      
    }

    //This code is saving the current state of an application to the browser's localStorage API.The JSON.stringify() method is used to convert the state object into a string, so that it can be stored as a value in localStorage.The localStorage.setItem() method is then used to store the stringifiedState value in localStorage, with the key 'state'. This means that the string value of the state object will be saved in localStorage under the key 'state'.
    let stringifiedState = JSON.stringify(state);
    localStorage.setItem('state', stringifiedState);
  };

  renderImg();

  voteTrackerEl.addEventListener('click', handleClick);
  
  function showResults () {
    let resultsEl = document.getElementById('results');
    resultsEl.innerHTML = ''; //this will clear the results section
    
    for (let i = 0; i < state.length; i++) {
      let liEl = document.createElement('li');
      liEl.textContent = `${state[i].name} had ${state[i].timesClicked} votes, and was seen ${state[i].timeShown} times.`;
      resultsEl.appendChild(liEl);
      
    }
    renderChart();
  }

  let resultsButton = document.getElementById('show-results');
  resultsButton.addEventListener('click', showResults);
  
  
  let canvasElement = document.getElementById('draw-on-me').getContext('2d');
  
  
  function renderChart () {
    let imgName = [];
    let imgShown = [];
    let imgVotes = [];
    
    for (let i = 0; i < state.length; i++) {
      imgName.push(state[i].name);
      imgShown.push(state[i].timeShown);
      imgVotes.push(state[i].timesClicked);
    }
    let myChart = {
        type: 'bar',
        data: {
          labels: imgName,
          datasets: [{
            label: '# of Views',
            data: imgShown,
            backgroundColor: [
              'grey'
            ],
            borderColor: [
              'grey'
            ],
            borderWidth: 1
          },
          {
            label: '# of Votes',
            data: imgVotes,
            backgroundColor: [
              'lightblue'
            ],
            borderColor: [
              'lightblue'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };
      
      new Chart(canvasElement, myChart);
    }
    