const gameArea = document.getElementById('gameArea');
const collectedWordsDiv = document.getElementById('story');
const startButton = document.getElementById('startGame');
const timerDiv = document.getElementById('timer');

let collectedWords = [];
let gameInterval;
let timerInterval;
let timeLeft = 120; // 2 minutes

function createEntity() {
    const randomValue = Math.random();
    if (randomValue < 0.9) {
        createWord();
    } else if (randomValue < 0.95) {
        createUFO();
    } else {
        createComet();
    }
}

function createWord() {
    const wordDiv = document.createElement('div');
    wordDiv.classList.add('word');

    // Random word for the example; replace this with your own list
    const words = [
        // Nouns 
        "dog", "cat", "robot", "alien", "banana", "car", "guitar", "beach", "mountain", "hat", "dinosaur",
        "unicorn", "mermaid", "chicken", "pickle", "ninja", "pirate", "zombie", "wizard", "spaghetti", "martian",
        "city", "forest", "lake", "computer", "phone", "dragon", "knight", "castle", "wizard", "spaceship",
        "taco", "pineapple", "squirrel", "octopus", "vampire", "ghoul", "fairy", "ogre", "goblin", "elf",
        "book", "pen", "glasses", "chair", "moon", "star", "sun", "planet", "galaxy", "meteor",
        "cloud", "rain", "snow", "wind", "hurricane", "tornado", "storm", "thunder", "lightning", "river", "pickle",
        "witch", "ring", "cloak", "boot", "helmet", "lair", "maze", "puzzle", "riddle",
        "dog", "cat", "robot", "alien", "banana", "car", "guitar", "beach", "mountain", "hat", "dinosaur",
        "unicorn", "mermaid", "chicken", "pickle", "ninja", "pirate", "zombie", "wizard", "spaghetti", "martian",
        "city", "forest", "lake", "computer", "phone", "dragon", "knight", "castle", "wizard", "spaceship",
        "taco", "pineapple", "squirrel", "octopus", "vampire", "ghoul", "fairy", "ogre", "goblin", "elf",
        "book", "pen", "glasses", "chair", "moon", "star", "sun", "planet", "galaxy", "meteor",
        "cloud", "rain", "snow", "wind", "hurricane", "tornado", "storm", "thunder", "lightning", "river", "pickle",
        "witch", "ring", "cloak", "boot", "helmet", "lair", "maze", "puzzle", "riddle",

        // Pronouns
        "he", "she", "it", "they", "we", "you", "I", "me", "him", "her",
        "us", "them", "myself", "yourself", "herself", "himself", "itself", "ourselves", "yourselves", "themselves",

        // Verbs
        "run", "jump", "swim", "fly", "eat", "drink", "sing", "dance", "write", "read",
        "speak", "listen", "build", "destroy", "fight", "hug", "drive", "paint", "sell", "buy",
        "cry", "laugh", "smile", "frown", "sleep", "dream", "cook", "bake", "travel", "work", "stop",

        // Adjectives
        "happy", "sad", "big", "small", "fast", "slow", "hot", "cold", "bright", "dark",
        "heavy", "light", "loud", "quiet", "strong", "weak", "hard", "soft", "wet", "dry",
        "old", "young", "tall", "short", "beautiful", "ugly", "rich", "poor", "good", "bad",

        // Adverbs
        "quickly", "slowly", "loudly", "silently", "happily", "sadly", "easily", "hardly", "always",

        // Prepositions
        "above", "across", "against", "along", "among", "around", "at", "before", "behind", "below",
        "beneath", "beside", "between", "by", "down", "during", "except", "for", "from", "in",
        "inside", "into", "like", "near", "of", "off", "on", "over", "through", "to",
        "toward", "under", "underneath", "until", "up", "upon", "with", "within", "without", "next",

        // Conjunctions
        "and", "and", "and", "and", "and", "and", "and", "and", "and", "and", "and", "and", "and",
        "because", "since", "because", "since", "because", "since", "because", "since", "because", "since", "because", "since",
        "but", "or", "but", "or", "but", "or", "but", "or", "but", "or", "but", "or", "but", "or", "but", "or", "but", "or", 
        "nor", "for", "so", "yet", "although", "because", "since",  "but", "or",
        "unless", "while", "where", "when", "whenever", "wherever", "whether", "though", "once", "after",

        // Articles
        "the", "a", "an", "the", "a", "an", "the", "a", "an", "the", "a", "an", "the", "a", "an", "the", "a", "an", 
        "the", "a", "an", "the", "a", "an", "the", "a", "an", "the", "a", "an", "the", "a", "an", "the", "a", "an",
        "the", "a", "an", "the", "a", "an", "the", "a", "an", "the", "a", "an", "the", "a", "an", "the", "a", "an", 
        "the", "a", "an", "the", "a", "an", "the", "a", "an", "the", "a", "an", "the", "a", "an", "the", "a", "an", 

        // Determiners
        "this", "that", "these", "those", "my", "your", "his", "her", "our",
        "its", "its", "its", "its", "its", "its", "its", "its", "its",
        "their", "each", "every", "either", "neither", "some", "any", "no", "both", "all",

        // Quantifiers
        "many", "much", "few", "little", "a lot of", "plenty of", "a bit of", "a few", "several", "enough",

        // Interjections
        "ah!", "oops!", "ouch!", "hey!", "wow!", "yay!", "uh-oh!", "oh no!", "eek!", "hmm!",

        // Modals
        "can", "could", "may", "might", "shall", "should", "will", "would", "must", "ought to", 
        "will", "will", "will", "will", "will", "will", "will", "will", "will", "will", "will", "will", "will",        
        "is", "is", "is", "is", "is", "is", "is", "is", "is", "is", "is", "is", "is", "is", "is", "is", "is", "is" 

    ];

    wordDiv.textContent = words[Math.floor(Math.random() * words.length)];
    wordDiv.style.left = `${Math.random() * 80}vw`;


    gameArea.appendChild(wordDiv);

    const fallSpeed = Math.random() * 0.2 + 1; // Random speed 
    const fallInterval = setInterval(() => {
        wordDiv.style.top = `${(parseFloat(wordDiv.style.top) || 0) + fallSpeed}vh`;

        if (parseFloat(wordDiv.style.top) > 80) { // When word is out of game area
            clearInterval(fallInterval);
            gameArea.removeChild(wordDiv);
        }
    }, 50);
}

