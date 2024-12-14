// Importação da base de dados e das funções
import { database } from "./database.js";
import { getProdId, loadProducts } from "./functions.js";

// -------- Variáveis do projeto ------------------------
// Seleciona as seções de carrossel para cada categoria
const sectionNovidades = document.querySelector("#section-1 .carrousel");
const sectionMaisVendidos = document.querySelector("#section-2 .carrousel");
const sectionPromocoes = document.querySelector("#section-3 .carrousel");

// Filtros de produtos por categoria
const filtroCategoriaNovidades = database.filter(produto => produto.classificacaoProduto === "Novidades" && produto.exibirHome);
const filtroMaisVendidos = database.filter(produto => produto.classificacaoProduto === "Mais_Vendidos" && produto.exibirHome);
const filtroPromocoes = database.filter(produto => produto.classificacaoProduto === "Promocoes" && produto.exibirHome);

// Carrega os produtos nas respectivas seções
loadProducts(filtroCategoriaNovidades, sectionNovidades);
loadProducts(filtroMaisVendidos, sectionMaisVendidos);
loadProducts(filtroPromocoes, sectionPromocoes);

// Recupera o ID do produto do localStorage
getProdId();

// ------- Funções para Carrossel de Produtos -------------------

// Função para inicializar o carrossel de uma seção
function initCarousel(sectionSelector, prevBtnSelector, nextBtnSelector) {
  const carousel = document.querySelector(sectionSelector);
  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);

  let scrollAmount = 0;
  const cardWidth = 270; // Ajuste para a largura do card

  // Função para avançar no carrossel
  function moveNext() {
    scrollAmount += cardWidth; // Avança um card
    if (scrollAmount > carousel.scrollWidth - carousel.parentElement.offsetWidth) {
      scrollAmount = carousel.scrollWidth - carousel.parentElement.offsetWidth;
    }
    carousel.style.transform = `translateX(-${scrollAmount}px)`;
  }

  // Função para retroceder no carrossel
  function movePrev() {
    scrollAmount -= cardWidth; // Retrocede um card
    if (scrollAmount < 0) {
      scrollAmount = 0;
    }
    carousel.style.transform = `translateX(-${scrollAmount}px)`;
  }

  // Adiciona os eventos de clique nos botões
  nextBtn.addEventListener('click', moveNext);
  prevBtn.addEventListener('click', movePrev);
}

// Inicializa os carrosséis das três seções
initCarousel('#section-1 .carrousel', '#section-1 .prev', '#section-1 .next');
initCarousel('#section-2 .carrousel', '#section-2 .prev', '#section-2 .next');
initCarousel('#section-3 .carrousel', '#section-3 .prev', '#section-3 .next');

// ------- Slide Automático para a Banner -------------------

// Função para mostrar o slide com base no índice
let currentSlide = 0;
const slides = document.querySelectorAll('.banner img');
const totalSlides = slides.length;

function showSlide(index) {
  currentSlide = (index + totalSlides) % totalSlides;
  const offset = -currentSlide * 100;
  document.querySelector('.banner').style.transform = `translateX(${offset}%)`;
}

// Função para mover o slide na direção especificada
function moveSlide(direction) {
  showSlide(currentSlide + direction);
}

// Slide automático a cada 3 segundos
setInterval(() => {
  moveSlide(1); // Move para o próximo slide
}, 3000);
