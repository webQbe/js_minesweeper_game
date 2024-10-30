// Add Event Listener
// To make sure all HTML is loaded before running JS code
document.addEventListener('DOMContentLoaded', () => {

    // Define DOM Elements
    const grid = document.querySelector('.grid');

    // Set Initial Grid Width
    // Grid width = 10 Squares
    let width = 10;

    // Intialize Squares Array
    let squares = [];

    // Create Board
    function createBoard(){

        // Iterate until 100 squares ( width * width ) are created 
        for(let i = 0; i < width*width; i++){
            
            // Create A Square
            const square = document.createElement('div');

            // Set Current Iteration Number as Current Square div ID
            square.setAttribute('id', i);

            // Add Current Square to Grid
            grid.appendChild(square);

            // Add Current Square to squares Array
            squares.push(square);

        }

    }

    // Create 100 square divs
    createBoard();

});