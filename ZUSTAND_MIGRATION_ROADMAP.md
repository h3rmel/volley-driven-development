# 🐻 Zustand Migration Roadmap

## 📋 Análise do Projeto Atual

### **Estado Atual do Gerenciamento de Estado:**

- **useState** em 3 componentes principais (excluindo ThemeProvider)
- **Estados locais** sem compartilhamento global
- **Props drilling** para comunicação entre componentes
- **Lógica de domínio** separada mas não centralizada

### **Componentes com Estado:**

1. **`App.tsx`** - Navegação entre telas (setup/game)
2. **`TeamSetup.tsx`** - Validação de nomes dos times
3. **`Scoreboard.tsx`** - Estado do placar e pontuação
4. **`ThemeProvider.tsx`** - Tema (dark/light/system) - **MANTER COMO ESTÁ**

---

## 🎯 Objetivos da Migração

### **Benefícios Esperados:**

- ✅ **Estado global** centralizado e acessível
- ✅ **Eliminação** do props drilling
- ✅ **Persistência** automática do estado
- ✅ **DevTools** para debugging
- ✅ **Performance** otimizada com seletores
- ✅ **Testabilidade** melhorada

---

## 📦 Fase 1: Setup e Dependências

### **1.1 Instalar Zustand**

```bash
pnpm add zustand
pnpm add -D @types/zustand
```

### **1.2 Instalar DevTools (Opcional)**

```bash
pnpm add -D @redux-devtools/extension
```

### **1.3 Estrutura de Pastas**

```
src/
├── stores/
│   ├── index.ts           # Exportações centralizadas
│   ├── app-store.ts       # Navegação e configuração geral
│   ├── team-setup-store.ts # Validação de times
│   └── scoreboard-store.ts # Placar e pontuação
├── hooks/
│   ├── use-app-store.ts   # Hooks customizados
│   ├── use-team-setup.ts
│   └── use-scoreboard.ts
└── types/
    └── store-types.ts     # Tipos centralizados
```

---

## 🏗️ Fase 2: Criação dos Stores

### **2.1 Store de Navegação (app-store.ts)**

```typescript
interface AppState {
  screen: 'setup' | 'game';
  teamAName: string;
  teamBName: string;
  // Actions
  startGame: (teamA: string, teamB: string) => void;
  newGame: () => void;
}
```

### **2.2 Store de Setup de Times (team-setup-store.ts)**

```typescript
interface TeamSetupState {
  teamAName: string;
  teamBName: string;
  errorMessage?: string;
  isValid: boolean;
  // Actions
  setTeamAName: (name: string) => void;
  setTeamBName: (name: string) => void;
  validateSetup: () => void;
  resetSetup: () => void;
}
```

### **2.3 Store do Placar (scoreboard-store.ts)**

```typescript
interface ScoreboardState {
  teamA: { name: string; points: number; sets: number };
  teamB: { name: string; points: number; sets: number };
  // Actions
  addPoint: (teamName: string) => void;
  resetScore: () => void;
  setTeamNames: (teamA: string, teamB: string) => void;
}
```

---

## 🔄 Fase 3: Migração dos Componentes

### **3.1 App.tsx**

**Antes:**

```typescript
const [appState, setAppState] = useState<AppState>({ screen: 'setup' });
```

**Depois:**

```typescript
const { screen, teamAName, teamBName, startGame, newGame } = useAppStore();
```

### **3.2 TeamSetup.tsx**

**Antes:**

```typescript
const [setupState, setSetupState] = useState<TeamSetupState>(createInitialSetup);
```

**Depois:**

```typescript
const { teamAName, teamBName, errorMessage, isValid, setTeamAName, setTeamBName } = useTeamSetupStore();
```

### **3.3 Scoreboard.tsx**

**Antes:**

```typescript
const [scoreState, setScoreState] = useState<ScoreState>({...});
```

**Depois:**

```typescript
const { teamA, teamB, addPoint } = useScoreboardStore();
```

### **3.4 ThemeProvider.tsx**

**MANTER COMO ESTÁ** - O ThemeProvider atual já funciona perfeitamente e não precisa ser migrado.

---

## 🧪 Fase 4: Atualização dos Testes

### **4.1 Testes Unitários**

- **Mock** dos stores Zustand
- **Testes** de actions isoladamente
- **Testes** de seletores

### **4.2 Testes de Componente**

- **Wrapper** com stores mockados
- **Testes** de integração com stores
- **Testes** de persistência

### **4.3 Testes BDD**

- **Atualizar** step definitions para usar stores
- **Manter** compatibilidade com cenários existentes

---

## 🔧 Fase 5: Funcionalidades Avançadas

### **5.1 Persistência**

