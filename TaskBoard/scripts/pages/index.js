
//função que ao clicar aparece as opçoes do dropdown
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // função pra fechar o dropdown se clicar fora
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


//modo escuro
let containerSwitch = document.getElementById('container-switch');
let body = document.querySelector('body');
let cabecalho = document.getElementById('cabecalho');
let containerBotoes = document.getElementById('container-botoes');


containerSwitch.addEventListener('click',()=>{
    containerSwitch.classList.toggle('dark')
    body.classList.toggle('dark')
    cabecalho.classList.toggle('dark')
    containerBotoes.classList.toggle('dark')
    logo.classList.toggle('dark')
})

//colunas kanban

const columns = document.querySelectorAll(".column"); // Seleciona todos os elementos com a classe "column" 

document.addEventListener("dragstart", (e) => { // Add um evento quando um elemento é arrastado
    e.target.classList.add("dragging");  // Add a classe "dragging" ao elemento que está sendo arrastado
});

document.addEventListener("dragend", (e) => { //Add um evento que ocorre termina de arrastar um elemento 
    e.target.classList.remove("dragging"); 
});

columns.forEach((item) => {
    item.addEventListener("dragover", (e) => { // Adiciona um evento para quando algo é arrastado sobre a coluna
        e.preventDefault(); // Impede o comportamento padrão do "dragover" (necessário para permitir o drop)
        
        // Seleciona o elemento que está sendo arrastado
        const dragging = document.querySelector(".dragging");
        
        // leva o item para onde será inserido, com base na posição do cursor
        const applyAfter = getNewPosition(item, e.clientY);

        if (applyAfter) {
            // Se houver um elemento de referência, insere o item arrastado depois dele
            applyAfter.insertAdjacentElement("afterend", dragging);
        } else {
            // Se não houver referência, insere o item arrastado no início da coluna
            item.prepend(dragging);
        }
    });
});

// Função que determina a nova posição de um item dentro de uma coluna
function getNewPosition(column, posY) {
    // Seleciona todos os itens na coluna, exceto aquele que está sendo arrastado
    const cards = column.querySelectorAll(".item:not(.dragging)");
    let result = null; // Inicializa a variável result como null para representar nenhuma posição encontrada

    // cada cartão na coluna
    for (let refer_card of cards) {
        const box = refer_card.getBoundingClientRect(); // Obtém as dimensões e a posição do cartão
        
        const boxCenterY = box.y + box.height / 2; // Calcula a posição vertical central do cartão 

        // Se o cursor estiver abaixo do centro do cartão, este é o novo ponto de referência
        if (posY >= boxCenterY) result = refer_card;
    }

    // Retorna o cartão de referência ou null, se nenhum foi encontrado
    return result;
}

document.getElementById('addColumn').addEventListener('click', function () {
  const columnsContainer = document.getElementById('columnsContainer');

  // Criar nova coluna
  const newColumn = document.createElement('div');
  newColumn.classList.add('column');

  // Adicionar um título padrão ou outros elementos, se necessário
  const placeholderCard = document.createElement('div');
  placeholderCard.classList.add('item');
  placeholderCard.textContent = 'Novo Card';

  // Adicionar o card à coluna
  newColumn.appendChild(placeholderCard);

  // Adicionar a coluna ao container
  columnsContainer.appendChild(newColumn);
});
