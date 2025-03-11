// Get references to the hamburger and navigation menu
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navMenu.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Stops the page from reloading
    console.log("Form submitted!"); // Debugging message
    // Your form submission logic here

    const navLinks = document.querySelectorAll(".nav-menu li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            // Remove 'active' class from all links
            navLinks.forEach(nav => nav.classList.remove("active"));

            // Add 'active' class to the clicked link
            this.classList.add("active");
        });
    });
});


// Typewriter Effect
const texts = ["Frontend Developer", "UI/UX Designer"];
let textIndex = 0;
const textElement = document.querySelector(".morph-text");

function morphText() {
    let currentText = textElement.innerText;
    let newText = texts[textIndex];

    // Pad the shorter text with spaces to match the length of the longer text
    let maxLength = Math.max(currentText.length, newText.length);
    currentText = currentText.padEnd(maxLength, " ");
    newText = newText.padEnd(maxLength, " ");

    let chars = currentText.split("");
    let frame = 0;

    let interval = setInterval(() => {
        let changes = 0;

        chars = chars.map((char, i) => {
            if (char !== newText[i]) {
                changes++;
                return getInterpolatedChar(char, newText[i], frame);
            }
            return char;
        });

        textElement.innerText = chars.join("").trimEnd(); // Trim trailing spaces for display

        if (changes === 0) {
            clearInterval(interval);
            setTimeout(() => {
                textIndex = (textIndex + 1) % texts.length; // Loop back to the first text
                morphText(); // Restart the morphing process
            }, 2000); // Pause before switching
        }

        frame++;
    }, 50); // Speed of morphing effect
}

function getInterpolatedChar(from, to, frame) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
    let fromIndex = chars.indexOf(from);
    let toIndex = chars.indexOf(to);

    if (fromIndex === -1) fromIndex = chars.indexOf(" ");
    if (toIndex === -1) toIndex = chars.indexOf(" ");

    if (fromIndex < toIndex) {
        return chars[Math.min(fromIndex + frame, toIndex)];
    } else if (fromIndex > toIndex) {
        return chars[Math.max(fromIndex - frame, toIndex)];
    } else {
        return to;
    }
}

// Start the infinite loop
morphText();


