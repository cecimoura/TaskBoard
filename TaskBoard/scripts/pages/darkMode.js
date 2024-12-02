import { API_BASE_URL } from "../../config/apiConfig.js";
import { saveToLocalStorage } from "../utils/storage.js";


//modo escuro
let containerSwitch = document.getElementById('container-switch');
let body = document.querySelector('body');
let cabecalho = document.getElementById('cabecalho');
let containerBotoes = document.getElementById('container-botoes');

async function clickTema() {
    containerSwitch.addEventListener('click', () => {
        containerSwitch.classList.toggle('dark');
        body.classList.toggle('dark');
        cabecalho.classList.toggle('dark');
        containerBotoes.classList.toggle('dark');
    });
    try {
        const response = await fetch(`${API_BASE_URL}/PersonConfigById?PersonId=${infoLS.id}`);
        if (!response.ok) throw new Error(`Erro ao carregar informações: ${response.status}`);
        const result = await response.json();
        if (result.DefaultThemeId === 1) modificaTema();
      } catch (error) {
        console.error("Erro ao recuperar tema:", error);
      }
    }


// Inicialização
clickTema();