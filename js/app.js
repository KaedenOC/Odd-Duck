'use strict';


const state = []; // array for the imgs
let roundVotes = 25;

function Image (name, source) {
    this.name = name;
    this.source = source;
    this.timeShown = 0;
    this.timesClicked = 0;
}

state.push(new Image('bag', '/img/bag.jpg'));
state.push(new Image('banana', '/img/banana.jpg'));
state.push(new Image('bathroom', '/img/bathroom.jpg'));
state.push(new Image('boots', '/img/boots.jpg'));
state.push(new Image('breakfast', '/img/breakfast.jpg'));
state.push(new Image('bubblegum', '/img/bubblegum.jpg'));
state.push(new Image('chair', '/img/chair.jpg'));
state.push(new Image('cthulhu', '/img/cthulhu.jpg'));
state.push(new Image('dog-duck', '/img/dog-duck.jpg'));
state.push(new Image('dragon', '/img/dragon.jpg'));
state.push(new Image('pen', '/img/pen.jpg'));
state.push(new Image('pet-sweep', '/img/pet-sweep.jpg'));
state.push(new Image('scissors', '/img/scissors.jpg'));
state.push(new Image('shark', '/img/shark.jpg'));
state.push(new Image('sweep', '/img/sweep.png'));
state.push(new Image('tauntaun', '/img/tauntaun.jpg'));
state.push(new Image('unicorn', '/img/unicorn.jpg'));
state.push(new Image('water-can', '/img/water-can.jpg'));
state.push(new Image('wine-glass', '/img/wine-glass.jpg'));


let imgEls = document.querySelectorAll("img");
let voteTrackerEl = document.getElementById("vote-tracker")
console.log(state);
console.log(imgEls);

// create algorithm that will randomly generate three unique images from the directory and display them side by side in the browser window.

renderImg();

function generateRandomImg () {
    return Math.floor(Math.random() * state.length);
}

function renderImg () {
    let img1 = state[generateRandomImg()];
    let img2 = state[generateRandomImg()];
    let img3 = state[generateRandomImg()];
    while (img1 === img2 || img1 === img3 || img2 === img3) {
        img2 = state[generateRandomImg()];
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
    let imgClicked = event.target.id;
    state.forEach(image => {
        if (image.name === imgClicked) {
            image.timesClicked += 1;
        }
    });

    // re render the new img from img state
    if (roundVotes) {
        renderImg();
        roundVotes--;
        
    } else {
        voteTrackerEl.removeEventListener('click', handleClick);
    }

}

voteTrackerEl.addEventListener('click', handleClick);




