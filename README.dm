```markdown
# 📚 Tsk's BiblioTech

![Tsk's BiblioTech Banner](images/banner.jpg)

## 🌍 Description

Tsk's BiblioTech est une bibliothèque en ligne moderne conçue pour démocratiser l'accès au savoir en Afrique de l'Ouest. Notre plateforme offre une vaste collection de livres électroniques académiques et littéraires à des prix abordables.

## ✨ Fonctionnalités

### 🎨 Interface Utilisateur
- ✅ Design moderne et responsive (mobile-first)
- ✅ Navigation intuitive avec menu hamburger mobile
- ✅ Animations fluides et transitions élégantes
- ✅ Mode sombre adaptatif (préférences système)

### 📖 Bibliothèque
- ✅ Catalogue de 10,000+ livres électroniques
- ✅ Recherche avancée avec filtres
- ✅ Catégorisation par domaines d'études
- ✅ Système de favoris avec localStorage
- ✅ Modal détaillée pour chaque livre
- ✅ Carrousel pour livres en vedette

### 📝 Fonctionnalités Interactives
- ✅ Formulaires validés (newsletter, contact, commande)
- ✅ Notifications toast personnalisées
- ✅ FAQ avec accordéons interactifs
- ✅ Compteurs animés pour les statistiques
- ✅ Lazy loading des images
- ✅ Recherche en temps réel

### 📱 Blog & Communication
- ✅ Blog avec articles détaillés
- ✅ Newsletter pour rester informé
- ✅ Formulaire de contact complet
- ✅ Support WhatsApp intégré

## 🚀 Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec variables CSS
- **JavaScript ES6+** - Fonctionnalités interactives
- **Intersection Observer API** - Animations au scroll
- **LocalStorage API** - Sauvegarde des favoris

## 📁 Structure du Projet

```
tsks-bibliotech/
│
├── index.html              # Page principale
├── styles.css              # Feuille de styles
├── script.js               # Scripts JavaScript
├── README.md              # Documentation
│
├── images/                # Dossier des images
│   ├── favicon.png
│   ├── banner.jpg
│   ├── livre1.jpg
│   ├── livre2.jpg
│   ├── blog1.jpg
│   └── ...
│
└── fonts/                 # Polices personnalisées (optionnel)
    └── ...
```

## 🛠️ Installation

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur web local (optionnel pour le développement)

### Étapes

1. **Cloner ou télécharger le projet**
```bash
git clone https://github.com/votre-username/tsks-bibliotech.git
cd tsks-bibliotech
```

2. **Ajouter les images**
   - Placez vos images dans le dossier `images/`
   - Nommez-les selon les références dans le HTML

3. **Ouvrir dans un navigateur**
   - Double-cliquez sur `index.html`, ou
   - Utilisez un serveur local :

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Avec PHP
php -S localhost:8000
```

4. **Accéder au site**
   - Ouvrez `http://localhost:8000` dans votre navigateur

## 🎯 Utilisation

### Pour les Visiteurs

1. **Parcourir la bibliothèque**
   - Naviguez dans les différentes catégories
   - Utilisez la barre de recherche pour trouver des livres spécifiques

2. **S'inscrire à la newsletter**
   - Entrez votre email dans le formulaire
   - Recevez les nouveautés et actualités

3. **Commander un livre**
   - Cliquez sur "Voir détails" pour plus d'informations
   - Utilisez le formulaire de commande spécifique si nécessaire

4. **Gérer vos favoris**
   - Cliquez sur le bouton "Favoris" pour sauvegarder vos livres préférés
   - Vos favoris sont conservés localement

### Pour les Développeurs

1. **Personnalisation des couleurs**
   - Modifiez les variables CSS dans `:root` (styles.css)

```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --accent-color: #e74c3c;
  /* ... */
}
```

2. **Ajouter de nouveaux livres**
   - Dupliquez une carte de livre existante
   - Modifiez le contenu et ajoutez l'attribut `data-book-id`

3. **Configurer les notifications**
   - Utilisez `showNotification(message, type)` dans script.js
   - Types disponibles : 'success', 'error', 'info'

## 📊 Fonctionnalités JavaScript Détaillées

### Navigation Mobile
```javascript
createMobileMenu() // Crée le menu hamburger responsive
```

### Système de Notifications
```javascript
showNotification('Message', 'success') // Affiche une notification
// Types: 'success', 'error', 'info'
```

### Gestion des Favoris
```javascript
initFavorites() // Initialise le système de favoris
// Sauvegarde dans localStorage
```

### Modals
```javascript
showBookModal(bookData) // Affiche les détails d'un livre
```

### Carrousel
```javascript
initBooksCarousel() // Initialise le carrousel avec autoplay
```

## 🎨 Personnalisation

### Changer les couleurs principales
Modifiez les variables CSS dans `styles.css` :

```css
:root {
  --primary-color: #votrecouleur;
  --secondary-color: #votrecouleur;
}
```

### Modifier les animations
Ajustez les durées dans les variables :

```css
:root {
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
}
```

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints pour :

- **Mobile** : < 480px
- **Tablette** : 481px - 768px
- **Desktop** : 769px - 1200px
- **Large Desktop** : > 1200px

## 🔧 Configuration Avancée

### Intégration Backend (À venir)

Pour connecter à une base de données :

1. Créez une API REST (Node.js, PHP, Python...)
2. Modifiez les fonctions de formulaire dans `script.js`
3. Ajoutez les appels AJAX/Fetch

```javascript
// Exemple de connexion API
async function fetchBooks() {
  const response = await fetch('/api/books');
  const books = await response.json();
  displayBooks(books);
}
```

### Système de Paiement

Pour intégrer un système de paiement :

1. Intégrez une API de paiement (Stripe, PayPal, Orange Money...)
2. Ajoutez un bouton "Acheter" dans les modals
3. Gérez les transactions côté serveur

## 🐛 Dépannage

### Les images ne s'affichent pas
- Vérifiez que les chemins dans `src=""` sont corrects
- Assurez-vous que les images existent dans le dossier `images/`

### Le JavaScript ne fonctionne pas
- Ouvrez la console du navigateur (F12)
- Vérifiez les erreurs
- Assurez-vous que `script.js` est bien lié dans le HTML

### Le menu mobile ne s'affiche pas
- Vérifiez que la largeur de l'écran est < 768px
- Inspectez les classes CSS dans les DevTools

## 📈 Améliorations Futures

- [ ] Système d'authentification utilisateur
- [ ] Panier d'achat et paiement en ligne
- [ ] Lecteur de livres intégré (PDF, EPUB)
- [ ] Système de recommandations IA
- [ ] Application mobile (React Native, Flutter)
- [ ] Mode hors ligne (PWA)
- [ ] Traduction multilingue
- [ ] Chat en direct avec support

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Tsk's BiblioTech Team**

- Website: [www.tsksbibliotech.com](https://www.tsksbibliotech.com)
- Email: adidomahukpeou@gmail.com
- WhatsApp: +229 01 52 27 11 98

## 🙏 Remerciements

- Merci à tous les étudiants africains qui nous inspirent
- Merci aux éditeurs partenaires
- Merci à la communauté open-source

---

**📚 Fait avec ❤️ pour l'éducation en Afrique**

```
