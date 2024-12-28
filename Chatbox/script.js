// JavaScript functionality (if needed)

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.plan button, .trial button');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            alert(`You clicked on: ${button.innerText}`);
        });
    });
});

// Tooltip functionality for info symbols
document.querySelectorAll('.info-symbol').forEach(symbol => {
    symbol.addEventListener('mouseover', () => {
        symbol.setAttribute('title', symbol.title);
    });
});
