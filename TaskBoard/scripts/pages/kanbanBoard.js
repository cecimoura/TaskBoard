const columnsContainer = document.querySelector(".columns");
const addColumnButton = document.querySelector("#addColumnButton");
let draggedCard = null;
let originColumn = null; // Variável para armazenar a coluna original
let currentBoardId = null; // Variável para armazenar o ID do board atual

// Função para verificar se o tema está no modo escuro
function isDarkModeEnabled() {
    return document.body.classList.contains("dark");
}

// Função para iniciar o arrasto
const dragStart = (event) => {
    draggedCard = event.target.closest(".card-container"); // Certifica que o contêiner do card está sendo arrastado
    originColumn = draggedCard.parentNode; // Armazena a coluna original
    event.dataTransfer.effectAllowed = "move";

    // Reduz a opacidade do cartão original
    setTimeout(() => {
        draggedCard.style.opacity = "0.5"; // Faz o cartão original ficar transparente
    }, 0);
};

// Função para permitir o arrasto
const dragOver = (event) => {
    event.preventDefault(); // Permite o drop
};

// Função para processar o drop do card
const drop = (event) => {
    event.preventDefault();

    const targetColumnCards = event.target.closest(".column-cards");

    if (targetColumnCards && draggedCard && targetColumnCards !== originColumn) {
        // Restaura a opacidade do cartão original ANTES de movê-lo
        draggedCard.style.opacity = "1";

        // Insere o cartão no final da coluna de destino
        targetColumnCards.appendChild(draggedCard);

        draggedCard = null;
        originColumn = null; // Limpa a coluna de origem
    } else if (targetColumnCards && draggedCard && targetColumnCards === originColumn) {
        // Restaura a opacidade se o cartão for solto na coluna original
        draggedCard.style.opacity = "1";
        draggedCard = null;
        originColumn = null;
    }
};

// Função para restaurar a opacidade após o arrasto
const dragEnd = () => {
    if (draggedCard) {
        draggedCard.style.opacity = "1";
        draggedCard = null;
        originColumn = null; // Limpa a coluna de origem se o arrasto for cancelado
    }
};

// Adicionando os eventos aos cards
const addDragAndDropListeners = (columnCards) => {
    columnCards.addEventListener("dragover", dragOver);  // Adiciona o evento de "dragover"
    columnCards.addEventListener("drop", drop); // Adiciona o evento de "drop"
};

// Função para criar uma nova coluna
function createColumn(title = "") {
    const column = document.createElement("section");
    column.classList.add("column");

    // Aplica o tema atual à nova coluna
    if (isDarkModeEnabled()) {
        column.classList.add("dark");
    }

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.className = "column-title-input";
    titleInput.value = title;
    titleInput.placeholder = "Sem nome";

    const columnHeader = document.createElement("div");
    columnHeader.className = "column-header";

    const titleSpan = document.createElement("span");
    titleSpan.className = "column-title";
    titleSpan.textContent = title || "Sem nome";
    titleSpan.addEventListener("click", () => {
        titleInput.style.display = "block";
        titleSpan.style.display = "none";
        titleInput.focus();
    });

    titleInput.addEventListener("blur", () => {
        const newTitle = titleInput.value.trim();
        titleSpan.textContent = newTitle || "Sem nome";
        titleInput.style.display = "none";
        titleSpan.style.display = "inline-block";
    });

    columnHeader.append(titleSpan, titleInput);

    const deleteColumnButton = document.createElement("button");
    deleteColumnButton.className = "delete-column";
    deleteColumnButton.textContent = "Excluir Board";
    deleteColumnButton.addEventListener("click", deleteColumnHandler);

    const addCardButton = document.createElement("button");
    addCardButton.className = "add-tarefa";
    addCardButton.textContent = "Nova tarefa";

    const columnCards = document.createElement("section");
    columnCards.className = "column-cards";

    addDragAndDropListeners(columnCards);
    addCardButton.addEventListener("click", () => createCard(columnCards));

    columnHeader.appendChild(deleteColumnButton);
    column.append(columnHeader, addCardButton, columnCards);
    columnsContainer.appendChild(column);
}

// Função para excluir a coluna
function deleteColumnHandler(event) {
    if (confirm("Tem certeza de que deseja excluir esta coluna?")) {
        const column = event.target.closest('.column');
        column.remove();
    }
}

// Função para criar um novo cartão
function createCard(columnCards) {
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

            const cardText = document.createElement("p");
            cardText.className = "card-text";
            cardText.textContent = value;

            const editIcon = document.createElement("i");
            editIcon.className = "edit-card-icon";
            editIcon.textContent = "✏️";
            editIcon.addEventListener("click", () => {
                cardText.contentEditable = true;
                cardText.focus();
                cardText.addEventListener("blur", () => {
                    cardText.contentEditable = false;
                });
            });

            const deleteIcon = document.createElement("i");
            deleteIcon.className = "delete-card-icon";
            deleteIcon.textContent = "🗑️";
            deleteIcon.addEventListener("click", () => cardContainer.remove());

            cardContainer.append(cardText, editIcon, deleteIcon);
            cardContainer.addEventListener("dragstart", dragStart);
            cardContainer.addEventListener("dragend", dragEnd);
            columnCards.appendChild(cardContainer);
        }
        textArea.parentElement.remove(); // Remove o contêiner do textarea se vazio
    });

    const cardContainer = document.createElement("div");
    cardContainer.className = "card-container";
    cardContainer.appendChild(textArea);
    columnCards.appendChild(cardContainer);
    textArea.focus();
}

// Função para carregar as colunas de um board específico
async function loadColumnsForBoard(boardId) {
    try {
        const response = await fetch(
            `https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/ColumnByBoardId?BoardId=${boardId}`
        );

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const columnsData = await response.json();

        columnsContainer.innerHTML = ""; // Limpa colunas existentes
        columnsData.forEach(column => {
            createColumn(column.Name);
            const columnCards = columnsContainer.lastElementChild.querySelector(".column-cards");
            // Chamar a função loadCardsForColumn aqui, se implementada
        });

        currentBoardId = boardId;

    } catch (error) {
        console.error("Erro ao carregar as colunas:", error);
        columnsContainer.innerHTML = "<p>Erro ao carregar as colunas.</p>";
    }
}

// Função para lidar com o clique do botão "Adicionar Coluna"
function handleAddColumnClick() {
    createColumn();
}

// Event listener para o botão "Adicionar Coluna"
addColumnButton.addEventListener("click", handleAddColumnClick);

// Inicialização das colunas
function initializeColumns() {
    const columns = document.querySelectorAll(".column");
    columns.forEach((column) => {
        const columnCards = column.querySelector(".column-cards");
        const addCardButton = column.querySelector(".add-tarefa");
        const deleteButton = column.querySelector(".delete-column");

        addDragAndDropListeners(columnCards);
        addCardButton.addEventListener("click", () => createCard(columnCards));
        deleteButton.addEventListener("click", deleteColumnHandler);
    });
}

// Criar colunas iniciais
createColumn("To Do");
createColumn("Doing");
createColumn("Done");

initializeColumns();
