# 🚀 TaskFlow Next — Version SSR (Next.js 15)

Ce projet est la version modernisée de l'application **TaskFlow**, migrée depuis **React (Vite)** vers **Next.js 15** avec l'**App Router**. L'objectif principal est de comprendre le passage du *Client-Side Rendering (CSR)* au *Server-Side Rendering (SSR)*.

---

## 🏗️ Architecture du Projet

Le projet utilise le **File-based Routing** de Next.js :

```text
taskflow-next/
├── app/
│   ├── layout.tsx       # Layout global (Header persistant)
│   ├── page.tsx         # Route / (Accueil)
│   ├── globals.css      # Styles globaux
│   ├── login/
│   │   └── page.tsx      # Route /login (Client Component)
│   ├── dashboard/
│   │   └── page.tsx      # Route /dashboard (Server Component + SSR)
│   └── projects/
│       └── [id]/
│           └── page.tsx  # Route dynamique /projects/:id (SSR)
├── db.json              # Base de données (json-server)
└── package.json
```

---

## ⚡ Points Clés de la Migration

### 1. Composants Serveur (SSR)
Contrairement à la version Vite, le **Dashboard** et les **Détails de Projet** sont des *Server Components*.
- **Plus de `useEffect`** : Les données sont récupérées directement dans la fonction asynchrone du composant avant le rendu.
- **Plus de `useState` (pour l'affichage)** : Le HTML envoyé au navigateur contient déjà les données, ce qui améliore le SEO et la vitesse de chargement.

### 2. Composants Client (`'use client'`)
La page **Login** utilise la directive `'use client'` car elle nécessite de l'interactivité (gestion des formulaires, hooks `useState`, redirection via `useRouter`).

### 3. Sécurité
Les appels API vers `json-server` (port 4000) se font côté serveur. Le navigateur client ne voit jamais ces requêtes, ce qui masque l'architecture backend.

---

## 🛠️ Installation et Démarrage

### 1. Prérequis
- Node.js installé
- Un terminal ouvert dans le dossier `taskflow-next`

### 2. Démarrer la Base de Données (json-server)
Dans un premier terminal :
```bash
npx json-server --watch db.json --port 4000
```

### 3. Démarrer l'application Next.js
Dans un second terminal :
```bash
npm install
npm run dev
```
L'application sera disponible sur **http://localhost:3000**.

---

## 📝 Guide de Migration Git

Voici les étapes recommandées pour documenter ce TP dans ton dépôt :

1. **Initialisation** : `git commit -m "chore: setup Next.js 15 project with App Router"`
2. **Dashboard SSR** : `git commit -m "feat: migrate Dashboard to SSR with async fetching"`
3. **Login Interactif** : `git commit -m "feat: implement Client Component for Login page"`

---

## 🎓 Auteur
**Étudiant EMSI** — TP : Du CSR au SSR
