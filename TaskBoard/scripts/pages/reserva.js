// Adiciona um evento que será executado assim que o DOM for completamente carregado
document.addEventListener("DOMContentLoaded", async () => {
  // Obtém o elemento do dropdown no HTML
  const dropdownContent = document.getElementById("dropdown-content");

  try {
    // Faz uma requisição para a API que retorna uma lista de "boards" (quadros/painéis)
    const response = await fetch(
      "https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Boards"
    );

    // Verifica se a resposta da API foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`); // Lança um erro se a resposta não for válida
    }

    // Converte a resposta da API em um objeto JSON
    const data = await response.json();
    console.log(data); // Exibe os dados no console para depuração

    // Chama a função para preencher o dropdown com os dados recebidos
    populateColumns(data, dropdownContent);
  } catch (error) {
    // Captura e exibe qualquer erro ocorrido durante o carregamento dos boards
    console.error("Erro ao carregar as colunas:", error);
    // Exibe uma mensagem de erro no dropdown caso a API falhe
    dropdownContent.innerHTML = "<li>Erro ao carregar dados</li>";
  }
});

// Função que preenche o dropdown com os boards recebidos da API
function populateColumns(data, dropdownContent) {
  // Limpa o conteúdo existente no dropdown
  dropdownContent.innerHTML = "";

  // Itera sobre cada board recebido da API
  data.forEach((board) => {
    // Cria um item de lista (<li>) para o dropdown
    const listItem = document.createElement("li");

    // Cria um link (<a>) que será inserido no item de lista
    const link = document.createElement("a");
    link.className = "dropdown-item"; // Adiciona uma classe ao link para estilização
    link.innerHTML = board.Name; // Define o nome do board como texto do link

    // Obtém o ID do board atual
    const boardId = board.Id;

    // Chama a função para carregar as colunas relacionadas ao board
    carregarColunas(boardId);

    // Adiciona o link ao item de lista
    listItem.appendChild(link);

    // Adiciona o item de lista ao dropdown
    dropdownContent.appendChild(listItem);
  });
}

// Close the dropdown if the user clicks outside of it //arrumar
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Função que busca as colunas associadas a um board específico
async function carregarColunas(boardId) {
  try {
    // Faz uma requisição para a API que retorna as colunas de um board específico
    const response = await fetch(
      `https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/ColumnByBoardId?BoardId=${boardId}`
    );

    // Verifica se a resposta da API foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`); // Lança um erro se a resposta não for válida
    }

    // Converte a resposta da API em um objeto JSON
    const data = await response.json();
    console.log(data); // Exibe as colunas no console para depuração
  } catch (error) {
    // Captura e exibe qualquer erro ocorrido durante o carregamento das colunas
    console.error("Erro ao carregar as colunas:", error);
  }
}
