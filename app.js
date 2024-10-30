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

        // Checking Surrounding Squares for Bombs
        // Looping Over squares Array (Length = 100)

        for (let i = 0; i < squares.length; i++){

            // Initialize Total
            let totalBombs = 0; 

            // Define Squares At Left Edge & Right Edge (width = 0)
            const isLeftEdge = (i % width === 0) 
            const isRightEdge = (i % width === width - 1) 

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