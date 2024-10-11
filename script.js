let correctNumber = Math.floor(Math.random() * 20) + 1; // Random number between 1 and 20.
let score = 20; // Initial score.
let highscore = 0; // Initial highscore.
let guesses = []; // Array to store the history of guesses.

// Sound for correct guess
const correctSound = document.getElementById('correct-sound')

// Check Button
document.querySelector('.check').addEventListener('click', function () {
    const userGuess = Number(document.querySelector('.guess').value); // Get user input and convert to number.

    // If the input is not a number or above
    if (!userGuess || userGuess < 1 || userGuess > 20) {
        document.querySelector('.message').textContent = '⛔️ Enter a number between 1 and 20!';
    } else if (userGuess === correctNumber) {
        // Correct guess
        document.querySelector('.message').textContent = '🎉 Correct Number!';
        document.querySelector('.number').textContent = correctNumber; // Display the correct number.
        correctSound.play(); // Play the sound for a correct guess.

        // Update highscore
        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }

        // Trigger confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    } else {
        // If the guess is wrong then decrease
        document.querySelector('.message').textContent = userGuess > correctNumber ? '📉 Too high!' : '📈 Too low!';
        score--;

        // Update the score display.
        document.querySelector('.score').textContent = score;

        if (score <= 0) {
            document.querySelector('.message').textContent = '💥 You lost the game!';
            document.querySelector('.score').textContent = 0; // Set score to 0 if it goes below.
        }
    }

    // Add the guess to the history and update the display
    if (userGuess >= 1 && userGuess <= 20) {
        // Add current guess
        guesses.push(userGuess);
        // Display the list of guessed numbers
        document.querySelector('.guesses').textContent = guesses.join(', ');
    }

    document.querySelector('.guess').value = ''; // Clear the input field.
});

// Again button to reset
document.querySelector('.again').addEventListener('click', function () {
    score = 20; // Reset the score.
    correctNumber = Math.floor(Math.random() * 20) + 1; // Generate a new random number.
    guesses = []; // Clear the history of guesses.

    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?'; // Hide the correct number.
    document.querySelector('.guess').value = ''; // Clear the input field.
    document.querySelector('.guesses').textContent = ''; // Clear the displayed guesses.
});

// Light/Dark Mode Toggle Button logic
document.querySelector('.toggle-mode').addEventListener('click', function () {
    // Toggle the 'light-mode' class on the <body> element.
    document.body.classList.toggle('light-mode');

    // Toggle to light mode for the header and number
    document.querySelector('header').classList.toggle('light-mode');
    document.querySelector('.number').classList.toggle('light-mode');

    // Toggle to light mode for all buttons
    document.querySelectorAll('.btn').forEach((btn) => btn.classList.toggle('light-mode'));

    // Toggle to light mode for all text
    document.querySelector('.guess').classList.toggle('light-mode');
    document.querySelector('.message').classList.toggle('light-mode');
    document.querySelector('.label-score').classList.toggle('light-mode');
    document.querySelector('.label-highscore').classList.toggle('light-mode');
    document.querySelector('.label-guesses').classList.toggle('light-mode');
});
