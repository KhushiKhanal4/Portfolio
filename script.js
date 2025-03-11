// Hamburger Menu
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navMenu.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
}); 

// smooth navigation
const navLinks = document.querySelectorAll(".nav-menu li a");

navLinks.forEach(link => {
    link.addEventListener("click", function () {
        // Remove 'active' class from all links
        navLinks.forEach(nav => nav.classList.remove("active"));

        // Add 'active' class to the clicked link
        this.classList.add("active");
    });
});

// morph effect

const texts = ["UI/UX Designer","Frontend Developer" ];
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


//contact-form submit

const scriptURL = 'https://script.google.com/macros/s/AKfycbxg0VqpkPU92zrIB0TbpW25POML77NSQyC8oZROQ04dnUNyzZUnwyZuCL9g73oHlHA0/exec';
        const form = document.forms['submit-to-google-sheet'];
        const msg = document.querySelector('.msg');
        const submitButton = form.querySelector('button');

        form.addEventListener('submit', e => {
            e.preventDefault();

            // Show processing message and disable button
            msg.innerHTML = "Processing...";
            submitButton.disabled = true;
            submitButton.innerHTML = "Submitting...";

            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    msg.innerHTML = "Message sent successfully!";

                    // Restore button state
                    submitButton.disabled = false;
                    submitButton.innerHTML = "Submit";

                    setTimeout(() => {
                        msg.innerHTML = "";
                    }, 5000);

                    form.reset();
                })
                .catch(error => {
                    msg.innerHTML = "Error! Please try again.";
                    submitButton.disabled = false;
                    submitButton.innerHTML = "Submit";
                    console.error('Error!', error.message);
                });
            submitButton.classList.add("loading");
            submitButton.classList.remove("loading"); // Remove after submission

        });