# React

## Historique

Voici un récapitulatif de l'évolution de JavaScript/ECMAScript et TypeScript :

### JavaScript / ECMAScript
Documentation MDN: https://developer.mozilla.org/

**1995 - Naissance**
- Brendan Eich crée JavaScript en 10 jours chez Netscape
- Langage de script pour navigateurs

**1997 - ECMAScript 1**
- Standardisation par l'ECMA International

**1999 - ES3**
- Expressions régulières, try/catch, amélioration du traitement des chaînes

**2009 - ES5**
- `strict mode`, méthodes JSON, méthodes d'array (map, filter, forEach)
- Longue période de stagnation avant cette version

**2015 - ES6/ES2015** (révolution majeure)
- Classes, modules (import/export)
- Arrow functions, template literals
- let/const, destructuring
- Promises, for...of
- Passage à un cycle de release annuel

**2016-2024 - Évolution continue**
- **ES2016** : `**` (exponentiation), Array.includes
- **ES2017** : async/await, Object.entries/values
- **ES2018** : rest/spread pour objets, async iteration
- **ES2019** : flat/flatMap, Object.fromEntries
- **ES2020** : optional chaining (`?.`), nullish coalescing (`??`)
- **ES2021** : Promise.any, replaceAll
- **ES2022** : top-level await, private fields (#)
- **ES2023** : findLast, toSorted
- **ES2024** : groupBy, Promise.withResolvers

### TypeScript
https://www.typescriptlang.org/

**2012 - Lancement**
- Microsoft développe TypeScript (Anders Hejlsberg)
- Superset de JavaScript avec typage statique

**2014 - TypeScript 1.0**
- Version stable pour la production

**2016 - TypeScript 2.0**
- Non-nullable types, readonly
- Adoption croissante (Angular 2 l'adopte)

**2018 - TypeScript 3.0**
- Project references, tuples
- Popularité explosive

**2020-2024 - Maturité**
- **TS 4.0+** : Variadic tuples, template literal types
- **TS 4.5+** : Awaited type, import assertions
- **TS 5.0** (2023) : Decorators, const type parameters

### React
- Site actuel: https://react.dev/
- Site legacy: https://legacy.reactjs.org/

**2011 - Origines**
- Jordan Walke crée FaxJS chez Facebook
- Prototype interne pour le fil d'actualité

**2013 - Open Source**
- React 0.3.0 lancé publiquement à la JSConf US
- Concept révolutionnaire : Virtual DOM, composants

**2015 - React 0.14**
- Séparation react et react-dom
- Introduction des Stateless Functional Components
- **React Native** lancé (applications mobiles)

**2016 - React 15**
- Réécriture majeure du moteur de réconciliation
- Amélioration des performances

**2017 - React 16 (Fiber)**
- Réécriture complète du cœur (architecture Fiber)
- Error boundaries
- Portals
- Retour de fragments
- Async rendering en préparation

**2018 - Révolution des Hooks**
- **React 16.8** : Introduction des **Hooks** (useState, useEffect...)
- Changement de paradigme : logique réutilisable sans classes
- Les composants fonctionnels deviennent la norme

**2019-2020 - React 16.x**
- Concurrent Mode (expérimental)
- Suspense pour le chargement de données

**2022 - React 18**
- Concurrent Rendering stable
- Automatic Batching
- startTransition pour les mises à jour non urgentes
- Suspense amélioré
- **Server Components** (expérimental)

**2023-2024 - Évolution moderne**
- Adoption massive de Server Components (Next.js 13+)
- React Server Components (RSC) devient mature
- **React 19** (en cours) : Actions, use(), optimisations
- Focus sur la performance et l'expérience serveur

**Écosystème actuel**
- **Frameworks** : Next.js, Remix, Gatsby
- **State management** : Redux, Zustand, Jotai, TanStack Query
- **Styling** : Tailwind CSS, styled-components, CSS Modules

## Premier Projet React

npm create vite@latest course -- --template react-ts

## JSON Server
```
npm install json-server
npx json-server --watch data.db.json --port 3001
```

Quelques routes:
```
http://localhost:3001/produitsData
http://localhost:3001/produitsData?_page=1&_per_page=25
http://localhost:3001/produitsData?Id=92
```

Côté appli on peut utiliser par exemple rxjs:
```
npm install rxjs
```
