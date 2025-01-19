document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkmode');

    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });

    function enableDarkMode() {
        document.documentElement.style.setProperty('--color-background', '#121212');
        document.documentElement.style.setProperty('--color-text', '#ffffff');
        document.documentElement.style.setProperty('--color-primary', '#bb86fc');
        document.documentElement.style.setProperty('--color-primary-hover', '#3700b3');
        document.documentElement.style.setProperty('--color-white', '#1e1e1e');
        document.documentElement.style.setProperty('--color-border', '#444');
        document.documentElement.style.setProperty('--color-hover-bg', '#333');
        document.documentElement.style.setProperty('--color-item-bg', '#1e1e1e');
        document.documentElement.style.setProperty('--color-disabled-light', '#444');
        document.documentElement.style.setProperty('--color-disabled-dark', '#1e1e1e');
        document.documentElement.style.setProperty('--color-disabled-text-light', '#bbb');
    }

    function disableDarkMode() {
        document.documentElement.style.setProperty('--color-background', '#f4f4f9');
        document.documentElement.style.setProperty('--color-text', '#333');
        document.documentElement.style.setProperty('--color-primary', '#6200ea');
        document.documentElement.style.setProperty('--color-primary-hover', '#3700b3');
        document.documentElement.style.setProperty('--color-white', '#fff');
        document.documentElement.style.setProperty('--color-border', '#ddd');
        document.documentElement.style.setProperty('--color-hover-bg', '#f1f1f1');
        document.documentElement.style.setProperty('--color-item-bg', '#f9f9f9');
        document.documentElement.style.setProperty('--color-disabled-light', '#f9f9f9');
        document.documentElement.style.setProperty('--color-disabled-dark', '#444');
        document.documentElement.style.setProperty('--color-disabled-text-light', '#666');
    }

    // Initialize dark mode based on system preference or previous user choice
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (localStorage.getItem('darkmode') === 'enabled' || (!localStorage.getItem('darkmode') && prefersDarkScheme)) {
        darkModeToggle.checked = true;
        enableDarkMode();
    } else {
        darkModeToggle.checked = false;
        disableDarkMode();
    }

    // Save preference
    darkModeToggle.addEventListener('change', () => {
        localStorage.setItem('darkmode', darkModeToggle.checked ? 'enabled' : 'disabled');
    });
});
