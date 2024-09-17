let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

UpdateScoreElement();
/*
if(!score ){
  score {
      wins = 0,
      losses = 0,
      ties = 0
  };
}
*/
function PickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

document.querySelector(".js-auto-play-button").addEventListener("click", () => {
  autoPlay();
});
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const button = PickComputerMove();
      PickResult(button);
    }, 1000);
    isAutoPlaying = true;
    // When the game is auto playing, change
    // the text in the button to 'Stop Playing'.
    document.querySelector(".js-auto-play-button").innerHTML = "Stop Playing";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    // When the game is not playing, change
    // the text back to 'Auto Play'.
    document.querySelector(".js-auto-play-button").innerHTML = "Auto Play";
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  PickResult("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  PickResult("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  PickResult("scissors");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    PickResult("rock");
  } else if (event.key === "p") {
    PickResult("paper");
  } else if (event.key === "s") {
    PickResult("scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "Backspace") {
    // Update 'Backspace' to show the
    // confirmation message instead of
    // resetting the score immediately.
    showResetConfirmation();
  }
});

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  UpdateScoreElement();
}

// Add an event listener for the reset score
// button using .addEventListener
document
  .querySelector(".js-reset-score-button")
  .addEventListener("click", () => {
    // Update the click event listener to
    // show the confirmation message instead
    // of restting the score immediately.
    showResetConfirmation();
  });

// Function for showing the confirmation message.
function showResetConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = `
        Are you sure you want to reset the score?
        <button class="js-reset-confirm-yes reset-confirm-button">
          Yes
        </button>
        <button class="js-reset-confirm-no reset-confirm-button">
          No
        </button>
      `;

  // You could use onclick="..." in the HTML above,
  // but it's recommended to use .addEventListener()
  document
    .querySelector(".js-reset-confirm-yes")
    .addEventListener("click", () => {
      resetScore();
      hideResetConfirmation();
    });

  document
    .querySelector(".js-reset-confirm-no")
    .addEventListener("click", () => {
      hideResetConfirmation();
    });
}

// A helper function (it helps us reuse the
// code for hiding the confirmation message).
function hideResetConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = "";
}
function PickResult(button) {
  const computerMove = PickComputerMove();
  let result = "";

  if (button === "scissors") {
    if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tia.";
    } else if (computerMove === "rock") {
      result = "You lose.";
    }
  } else if (button === "rock") {
    if (computerMove === "paper") {
      result = "You lose";
    } else if (computerMove === "scissors") {
      result = "You win.";
    } else if (computerMove === "rock") {
      result = "Tie.";
    }
  } else if (button === "paper") {
    if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    } else if (computerMove === "rock") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }
  localStorage.setItem("score", JSON.stringify(score));

  UpdateScoreElement();

  document.querySelector(".js_result").innerHTML = result;
  document.querySelector(".js_moves").innerHTML = `You
      <img src="${button}.png" class="move-icon">
      <img src="${computerMove}.png" class="move-icon">
  Computer`;
}
function UpdateScoreElement() {
  document.querySelector(
    ".js_score"
  ).innerHTML = `wins: ${score.wins} losses: ${score.losses} Ties: ${score.ties}`;
}
