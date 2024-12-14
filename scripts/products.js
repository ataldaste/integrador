import { database } from "./database.js"; // Importa o banco de dados
import { getProdId, loadProducts } from "./functions.js"; // Importa funções auxiliares

// Seleciona o elemento HTML onde os produtos serão exibidos
const sectionProducts = document.querySelector(".section-product-grid");

/**
 * Função principal para carregar os produtos e tratar o ID do produto.
 * Organiza a execução das funções de forma assíncrona.
 */
function init() {
  // Carrega os produtos na seção selecionada
  loadProducts(database, sectionProducts);

  // Obtém o ID do produto, se necessário
  getProdId();
}

// Chama a função principal para inicializar o carregamento
init();
