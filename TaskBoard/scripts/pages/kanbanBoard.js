// Seleciona o container das colunas e os elementos para adicionar nova coluna
const containerColumns = document.querySelector(".columns");
const addColumnInput = document.querySelector("#new-column-title");
const addColumnBtn = document.querySelector("#addColumn");

// Seleciona as colunas e elementos associados
let column1 = document.getElementById("column1");
let column2 = document.getElementById("column2");
let column3 = document.getElementById("column3");
let column4 = document.getElementById("column4");
let todo = document.getElementById("todo"); // Coluna TODO
let doing = document.getElementById("doing"); // Coluna Doing
let review = document.getElementById("review"); // Coluna Review
let done = document.getElementById("done"); // Coluna Done

// Seleciona botões e elementos de tarefas e exclusão
let novatarefa1 = document.getElementById("novatarefa1");
let novatarefa2 = document.getElementById("novatarefa2");
let novatarefa3 = document.getElementById("novatarefa3");
let novatarefa4 = document.getElementById("novatarefa4");
let tituloColunaNova = document.getElementById("new-column-title");
let botaoColuna = document.getElementById("add-column-btn");
let botaoExcluir1 = document.getElementById("trash1");
let botaoExcluir2 = document.getElementById("trash2");
let botaoExcluir3 = document.getElementById("trash3");
let botaoExcluir4 = document.getElementById("trash4");
let dropdowncontent = document.getElementById("dropdown-content");

// Variável global para armazenar o cartão sendo arrastado
let draggedCard;

// Função que inicia o processo de arrastar um cartão
const dragStart = (event) => {
  draggedCard = event.target.closest(".card-container");
  event.dataTransfer.effectAllowed = "move"; // Define o tipo de ação permitida
};

// Permite que o item seja solto ao arrastar sobre uma área válida
const dragOver = (event) => {
  event.preventDefault(); // Evita o comportamento padrão
};

// Adiciona destaque ao arrastar um item sobre uma coluna válida
const dragEnter = ({ target }) => {
  if (target.classList.contains("column-cards")) {
    target.classList.add("column--highlight"); // Adiciona estilo de destaque
  }
};

// Remove o destaque ao sair da área da coluna
const dragLeave = ({ target }) => {
  target.classList.remove("column--highlight"); // Remove o estilo de destaque
};

// Solta o cartão na nova coluna
const drop = ({ target }) => {
  if (target.classList.contains("column-cards")) {
    target.classList.remove("column--highlight");
    target.append(draggedCard); // Move o cartão para a nova coluna
  }
};

// Cria um novo cartão em uma coluna
const createCard = (columnCards) => {
  const textArea = document.createElement("textarea");

  textArea.className = "card"; // Define a classe para o estilo do cartão
  textArea.placeholder = "Digite algo..."; // Placeholder do cartão
  textArea.spellcheck = "false"; // Desabilita a verificação ortográfica

  // Evento para quando o usuário sai do campo de texto
  textArea.addEventListener("focusout", () => {
    const value = textArea.value.trim();
    if (value) {
      // Cria o novo cartão com o texto digitado
      const newCard = document.createElement("textarea");
      const trashIcon = document.createElement("i");

      newCard.className = "card"; // Estilo do cartão
      newCard.draggable = false; // Desabilita arrastar o novo cartão
      newCard.value = value; // Adiciona o texto do usuário
      newCard.placeholder = "Digite algo...";
      newCard.addEventListener("focusout", () => {
        if (!newCard.value.trim()) newCard.remove(); // Remove cartão vazio
      });

      // Ícone de exclusão
      trashIcon.className = "trash1";
      trashIcon.title = "Excluir";
      trashIcon.addEventListener("click", () => {
        const cardContainer = trashIcon.parentElement;
        const resposta = confirm("Tem certeza de que deseja excluir este item?");
        if (resposta) {
          cardContainer.remove(); // Remove o cartão
        }
      });

      // Contêiner do cartão
      const cardContainer = document.createElement("div");
      cardContainer.className = "card-container"; // Define classe para estilo
      cardContainer.draggable = true; // Permite arrastar o cartão
      cardContainer.addEventListener("dragstart", dragStart); // Adiciona evento de arrastar
      cardContainer.append(newCard, trashIcon); // Adiciona o cartão e ícone ao contêiner

      columnCards.append(cardContainer); // Adiciona o cartão à coluna
    }
    textArea.remove(); // Remove o campo de texto inicial
  });

  // Contêiner para o campo de texto do novo cartão
  const cardContainer = document.createElement("div");
  cardContainer.className = "card-container";
  cardContainer.append(textArea);

  columnCards.append(cardContainer); // Adiciona o contêiner à coluna
  textArea.focus(); // Dá foco ao campo de texto
};

// Adiciona os eventos de arrastar e soltar a uma coluna
const addDragAndDropListeners = (columnCards) => {
  columnCards.addEventListener("dragover", dragOver);
  columnCards.addEventListener("dragenter", dragEnter);
  columnCards.addEventListener("dragleave", dragLeave);
  columnCards.addEventListener("drop", drop);
};

