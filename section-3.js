// document.addEventListener("DOMContentLoaded", function () {
//   // Récupérer les données du leaderboard depuis le stockage local
//   let leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];

//   // Fonction pour afficher les données du leaderboard
//   function renderLeaderboard() {
//     // Trier le leaderboard par ordre décroissant des scores
//     leaderboardData.sort((a, b) => b.score - a.score);

//     const leaderboardList = document.getElementById("leaderboardList");
//     leaderboardList.innerHTML = ""; // Vider la liste actuelle

//     // Créer et ajouter les éléments de la liste pour chaque entrée du leaderboard
//     leaderboardData.forEach((entry, index) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = `${index + 1}. ${entry.name} - ${entry.score} pts`;
//       leaderboardList.appendChild(listItem);
//     });
//   }

//   // Appeler la fonction pour afficher le leaderboard initial
//   renderLeaderboard();
// });

document.addEventListener("DOMContentLoaded", function () {
  // Fonction pour mettre à jour le score et stocker dans le local storage
  function updateScore(points) {
    score += points;
    document.getElementById("score").textContent = "Score: " + score + " pts";
    localStorage.setItem("score", score); // Stockage du score dans le local storage
  }

  // Fonction pour récupérer les scores et noms des joueurs depuis le local storage
  function getScoresFromLocalStorage() {
    const playerName = localStorage.getItem("playerName");
    const playerScore = localStorage.getItem("score");

    // Affichage du nom et du score dans les éléments HTML
    document.getElementById("outputText").textContent = playerName;
    document.getElementById("score").textContent =
      "Score: " + playerScore + " pts";
  }

  // Récupération du nom du joueur depuis l'URL et stockage dans le local storage
  const params = new URLSearchParams(window.location.search);
  const playerName = params.get("texte");
  localStorage.setItem("playerName", playerName);

  // Lancer la partie
  document.getElementById("startButton").addEventListener("click", function () {
    startTimer();
    updateInterval = setInterval(updateRandomColor, 1200); // Plus le nombre est grand, plus c'est rapide
  });

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

  // Récupérer les scores depuis le local storage
  getScoresFromLocalStorage();
});
