// JavaScript functionality (if needed)

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.plan button, .trial button');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            alert(`You clicked on: ${button.innerText}`);
        });
    });
});
