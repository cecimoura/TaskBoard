//import { API_BASE_URL } from "./config/apiConfig"; // Use um caminho relativo, se necessário.  Ajustar conforme sua estrutura de pastas.
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
createColumnForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const columnName = columnNameInput.value.trim();

    if (columnName) {
        console.log(`Coluna "${columnName}" criada com sucesso!`);
        // Aqui você pode adicionar a lógica para salvar ou mostrar a coluna criada

        // Fechar o modal após a submissão
        modal.style.display = "none";
    } else {
        alert("O nome da coluna não pode estar vazio!");
    }
});


