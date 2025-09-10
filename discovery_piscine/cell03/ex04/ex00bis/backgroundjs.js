$(document).ready(function() {


    const colorButton = $('#colorButton');

    const body = $('body');



    function getRandomHexColor() {
        const randomNum = Math.floor(Math.random() * 16777216);
        const hexString = randomNum.toString(16);
        const paddedHexString = hexString.padStart(6, '0');
        return `#${paddedHexString}`;
    }



    colorButton.on('click', function() {
        const newColor = getRandomHexColor();

        body.css('background-color', newColor);
    });
    
});