function createUFO() {
    const ufoDiv = document.createElement('div');
    ufoDiv.classList.add('ufo');
    ufoDiv.style.backgroundImage = "url('/assets/ufo.png')";
    ufoDiv.style.backgroundSize = 'cover';
    ufoDiv.style.width = '64px'; 
    ufoDiv.style.height = '64px';
    ufoDiv.style.position = 'absolute';
    ufoDiv.style.top = '0';
    ufoDiv.style.left = `${Math.random() * 90}vw`; // to make it appear randomly in horizontal direction
    
    gameArea.appendChild(ufoDiv);

    const fallSpeed = Math.random() * 0.1 + 0.5; // Random speed between 2 and 4
    const fallInterval = setInterval(() => {
        ufoDiv.style.top = `${(parseFloat(ufoDiv.style.top) || 0) + fallSpeed}vh`;
        
        if (parseFloat(ufoDiv.style.top) > 100) { // When UFO is out of the game area
            clearInterval(fallInterval);
            gameArea.removeChild(ufoDiv);
        }
    }, 50);
}

function createComet() {
    const cometDiv = document.createElement('div');
    cometDiv.classList.add('comet');
    cometDiv.style.backgroundImage = "url('/assets/comet.png')";
    cometDiv.style.backgroundSize = 'cover';
    cometDiv.style.width = '64px'; 
    cometDiv.style.height = '64px';
    cometDiv.style.position = 'absolute';
    cometDiv.style.top = '0';
    cometDiv.style.left = `${Math.random() * 90}vw`; // to make it appear randomly in horizontal direction
    
    gameArea.appendChild(cometDiv);

    const fallSpeed = Math.random() * 1 + 2; // Random speed - assuming comets are faster
    const fallInterval = setInterval(() => {
        cometDiv.style.top = `${(parseFloat(cometDiv.style.top) || 0) + fallSpeed}vh`;
        
        if (parseFloat(cometDiv.style.top) > 100) { // When comet is out of the game area
            clearInterval(fallInterval);
            gameArea.removeChild(cometDiv);
        }
    }, 50);
}

