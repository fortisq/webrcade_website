## Project Documentation

### Project Overview

**Project Name**: Webrcade Website

**Description**: This project is a web-based arcade platform that allows users to play various games directly from their browser. It includes features such as game loading from an Excel file, a collapsible sidebar, fullscreen mode, and random image display.

### Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Features](#features)
4. [Contributing](#contributing)
5. [License](#license)

### Installation

To get started with the Webrcade Website, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/fortisq/webrcade_website.git
    cd webrcade_website
    ```

2. **Install Dependencies**:
    Ensure you have Node.js installed. Then, install the necessary dependencies:
    ```bash
    npm install
    ```

3. **Run the Project**:
    Start the development server:
    ```bash
    npm start
    ```

### Usage

#### Loading Games from an Excel File

The project uses the `SheetJS` library to read game data from an Excel file (`games.xlsx`). The data is then used to generate a list of games in the sidebar.

```javascript
async function loadGamesFromXLSX() {
    const response = await fetch('games.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, {type: "buffer"});
    
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const csvData = XLSX.utils.sheet_to_json(worksheet);
    generateGameList(csvData);
}
```

#### Generating the Game List

The `generateGameList` function organizes games by category and creates a collapsible list in the sidebar.

```javascript
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
```

#### Loading a Game

The `loadGame` function loads the selected game into an iframe and hides the random image container.

```javascript
function loadGame(gameUrl) {
    const imgContainer = document.getElementById('random-image-container');
    imgContainer.style.display = 'none'; // Hide the image container

    const gameFrame = document.getElementById('gameFrame');
    gameFrame.src = gameUrl; // Load the selected game

    var sidebar = document.getElementById('sidebar');
    sidebar.classList.add('collapsed');
    showFullscreenButtonTemporarily(); // Show the fullscreen button temporarily
}
```

#### Fullscreen Mode

The project includes functionality to toggle fullscreen mode for the game iframe.

```javascript
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
```

#### Displaying a Random Image

The `loadRandomImage` function displays a random image from a predefined list.

```javascript
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
```

### Features

- **Game Loading**: Load games from an Excel file and display them in a categorized list.
- **Collapsible Sidebar**: Toggle the visibility of the sidebar.
- **Fullscreen Mode**: Enter fullscreen mode for an immersive gaming experience.
- **Random Image Display**: Show a random image on the homepage.

### Contributing

1. **Fork the Repository**: Click the "Fork" button at the top right of the repository page.
2. **Create a New Branch**: 
    ```bash
    git checkout -b feature-branch
    ```
3. **Make Your Changes**: Implement your feature or fix.
4. **Commit Your Changes**: 
    ```bash
    git commit -m "Add new feature"
    ```
5. **Push to the Branch**: 
    ```bash
    git push origin feature-branch
    ```
6. **Open a Pull Request**: Navigate to the original repository and open a pull request.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

By following this structure, you can create clear and comprehensive documentation that will help users understand and use your project effectively.

Citations:
[1] https://gist.github.com/silencesys/526778bf13924c0baf16171fbc3f8295
[2] https://www.npmjs.com/package/read-excel-file
[3] https://codetheory.in/parse-read-excel-files-xls-xlsx-javascript/
[4] https://www.youtube.com/watch?v=v898ZuE10gc
[5] https://community.coda.io/t/parsejson-to-generate-a-list/24787
[6] https://gamedev.stackexchange.com/questions/109832/javascript-how-and-where-to-put-game-initialization-data
[7] https://www.html5gamedevs.com/topic/42781-solved-js-game-save-and-load/
[8] https://stackoverflow.com/questions/70362609/how-to-save-and-load-moves-in-a-game-using-javascript
[9] https://www.w3schools.com/howto/howto_js_fullscreen.asp
[10] https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
[11] https://stackoverflow.com/questions/2777479/display-random-image-when-page-loads-without-utilizing-onload-in-the-body-tag
[12] https://www.youtube.com/watch?v=PfzA1CX3aI4
[13] https://www.geeksforgeeks.org/random-image-generator-using-javascript/
