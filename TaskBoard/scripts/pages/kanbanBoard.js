
// Carrega os boards e tarefas da API
document.addEventListener('DOMContentLoaded', async () => {
    const addColumnButton = document.getElementById('addColumn');
    const columnsContainer = document.getElementById('columnsContainer');
    
    // Carrega os boards da API
    async function loadBoards() {
      try {
        const response = await fetch('https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Boards');
        if (!response.ok) {
          throw new Error('Erro ao carregar os boards');
        }
  
        const boards = await response.json();
        boards.forEach(board => {
          createColumn(board);
        });
      } catch (error) {
        console.error('Erro ao carregar os boards:', error);
      }
    }
  
    // Função para criar a coluna na UI
    async function createColumn(board) {
      const newColumn = document.createElement('div');
      newColumn.classList.add('column');
      newColumn.setAttribute('id', board.Id);
  
      newColumn.innerHTML = `
        <div class="column-header">
          <div id="header-botoes">
            <span class="column-title">${board.Name}</span>
            <button class="edit-column">Editar</button>
            <button class="delete-column">Excluir</button>
            <button class="add-tarefa-column">+</button>
          </div>
        </div>
        <div class="tasks"></div>
      `;
  
      columnsContainer.appendChild(newColumn);
  
      // Função para carregar as tarefas de cada coluna
      const tasksContainer = newColumn.querySelector('.tasks');
      await loadTasks(board.Id, tasksContainer);
  
      // Eventos dos botões
      const addTaskButton = newColumn.querySelector('.add-tarefa-column');
      const deleteColumnButton = newColumn.querySelector('.delete-column');
      const editColumnButton = newColumn.querySelector('.edit-column');
  
      addTaskButton.addEventListener('click', () => {
        const taskName = prompt('Digite o nome da nova tarefa');
        if (taskName) {
          addTask(board.Id, taskName, tasksContainer);
        }
      });
  
      deleteColumnButton.addEventListener('click', async () => {
        await deleteBoard(board.Id);
        newColumn.remove();
      });
  
      editColumnButton.addEventListener('click', () => {
        const newTitle = prompt('Digite o novo nome da coluna');
        if (newTitle) {
          updateBoard(board.Id, newTitle, newColumn);
        }
      });
    }
  
    // Função para carregar as tarefas de uma coluna específica
    async function loadTasks(boardId, tasksContainer) {
      try {
        const response = await fetch(`https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/ColumnByBoardId?BoardId=${boardId}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar as tarefas');
        }
  
        const tasks = await response.json();
        tasks.forEach(task => {
          addTaskToColumn(task, tasksContainer);
        });
      } catch (error) {
        console.error('Erro ao carregar as tarefas:', error);
      }
    }
  
    // Função para adicionar uma tarefa à coluna
    async function addTask(boardId, taskName, tasksContainer) {
      try {
        const response = await fetch('https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            BoardId: boardId,
            Name: taskName
          })
        });
        const newTask = await response.json();
        addTaskToColumn(newTask, tasksContainer);
      } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
      }
    }
  
    // Função para adicionar a tarefa na UI
    function addTaskToColumn(task, tasksContainer) {
      const newTask = document.createElement('div');
      newTask.classList.add('item');
      newTask.setAttribute('draggable', 'true');
      newTask.textContent = task.Name;
      newTask.setAttribute('data-id', task.Id);
  
      tasksContainer.appendChild(newTask);
      addDragAndDropEvent(newTask);
    }
  
    // Função para excluir um board
    async function deleteBoard(boardId) {
      try {
        const response = await fetch(`https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Board/${boardId}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Erro ao excluir o board');
        }
      } catch (error) {
        console.error('Erro ao excluir o board:', error);
      }
    }
  
    // Função para atualizar o nome de um board
    async function updateBoard(boardId, newTitle, columnElement) {
      try {
        const response = await fetch(`https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Board/${boardId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Id: boardId,
            Name: newTitle
          })
        });
        if (!response.ok) {
          throw new Error('Erro ao atualizar o board');
        }
  
        columnElement.querySelector('.column-title').textContent = newTitle;
      } catch (error) {
        console.error('Erro ao atualizar o board:', error);
      }
    }
  
    // Habilita o carregamento inicial dos boards
    loadBoards();
  });