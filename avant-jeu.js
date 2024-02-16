function envoyerTexte() {
  // Récupérer la valeur saisie dans l'input
  const inputElement = document.getElementById("inputText");
  const texte = inputElement.value;

  // Rediriger vers l'autre page en ajoutant le texte en tant que paramètre d'URL
  window.location.href = "jeu.html?texte=" + encodeURIComponent(texte);
}