// Inicializa as colunas existentes no DOM
const initializeColumns = () => {
  const columns = document.querySelectorAll(".column"); // Seleciona todas as colunas
  columns.forEach((column) => {
    const excluirIcon = column.querySelector("i"); // Ícone de exclusão
    excluirIcon.addEventListener("click", excluirColuna); // Evento para excluir coluna
    const columnCards = column.querySelector(".column__cards"); // Área para cartões
    const addButton = column.querySelector(".add-card-btn"); // Botão para adicionar cartões

    addDragAndDropListeners(columnCards); // Adiciona eventos de arrastar e soltar
    addButton.addEventListener("click", () => createCard(columnCards)); // Evento para criar novo cartão
  });
};

// Função para criar uma nova coluna
const createColumn = (title) => {
  // Cria o elemento principal da coluna
  const column = document.createElement("section");
  column.className = "column";

  // Cria o título da coluna e torna-o editável
  const columnTitle = document.createElement("h2");
  columnTitle.className = "column-title";
  columnTitle.textContent = title; // Adiciona o título da coluna
  columnTitle.contentEditable = "true"; // Permite edição do título

  // Cria a área onde os cartões serão armazenados
  const columnCards = document.createElement("section");
  columnCards.className = "column-cards";

  // Botão para adicionar novas tarefas (cartões) na coluna
  const addButton = document.createElement("button");
  addButton.textContent = "Nova tarefa"; // Texto do botão
  addButton.className = "add-tarefa";
  addButton.addEventListener("click", () => createCard(columnCards)); // Evento para criar um novo cartão

  // Ícone de exclusão para a coluna
  const trashIcon = document.createElement("i");
  trashIcon.classList = "trash1"; // Classe para estilização
  trashIcon.alt = "excluir"; // Texto alternativo
  trashIcon.addEventListener("click", excluirColuna); // Evento para excluir a coluna

  // Container para o título e o botão de exclusão da coluna
  const excluirDiv = document.createElement("div");
  excluirDiv.className = "excluir";

  // Função para aplicar o tema claro ou escuro
  const applyTheme = () => {
    const isDarkMode = body.classList.contains("dark");
    const elementsToStyle = [
      column,
      columnTitle,
      columnCards,
      addButton,
      trashIcon,
      excluirDiv,
    ];

    // Adiciona ou remove a classe de tema escuro nos elementos
    if (isDarkMode) {
      elementsToStyle.forEach((element) => {
        element.classList.add("dark");
      });
    } else {
      elementsToStyle.forEach((element) => {
        element.classList.remove("dark");
      });
    }
  };

  // Aplica o tema inicial
  applyTheme();

  // Adiciona o título e o ícone de exclusão ao container
  excluirDiv.append(columnTitle, trashIcon);

  // Adiciona o título, botão e cartões à coluna
  column.append(excluirDiv, addButton, columnCards);

  // Adiciona a nova coluna ao container principal
  columnsContainer.append(column);

  // Adiciona os eventos de arrastar e soltar à nova coluna
  addDragAndDropListeners(columnCards);

  // Adiciona evento para aplicar o tema quando o tema é alternado
  trilho.addEventListener("click", applyTheme);
};

// Evento do botão para criar uma nova coluna
addColumnButton.addEventListener("click", () => {
  const columnTitle = addColumnInput.value.trim(); // Obtém o título inserido pelo usuário

  if (columnTitle) {
    createColumn(columnTitle); // Cria a nova coluna com o título fornecido
    addColumnInput.value = ""; // Limpa o campo de entrada
  } else {
    alert("Por favor, insira um título para a nova coluna!"); // Alerta caso o título esteja vazio
  }
});

// Função para excluir uma coluna
const excluirColuna = (event) => {
  const coluna = event.target.closest(".column"); // Encontra a coluna associada ao botão de exclusão
  const resposta = confirm("Tem certeza de que deseja excluir este item?"); // Confirmação do usuário
  if (resposta) {
    coluna.remove(); // Remove a coluna
  }
};

// Função para recuperar os dados do usuário armazenados no localStorage
function recuperarDados() {
  const userData = localStorage.getItem("user"); // Recupera os dados do usuário do localStorage

  if (userData) {
    const user = JSON.parse(userData); // Converte os dados de JSON para objeto
    console.log(user); // Log dos dados do usuário para depuração

    const userNameElement = document.getElementById("nomeFulana");

    // Extrai o primeiro nome do usuário
    const primeiroNome = user.nome.split(" ")[0];
    userNameElement.innerHTML = `Olá, ${primeiroNome}!`; // Exibe a saudação personalizada
  } else {
    userNameElement.innerHTML = "Bem-vindo!"; // Exibe saudação padrão caso não haja dados do usuário
  }
}

// Chama as funções para inicializar os dados do usuário e as colunas
recuperarDados();
initializeColumns();

