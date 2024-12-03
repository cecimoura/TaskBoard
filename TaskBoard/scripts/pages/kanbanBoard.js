const columnsContainer = document.querySelector(".columns");
const addColumnButton = document.querySelector("#addColumnButton");
let draggedCard;

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

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.className = "column-title-input";
    titleInput.value = title;
    titleInput.placeholder = "Sem nome";

    titleInput.addEventListener("blur", () => {
        titleInput.value = titleInput.value.trim();
        if (!titleInput.value) {
            titleInput.placeholder = "Sem nome";
        }
    });

    const columnHeader = document.createElement("div");
    columnHeader.className = "column-header";
    columnHeader.appendChild(titleInput);
    columnHeader.insertAdjacentHTML("beforeend", `<button class="delete-column">Excluir Board</button>`);
    column.appendChild(columnHeader);

    column.insertAdjacentHTML("beforeend", `
        <button class="add-tarefa">Nova tarefa</button>
        <section class="column-cards"></section>
    `);

    const columnCards = column.querySelector(".column-cards");
    const addCardButton = column.querySelector(".add-tarefa");
    const deleteColumnButton = column.querySelector(".delete-column");

    deleteColumnButton.removeEventListener("click", deleteColumnHandler);
    deleteColumnButton.addEventListener("click", deleteColumnHandler);

    addCardButton.addEventListener("click", () => createCard(columnCards));

    titleInput.value = title;
    titleInput.style.display = "none"; // Oculta o input inicialmente

    const titleSpan = document.createElement("span"); // Cria um span para exibir o título
    titleSpan.className = "column-title"; // Usa a classe original para o título
    titleSpan.textContent = title || "Sem nome"; // Exibe o título ou "Sem nome"
    titleSpan.addEventListener("click", () => { // Torna o título clicável
        titleInput.style.display = "block"; // Mostra o input
        titleSpan.style.display = "none"; // Oculta o span
        titleInput.focus(); // Foca no input
        titleInput.select();
    });

    titleInput.addEventListener("blur", () => {
        const newTitle = titleInput.value.trim();
        titleInput.value = newTitle;
        titleSpan.textContent = newTitle || "Sem nome";
        titleInput.style.display = "none"; // Oculta o input
        titleSpan.style.display = "inline-block"; // Mostra o span
    });

    columnHeader.insertBefore(titleSpan, columnHeader.firstChild); // Insere o span no header
    columnHeader.insertBefore(titleInput, titleSpan); // Insere o input antes do span

    addDragAndDropListeners(columnCards);
    columnsContainer.appendChild(column);
}

// Função para excluir a coluna
function deleteColumnHandler(event) {
    if (confirm("Tem certeza de que deseja excluir esta coluna?")) {
        const column = event.target.closest('.column'); // Encontra a coluna a partir do botão clicado
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
            editIcon.title = "Editar cartão";
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
            deleteIcon.title = "Excluir cartão";
            deleteIcon.onclick = () => cardContainer.remove();

            cardContainer.addEventListener("dragstart", dragStart);
            cardContainer.append(cardText, editIcon, deleteIcon);
            columnCards.append(cardContainer);
        }
        textArea.remove();
    });

    const cardContainer = document.createElement("div");
    cardContainer.className = "card-container";
    cardContainer.append(textArea);
    columnCards.append(cardContainer);
    textArea.focus();
}

// Funções de arrastar e soltar
function dragStart(event) {
    draggedCard = event.target.closest(".card-container");
    event.dataTransfer.effectAllowed = "move";
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    const target = event.target;
    if (target.classList.contains("column-cards")) {
        target.classList.add("column--highlight");
    }
}

function dragLeave(event) {
    event.target.classList.remove("column--highlight");
}

function drop(event) {
    const target = event.target;
    if (target.classList.contains("column-cards") && draggedCard && draggedCard.parentNode !== target) {
        target.classList.remove("column--highlight");
        target.appendChild(draggedCard);
        draggedCard = null;
    }
}

function addDragAndDropListeners(columnCards) {
    columnCards.addEventListener("dragover", dragOver);
    columnCards.addEventListener("dragenter", dragEnter);
    columnCards.addEventListener("dragleave", dragLeave);
    columnCards.addEventListener("drop", drop);
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

        deleteButton.removeEventListener("click", deleteColumnHandler);
        deleteButton.addEventListener("click", deleteColumnHandler);
    });
}

// Remove colunas existentes e cria as iniciais
const existingColumns = document.querySelectorAll('.column');
existingColumns.forEach(column => column.remove());

createColumn("To Do");
createColumn("Doing");
createColumn("Done");

initializeColumns();
