const colorInput = document.getElementById('color-input');
const colorMode = document.getElementById('color-mode');
const rainbowMode = document.getElementById('rainbow-mode');
const clear = document.getElementById('clear');
const cellSize = document.querySelectorAll('.cell-size');
const sliderInput = document.getElementById('slider-input');
const gridContainer = document.getElementById('grid-container');
const eraser = document.getElementById('eraser');


colorInput.addEventListener('input', changeColor);
colorMode.addEventListener('click', () => mode = 'color');
rainbowMode.addEventListener('click', () => mode = 'rainbow');
eraser.addEventListener('click', () => mode = 'eraser');
clear.addEventListener('click', renderGrid);
sliderInput.addEventListener('input', renderGrid);

renderGrid(); //establishes the grid at first load instead of waiting for user input

let mode = 'color';

function changeColor(e) {
    let color;
    if (mode === 'color') {
        color = `${colorInput.value}`;
    } else if (mode === 'rainbow') {
        color = randomColor();
    } else if (mode === 'eraser'){
        color = '';
    }
    if (window.mouseDown || e.type === 'mousedown') {
        e.target.style.backgroundColor = color;
    }
}

function randomColor() {
    let colors = ['#fc5c65', '#eb3b5a', '#fd9644', '#fa8231', '#fed330', '#f7b731', '#26de81', '#20bf6b', '#2bcbba', '#0fb9b1', '#45aaf2', '#2d98da', '#4b7bec', '#3867d6', '#a55eea', '#8854d0', '#d1d8e0', '#a5b1c2', '#778ca3', '#4b6584'];
    let index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function renderGrid() {
    let sliderInputNum = parseInt(sliderInput.value)
    cellSize.forEach(span => span.textContent = sliderInputNum);
    let gridSize = sliderInputNum ** 2;
    gridContainer.style.gridTemplateColumns = `repeat(${sliderInputNum}, 1fr)`;
    gridContainer.innerHTML = '';
    let appendedHTML = '';
    for (let i = 0; i < gridSize; i++) {
        appendedHTML += `<div class="grid-cell"></div>`;
    }
    gridContainer.innerHTML = appendedHTML;
    const cell = document.querySelectorAll('.grid-cell');
    cell.forEach(cell => cell.addEventListener('mousedown', changeColor));
    cell.forEach(cell => cell.addEventListener('mouseover', changeColor));
}

window.mouseDown = false;
document.onmousedown = function () {
    window.mouseDown = true;
}
document.onmouseup = function () {
    window.mouseDown = false;
}

