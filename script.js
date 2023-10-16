'use strict';

const colorChoice1 = document.querySelector('.color--1');
const colorChoice2 = document.querySelector('.color--2');
const colorMix = document.querySelector('.color--mix');

const colorSelection0 = document.querySelector('.color--list--0');
const colorSelection1 = document.querySelector('.color--list--1');
const colorSelection2 = document.querySelector('.color--list--2');
const colorSelection3 = document.querySelector('.color--list--3');
const colorsSelection = document.querySelectorAll('.color--list');
const colorToFind = document.querySelector('.color--comb');

const winMessage = document.querySelector('.winning--message');

const resetButton = document.querySelector('.reset');

let randNum1, randNum2;

const init = function () {
  randNum1 = Math.trunc(Math.random() * 4);
  randNum2 = Math.trunc(Math.random() * 4);

  do {
    randNum2 = Math.floor(Math.random() * 4);
  } while (randNum2 === randNum1);

  const colors = [];

  for (let i = 0; i < 4; i++) {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(randomColor);
  }

  colorSelection0.style.backgroundColor = colors[0];
  colorSelection1.style.backgroundColor = colors[1];
  colorSelection2.style.backgroundColor = colors[2];
  colorSelection3.style.backgroundColor = colors[3];

  colorToFind.style.backgroundColor = `color-mix(in srgb, ${colors[randNum1]}, ${colors[randNum2]})`;

  winMessage.classList.add('hidden');
  colorChoice1.classList.add('default');
  colorChoice2.classList.add('default');

  colorChoice1.style.backgroundColor = '#ffffff';
  colorChoice2.style.backgroundColor = '#ffffff';
  colorMix.style.backgroundColor = '#ffffff';

  console.log(randNum1, randNum2);
};

init();

// selecting colors
for (let i = 0; i < colorsSelection.length; i++) {
  colorsSelection[i].addEventListener('click', function () {
    if (colorChoice1.classList.contains('default')) {
      colorChoice1.style.backgroundColor =
        colorsSelection[i].style.backgroundColor;
      colorChoice1.classList.remove('default');
    } else {
      colorChoice2.style.backgroundColor =
        colorsSelection[i].style.backgroundColor;
      colorChoice2.classList.remove('default');
      const colorMixCheck1 = `color-mix(in srgb, ${colorChoice1.style.backgroundColor}, ${colorChoice2.style.backgroundColor})`;
      const colorMixCheck2 = `color-mix(in srgb, ${colorChoice2.style.backgroundColor}, ${colorChoice1.style.backgroundColor})`;
      colorMix.style.backgroundColor = colorMixCheck1;

      colorChoice1.classList.add('default');

      if (
        colorMixCheck1 === colorToFind.style.backgroundColor ||
        colorMixCheck2 === colorToFind.style.backgroundColor
      ) {
        winMessage.classList.remove('hidden');
      }
    }
  });
}

//reset game
resetButton.addEventListener('click', init);
document.addEventListener('keydown', function (e) {
  if (e.code !== 'Space') init();
});
