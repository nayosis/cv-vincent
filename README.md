# CV Vincent Gouadon — Static Page

CV en ligne construit avec React + Vite, déployable sur GitHub Pages.

## Stack
- **React 18** + **Vite 5**
- **CSS custom properties** (tokens dark/light, zéro dépendance CSS)
- **Google Fonts** : Space Grotesk + Inter
- **gh-pages** pour le déploiement

## Personnaliser le contenu

Tout le contenu est dans **`public/cv-data.json`** — modifie ce fichier uniquement :

- `identity` : nom, titre, contact, liens
- `skills` : objet `{ "Catégorie": ["tech1", "tech2"] }` — ajouter une catégorie = ajouter une clé
- `experiences` : liste d'expériences avec `title`, `company`, `period`, `description`, `stack[]`
- `formations` : liste avec `year`, `label`, `detail` (optionnel)
- `extras` : engagements/hobbies

## Développement local

```bash
npm install
npm run dev
```

## Déploiement sur GitHub Pages

### 1. Créer le repo GitHub

```bash
git init
git remote add origin https://github.com/TON_USERNAME/cv.git
```

### 2. Pousser sur la branche `main`

```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 3. Activer GitHub Pages (via GitHub Actions)

Dans les Settings du repo → Pages :

- Source: **GitHub Actions**

Le workflow [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) build et déploie automatiquement à chaque push de tag commençant par `v` (ex: `v1.0.0`).

### 4. Déclencher un déploiement

```bash
git tag v1.0.0
git push origin v1.0.0
```

### 5. URL du site

- Repo classique: `https://TON_USERNAME.github.io/NOM_DU_REPO/`
- Repo `TON_USERNAME.github.io`: `https://TON_USERNAME.github.io/`

### Base URL

La base est gérée automatiquement dans [vite.config.js](vite.config.js) selon le repo GitHub en CI.

Tu peux aussi la forcer si besoin :

```bash
BASE_PATH=/mon-repo/ npm run build
```

## Thème

Le toggle dark/light est en haut à droite. La préférence système est respectée au premier chargement, puis sauvegardée en `localStorage`.
