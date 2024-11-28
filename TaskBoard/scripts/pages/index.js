//import { API_BASE_URL } from "../../config/apiConfig.js";
//import { getFromLocalStorage, getToLocalStorage } from "../utils/storage.js";



//boas vindas ao usuario
  
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
  
  // Função para modificar o tema

  
 // Inicialização
 clickTema();
 