# Sistema de Gerenciamento de Condomínio

Este projeto é um sistema de gerenciamento de condomínios que oferece funcionalidades para comunicação, reservas, manutenções, enquetes e administração. O sistema foi desenvolvido utilizando tecnologias modernas e é projetado para ser eficiente e fácil de usar.

## Objetivo

Este projeto foi desenvolvido como parte de um estudo prático de front-end para complementar o back-end já criado. Ele tem como finalidade permitir que usuários interajam com o sistema de gerenciamento de condomínios de forma direta e funcional.

## Demonstração

### Painel Principal & Manutenções

| Dashboard                           | Tela de Manutenção (usuário MASTER)            |
| ----------------------------------- | ---------------------------------------------- |
| ![Dashboard](/public/dashboard.png) | ![Manutenções](/public/maintenance-master.png) |

### Avisos (roles diferentes)

| Avisos - MASTER                               | Avisos - Usuário comum                    |
| --------------------------------------------- | ----------------------------------------- |
| ![Avisos Master](/public/warnings-master.png) | ![Avisos User](/public/warnings-user.png) |

## Funcionalidades

### Avisos (WARNINGS)

- **Criação**: Todos os usuários podem criar avisos.
- **Aprovação**: Avisos precisam ser aprovados por usuários com role "admin" ou "master".
- **Edição**:
  - Usuários comuns: Podem editar seus próprios avisos apenas enquanto estiverem no status "ABERTO".
  - Admins/Masters: Podem selecionar o apartamento ao qual o aviso se refere.
- **Visualização**: Todos os usuários podem visualizar avisos aprovados.

### Reservas (RESERVATION)

- **Solicitação**: Usuários podem solicitar reservas.
- **Edição**:
  - Usuários comuns: Podem editar a descrição da reserva apenas enquanto estiver no status "ABERTO".
  - Admins/Masters: Podem aprovar ou reprovar as solicitações.
  - Admins/Masters: Podem selecionar o apartamento ao qual a reserva se refere.

### Manutenções (MAINTENANCE)

- **Solicitação**: Usuários podem solicitar manutenções.
- **Aprovação**: Solicitações precisam ser aprovadas por usuários "admin" ou "master".
- **Edição**:
  - Usuários comuns: Podem editar a descrição de suas próprias solicitações enquanto estiverem no status "ABERTO".
  - Admins/Masters: Podem selecionar o condomínio ao qual a manutenção se refere.
- **Visualização**: Todos os usuários podem visualizar manutenções aprovadas.

### Enquetes (SURVEY)

- **Criação/Edição**: Apenas usuários "admin" e "master" podem criar e editar enquetes.
- **Restrição**: Enquetes não podem ser editadas após receberem respostas.

### Respostas (ANSWER)

- **Participação**: Apenas usuários com role "USER" podem responder enquetes.

### Área Administrativa (Acesso exclusivo para usuários "admin" e "master")

- **Apartamentos (APARTMENT)**: CRUD de informações dos apartamentos.
- **Condomínios (CONDOMINIUM)**: CRUD de informações dos condomínios.
- **Espaços de Reserva (SPACE-RESERVATION)**: CRUD de espaços de reserva, com seleção do condomínio.
- **Usuários (USER)**: CRUD de informações dos usuários.

## Tecnologias Utilizadas

- **TypeScript** - Superset de JavaScript que adiciona tipagem estática ao código.
- **Material UI** - Biblioteca de componentes React para design de interface.
- **React Query** - Gerenciamento de estado assíncrono para requisições.
- **React Hook Form** - Gerenciamento de formulários.
- **Zod** - Biblioteca para validação de dados.
- **Axios** - Cliente HTTP para fazer requisições à API.
- **React Router DOM** - Gerenciamento de rotas na aplicação.
- **Zustand** - Gerenciamento de estado global.
- **Vite** - Ferramenta de build e desenvolvimento rápido.

## Instalação e Configuração

Clone do repositório:

```bash
git clone https://github.com/ZanellaIgor/CondominiumAdmin.git
cd CondominiumAdmin
```

Instalação as dependências:

```bash
npm install
```

Iniciar projeto

```bash
npm run dev
```

Obs: Verificar configuração do .env.example, e alterar para .env

Layout baseado :

**[Tokyo - free](https://tokyo-free-white.bloomui.com/management/transactions)**
