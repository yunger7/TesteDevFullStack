<p align="center">
  <a href="https://testedevfullstack-3d9a1.web.app/">
    <img src="./frontend/public/logo.png" height="84" />
  </a>
  <h3 align="center">CRUDmon</h3>
  <p align="center">Minha resolução do teste para devs full-stack da Teppa</p>
  <p align="center">
    <a href="https://testedevfullstack-3d9a1.web.app/" target="_blank"><img src="https://img.shields.io/website?down_color=FA5252&down_message=Inativo&label=Website&style=flat-square&up_color=FD7E14&up_message=Ativo&color=FD7E14&url=https%3A%2F%2Ftestedevfullstack-3d9a1.web.app" /></a>
    <img src="https://img.shields.io/github/last-commit/yunger7/TesteDevFullStack?color=FD7E14&label=Ultimo%20commit&logo=github&logoColor=ffffff&style=flat-square" />
    <img src="https://img.shields.io/github/languages/code-size/yunger7/TesteDevFullStack?color=FD7E14&label=Tamanho&logo=github&logoColor=ffffff&style=flat-square" />
    <img src="https://img.shields.io/github/languages/top/yunger7/TesteDevFullStack?color=FD7E14&label=TypeScript&logo=typescript&logoColor=ffffff&style=flat-square" />
    <img src="https://img.shields.io/github/license/yunger7/TesteDevFullStack?&color=FD7E14&label=Licen%C3%A7a&logo=github&logoColor=ffffff&style=flat-square" />
  </p>
</p>

## Sobre
Este repositório contém a minha resolução de um teste proposto pela Teppa. Na aplicação, é possível realizar o cadastro, leitura, edição e exclusão de pokémons. Ao terminar o cadastro, a aplicação irá armazenar: o pokémon selecionado, apelido, level, natureza e os stats básicos (HP, Attack, Speed, etc.)

Na leitura, a aplicação utiliza a PokeAPI para mostrar outros dados do pokémon, como altura, peso e aparência shiny. O projeto está publicado e pode ser acessado a qualquer momento clicando [aqui](https://testedevfullstack-3d9a1.web.app/).

## Tecnologias
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Express](https://expressjs.com/)
- [Mantine](https://mantine.dev/)
- [PokeAPI](https://pokeapi.co/)

## Instalação
Primeiro, clone o repositório na sua máquina e instale as dependências dos projetos `frontend` e `backend`, depois inicie o ambiente de desenvolvimento de ambos com `npm start` e `npm run dev` respectivamente.
```
$ git clone https://github.com/yunger7/TesteDevFullStack.git
$ cd ./TesteDevFullStack

# backend
$ cd ./backend
$ npm install
$ npm run dev

# frontend
$ cd ./frontend
$ npm install
$ npm start
```
Abra http://localhost:3000 no seu navegador e voilà!

OBS: É necessário configurar as variáveis de ambiente, veja `.env.example` para consultar o formato.

## License
Licenciado sob a Licença MIT. Consulte `LICENSE` para mais detalhes.

<hr /><br />

<p align="center">Feito com ☕ e TypeScript <br/> por <a href="https://luisgalete.com.br/">Luís Galete</a></p>
