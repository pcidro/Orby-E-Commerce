# Orby E-Commerce

**Orby E-Commerce** é um projeto que simula um e-commerce completo de sneakers, passando por toda a jornada do usuário — desde a escolha do produto até o pagamento e acompanhamento dos pedidos.

### 🔗 [Deploy do projeto](https://orbyshoes.netlify.app/)

---

## 📌 Sobre o projeto

Criei esse projeto com foco em estudo, tentando simular um cenário real onde alguém precisa de um e-commerce funcional, com boa experiência de uso e organização de código.

---

## Tecnologias

- **React + TypeScript**
- **Firebase**
  - Authentication (login)
  - Firestore (banco de dados)
- **Context API**

---

## Funcionalidades

### Autenticação

- Cadastro e login de usuários via Firebase

### Rotas protegidas

- Checkout e área de pedidos acessíveis apenas para usuários logados

### Carrinho

- Adicionar e remover produtos
- Controle de quantidade (+ / -)
- Persistência com **Local Storage**
- Interface com carrinho fixo e lateral

### Produtos

- Listagem dinâmica
- Seleção de tamanho via modal
- Filtro por marca
- Sistema de busca em tempo real

### Pedidos

- Histórico completo em **"Meus Pedidos"**
- Dados salvos no Firestore
- Cancelar pedido
- Comprar novamente

---

## Organização (Context API)

Para manter o código limpo e escalável, o estado global foi dividido em:

- `Auth Context` → gerencia autenticação
- `Cart Context` → controla o carrinho
- `Order Context` → gerencia pedidos
- `Search Context` → controla busca e filtros

---

## ▶️ Como rodar o projeto localmente

### 1. Clonar e instalar

```bash
git clone https://github.com/pcidro/Orby-E-Commerce.git
cd Orby-E-Commerce
npm install
```

---

### 2. Configurar Firebase

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

---

### 3. Rodar o projeto

```bash
npm run dev
```

### Aprendizados

O principal foi aprender a lidar melhor com estados globais usando Context API — principalmente carrinho, busca e pedidos. Foi extremamente gratificante conseguir implementar tais funcionalidades de forma correta e assertiva, da forma como o mercado utiliza, e me sinto muito mais preparado para fazer novos projetos com estados cada vez mais complexos e desafiadores.

Outra parte que deu trabalho foi a responsividade, principalmente o header. Tive que ajustar bastante grid, tamanhos e comportamento em telas menores.

No geral, foi um projeto que me deixou bem mais confortável pra construir coisas mais complexas.
