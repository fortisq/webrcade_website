
async function loadGamesFromXLSX() {
    const response = await fetch('games.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, {type: "buffer"});
    
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const csvData = XLSX.utils.sheet_to_json(worksheet);
    generateGameList(csvData);
}

function generateGameList(games) {
    const sidebar = document.getElementById('sidebar');
    const categories = {};
    
    games.forEach(game => {
        if (!categories[game.category]) categories[game.category] = [];
        categories[game.category].push(game);
    });

    Object.keys(categories).forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');

        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);
        
        const gameList = document.createElement('ul');
        gameList.style.display = 'none';
        
        categories[category].forEach(game => {
            const gameItem = document.createElement('li');
            const gameLink = document.createElement('a');
            gameLink.href = "#";
            gameLink.textContent = game.name;
            gameLink.dataset.gameData = JSON.stringify(game);
            gameLink.addEventListener('click', (event) => {
                event.preventDefault();
                loadGame(game.link);
                showGameDetails(JSON.parse(gameLink.dataset.gameData));
            });
            gameItem.appendChild(gameLink);
            gameList.appendChild(gameItem);
        });

        categoryDiv.appendChild(gameList);
        sidebar.appendChild(categoryDiv);

        categoryTitle.addEventListener('click', () => {
            gameList.style.display = gameList.style.display === 'none' ? 'block' : 'none';
        });
    });
}

function loadGame(gameUrl) {
    const imgContainer = document.getElementById('random-image-container');
    imgContainer.style.display = 'none'; // Hide the image container

    const gameFrame = document.getElementById('gameFrame');
    gameFrame.src = gameUrl; // Load the selected game

    var sidebar = document.getElementById('sidebar');
    sidebar.classList.add('collapsed');
    showFullscreenButtonTemporarily(); // Show the fullscreen button temporarily
}

document.getElementById('sidebarToggle').onclick = function() {
    var sidebar = document.getElementById('sidebar');
    if (!sidebar.classList.contains('collapsed')) {
        sidebar.classList.add('collapsed');
    } else {
        sidebar.classList.remove('collapsed');
    }
};

document.getElementById('fullscreenToggle').addEventListener('click', function() {
    var elem = document.getElementById('gameFrame');
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    }
});

function showFullscreenButtonTemporarily() {
    var fullscreenButton = document.getElementById('fullscreenToggle');
    fullscreenButton.style.display = 'block'; // Ensure visibility
    fullscreenButton.style.zIndex = "10000"; // Explicitly high z-index

    clearTimeout(window.fullscreenButtonTimeout);
    window.fullscreenButtonTimeout = setTimeout(() => {
        fullscreenButton.style.display = 'none';
    }, 5000); // Hides after 5 seconds
}

function loadRandomImage() {
    const images = [
        "game1.png",
        "game2.png",
        "game3.png",
        "game4.png",
        "game5.png",
        "game6.png",
        "game7.png",
        "game8.png",
        "game9.png",
        // Add more image filenames as needed
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    const imageUrl = `img/${images[randomIndex]}`;

    const imgContainer = document.getElementById('random-image-container');
    imgContainer.style.backgroundImage = `url('${imageUrl}')`;
    imgContainer.style.height = '100%'; // Ensure the container fills the area
    imgContainer.style.backgroundSize = 'cover'; // Cover the area with the image without stretching
    imgContainer.style.backgroundPosition = 'center'; // Center the background image
}

document.addEventListener('DOMContentLoaded', function() {
    loadGamesFromXLSX();
    loadRandomImage();

    var detectionArea = document.getElementById('mouse-detection-area');
    if (detectionArea) {
        detectionArea.addEventListener('mousemove', function() {
            showFullscreenButtonTemporarily();
        });
    }
});

function showGameDetails(game) {
    // Find elements
    const modal = document.getElementById('gameDetailsModal');
    const title = document.getElementById('gameTitle');
    const img = document.getElementById('gameThumbnail');
    const description = document.getElementById('gameDescription');
    const closeModal = document.getElementById('closeModal');
    
    // Set content
    title.textContent = game.name;
    img.src = game.thumbnail;
    img.alt = game.name;
    description.textContent = game.description;

    // Show the modal
    modal.style.display = "block";

    // Close modal event
    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    // Close if outside click
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
