# TravelBloom - Navigation Clean Code

## Structure du Projet

### Fichiers créés/modifiés:
- ✅ `index.html` - Structure HTML sémantique avec BEM
- ✅ `assets/styles.css` - CSS avec variables et organisation modulaire
- ✅ `assets/navigation.js` - JavaScript propre et maintenable

## Caractéristiques de la Navigation

### 🎨 Design
- **Grande zone blanche** pour la recherche avec input + icône
- **Icônes Feather** - Élégantes et professionnelles (pas de connexion requise après chargement)
- **Variables CSS** pour toutes les couleurs
- **Responsive** - S'adapte à tous les écrans

### 🎯 Palette de Couleurs
```css
--nav-background: #2c2c2c
--nav-text: #ffffff
--nav-link-hover: #4a90e2
--btn-search-bg: #4a90e2
--btn-clear-bg: #e74c3c
```

### 📦 Structure BEM
```
navbar
├── navbar__logo
├── navbar__nav
│   ├── navbar__nav-item
│   └── navbar__nav-link (--active)
└── navbar__search
    ├── navbar__search-form
    ├── navbar__search-box
    ├── navbar__search-input
    ├── navbar__search-icon-btn
    └── navbar__btn (--search, --clear)
```

### 🚀 Fonctionnalités
- Navigation active automatique
- Recherche avec icône intégrée
- Boutons Search et Clear séparés
- Accessibilité (ARIA labels, roles)
- Transitions fluides

## Pour tester
Ouvrez `index.html` dans votre navigateur!
