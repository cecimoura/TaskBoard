import { API_BASE_URL } from "../../config/apiConfig.js";

// Função para carregar os quadros da API e preencher o dropdown
async function carregarQuadros() {
  try {
    // Fazendo a requisição à API para obter os quadros
    const response = await fetch(`${API_BASE_URL}/GetBoards`); // Endpoint para buscar os quadros
    if (!response.ok) {
      throw new Error('Falha ao carregar os quadros');
    }

    const data = await response.json();
    const dropdownContent = document.getElementById("dropdown-content");

    // Limpa as opções anteriores no dropdown
    dropdownContent.innerHTML = "";

    // Adiciona cada quadro como uma opção no dropdown
    data.forEach(board => {
      const option = document.createElement("li"); // Cria o item de lista
      const link = document.createElement("a"); // Cria o link
      link.classList.add("dropdown-item");
      link.textContent = board.Name; // Nome do quadro
      link.href = "#"; // Link de navegação (não faz nada, apenas serve como click handler)
      link.onclick = () => selecionarQuadro(board.Id, board.Name); // Ao clicar, seleciona o quadro
      option.appendChild(link); // Adiciona o link ao item de lista
      dropdownContent.appendChild(option); // Adiciona o item de lista ao dropdown
    });

    // Carrega o quadro selecionado previamente, se houver
    carregarQuadroSelecionado();

  } catch (error) {
    console.error("Erro ao carregar quadros:", error);
  }
}

// Função para salvar o quadro selecionado no localStorage
function selecionarQuadro(quadroId, quadroName) {
  // Salva o ID e o nome do quadro selecionado
  localStorage.setItem("quadroSelecionadoId", quadroId);
  localStorage.setItem("quadroSelecionadoName", quadroName);

  // Atualiza o botão do dropdown com o nome do quadro selecionado
  const dropbtn = document.getElementById("dropbtn");
  dropbtn.textContent = `Quadro: ${quadroName}`; // Exibe o nome do quadro selecionado
}

// Função para carregar o quadro selecionado do localStorage
function carregarQuadroSelecionado() {
  const quadroId = localStorage.getItem("quadroSelecionadoId");
  const quadroName = localStorage.getItem("quadroSelecionadoName");

  // Se houver um quadro selecionado no localStorage, atualiza o botão do dropdown
  if (quadroId && quadroName) {
    const dropbtn = document.getElementById("dropbtn");
    dropbtn.textContent = `Quadro: ${quadroName}`;
  } else {
    // Se nenhum quadro estiver selecionado, exibe a mensagem padrão
    const dropbtn = document.getElementById("dropbtn");
    dropbtn.textContent = "Selecione um Quadro";
  }
}

// Chama a função de carregar os quadros quando a página for carregada
document.addEventListener("DOMContentLoaded", carregarQuadros);
