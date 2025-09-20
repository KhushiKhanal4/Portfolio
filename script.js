// --- Typewriter Effect ---
const typewriter = document.querySelector('.typewriter');
const texts = ["UI/UX Designer", "Frontend Developer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        typewriter.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriter.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    const typeSpeed = isDeleting ? 50 : 100;
    setTimeout(type, typeSpeed);
}

// --- Project Tabs Functionality ---
const tabButtons = document.querySelectorAll('.tab-button');
const projectLists = document.querySelectorAll('.project-list');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tab = button.dataset.tab;

        // Deactivate all buttons and lists
        tabButtons.forEach(btn => btn.classList.remove('active'));
        projectLists.forEach(list => list.classList.remove('active'));

        // Activate the clicked button and corresponding list
        button.classList.add('active');
        document.getElementById(tab).classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    type();
});