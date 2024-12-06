// Suponhamos que você tenha o boardId armazenado de alguma forma, como em uma variável global ou já definida
let currentBoardId = null; // O boardId que será utilizado para associar a coluna ao board correto

const API_ENDPOINT = "https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Column";

// Obtendo elementos
const modal = document.getElementById("myModal");
const addColumnButton = document.getElementById("addColumnButton");
const closeButton = document.getElementById("closeButton");
const createColumnForm = document.getElementById("createColumnForm");
const columnNameInput = document.getElementById("columnName");

// Função para abrir o modal
addColumnButton.addEventListener("click", () => {
    modal.style.display = "block";
});

// Função para fechar o modal
closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fechar o modal quando clicar fora da área de conteúdo
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Função para adicionar a coluna (lógica do formulário)
createColumnForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const columnName = columnNameInput.value.trim();

    if (columnName && currentBoardId) {
        try {
            // Criação da coluna, associando-a ao board pelo boardId
            const response = await fetch(`${API_ENDPOINT}?BoardId=${currentBoardId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Name: columnName,
                    BoardId: currentBoardId, // Passando o boardId
                }),
            });

            if (!response.ok) {
                throw new Error(`Erro ao criar a coluna: ${response.statusText}`);
            }

            console.log(`Coluna "${columnName}" criada com sucesso!`);
            // Aqui você pode adicionar a lógica para atualizar a interface, como adicionar a nova coluna na página.

            // Fechar o modal após a submissão
            modal.style.display = "none";

        } catch (error) {
            console.error("Erro ao criar coluna:", error);
        }
    } else {
        console.error("O nome da coluna não pode estar vazio ou o boardId não está definido!");
    }
});
