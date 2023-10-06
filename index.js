const button__1 = document.querySelector("#button__1");
const button__2 = document.querySelector("#button__2");
const button__3 = document.querySelector("#button__3");
const button__4 = document.querySelector("#button__4");
const button__5 = document.querySelector("#button__5");
const button__6 = document.querySelector("#button__6");
const button__7 = document.querySelector("#button__7");
const button__8 = document.querySelector("#button__8");
const button__9 = document.querySelector("#button__9");
const button__10 = document.querySelector("#button__10");
let circle__playerElement = document.querySelector("#circle__player");

let currentPlayer = 'circle';


const addMark = (event) => {
  if(currentPlayer === "circle"){
    circle__playerElement.src = "cross2.svg"
    event.target.classList.add("button__mark--circle")
    event.target.disabled = true
    return currentPlayer = "cross"
  }else if (currentPlayer === "cross"){
    circle__playerElement.src = "circle2.svg"
    event.target.disabled = true
    event.target.classList.add("button__mark--cross")
    return currentPlayer = "circle"
  }
};

button__1.addEventListener("click", addMark);
button__2.addEventListener("click", addMark);
button__3.addEventListener("click", addMark);
button__4.addEventListener("click", addMark);
button__5.addEventListener("click", addMark);
button__6.addEventListener("click", addMark);
button__7.addEventListener("click", addMark);
button__8.addEventListener("click", addMark);
button__9.addEventListener("click", addMark);
button__10.addEventListener("click", addMark);


const buttonElement = document.querySelector('#restart');

const restartButton = (event) => {
  const questionRestart = confirm('Opravdu chceš začít znovu?');
  if (questionRestart === false) {
    event.preventDefault()
  }
 } 

 buttonElement.addEventListener('click', restartButton);


