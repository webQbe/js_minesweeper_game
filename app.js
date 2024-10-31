// Initialize Squares Array
let squares = [];

// Set Initial Grid Width
// Grid width = 10 Squares
let width = 10;

// Set Initial Bomb Amount
let bombAmount = 20;

// Initialize isGameOver
let isGameOver = false;

// Initialize Flags
let flags = 0;


// Add Event Listener
// To make sure all HTML is loaded before running JS code
document.addEventListener('DOMContentLoaded', () => {

    // Define DOM Elements
    const grid = document.querySelector('.grid');

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

            /* Add Event Listener to Current Square */

            // Normal Click
            square.addEventListener('click', function(e){
                
                //Pass Current Square to function
                click(square); 

                // click() is defined outside createBoard()

            });

            // Right Click
            square.oncontextmenu = function(e){

                e.preventDefault(); // Prevent Default Action

                // Add / Remove Flag
                addFlag(square);

            }


        }

        // Checking Surrounding Squares for Bombs
        // Looping Over squares Array (Length = 100)

        for (let i = 0; i < squares.length; i++){

            // Initialize Total
            let totalBombs = 0; 

            // Define Squares At Left Edge & Right Edge (width = 0)
            const isLeftEdge = (i % width === 0) 
            const isRightEdge = (i % width === width - 1) 

            /* For i = 0, 10, 20, etc., i % 10 === 0, so isLeftEdge is true.
               For i = 9, 19, 29, etc., i % 10 === 9, so isRightEdge is true.
            */

            // If Current Square does not have a Bomb
            if(squares[i].classList.contains('valid')){
                
                // Add to total If
                    // Current Square is NOT at 0 &
                    // Current Square is NOT at Left Edge &
                    // Left Side Square has A Bomb
                if(i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) totalBombs++

                // Add to total If
                    // Current Square is NOT at 0 - 9 &
                    // Current Square is NOT at Right Edge &
                    // North East Square has A Bomb 
                if(i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) totalBombs++

                // Add to total If
                    // Current Square is NOT between 0 - 10 &
                    // North Square has A Bomb 
                if(i > 10 && squares[i - width].classList.contains('bomb')) totalBombs++


                // Add to total If
                    // Current Square is NOT between 0 - 11 &
                    // Current Square is NOT at Left Edge &
                    // North West Square has A Bomb 
                if(i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) totalBombs++


                // Add to total If
                    // Current Square is between 0 - 97 &
                    // Current Square is NOT at Right Edge &
                    // Right Side Square has A Bomb
                if(i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb'))totalBombs++


                // Add to total If
                    // Current Square is between 0 - 89 &
                    // Current Square is NOT at Left Edge &
                    // South West Square has A Bomb
                if(i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) totalBombs++


                // Add to total If
                    // Current Square is between 0 - 87 &
                    // Current Square is NOT at Right Edge &
                    // South Square has A Bomb
                if(i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) totalBombs++

                
                // Add to total If
                    // Current Square is between 0 - 88 &
                    // South Square has A Bomb
                if(i < 89 && squares[i + width].classList.contains('bomb')) totalBombs++


                // Add totalBombs to Current Square Data Attr
                squares[i].setAttribute('data', totalBombs);

                // Log Current Square
                console.log(squares[i])

            }


        }
    }

    // Create 100 square divs
    createBoard();

});


// Define click() & pass square
function click(square) {

    // Get Square ID
    let currentId = square.id

    // Break Cycle if Game Over
    if(isGameOver) return;

    // Break Cycle if a square already has .checked OR .flag class
    if (square.classList.contains('checked') || square.classList.contains('flag')) return;

    // Check if square has a 'bomb'
    if(square.classList.contains('bomb')){

        // Call gameOver()
        gameOver();

    } else {

        // Get Total Bomb Count from Square's Data Attr
        let totalBombs = square.getAttribute('data');

        // If Total Bomb Count is NOT 0 
        // (Surrounding Squares Has No Bombs)
        if(totalBombs != 0){

            // Add .checked Class to Square
            // Set Square Background-color to Red
            square.classList.add('checked')

            // Display Bomb Count of Surrounding Squares
            square.innerHTML =  totalBombs;

            // Break Cycle
            return;
        }

        // Check neighboring squares of clicked square
        checkSquare(square, currentId)

    }

      // If clicked square has no bomb & 
     // Surrounding Squares also have no bombs
    // Add .checked class to Square
    square.classList.add('checked')

}

