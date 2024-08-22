# Balatro

Développement du jeu "Balatro" en React Typescript

## To Do
- Ajouter niveaux des mains de poker
- Au clic sur une Card: 
  - [x] Refresh state cardsSelected
  - [x] Calculer une combinaison prévisionnelle avec le state cardsSelected
  - [x] Pour le check d'une Suite : changer le order d'une carte As si j'ai un 2 dans les cardsSelected
- Au clic sur le bouton Défausser :
  - [x] Supprimer cartes du deck de la manche en cours et en rajouter dans les cartes sélectionnables
  - [x] Décrémenter le nombre de défausses restantes
  - [ ] Ne pas rendre cliquable si nombre restantes = 0
- Au clic sur le bouton Jouer la main :
  - [x] Supprimer cartes du deck de la manche en cours et en rajouter dans les cartes sélectionnables
  - [x] Décrémenter le nombre de mains restantes
  - [x] Calculer le nombre de points de la main ((combinaison + nombre de points de chaque carte) * multiplicateur) et ajouter au total de la manche
  - [ ] Ajouter le nombre de points de chaque carte uniquement si la carte fait partie d'une combinaison (renvoyer les cartes marquant des points dans la fonction getPokerHand())
  - [ ] Terminer le round si score du round >= objectif de score de la blind
  - [ ] Terminer le round si le nombre de mains restantes = 0 après le calcul du score
- Au clic sur le bouton Trier la main par valeur :
  - [x] Trier les cardsSelectable par valeur
- Au clic sur le bouton Trier la main par couleur :
  - [x] Trier les cardsSelectable par couleur
  - [ ] Ajouter un champ orderSuit dans chaque Card pour trier dans l'ordre Pique/Trèfle/Coeur/Carreau