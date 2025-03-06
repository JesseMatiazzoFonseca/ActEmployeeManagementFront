# ActEmployeeManagementFront

# Projeto CRUD - Gestão de Usuários (Angular 19 + Node.js 22)

Este projeto é um CRUD de usuários desenvolvido com **Angular 19** no frontend e **Node.js 22** no backend. Ele permite o cadastro, autenticação e gestão de usuários com diferentes níveis de permissão.

## 🚀 Funcionalidades

- **Cadastro de Usuário**
  - Se o usuário cadastrar com uma senha comum, ele será registrado com permissão **baixa**.
  - Se a senha informada for a mesma cadastrada na API (appsettings.json), o usuário será registrado como **Administrador**.

- **Autenticação**
  - Usuários podem fazer login e visualizar suas informações.
  - Administradores podem ver a lista de usuários e gerenciar permissões.

- **Gestão de Usuários**
  - Administradores podem promover usuários a **Gestores**.
  - Gestores, ao fazer login, podem editar os dados de outros usuários.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** Angular 19
- **Backend:** Node.js 22
- **Gerenciador de Pacotes:** npm
- **Docker** (opcional)

---

## 📦 Como Rodar o Projeto

### 🏃 Rodando Sem Docker

1. **Clone o repositório**  
  - git clone -b (branch) https://github.com/JesseMatiazzoFonseca/ActEmployeeManagementFront.git
  - cd seu-repositorio
1.1 **Instale as dependencias e start a aplicação** 
  - npm install
  - npm start

  ### 🐳 Rodando com Docker

1. **Clone o repositório**
   - git clone -b (branch) https://github.com/JesseMatiazzoFonseca/ActEmployeeManagementFront.git
   - cd seu-repositorio
   **Certifique-se de ter o Docker instalado**   
   - docker build -t ActEmployeeManagementFront .
   - docker run -p 4200:4200 ActEmployeeManagementFront
  
   ### Observação !!!
    - Verificar a porta em que a API estara rodando e alterar dentro do arquivo **environment.ts**
     





