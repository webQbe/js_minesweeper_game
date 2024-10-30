// Add Event Listener
// To make sure all HTML is loaded before running JS code
document.addEventListener('DOMContentLoaded', () => {

    // Define DOM Elements
    const grid = document.querySelector('.grid');

    // Set Initial Grid Width
    // Grid width = 10 Squares
    let width = 10;

    // Set Initial Bomb Amount
    let bombAmount = 20;

    // Intialize Squares Array
    let squares = [];

    // Create Board
    function createBoard(){

        // Create bombsArray with 20 indexes
        // Fill each index with 'bomb'
        const bombsArray = Array(bombAmount).fill('bomb');

        // For Empty Squares
        // Create emptyArray of 80 indexes
        // Fill each index with 'valid'
        const emptyArray = Array(width*width - bombAmount).fill('valid');

        // Create gameArray by Joining bombsArray with emptyArray
        const gameArray = emptyArray.concat(bombsArray);
        
        // Create shuffledArray by Shuffling Items in gameArray
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
        console.log(shuffledArray);

        /*  How shuffled shuffledArray is created?

            1. Math.random(): 
            This function generates a random number between 0 and 1.

            2. Math.random() - 0.5: 
            By subtracting 0.5, you get a random number between -0.5 and 0.5. This result can be positive, negative, or zero.

            3. sort() function: 
            The sort() method sorts the elements of an array based on the return value of the provided function.

                If the function returns a negative number, the order remains unchanged (meaning a should come before b).
                If it returns a positive number, the order of a and b is swapped.
                If it returns 0, the order remains the same.

            In this case:

            Since Math.random() - 0.5 randomly returns a positive or negative number, it effectively shuffles the items in gameArray by randomly deciding whether to switch the position of each pair of elements.
                
        */


        // Iterate until 100 squares ( width * width ) are created 
        for(let i = 0; i < width*width; i++){
            
            // Create A Square
            const square = document.createElement('div');

            // Set Current Iteration Number as Current Square div ID
            square.setAttribute('id', i);

            // Set Current Iteration Number as shuffledArray Index 
            // To Add either '.bomb' or '.valid' class To Current Square
            square.classList.add(shuffledArray[i]);

            // Add Current Square to Grid
            grid.appendChild(square);

            // Add Current Square to squares Array
            squares.push(square);

        }

    }

    // Create 100 square divs
    createBoard();

});