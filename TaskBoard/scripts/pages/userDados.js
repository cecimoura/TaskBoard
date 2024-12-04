function recuperarDados() {
    const userData = localStorage.getItem("user");
  
    if (userData) {
      const user = JSON.parse(userData);
      console.log(user);
  
      const userNameElement = document.getElementById("nomeUser");
  
      const primeiroNome = user.nome.split(" ")[0];
      userNameElement.innerHTML = `Olá, ${primeiroNome}!`;
    } else {
      userNameElement.innerHTML = "Bem vindo!";
    }
  }
  
  recuperarDados();