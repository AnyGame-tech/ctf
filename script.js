// Total time (3 hours in seconds)
// For testing, you can adjust this value. For example, here it is set to 0.01 hours (36 seconds).
const totalTime = 3 * 60 * 60;
let timeLeft = totalTime;
let timerInterval = null;

const startButton = document.getElementById("startButton");
const progressContainer = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");
const progressTime = document.getElementById("progressTime");
const submitButton = document.getElementById("submitButton");

// Create Audio object for beep mp3 file
const beepSound = new Audio("beep.mp3");

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(secs).padStart(2, "0")
  );
}

function startCountdown() {
    // Show the progress bar container and hide the start button
    progressContainer.style.display = "block";
    startButton.style.display = "none";
  
    updateProgress();
    
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateProgress();
      } else {
        // When the countdown finishes:
        clearInterval(timerInterval);
        beepSound.currentTime = 0;
        beepSound.loop = true;
        beepSound.play().catch(error => console.error("Beep failed to play: ", error));
        // Reveal the submission link as inline-block
        submitButton.style.display = "inline-block";

      }
    }, 1000);
  }
  

function updateProgress() {
  const fraction = timeLeft / totalTime;
  progressBar.style.width = (fraction * 100).toFixed(2) + "%";
  progressTime.textContent = formatTime(timeLeft);

  // Compute interpolation factor (0 at start, 1 at end)
  let t = 1 - fraction;
  // Interpolate RGB values between black (0,0,0) and (74,222,128)
  const r = Math.round(74 * t);
  const g = Math.round(222 * t);
  const b = Math.round(128 * t);
  // Correctly use backticks for a template literal:
  const colorString = `rgb(${r}, ${g}, ${b})`;
  progressTime.style.color = colorString;
}

function startChallenge() {
    startCountdown();
    // Show the submission button immediately (but keep it disabled)
    submitButton.style.display = "inline-block";  // Changed from "block" to "inline-block"
    // Note: anchor elements don’t support the disabled attribute.
    // If you need a disabled state, consider adding a class or handling clicks.
    
    // Simulate file download using a direct link (using the file's existing name)
    const link = document.createElement("a");
    link.href = "ctf.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  

startButton.addEventListener("click", startChallenge);

/* Modal functionality for Tools Hints */
const modal = document.getElementById("toolHintsModal");
const toolHintsButton = document.getElementById("toolHintsButton");
const modalClose = document.getElementsByClassName("close")[0];

toolHintsButton.onclick = function() {
  modal.style.display = "block";
};

modalClose.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
