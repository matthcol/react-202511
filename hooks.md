# Résumé des Hooks React

## Hooks de base

### 1. **useState** - Gérer l'état local
```tsx
const [count, setCount] = useState(0);
const [name, setName] = useState<string>('');

// Avec fonction (utile si calcul complexe)
const [items, setItems] = useState(() => {
  return expensiveCalculation();
});

// Mise à jour avec valeur précédente
setCount(prevCount => prevCount + 1);
```

### 2. **useEffect** - Effets de bord (side effects)
```tsx
// S'exécute après chaque render
useEffect(() => {
  console.log('Composant rendu');
});

// S'exécute une seule fois au montage ([] = dépendances vides)
useEffect(() => {
  console.log('Composant monté');
}, []);

// S'exécute quand 'count' change
useEffect(() => {
  console.log('Count a changé:', count);
}, [count]);

// Avec cleanup (démontage ou avant re-exécution)
useEffect(() => {
  const timer = setInterval(() => console.log('tick'), 1000);
  
  return () => {
    clearInterval(timer); // Cleanup
  };
}, []);
```

### 3. **useContext** - Consommer un contexte
```tsx
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext); // 'dark'
  return <button>{theme}</button>;
}
```

## Hooks avancés

### 4. **useReducer** - Gestion d'état complexe (alternative à useState)
```tsx
type State = { count: number };
type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

### 5. **useCallback** - Mémoïser une fonction
```tsx
// Sans useCallback : nouvelle fonction à chaque render
const handleClick = () => {
  console.log(count);
};

// Avec useCallback : même fonction tant que 'count' ne change pas
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);

// Utile pour éviter les re-renders d'enfants
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // Pas de dépendances = fonction stable
  
  return <ChildMemo onClick={handleClick} />;
}

const ChildMemo = React.memo(({ onClick }) => {
  console.log('Child render'); // Ne se re-rend pas si onClick est stable
  return <button onClick={onClick}>Click</button>;
});
```

### 6. **useMemo** - Mémoïser une valeur calculée
```tsx
function ProductList({ products, filter }) {
  // Sans useMemo : recalculé à chaque render
  const filteredProducts = products.filter(p => p.name.includes(filter));
  
  // Avec useMemo : recalculé uniquement si products ou filter change
  const filteredProducts = useMemo(() => {
    console.log('Filtrage...');
    return products.filter(p => p.name.includes(filter));
  }, [products, filter]);
  
  return <div>{filteredProducts.map(...)}</div>;
}

// Autre exemple : calcul coûteux
const expensiveValue = useMemo(() => {
  return products.reduce((sum, p) => sum + p.price, 0);
}, [products]);
```

### 7. **useRef** - Référencer un élément DOM ou persister une valeur
```tsx
// Référencer un élément DOM
function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const focusInput = () => {
    inputRef.current?.focus();
  };
  
  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}

// Persister une valeur sans causer de re-render
function Timer() {
  const countRef = useRef(0);
  const [, forceUpdate] = useState({});
  
  useEffect(() => {
    const interval = setInterval(() => {
      countRef.current += 1; // Pas de re-render
      console.log(countRef.current);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return <div>Check console (count: {countRef.current})</div>;
}
```

### 8. **useImperativeHandle** - Exposer des méthodes au parent (rare)
```tsx
import { forwardRef, useImperativeHandle, useRef } from 'react';

type InputRef = {
  focus: () => void;
  getValue: () => string;
};

const CustomInput = forwardRef<InputRef>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    getValue: () => {
      return inputRef.current?.value || '';
    }
  }));
  
  return <input ref={inputRef} />;
});

function Parent() {
  const inputRef = useRef<InputRef>(null);
  
  return (
    <>
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </>
  );
}
```

### 9. **useLayoutEffect** - Comme useEffect mais synchrone (avant paint)
```tsx
// useEffect : asynchrone, après paint du navigateur
useEffect(() => {
  // Peut causer un "flash" visuel
}, []);

// useLayoutEffect : synchrone, avant paint
useLayoutEffect(() => {
  // Utile pour mesurer/modifier le DOM avant affichage
  const height = divRef.current?.offsetHeight;
}, []);

// ⚠️ Utiliser rarement, préférer useEffect dans 99% des cas
```

### 10. **useDebugValue** - Afficher une valeur dans React DevTools
```tsx
function useCustomHook(value: string) {
  useDebugValue(value ? 'Active' : 'Inactive');
  return value;
}
```

## Hooks React 18+

### 11. **useId** - Générer des IDs uniques (accessibilité)
```tsx
function Form() {
  const id = useId();
  
  return (
    <>
      <label htmlFor={id}>Name:</label>
      <input id={id} />
    </>
  );
}
```

### 12. **useTransition** - Marquer des mises à jour comme non-urgentes
```tsx
function SearchResults() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // Urgent
    
    startTransition(() => {
      // Non-urgent : peut être interrompu
      setResults(expensiveSearch(e.target.value));
    });
  };
  
  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <ResultsList results={results} />
    </>
  );
}
```

### 13. **useDeferredValue** - Différer une valeur non-urgente
```tsx
function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => 
    expensiveSearch(deferredQuery), 
    [deferredQuery]
  );
  
  return <ResultsList results={results} />;
}
```

### 14. **useSyncExternalStore** - S'abonner à un store externe
```tsx
function useOnlineStatus() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine, // Valeur actuelle
    () => true // Valeur serveur (SSR)
  );
}
```

## Custom Hooks (créer vos propres hooks)

```tsx
// Hook personnalisé pour fetch
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    let cancelled = false;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });
    
    return () => {
      cancelled = true;
    };
  }, [url]);
  
  return { data, loading, error };
}

// Utilisation
function UserProfile() {
  const { data, loading, error } = useFetch<User>('/api/user');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data?.name}</div>;
}
```

## Règles des Hooks (IMPORTANT!)

1. ✅ **Toujours appeler au top level** (pas dans des conditions/boucles)
2. ✅ **Uniquement dans des composants React ou custom hooks**
3. ✅ **Préfixer les custom hooks par "use"** (convention)

```tsx
// ❌ Mauvais
if (condition) {
  useState(0); // Erreur!
}

// ✅ Bon
const [count, setCount] = useState(0);
if (condition) {
  setCount(count + 1);
}
```

