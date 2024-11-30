// Função para salvar dados no localStorage
// key: Nome da chave onde os dados serão armazenados
// value: Valor a ser salvo (será convertido para uma string JSON)
export const saveToLocalStorage = (key, value) => {
  // Armazena o valor convertido em string no localStorage
  localStorage.setItem(key, JSON.stringify(value));
};

// Função para recuperar dados do localStorage
// key: Nome da chave cujo valor será recuperado
// Retorna o valor original convertido de volta do formato JSON, ou null se a chave não existir
export const getFromLocalStorage = (key) => {
  // Obtém o valor armazenado no localStorage usando a chave
  const value = localStorage.getItem(key);
  // Verifica se o valor existe. Se sim, converte de volta para o formato original com JSON.parse
  // Caso contrário, retorna null
  return value ? JSON.parse(value) : null;
};