// Define checkSquare()
function checkSquare(square, currentId){

    // Check if square is at either Left or Right edge
    const isLeftEdge = (currentId % width === 0);
    const isRightEdge = (currentId % width === width - 1);

    // RECURSION
    // Check All Surrounding Squares
    // Run Every 10 ms
    setTimeout(() => {

        // If Square is NOT at 0 &
        // If Square is NOT at Left Edge
        if(currentId > 0 && !isLeftEdge){

            // Auto Click() Left Square
            const newId = squares[parseInt(currentId - 1)].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);

        }

        // If Square is NOT at 0 - 9 &
        // If Square is NOT at Right Edge
        if(currentId > 9 && !isRightEdge){

            // Auto Click() North East Square
            const newId = squares[parseInt(currentId) + 1 - width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);

        }

        // If Square is NOT at 0 - 10 
        if(currentId > 10){

            // Auto Click() North Square
            const newId = squares[parseInt(currentId - width)].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);

        }

        // If Square is NOT at 0 - 11 &
        // If Square is NOT at Left Edge
        if(currentId > 11 && !isLeftEdge){

            // Auto Click() North West Square
            const newId = squares[parseInt(currentId - 1 - width)].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
            
        }

        // If Square is at 0 - 97 &
        // If Square is NOT at Right Edge
        if (currentId < 98 && !isRightEdge) {

            // Auto Click() Right Square
            const newId = squares[parseInt(currentId) + 1].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);

        }

        // If Square is at 0 - 89 &
        // If Square is NOT at Left Edge
        if(currentId < 90 && !isLeftEdge){

            // Auto Click() South Square
            const newId = squares[parseInt(currentId) - 1 + width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }

        // If Square is at 0 - 87 &
        // If Square is NOT at Right Edge
        if(currentId < 88 && !isRightEdge){
            
            // Auto Click() South East Square
            const newId = squares[parseInt(currentId) + 1 + width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }

        // If Square is at 0 - 88
        if(currentId < 89){

            // Auto Click() South Square 
            const newId = squares[parseInt(currentId) + width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);

        }

    }, 10)
}


// Define addFlag() with Right-Click
function addFlag(square){

    if (isGameOver) return; // Do not run if Game Over

    // If Square not checked & 
    // If Flag Count (Init: 0) is Lower than bomb count (Init: 20)
    if(!square.classList.contains('checked') && (flags < bombAmount)){

        // If Square has no Flag
        if(!square.classList.contains('flag')){

            // Add .flag class to Square
            square.classList.add('flag');

            // Add flag icon
            square.innerHTML = '&#128681';

            // Add +1 to flags
            flags ++

            // Check if Flag Count == Bomb Amount
            checkForWin();

        } else {

                // If Square has a Flag

                // Remove class
                square.classList.remove('flag')

                // Remove flag icon
                square.innerHTML = '';

                // Add -1 to flags
                flags --

        }

    }

}


// Define gameOver
function gameOver(){

    console.log('Game Over!');
    isGameOver = 'true';

    // Show All Squares with Bombs
    squares.forEach(square => {

        // If square has a bomb
        if(square.classList.contains('bomb')){

            // Add bomb icon
            square.innerHTML = '💣';

        }

    });

}


// Check for Win
// Called when addFlag() adds a Flag
function checkForWin(){

    // Initialize Matches
    let matches = 0;

    // Loop through 100 Squares
    for(let i = 0; i < squares.length; i++){

        // Check if Current Square has Both Flag & Bomb
        if(squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')){

            // Add +1 to matches
            matches ++
        }

        // If matches count reaches 20
        if(matches == bombAmount) {

            console.log('YOU WIN!');

        }

    }

}
