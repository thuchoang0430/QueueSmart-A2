function showScreen(id) {
    // Hide all screens
    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    // Show selected screen
    const selected = document.getElementById(id);

    if (selected) {
        selected.classList.add("active");
    }
}

// Hide all screens when page loads
window.onload = function () {
    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });
};
