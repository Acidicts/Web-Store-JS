window.addEventListener('resize', resizeElements);

function resizeElements() {
    const elements = document.querySelectorAll('.resize-to-screen');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    elements.forEach(element => {
        element.style.width = `${screenWidth}px`;
        element.style.height = `${screenHeight}px`;
    });
}

// Initial call to set sizes on page load
resizeElements();