```typescript
// Persistir estado do placar
const useScoreboardStore = create<ScoreboardState>()(
  persist(
    (set, get) => ({
      // ... state and actions
    }),
    {
      name: 'scoreboard-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

### **5.2 Middleware**

```typescript
// DevTools
import { devtools } from 'zustand/middleware';

// Logging
import { subscribeWithSelector } from 'zustand/middleware';
```

### **5.3 Seletores Otimizados**

```typescript
// Seletores para performance
const useTeamAScore = () => useScoreboardStore(state => state.teamA);
const useTeamBScore = () => useScoreboardStore(state => state.teamB);
```

---

## 📊 Fase 6: Migração Gradual

### **6.1 Estratégia de Migração**

1. **Criar** stores paralelos aos estados existentes
2. **Migrar** um componente por vez
3. **Manter** compatibilidade durante transição
4. **Remover** código antigo após validação

### **6.2 Ordem de Migração**

1. **AppStore** (navegação básica)
2. **TeamSetupStore** (validação)
3. **ScoreboardStore** (mais complexo)

---

## 🚀 Fase 7: Otimizações e Melhorias

### **7.1 Performance**

- **Seletores** específicos para evitar re-renders
- **Memoização** de componentes pesados
- **Lazy loading** de stores não críticos

### **7.2 Developer Experience**

- **DevTools** integradas
- **TypeScript** strict mode
- **Hooks** customizados para cada store

### **7.3 Funcionalidades Extras**

- **Undo/Redo** para ações do placar
- **Histórico** de partidas
- **Export/Import** de dados

---

## 🧪 Fase 8: Testes e Validação

### **8.1 Testes de Integração**

```typescript
// Teste completo do fluxo
describe('Complete Game Flow', () => {
  it('should handle full game from setup to scoring', () => {
    // Setup teams
    // Start game
    // Add points
    // Verify state persistence
  });
});
```

### **8.2 Testes de Performance**

- **Benchmark** de re-renders
- **Memory** usage comparison
- **Bundle** size impact

### **8.3 Testes E2E**

- **Cypress/Playwright** com stores
- **BDD** scenarios atualizados

---

## 📋 Checklist de Migração

### **Preparação**

- [ ] Instalar Zustand e dependências
- [ ] Criar estrutura de pastas
- [ ] Definir tipos TypeScript

### **Stores**

- [ ] AppStore (navegação)
- [ ] TeamSetupStore (validação)
- [ ] ScoreboardStore (placar)

### **Componentes**

- [ ] Migrar App.tsx
- [ ] Migrar TeamSetup.tsx
- [ ] Migrar Scoreboard.tsx

### **Testes**

- [ ] Atualizar testes unitários
- [ ] Atualizar testes de componente
- [ ] Atualizar testes BDD
- [ ] Adicionar testes de store

### **Funcionalidades**

- [ ] Persistência de estado
- [ ] DevTools integration
- [ ] Seletores otimizados
- [ ] Hooks customizados

### **Validação**

- [ ] Testes de integração
- [ ] Performance benchmarks
- [ ] E2E testing
- [ ] Code review

---

## 🎯 Resultado Final

### **Antes (useState)**

```typescript
// Estado espalhado
const [appState, setAppState] = useState({...});
const [setupState, setSetupState] = useState({...});
const [scoreState, setScoreState] = useState({...});

// Props drilling
<Scoreboard teamAName={appState.teamAName} teamBName={appState.teamBName} />
```

### **Depois (Zustand)**

```typescript
// Estado centralizado
const { screen, startGame } = useAppStore();
const { teamAName, teamBName, isValid } = useTeamSetupStore();
const { teamA, teamB, addPoint } = useScoreboardStore();

// Componentes limpos
<Scoreboard /> // Sem props!
```

### **Benefícios Alcançados**

- ✅ **Estado global** acessível de qualquer lugar
- ✅ **Zero props drilling**
- ✅ **Persistência** automática
- ✅ **DevTools** para debugging
- ✅ **Performance** otimizada
- ✅ **Testabilidade** melhorada
- ✅ **Código** mais limpo e maintível

---

## 🚨 Riscos e Mitigações

### **Riscos**

- **Breaking changes** nos testes existentes
- **Performance** impact inicial
- **Learning curve** para a equipe

### **Mitigações**

- **Migração gradual** componente por componente
- **Testes paralelos** durante transição
- **Documentação** detalhada
- **Code review** rigoroso

---

## 📚 Recursos e Documentação

### **Links Úteis**

- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Zustand TypeScript Guide](https://github.com/pmndrs/zustand#typescript)
- [Zustand DevTools](https://github.com/pmndrs/zustand#devtools)

### **Exemplos de Implementação**

- [Store Examples](./examples/stores/)
- [Hook Examples](./examples/hooks/)
- [Test Examples](./examples/tests/)

---

**🎉 Com este roadmap, o projeto terá um gerenciamento de estado moderno, performático e maintível!**
