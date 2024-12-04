const columnsContainer = document.querySelector(".columns");
const addColumnButton = document.querySelector("#addColumnButton");
let draggedCard = null;
let originColumn = null; // Variável para armazenar a coluna original

// Função para verificar se o tema está no modo escuro
function isDarkModeEnabled() {
    return document.body.classList.contains("dark");
}

// Função para iniciar o arrasto
const dragStart = (event) => {
    draggedCard = event.target.closest(".card-container"); // Certifica que o contêiner do card está sendo arrastado
    originColumn = draggedCard.parentNode; // Armazena a coluna original
    event.dataTransfer.effectAllowed = "move"; 

    // Clone o cartão para arrastá-lo sem esconder o original
    const cardClone = draggedCard.cloneNode(true);
    cardClone.style.opacity = "0.5"; // Torna o clone parcialmente transparente
    event.dataTransfer.setDragImage(cardClone, 0, 0); // Define o clone como imagem de arrasto

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
        targetColumnCards.insertBefore(draggedCard, null);

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
        <section class="column-cards" ondrop="drop(event)" ondragover="dragOver(event)"></section>
    `);

    const columnCards = column.querySelector(".column-cards");
    const addCardButton = column.querySelector(".add-tarefa");
    const deleteColumnButton = column.querySelector(".delete-column");

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
