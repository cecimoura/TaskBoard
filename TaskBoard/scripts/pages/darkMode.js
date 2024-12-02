let containerSwitch = document.getElementById('container-switch');
let userData = JSON.parse(localStorage.getItem('user')); // Recupera as informações do usuário do localStorage

// Função para recuperar o tema do servidor
async function recuperaTema(userId) {
  try {
    const response = await fetch(`https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/PersonConfigById?PersonId=${userId}`);
    if (!response.ok) throw new Error(`Erro ao carregar informações: ${response.status}`);

    const result = await response.json();
    console.log("Tema recuperado:", result);

    // Aplica o tema na interface com base no DefaultThemeId
    if (result.DefaultThemeId === 1) {
      document.body.classList.add('dark');  // Aplica o tema escuro
    } else {
      document.body.classList.remove('dark');  // Aplica o tema claro
    }
  } catch (error) {
    console.error("Erro ao recuperar tema:", error);
  }
}

// Função para salvar o tema no servidor
async function salvarNovoTema(userId, novoTemaId) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "ThemeId": novoTemaId
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch(`https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/ConfigPersonTheme?PersonId=${userId}`, requestOptions);
    if (!response.ok) throw new Error(`Erro ao salvar tema: ${response.status}`);

    const result = await response.json();
    console.log("Tema salvo no servidor:", result);

    // Após salvar no servidor, também atualizar no localStorage se necessário
    localStorage.setItem('theme', novoTemaId);
  } catch (error) {
    console.error("Erro ao salvar tema no servidor:", error);
  }
}

// Função para alternar o tema e salvar a alteração
async function clickTema() {
  containerSwitch.addEventListener('click', async () => {
    // Alterna a classe de tema no body
    document.body.classList.toggle('dark');

    // Define o novo tema baseado na classe
    const novoTemaId = document.body.classList.contains('dark') ? 1 : 2;

    // Salva o novo tema no servidor
    await salvarNovoTema(userData.id, novoTemaId);
  });

  // Recupera e aplica o tema inicial ao carregar a página
  await recuperaTema(userData.id);
}

// Inicialização
clickTema();
