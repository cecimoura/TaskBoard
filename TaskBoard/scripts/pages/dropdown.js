document.addEventListener("DOMContentLoaded", async () => {
  const dropdownContent = document.getElementById("dropdown-content");
  const dropbtn = document.getElementById("dropbtn");

  try {
      const response = await fetch(
          "https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Boards"
      );

      if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      populateColumns(data, dropdownContent);
  } catch (error) {
      console.error("Erro ao carregar os boards:", error);
      dropdownContent.innerHTML = "<li>Erro ao carregar dados</li>";
  }

  dropbtn.addEventListener("click", () => {
      dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (event) => {
      if (!dropbtn.contains(event.target) && !dropdownContent.contains(event.target)) {
          dropdownContent.style.display = "none";
      }
  });
});

function populateColumns(data, dropdownContent) {
  dropdownContent.innerHTML = "";

  data.forEach((board) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.className = "dropdown-item";
      link.innerHTML = board.Name;


      // Adiciona o evento para carregar as colunas do board selecionado
      link.addEventListener("click", () => {
          loadColumnsForBoard(board.Id); // Chama a função no arquivo boardKanban.js
          dropdownContent.style.display = "none"; // Fecha o dropdown
      });

      listItem.appendChild(link);
      dropdownContent.appendChild(listItem);
  });
}