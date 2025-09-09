
const colorButton = document.getElementById('colorButton');

const body = document.querySelector('body');

function getRandomHexColor() {

  const randomNum = Math.floor(Math.random() * 16777216);
  
  const hexString = randomNum.toString(16);
  
  const paddedHexString = hexString.padStart(6, '0');

  return `#${paddedHexString}`;
}
colorButton.addEventListener('click', function() {

  const newColor = getRandomHexColor();

  body.style.backgroundColor = newColor;
});

