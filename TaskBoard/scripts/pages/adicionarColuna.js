//import { API_BASE_URL } from "./config/apiConfig"; // Use um caminho relativo, se necessário.  Ajustar conforme sua estrutura de pastas.
const API_ENDPOINT = "https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Column";


// Verifica se os elementos existem antes de adicionar o listener
const createColumnForm = document.getElementById('createColumnForm');
const responseMessage = document.getElementById('responseMessage');

if (createColumnForm && responseMessage) {
    createColumnForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addColumn();
    });
} else {
    console.error("Elemento 'createColumnForm' ou 'responseMessage' não encontrado no DOM.");
}


function showResponseMessage(message, isSuccess) {
    responseMessage.textContent = message;
    responseMessage.classList.toggle('success', isSuccess);
    responseMessage.classList.toggle('error', !isSuccess);
}


function addColumn() {
    const name = document.getElementById('name').value;
    const columnData = { Name: name };
    createColumn(columnData);
}


async function createColumn(columnData) {
    console.log('Enviando dados para a API:', columnData);

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(columnData),
        });

        console.log('Resposta da API:', response);

        if (!response.ok) {
            const errorData = await response.json();
            // Tenta extrair uma mensagem de erro mais específica
            const errorMessage = errorData.Errors && errorData.Errors.length > 0 ? errorData.Errors.join(', ') :  errorData.Message || 'Erro na requisição à API.';
            throw new Error(errorMessage); // Lança um erro com a mensagem específica
        }

        const data = await response.json();
        console.log('Coluna criada com sucesso:', data);
        showResponseMessage('Coluna criada com sucesso!', true);

    } catch (error) {  // Captura o erro lançado acima
        console.error('Erro ao criar coluna:', error);
        showResponseMessage(error.message, false); // Exibe a mensagem de erro específica
    }
}


