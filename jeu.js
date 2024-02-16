document.addEventListener("DOMContentLoaded", function () {
  function getRandomColor() {
    const colors = ["#D70040", "#32cd32", "#00BFFF"];
    const randomNumber = Math.random() * 100; // Génère un nombre aléatoire entre 0 et 100
    let cumulativePercentage = 0;

    for (let i = 0; i < colors.length; i++) {
      cumulativePercentage += colorPercentages[colors[i]]; // Ajoute le pourcentage de la couleur à la somme cumulative

      if (randomNumber <= cumulativePercentage) {
        return colors[i]; // Retourne la couleur lorsque la somme cumulative dépasse le nombre aléatoire
      }
    }
    // Par défaut, retourne la dernière couleur
    return colors[colors.length - 1];
  }

  let score = 0; // Score initial
  let timeLeft = 30; // Durée de la partie
  let timerInterval; // Chronomètre
  let updateInterval; // Intervalles de divs allumés
  let isPaused = false; // Bouton pause

  // Fonction pour mettre à jour le score
  function updateScore(points) {
    score += points;
    document.getElementById("score").textContent = "Score: " + score + " pts";
  }

  // Fonction pour la couleur aléatoire
  function updateRandomColor() {
    const boxes = document.querySelectorAll(".box");
    const randomIndex = Math.floor(Math.random() * boxes.length);
    const randomColor = getRandomColor();

    // Changement de la couleur
    boxes[randomIndex].style.backgroundColor = randomColor;

    // Écouteur d'évènements au clic de la souris
    boxes[randomIndex].addEventListener("click", function () {
      const rgbColor = this.style.backgroundColor;

      // Condition pour chaque couleur
      if (rgbColor === "rgb(215, 0, 64)") {
        updateScore(-1); // Rouge: enlève 1 au score
      } else if (rgbColor === "rgb(50, 205, 50)") {
        updateScore(1); // Vert: ajoute 1 au score
      } else if (rgbColor === "rgb(0, 191, 255)") {
        updateScore(5); // Bleu: ajoute 5 au score
      }

      // Éteindre la couleur après le clic
      this.style.backgroundColor = "";
    });

    // Éteindre la couleur après un certain délai
    setTimeout(() => {
      boxes[randomIndex].style.backgroundColor = "";
    }, 1000); // Temps d'apparition (plus c'est vers 0 plus c'est rapide)
  }

  // Début du chronomètre
  function startTimer() {
    timerInterval = setInterval(() => {
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        clearInterval(updateInterval);
        // Fin de la partie lorsque le temps est écoulé
        alert("Fin de la partie, votre score est de: " + score + " pts");
        // Réinitialisation du jeu
        score = 0;
        timeLeft = 30; // Durée de la partie
        document.getElementById("score").textContent =
          "Score: " + score + " pts";
        document.getElementById("timer").textContent =
          "Temps restant: " + timeLeft + " s";
      } else {
        timeLeft--;
        document.getElementById("timer").textContent =
          "Temps restant: " + timeLeft + " s";
      }
    }, 1500); // Intervalle de mise à jour du temps
  }

  // Gestion du bouton pause
  document.getElementById("pauseButton").addEventListener("click", function () {
    if (!isPaused) {
      clearInterval(timerInterval);
      clearInterval(updateInterval);
      isPaused = true;
      this.textContent = "Reprendre";
    } else {
      startTimer();
      updateInterval = setInterval(updateRandomColor, 2100);
      isPaused = false;
      this.textContent = "Pause";
    }
  });

  // Définition du pourcentage d'apparition de chaque couleur
  const colorPercentages = {
    "#D70040": 25, // Rouge
    "#32cd32": 70, // Vert
    "#00BFFF": 700, // Bleu
  };

  // Lancer la partie
  document.getElementById("startButton").addEventListener("click", function () {
    startTimer();
    updateInterval = setInterval(updateRandomColor, 1200); // Plus le nombre est grand, plus c'est rapide
  });
});

// Entrée du nom d'utilisateur dans la partie
const params = new URLSearchParams(window.location.search);
const texte = params.get("texte");
const outputElement = document.getElementById("outputText");
outputElement.textContent = texte;

//niveau 1 : seulement la couleur vert et rapidité faible
//niveau 2 : seulement les couleurs vertes et rouges et rapidité moyennne
//niveau 3 : seulement les couleurs vertes, rouges et bleues et rapidité élevée
//niveau boss final : seulement les couleurs vertes, rouges, bleues et des cases en moins et rapidité impossible

//local storage du score et du prénom

document.addEventListener("DOMContentLoaded", function () {
  // Fonction pour obtenir des données sauvegardées ou retourner une valeur par défaut
  function getSavedData(key, defaultValue) {
    const savedData = localStorage.getItem(key);
    return savedData !== null ? JSON.parse(savedData) : defaultValue;
  }

  // Sauvegarde des données
  function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Restaurer le score sauvegardé
  let score = getSavedData("score", 0);
  document.getElementById("score").textContent = "Score: " + score + " pts";

  // Restaurer le temps restant sauvegardé
  let timeLeft = getSavedData("timeLeft", 30);
  document.getElementById("timer").textContent =
    "Temps restant: " + timeLeft + " s";

  // Mise à jour du score
  function updateScore(points) {
    score += points;
    document.getElementById("score").textContent = "Score: " + score + " pts";
    saveData("score", score); // Sauvegarder le score
  }
});
