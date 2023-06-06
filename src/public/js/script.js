// Function to detect the preferred color scheme
function detectColorScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'; // Dark mode is enabled
    } else {
        return 'light'; // Light mode is enabled
    }
}

// Function to set the favicon based on the color scheme
function setFavicon() {
    var colorScheme = detectColorScheme();
    var faviconElement = document.getElementById('favicon');

    if (colorScheme === 'dark') {
        faviconElement.setAttribute('href', 'images/snap-favicon-white.svg'); // Set black.svg for dark mode
    } else {
        faviconElement.setAttribute('href', 'images/snap-favicon-dark.svg'); // Set white.svg for light mode
    }
}

// Call the setFavicon function on page load
window.addEventListener('load', setFavicon);