function checkCollision(event) {
    const buffer = 15; 
    const words = document.querySelectorAll('.word');
    words.forEach(word => {
        const wordRect = word.getBoundingClientRect();
        const cursorPos = { x: event.clientX, y: event.clientY };

        if (cursorPos.x > wordRect.left - buffer && cursorPos.x < wordRect.right + buffer && cursorPos.y > wordRect.top - buffer && cursorPos.y < wordRect.bottom + buffer){
            collectedWords.push(word.textContent);
            collectedWordsDiv.textContent = collectedWords.join(' ');

            gameArea.removeChild(word);
        }
    });
}

function checkUFOCollision(event) {
    const ufos = document.querySelectorAll('.ufo');
    ufos.forEach(ufo => {
        const ufoRect = ufo.getBoundingClientRect();
        const cursorPos = { x: event.clientX, y: event.clientY };
        const buffer = 15;  
        
        if (cursorPos.x > ufoRect.left - buffer && cursorPos.x < ufoRect.right + buffer &&
            cursorPos.y > ufoRect.top - buffer && cursorPos.y < ufoRect.bottom + buffer) {
            
            playSoundEffect('ufoSound');
            removeAllWordsFor10Seconds();
            gameArea.removeChild(ufo);
        }
    });
}

function checkCometCollision(event) {
    const comets = document.querySelectorAll('.comet');
    comets.forEach(comet => {
        const cometRect = comet.getBoundingClientRect();
        const cursorPos = { x: event.clientX, y: event.clientY };
        const buffer = 15;  
        
        if (cursorPos.x > cometRect.left - buffer && cursorPos.x < cometRect.right + buffer &&
            cursorPos.y > cometRect.top - buffer && cursorPos.y < cometRect.bottom + buffer) {
            
            playSoundEffect('cometSound');
            addBonusTime(10);
            gameArea.removeChild(comet);
        }
    });
}


function updateTimer() {
    timeLeft--;
    timerDiv.textContent = `Time left: ${timeLeft} seconds`;

    if (timeLeft <= 0) {
        endGame();
    }
}

function removeAllWordsFor10Seconds() {
    const words = document.querySelectorAll('.word');
    words.forEach(word => gameArea.removeChild(word));
    setTimeout(createWord, 10000);  // Start creating words again after 10 seconds
}

function addBonusTime(seconds) {
    timeLeft += seconds;
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    collectedWordsDiv.style.display = 'none';

    // Create the end game screen div
    const endGameDiv = document.createElement('div');
    endGameDiv.style.position = 'absolute';
    endGameDiv.style.top = '50%';
    endGameDiv.style.left = '50%';
    endGameDiv.style.transform = 'translate(-50%, -50%)';
    endGameDiv.style.padding = '20px';
    endGameDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    endGameDiv.style.color = 'white';
    endGameDiv.style.textAlign = 'center';
    endGameDiv.style.borderRadius = '10px';

    // Add the title
    const title = document.createElement('h2');
    title.textContent = "Here's your story";
    endGameDiv.appendChild(title);

    // Display the collected words
    const story = document.createElement('p');
    story.textContent = collectedWords.join(' ');
    endGameDiv.appendChild(story);

     // Restart game button
     const restartButton = document.createElement('button');
     restartButton.textContent = "Restart Game";
     restartButton.style.marginTop = '20px';
     restartButton.style.padding = '5px';
     endGameDiv.appendChild(restartButton);
 
     // Add an event listener to the restart button
     restartButton.addEventListener('click', function() {
         // Remove the endGameDiv
         document.body.removeChild(endGameDiv);
 
         // Show the story div again (if you want it visible when the game restarts)
         collectedWordsDiv.style.display = 'block';
 
         // Call the startGame function to restart the game
         startGame();
     });

    // Append the end game screen to the body
    document.body.appendChild(endGameDiv);
}


function startGame() {
    // Hide the start button
    startButton.style.display = 'none';

    // Reset game state
    timeLeft = 120;
    collectedWords = [];
    collectedWordsDiv.textContent = '';
    timerDiv.textContent = `Time left: ${timeLeft} seconds`;

    // Create a word every half a second
    gameInterval = setInterval(createEntity, 500);

    // Update the timer every second
    timerInterval = setInterval(updateTimer, 1000);

    const music = document.getElementById('backgroundMusic');
    music.play();
}

function playSoundEffect(soundId) {
    const sound = document.getElementById(soundId);
    sound.play();
}

gameArea.addEventListener('mousemove', (event) => {
    checkUFOCollision(event);
    checkCometCollision(event);
    checkCollision(event);
});
startButton.addEventListener('click', startGame);