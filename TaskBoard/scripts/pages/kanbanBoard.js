

const columnsContainer = document.querySelector(".columns");
const addColumnButton = document.querySelector("#addColumnButton");


// Função para verificar se o tema está no modo escuro
function isDarkModeEnabled() {
    return document.body.classList.contains("dark");
}



// Função para criar uma nova coluna
function createColumn(title = "") {
    const column = document.createElement("section");
    column.classList.add("column");

    // Aplica o tema atual à nova coluna
    if (isDarkModeEnabled()) {
        column.classList.add("dark");
    }

    const columnHeader = document.createElement("div");
    columnHeader.className = "column-header";

    // Criação do input e do span para o título
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.className = "column-title-input";
    titleInput.value = title;
    titleInput.placeholder = "Sem nome";
    titleInput.style.display = "none"; // Inicialmente oculto

    const titleSpan = document.createElement("span");
    titleSpan.className = "column-title";
    titleSpan.textContent = title || "Sem nome";

    // Torna o título editável ao clicar
    titleSpan.addEventListener("click", () => {
        titleSpan.style.display = "none"; // Oculta o span
        titleInput.style.display = "block"; // Mostra o input
        titleInput.focus();
    });

    // Atualiza o título e alterna para o modo visual ao sair do input
    titleInput.addEventListener("blur", () => {
        const newTitle = titleInput.value.trim();
        titleSpan.textContent = newTitle || "Sem nome"; // Usa "Sem nome" se estiver vazio
        titleInput.style.display = "none"; // Oculta o input
        titleSpan.style.display = "inline-block"; // Mostra o span
    });

    // Botão para excluir a coluna
    const deleteColumnButton = document.createElement("button");
    deleteColumnButton.className = "delete-column";
    deleteColumnButton.textContent = "Excluir Board";
    deleteColumnButton.addEventListener("click", deleteColumnHandler);

    // Botão para adicionar tarefa
    const addCardButton = document.createElement("button");
    addCardButton.className = "add-tarefa";
    addCardButton.textContent = "Nova tarefa";

    // Container para os cartões
    const columnCards = document.createElement("section");
    columnCards.className = "column-cards";

    // Eventos de drag and drop
    addDragAndDropListeners(columnCards);
    addCardButton.addEventListener("click", () => createCard(columnCards));

    // Monta o cabeçalho e a coluna
    columnHeader.append(titleSpan, titleInput, deleteColumnButton);
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

async function loadColumnsForBoard(boardId) {
    try {
        console.log(`Carregando colunas para o board com ID: ${boardId}`);

        // Fazer a requisição à API para buscar colunas do board
        const response = await fetch(
            `https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/ColumnByBoardId?BoardId=${boardId}`
        );

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
        }

        const columnsData = await response.json();
        console.log("Dados das colunas recebidos:", columnsData);

        // Limpar colunas existentes
        columnsContainer.innerHTML = "";

        // Criar colunas para o board selecionado
        for (const column of columnsData) {
            createColumn(column.Name); // Criar a coluna com base no nome

            const columnCards = columnsContainer.lastElementChild.querySelector(".column-cards");

            // Chamar a função para carregar as tarefas da coluna, se a API permitir
            await loadTasksForColumn(column.Id, columnCards);
        }

        currentBoardId = boardId; // Atualizar o ID do board atual
        console.log(`Colunas carregadas para o board ${boardId}`);
    } catch (error) {
        console.error("Erro ao carregar as colunas:", error);
        columnsContainer.innerHTML = "<p>Erro ao carregar as colunas.</p>";
    }
}

// Função para carregar tarefas de uma coluna específica
async function loadTasksForColumn(columnId, columnCards) {
    try {
        const response = await fetch(
            `https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/TasksByColumnId?ColumnId=${columnId}`
        );

        if (!response.ok) {
            throw new Error(`Erro ao carregar tarefas: ${response.status} - ${response.statusText}`);
        }

        const tasksData = await response.json();
        console.log(`Tarefas da coluna ${columnId}:`, tasksData);

        // Criar tarefas na coluna
        tasksData.forEach(task => {
            const cardContainer = document.createElement("div");
            cardContainer.className = "card-container";
            cardContainer.draggable = true;

            const cardText = document.createElement("p");
            cardText.className = "card-text";
            cardText.textContent = task.Title || "Sem título";

            cardContainer.appendChild(cardText);
            cardContainer.addEventListener("dragstart", dragStart);
            cardContainer.addEventListener("dragend", dragEnd);

            columnCards.appendChild(cardContainer);
        });
    } catch (error) {
        console.error(`Erro ao carregar tarefas da coluna ${columnId}:`, error);
    }
}


initializeColumns();
