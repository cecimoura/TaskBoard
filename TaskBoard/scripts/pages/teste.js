import { API_BASE_URL } from "../../config/infoAPI.js";
import { resgatarLocalStorage } from "../localStorage/saveLocalSt.js";

// Elementos do DOM
const botaoDrop = document.getElementById("dropdown-content");
const infoLS = resgatarLocalStorage("user");
const columnsContainer = document.getElementById("columnsContainer");
const nomeUser = document.getElementById("nomeUser");
const logoutButton = document.querySelector(".logout-button");
const dropbtn = document.getElementById("dropbtn");

document.getElementById("dropbtn").addEventListener("click", () => {
  botaoDrop.classList.toggle("show");
});

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

// Função para exibir informações dos boards
async function boardsInfo() {
  let content = document.getElementById("dropdown-content");

  try {
    const response = await fetch(`${API_BASE_URL}/Boards`);
    if (!response.ok) throw new Error(`Erro ao carregar informações: ${response.status}`);
    const boards = await response.json();

    if (!boards || boards.length === 0) throw new Error("Nenhum dado encontrado nos boards.");

    boards.forEach((board) => {
      let lista = document.createElement("li");
      lista.innerHTML = `<a class="dropdown-item" href="#">${board.Name}</a>`;
      lista.addEventListener("click", () => {
        chamaBoard(board.Id);
      });
      content.appendChild(lista);
    });
  } catch (error) {
    console.error("Erro ao buscar informações dos boards:", error);
    content.innerHTML = `<li>Erro ao carregar informações. Por favor, tente novamente mais tarde.</li>`;
  }
}

// Função para carregar o board
async function chamaBoard(boardId) {
  try {
    const response = await fetch(`${API_BASE_URL}/Board?BoardId=${boardId}`);
    if (!response.ok) throw new Error(`Erro ao carregar informações: ${response.status}`);
    const result = await response.json();
    if (result) carregaColunas(result.Id);
  } catch (error) {
    console.error("Erro ao recuperar tema:", error);
  }
}

// Função para carregar as colunas
async function carregaColunas(boardId) {
  try {
    const response = await fetch(`${API_BASE_URL}/ColumnByBoardId?BoardId=${boardId}`);
    if (!response.ok) throw new Error(`Erro ao carregar informações: ${response.status}`);
    const result = await response.json();
    if (result) criaColunas(result);
  } catch (error) {
    console.error("Erro:", error);
  }
}

// Função para recuperar as tarefas de uma coluna
async function getTasks(columnId) {
  try {
    const response = await fetch(`${API_BASE_URL}/TasksByColumnId?ColumnId=${columnId}`);
    if (!response.ok) throw new Error(`Erro ao carregar informações: ${response.status}`);
    const result = await response.json();
    if (result) return result;
  } catch (error) {
    console.error("Erro:", error);
  }
}

// Função para criar as colunas na interface
function criaColunas(colunas) {
  colunas.forEach((coluna) => {
    let tasks = getTasks(coluna.Id);
    let elemento = document.createElement('section');
    elemento.className = 'column';
    elemento.innerHTML = `
      <div class="column-header">
        <h2 class="column-title" contenteditable="true">${coluna.Name}</h2>
        <button class="delete-column">Excluir Board</button>
      </div>
      <button class="add-tarefa">Nova tarefa</button>
      <section class="column-cards"></section>
    `;
    columnsContainer.appendChild(elemento);
  });
}

// Função para alterar o tema (claro/escuro)
function modificaTema() {
  const body = document.querySelector("body");
  body.classList.toggle('dark');

  if (body.classList.contains('dark')) {
    return 1;
  } else {
    return 2;
  }
}

// Função para recuperar e aplicar o tema
async function recuperaTema() {
  try {
    const response = await fetch(`${API_BASE_URL}/PersonConfigById?PersonId=${infoLS.id}`);
    if (!response.ok) throw new Error(`Erro ao carregar informações: ${response.status}`);
    const result = await response.json();
    if (result.DefaultThemeId === 1) modificaTema();
  } catch (error) {
    console.error("Erro ao recuperar tema:", error);
  }
}

// Função para salvar o tema no servidor
async function salvarNovoTema(id, novoTema) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "ThemeId": novoTema
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch(`${API_BASE_URL}/ConfigPersonTheme?PersonId=${id}`, requestOptions);
    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error("Erro ao salvar informações:", error);
  }
}

// Função para inicializar a página
window.onload = () => {
  boardsInfo();
  recuperaUserInfo();
  recuperaTema();
};
