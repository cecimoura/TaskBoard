// Seleciona todos os elementos com a classe "column" (representando colunas no layout)
const columns = document.querySelectorAll(".column");

// Adiciona um evento que ocorre quando um elemento começa a ser arrastado
document.addEventListener("dragstart", (e) => {
    // Adiciona a classe "dragging" ao elemento que está sendo arrastado
    e.target.classList.add("dragging");
});

// Adiciona um evento que ocorre quando o arrasto de um elemento termina
document.addEventListener("dragend", (e) => {
    // Remove a classe "dragging" do elemento que foi arrastado
    e.target.classList.remove("dragging");
});

// Itera sobre cada coluna selecionada anteriormente
columns.forEach((item) => {
    // Adiciona um evento para quando algo é arrastado sobre a coluna
    item.addEventListener("dragover", (e) => {
        e.preventDefault(); // Impede o comportamento padrão do "dragover" (necessário para permitir o drop)
        
        // Seleciona o elemento atualmente sendo arrastado
        const dragging = document.querySelector(".dragging");
        
        // Obtém a nova posição para onde o item será inserido, com base na posição do cursor
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

    // Itera sobre cada cartão na coluna
    for (let refer_card of cards) {
        // Obtém as dimensões e a posição do cartão
        const box = refer_card.getBoundingClientRect();
        // Calcula a posição vertical central do cartão
        const boxCenterY = box.y + box.height / 2;

        // Se o cursor estiver abaixo do centro do cartão, este é o novo ponto de referência
        if (posY >= boxCenterY) result = refer_card;
    }

    // Retorna o cartão de referência ou null, se nenhum foi encontrado
    return result;
}
