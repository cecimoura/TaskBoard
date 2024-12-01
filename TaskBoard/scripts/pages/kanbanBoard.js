// Seleciona os elementos principais
const columnsContainer = document.querySelector(".columns");
const addColumnButton = document.querySelector("#addColumnButton");
const addColumnInput = document.querySelector("#new-column-title");

let draggedCard;

// Função que inicia o processo de arrastar um cartão
const dragStart = (event) => {
  draggedCard = event.target.closest(".card-container");
  event.dataTransfer.effectAllowed = "move";
};

// Permite soltar o cartão ao arrastar sobre uma área válida
const dragOver = (event) => {
  event.preventDefault();
};

// Adiciona destaque ao arrastar sobre uma coluna
const dragEnter = ({ target }) => {
  if (target.classList.contains("column-cards")) {
    target.classList.add("column--highlight");
  }
};

// Remove o destaque ao sair da área da coluna
const dragLeave = ({ target }) => {
  target.classList.remove("column--highlight");
};

// Solta o cartão na nova coluna
const drop = ({ target }) => {
  if (target.classList.contains("column-cards")) {
    target.classList.remove("column--highlight");
    target.append(draggedCard);
  }
};

// Cria um novo cartão
const createCard = (columnCards) => {
  const textArea = document.createElement("textarea");
  textArea.className = "card";
  textArea.placeholder = "Digite algo...";
  textArea.spellcheck = "false";

  textArea.addEventListener("focusout", () => {
    const value = textArea.value.trim();
    if (value) {
      const cardContainer = document.createElement("div");
      cardContainer.className = "card-container";
      cardContainer.draggable = true;

      const cardText = document.createElement("textarea");
      cardText.className = "card";
      cardText.value = value;
      cardText.readOnly = true;

      const deleteIcon = document.createElement("i");
      deleteIcon.className = "delete-card-icon";
      deleteIcon.textContent = "🗑️";
      deleteIcon.title = "Excluir cartão";

      deleteIcon.onclick = () => cardContainer.remove();

      cardContainer.addEventListener("dragstart", dragStart);
      cardContainer.append(cardText, deleteIcon);
      columnCards.append(cardContainer);
    }
    textArea.remove();
  });

  const cardContainer = document.createElement("div");
  cardContainer.className = "card-container";
  cardContainer.append(textArea);
  columnCards.append(cardContainer);
  textArea.focus();
};

// Adiciona os eventos de arrastar e soltar em uma coluna
const addDragAndDropListeners = (columnCards) => {
  columnCards.addEventListener("dragover", dragOver);
  columnCards.addEventListener("dragenter", dragEnter);
  columnCards.addEventListener("dragleave", dragLeave);
  columnCards.addEventListener("drop", drop);
};

// Função para ativar o modo de exclusão de cartões
const ativarExclusaoCartoes = (coluna) => {
  const cards = coluna.querySelectorAll(".card-container");

  if (cards.length === 0) {
    alert("Não há cartões para excluir nesta coluna.");
    return;
  }

  cards.forEach((card) => {
    if (!card.querySelector(".delete-card-icon")) {
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "delete-card-icon";
      deleteIcon.textContent = "🗑️";
      deleteIcon.title = "Excluir cartão";

      deleteIcon.onclick = () => card.remove();

      card.appendChild(deleteIcon);
    }
  });
};

// Inicializa as colunas existentes no DOM
const initializeColumns = () => {
  const columns = document.querySelectorAll(".column");
  columns.forEach((column) => {
    const columnCards = column.querySelector(".column-cards");
    const addButton = column.querySelector(".add-tarefa");
    const deleteButton = column.querySelector(".delete-column");

    addDragAndDropListeners(columnCards);

    addButton.addEventListener("click", () => createCard(columnCards));
    deleteButton.addEventListener("click", () => ativarExclusaoCartoes(column));
  });
};

// Função para criar uma nova coluna
const createColumn = (title) => {
  const column = document.createElement("section");
  column.className = "column";

  const columnHeader = document.createElement("div");
  columnHeader.className = "column-header";

  const columnTitle = document.createElement("h2");
  columnTitle.className = "column-title";
  columnTitle.contentEditable = "true";
  columnTitle.textContent = title;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-column";
  deleteButton.textContent = "Excluir cartões";
  deleteButton.onclick = () => ativarExclusaoCartoes(column);

  columnHeader.append(columnTitle, deleteButton);

  const columnCards = document.createElement("section");
  columnCards.className = "column-cards";

  const addButton = document.createElement("button");
  addButton.className = "add-tarefa";
  addButton.textContent = "Nova tarefa";
  addButton.addEventListener("click", () => createCard(columnCards));

  column.append(columnHeader, addButton, columnCards);
  columnsContainer.appendChild(column);

  addDragAndDropListeners(columnCards);
};

// Evento para criar uma nova coluna
addColumnButton.addEventListener("click", () => {
  const columnTitle = addColumnInput.value.trim();
  if (columnTitle) {
    createColumn(columnTitle);
    addColumnInput.value = "";
  } else {
    alert("Por favor, insira um título para a nova coluna!");
  }
});

// Inicializa as colunas na página
initializeColumns();
