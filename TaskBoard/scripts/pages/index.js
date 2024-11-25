
//função que ao clicar aparece as opçoes
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