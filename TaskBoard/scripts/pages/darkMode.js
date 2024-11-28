//modo escuro
let containerSwitch = document.getElementById('container-switch');
let body = document.querySelector('body');
let cabecalho = document.getElementById('cabecalho');
let containerBotoes = document.getElementById('container-botoes');

function clickTema() {
    containerSwitch.addEventListener('click', () => {
        containerSwitch.classList.toggle('dark');
        body.classList.toggle('dark');
        cabecalho.classList.toggle('dark');
        containerBotoes.classList.toggle('dark');
    });
}




// Inicialização
clickTema();