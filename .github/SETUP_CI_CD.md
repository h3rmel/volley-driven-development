# 🚀 CI/CD Setup Guide

Este guia explica como configurar e usar o CI/CD completo para o projeto **Volley Driven Development**.

## 🏗️ Arquitetura CI/CD

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   GitHub Repo   │ ──▶│  GitHub Actions  │ ──▶│     Vercel      │
│                 │    │                  │    │                 │
│  • Pull Request │    │  ✅ Lint         │    │  🚀 Deploy      │
│  • Push to main │    │  ✅ Unit Tests   │    │  🌐 Production  │
│                 │    │  ✅ BDD Tests    │    │                 │
│                 │    │  ✅ Build        │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 📋 Workflows Criados

### 1. **🏐 Continuous Integration** (`.github/workflows/ci.yml`)

- **Trigger**: Push/PR para `main`
- **Jobs paralelos**:
  - 🔍 **Code Quality**: Lint + Format + Type checking
  - 🧪 **Unit Tests**: Vitest + Coverage
  - 🥒 **BDD Tests**: Cucumber scenarios  
  - 🏗️ **Build Test**: Vite build validation
- **Resultado**: ✅ Todas as verificações passaram

### 2. **🚀 Release & Deploy** (`.github/workflows/release.yml`)

- **Trigger**: Após CI passar na `main`
- **Jobs**:
  - 📋 **Create Release**: Versionamento automático
  - 📊 **Deployment Stats**: Notificações

### 3. **🔄 Dependabot** (`.github/dependabot.yml`)

- **Atualização automática** de dependências
- **Weekly**: NPM packages
- **Monthly**: GitHub Actions

## 🛠️ Scripts NPM Adicionados

```bash
# CI/CD Commands
pnpm ci:test      # Roda todos os testes (unit + BDD)
pnpm ci:quality   # Roda verificações de qualidade
pnpm ci:all       # Roda tudo que o CI roda

# Comandos existentes
pnpm test         # Unit tests (watch mode)
pnpm test:bdd     # BDD scenarios
pnpm lint         # ESLint
pnpm format:check # Prettier validation
```

## ⚙️ Configuração Necessária

### 1. **Proteção de Branch (GitHub)**

```
GitHub Repo > Settings > Branches > Add rule
┌─────────────────────────────────────────────┐
│ Branch name pattern: main                   │
│ ☑️ Require status checks before merging    │
│ ☑️ Require branches to be up to date       │
│ ☑️ Status checks required:                 │
│   - 🔍 Code Quality                        │
│   - 🧪 Unit Tests                          │
│   - 🥒 BDD Tests                           │
│   - 🏗️ Build Test                          │
│ ☑️ Restrict pushes to matching branches    │
└─────────────────────────────────────────────┘
```

### 2. **Vercel Configuration**

- **Conectar repo** ao Vercel
- **Framework Preset**: Vite
- **Build Command**: `pnpm build` (padrão)
- **Install Command**: `pnpm install` (padrão)
- **Output Directory**: `dist` (padrão)

### 3. **Optional: CodeCov**

Para relatórios de cobertura, adicionar `CODECOV_TOKEN` nos Secrets do GitHub.

## 🔄 Workflow Completo

### **Pull Request**

1. 👨‍💻 Developer cria PR
2. 🤖 GitHub Actions executa **todos** os testes
3. 📊 Status checks aparecem no PR
4. ✅ Se tudo passar → **merge permitido**
5. ❌ Se algo falhar → **merge bloqueado**

### **Deploy para Produção**

1. 🔀 PR merged na `main`  
2. 🤖 GitHub Actions re-executa testes
3. 📋 Release automático criado
4. 🚀 Vercel faz deploy automático
5. 🎉 Aplicação no ar!

## 🧪 Teste Local do CI

```bash
# Simula exatamente o que o CI faz
pnpm ci:all

# Ou passo a passo:
pnpm lint           # ✨ Linting
pnpm format:check   # 💄 Formatting  
pnpm build          # 🔧 Type checking
pnpm test --run     # 🧪 Unit tests
pnpm test:bdd       # 🥒 BDD scenarios
```

## 📊 Monitoramento

### **GitHub Actions Tab**

- Histórico completo de execuções
- Logs detalhados de cada job
- Tempo de execução e status

### **Vercel Dashboard**

- Status de deployments
- Preview deployments para PRs
- Analytics de performance

### **Releases**

- Versionamento automático (formato: `v2024.01.15.1430`)
- Changelog gerado automaticamente
- Assets de build anexados

## 🚨 Troubleshooting

### **CI Falhando?**

1. Rode `pnpm ci:all` localmente
2. Verifique os logs no GitHub Actions
3. Corrija os problemas
4. Faça novo commit/push

### **Deploy Falhando?**

1. Verifique se o CI passou ✅
2. Confira configurações do Vercel
3. Verifique build command: `pnpm build`

### **Testes Quebrando?**

1. **Unit tests**: `pnpm test --run`
2. **BDD tests**: `pnpm test:bdd`  
3. **Linting**: `pnpm lint:fix`
4. **Format**: `pnpm format:write`

---

## 🎯 Resultado Final

✅ **Código sempre testado** antes de ir para produção  
✅ **Deploy automático** após merge na main  
✅ **Releases automáticos** com changelog  
✅ **Dependências sempre atualizadas**  
✅ **Feedback rápido** em Pull Requests  
✅ **Proteção** contra código quebrado  

**🏐 Agora é só desenvolver tranquilo que o CI/CD cuida do resto!**
