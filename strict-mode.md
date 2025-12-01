# Utilisation du strict mode en React

## 1. **Effets non nettoyés (memory leaks)**

```tsx
// ❌ Mauvais - Le Strict Mode va monter/démonter 2 fois en dev
function BadTimer() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    // ❌ OUBLI : pas de cleanup
    // En Strict Mode, le composant monte 2 fois
    // => 2 intervals créés, mais 1 seul nettoyé = memory leak!
  }, []);
  
  return <div>Count: {count}</div>;
}

// ✅ Bon - Avec cleanup
function GoodTimer() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    return () => clearInterval(interval); // ✅ Cleanup
  }, []);
  
  return <div>Count: {count}</div>;
}
```

**Sans Strict Mode** : Le problème passe inaperçu  
**Avec Strict Mode** : Le composant monte 2 fois → vous voyez le count augmenter 2x plus vite → vous détectez le bug !

## 2. **Effets avec fetch non annulables**

```tsx
// ❌ Mauvais - Race condition possible
function BadUserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
    
    // ❌ Problème : si userId change rapidement,
    // les réponses peuvent arriver dans le désordre
  }, [userId]);
  
  return <div>{user?.name}</div>;
}

// ✅ Bon - Avec flag d'annulation
function GoodUserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    let cancelled = false;
    
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) { // ✅ Vérifie avant de mettre à jour
          setUser(data);
        }
      });
    
    return () => {
      cancelled = true; // ✅ Cleanup
    };
  }, [userId]);
  
  return <div>{user?.name}</div>;
}
```

## 3. **Abonnement à un événement sans désabonnement**

```tsx
// ❌ Mauvais
function BadWindowSize() {
  const [size, setSize] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    
    // ❌ OUBLI : pas de removeEventListener
    // En Strict Mode, le listener est ajouté 2 fois!
  }, []);
  
  return <div>Width: {size}px</div>;
}

// ✅ Bon
function GoodWindowSize() {
  const [size, setSize] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize); // ✅ Cleanup
    };
  }, []);
  
  return <div>Width: {size}px</div>;
}
```

## 4. **Fonctions impures dans le render**

```tsx
// ❌ Mauvais - Effet de bord dans le render
function BadCounter() {
  let count = 0;
  
  // ❌ Modifie une variable externe pendant le render
  // En Strict Mode, render est appelé 2 fois => count = 2 au lieu de 1
  count++;
  
  console.log('Count:', count); // Verra 2 en Strict Mode!
  
  return <div>Rendered {count} times</div>;
}

// ✅ Bon - Utiliser useState
function GoodCounter() {
  const [renderCount, setRenderCount] = useState(0);
  
  useEffect(() => {
    setRenderCount(c => c + 1);
  });
  
  return <div>Rendered {renderCount} times</div>;
}
```

## 5. **useState avec fonction impure**

```tsx
// ❌ Mauvais
let globalId = 0;

function BadComponent() {
  // ❌ En Strict Mode, cette fonction s'exécute 2 fois
  // => globalId augmente de 2 au lieu de 1
  const [id] = useState(() => {
    globalId++;
    return globalId;
  });
  
  return <div>ID: {id}</div>;
}

// ✅ Bon - Utiliser useRef pour les IDs
function GoodComponent() {
  const idRef = useRef(0);
  
  if (idRef.current === 0) {
    idRef.current = Math.random(); // Génère une seule fois
  }
  
  return <div>ID: {idRef.current}</div>;
}

// ✅ Ou encore mieux avec useId (React 18+)
function BestComponent() {
  const id = useId();
  return <div>ID: {id}</div>;
}
```

## 6. **Console.log double en développement**

```tsx
function MyComponent() {
  console.log('Rendering...'); // S'affiche 2 fois en Strict Mode!
  
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

**Console en dev avec Strict Mode :**
```
Rendering...
Rendering...
```

**Console en production (sans Strict Mode) :**
```
Rendering...
```

## Comment activer/désactiver Strict Mode ?

```tsx
// App.tsx
import { StrictMode } from 'react';

// ✅ Activer (recommandé)
function App() {
  return (
    <StrictMode>
      <MyComponent />
    </StrictMode>
  );
}

// ❌ Désactiver (pas recommandé, mais possible temporairement)
function App() {
  return <MyComponent />;
}
```

## Résumé : Ce que détecte Strict Mode

✅ **Effets de bord non nettoyés** (timers, listeners, fetch)  
✅ **Fonctions impures** dans le render  
✅ **Race conditions** potentielles  
✅ **Utilisation d'APIs dépréciées** (legacy context, findDOMNode, etc.)  
✅ **Problèmes de performances** (re-renders inutiles)

