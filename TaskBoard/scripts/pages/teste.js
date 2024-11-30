//import {API_BASE_URL} from "../../config/infoAPI.js"
import {resgatarLocalStorage} from "../localStorage/saveLocalSt.js";

// Função para carregar temas baseados no ID do usuário
async function carregarTemas() {
  const user = JSON.parse(localStorage.getItem("user"));
  const personId = user.id;
  console.log(personId);

  try {
    const response = await fetch(
      `https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/PersonConfigById?PersonId=${personId}`
    );

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    applyTheme(data);
  } catch (error) {
    console.error("Erro ao carregar o tema:", error);
  }
}


// Função para carregar dados no dropdown
/*
async function carregarDropdown() {
  const dropdownContent = document.getElementById("dropdown-content");
  const columnsSection = document.querySelector(".columns");

  try {
    const response = await fetch(
      "https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Boards"
    );

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    populateDropdown(data, dropdownContent, columnsSection);
  } catch (error) {
    console.error("Erro ao carregar os boards:", error);
    dropdownContent.innerHTML = "<li>Erro ao carregar dados</li>";
  }
}
*/

// Função para carregar colunas de um board específico
/*
async function carregarColunas(boardId, columnsSection) {
  try {
    const response = await fetch(
      `https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/ColumnByBoardId?BoardId=${boardId}`
    );

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    const columnsData = await response.json();
    console.log(columnsData);
    const main = document.querySelector("main");
    main.classList.remove("hidden");
    columnsSection.innerHTML = "";

    for (const column of columnsData) {
      const columnSection = document.createElement("section");
      columnSection.className = "column dark";

      const excluirDiv = document.createElement("div");
      excluirDiv.className = "excluir";

      const columnTitle = document.createElement("h2");
      columnTitle.className = "column__title";
      columnTitle.classList.add("dark");
      columnTitle.contentEditable = "true";
      columnTitle.textContent = column.Name;

      const excluirIcon = document.createElement("i");
      excluirIcon.className = "bi bi-trash3-fill";
      excluirIcon.classList.add("dark");
      excluirIcon.addEventListener("click", excluirColuna);
      addDragAndDropListeners(columnSection);

      excluirDiv.appendChild(columnTitle);
      excluirDiv.appendChild(excluirIcon);

      const addCardButton = document.createElement("button");
      addCardButton.className = "add-card-btn";
      addCardButton.textContent = "Nova tarefa";

      const columnCards = document.createElement("section");
      columnCards.className = "column__cards";
      columnCards.id = `tasks-${column.Id}`;

      const isDarkMode = document.body.classList.contains("dark");

      if (isDarkMode) {
        columnSection.classList.add("dark");
        columnTitle.classList.add("dark");
        excluirIcon.classList.add("dark");
        addCardButton.classList.add("dark");
        columnCards.classList.add("dark");
      } else {
        columnSection.classList.remove("dark");
        columnTitle.classList.remove("dark");
        excluirIcon.classList.remove("dark");
        addCardButton.classList.remove("dark");
        columnCards.classList.remove("dark");
      }

      addCardButton.addEventListener("click", () => createCard(columnCards));

      columnSection.appendChild(excluirDiv);
      columnSection.appendChild(addCardButton);
      columnSection.appendChild(columnCards);

      columnsSection.appendChild(columnSection);

      await carregarTasks(column.Id, columnCards);
    }
  } catch (error) {
    console.error("Erro ao carregar as colunas:", error);
    columnsSection.innerHTML = "<p>Erro ao carregar as colunas</p>";
  }
}
*/
