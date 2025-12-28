# 🎯 Color Catcher Game

A fast-paced, interactive web game where players race against the clock to match specific RGB color codes to colored tiles on a grid. Built with vanilla JavaScript, HTML5, and CSS3.

## 📸 Screenshots

_(You can replace this section with actual screenshots of your game later)_

> **Note:** This project features a responsive design and a fully functional Dark Mode.

## ✨ Features

- **Dynamic Grid Generation:** Automatically creates a 4x4 grid (16 tiles) with unique random colors every round.
- **RGB Color Logic:** Challenges players to understand and identify RGB color values.
- **Game Loop:** Includes a 60-second countdown timer and a dynamic scoring system.
- **Pause & Resume:** Fully functional pause button with an **Anti-Cheat Blur** effect to prevent players from studying the grid while the timer is stopped.
- **Dark/Light Mode:** Toggle between themes using CSS Variables for a seamless transition.
- **Responsive Design:** Works beautifully on desktops, tablets, and mobile devices.

## 🛠️ Tech Stack

- **HTML5:** Semantic structure and layout.
- **CSS3:** Flexbox, CSS Grid, CSS Variables (Custom Properties), and animations.
- **JavaScript (ES6+):** DOM manipulation, Event Listeners, `setInterval` logic, and `DocumentFragment` for performance optimization.

## 🚀 How to Run Locally

You don't need to install any dependencies (like Node.js or React) to run this game. It works directly in the browser.

1.  **Clone the Repository** (or download the files):

    ```bash
    git clone [https://github.com/yourusername/color-catcher.git](https://github.com/yourusername/color-catcher.git)
    ```

2.  **Navigate to the folder:**

    ```bash
    cd color-catcher
    ```

3.  **Open the Game:**
    - Simply double-click `index.html`.
    - **OR** (Recommended) Use the "Live Server" extension in VS Code for the best experience.

## 🎮 How to Play

1.  Click **"🎮 Start Game"** to begin.
2.  Look at the **RGB code** displayed at the top (e.g., `rgb(120, 50, 200)`).
3.  Find the matching color square on the grid and click it.
4.  **Correct Click:** You get +1 Score, and the board resets immediately.
5.  **Wrong Click:** Nothing happens (but you lose precious time!).
6.  The game ends when the **60-second timer** hits zero.

## 📂 Project Structure

```text
/color-catcher
│
├── index.html      # Main HTML structure
├── style.css       # Styling, Grid layout, and Dark Mode themes
├── script.js       # Game logic, State management, and DOM manipulation
└── README.md       # Project documentation

```

## 🧠 Code Highlights

### Performance Optimization

The game uses `DocumentFragment` to batch DOM updates. Instead of re-rendering the page 16 times (once for every square), the grid is built in memory and appended to the DOM once per round.

```javascript
// Example from script.js
const fragment = document.createDocumentFragment();
colorsArray.forEach((color) => {
  // ... create square ...
  fragment.appendChild(square);
});
gridContainer.appendChild(fragment); // Only 1 Reflow!
```

### Accessibility & UX

- **Focus States:** Buttons have visible focus rings for keyboard navigation.
- **Anti-Cheat:** When paused, the grid receives a `filter: blur(10px)` style to keep the game fair.

## 🔮 Future Improvements

- [ ] Add sound effects for correct/incorrect clicks.
- [ ] Add "Difficulty Levels" (e.g., Easy = 3x3 grid, Hard = 6x6 grid).
- [ ] Save "High Score" to LocalStorage so it persists after refresh.

## 📝 License

This project is open source and available under the [LucenThink License](https://www.LucenThink.com/search?q=LICENSE).

---

_Created with ❤️ by [Pranjul MIshra]_

```

```
gpg