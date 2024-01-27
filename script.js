/*
    This is a simple typing speed test application. It generates a random paragraph for the user to type, and tracks their typing speed (WPM), 
    characters per minute (CPM), and mistakes made. The user has 60 seconds to complete the test, and can retry if they wish.
*/
const paragraphArea = document.querySelector(".paragraph-area");
const inputBox = document.querySelector(".inputField");
const wpmTag = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const mistakes = document.querySelector(".mistakes span");
const timeTag = document.querySelector(".timeTag span");
const tryAgain = document.getElementById('tryAgainBtn');

let correctWords = 0;
let wrongWords = 0;
let charIndex = 0;
let wpm = 0;
let timeLeft = 60;
let timer;
let typing = false;


/*
    This function selects a random paragraph from an array, splits it into individual characters, creates a span element for each character, adds the character
    to the paragraph area, adds the "active" class to the first span element.
 */
const loadParagraph = () => {
    paragraphArea.innerHTML = "";
    randNum = Math.floor(Math.random() * paragraphs.length);
    paragraphs[randNum].split("").forEach((char) => {
        let span = document.createElement("span");
        span.innerText = char;
        paragraphArea.appendChild(span);
    });
    paragraphArea.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inputBox.focus());
    paragraphArea.addEventListener("click", () => inputBox.focus());
};

/**
 * This function is used to track the user's typing accuracy and speed while typing a paragraph. It checks and updates elements like correctWords, wrongWords, wpm.
 */
const paraTyping = () => {
    let paraChars = paragraphArea.querySelectorAll("span");
    let inputChar = inputBox.value.split("")[charIndex];
    if (charIndex < paraChars.length && timeLeft > 0) {
        if (typing != true) {
            timer = setInterval(countDown, 1000);
            typing = true;
        }
        if (inputChar == null)
        {
            if(charIndex > 0)
            {
                charIndex-- ;
                if(paraChars[charIndex].classList.contains('incorrect'))
                {
                    paraChars[charIndex].classList.remove('incorrect');
                    wrongWords--;
                }
                else if(paraChars[charIndex].classList.contains('correct'))
                {
                    paraChars[charIndex].classList.remove('correct');
                    correctWords--;
                }
            }
        }
        else
        {
            if (inputChar == paraChars[charIndex].innerText) {
                correctWords++;
                paraChars[charIndex].classList.add("correct");
            }
            else {
                wrongWords++;
                paraChars[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        paraChars.forEach(char => {
            char.classList.remove('active');
        });
        paraChars[charIndex].classList.add("active");

        wpm = Math.round(((correctWords)  / 5) / (60 - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        cpm.innerText = correctWords;
        mistakes.innerText = wrongWords;
    }
    else {
        clearInterval(timer);
        inputBox.value = '';
    }
};

/*
    This function decreases the timeLeft variable by 1, updates the timeTag element with the
    new value, and calculates the words per minute (wpm) based on the correctWords.
 */
const countDown = () => {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((correctWords)  / 5) / (60 - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else clearInterval(timer);
};

/*
    This function resets all the various variables and elements to start a new typing test.
 */
const retry = () =>
{
    wrongWords = 0;
    correctWords = 0;
    charIndex = 0;
    wpm = 0;
    timeLeft = 60;
    cpm.innerText = 0;
    mistakes.innerText = 0;
    wpmTag.innerText = 0;
    timeTag.innerText = 60;
    inputBox.value = "";
    typing = false;
    clearInterval(timer);
    loadParagraph();
}

loadParagraph();
inputBox.addEventListener("input", paraTyping);
tryAgain.addEventListener('click', retry);