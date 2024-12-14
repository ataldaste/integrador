import { database } from "./database.js"; // Importa os dados do banco
import { findProduct, loadProduct } from "./functions.js"; // Importa funções auxiliares

// Recupera o ID do produto e a lista de compras do localStorage
let id = localStorage.getItem('prodId');
let listaCompras = JSON.parse(localStorage.getItem('listaCompras'));

// Verifica se a lista de compras está vazia e inicializa como um array vazio, caso necessário
if (!listaCompras || listaCompras.length === 0) {
  listaCompras = [];
}

// Encontra o produto com base no ID recuperado
let produto = findProduct(database, id);

// Seleciona o local onde o produto será exibido
let selecaoProduto = document.querySelector(".grid_col_1");

// Carrega os detalhes do produto na página
loadProduct(produto, selecaoProduto);

// Seleciona o botão de compra
let botaoComprar = document.querySelector(".product_price_container button");

// Adiciona evento de clique ao botão de compra
botaoComprar.addEventListener('click', () => {
  let quantity = parseInt(document.querySelector("#quantity").value); // Recupera a quantidade informada pelo usuário

  // Adiciona a quantidade selecionada ao produto
  produto.quantity = quantity;

  // Adiciona o produto à lista de compras
  listaCompras.push(produto);

  // Exibe um alerta para o usuário
  alert("Produto adicionado com sucesso!");

  // Salva a lista de compras no localStorage
  localStorage.setItem('listaCompras', JSON.stringify(listaCompras));

  // Loga a lista de compras para depuração
  console.log(listaCompras);

  // Redireciona o usuário para a página de checkout
  window.location = "./checkout.html";
});

// Função para trocar a imagem principal quando uma miniatura for clicada
document.addEventListener('DOMContentLoaded', () => {
  const thumbImages = document.querySelectorAll('.product_thumb'); // Seleciona as miniaturas
  const mainImage = document.querySelector('.images_main img'); // Seleciona a imagem principal

  // Função para trocar a imagem principal com base na miniatura clicada
  function changeMainImage(event) {
    const newImageSrc = event.target.src;  // Pega o caminho da imagem da miniatura
    mainImage.src = newImageSrc;  // Atualiza o src da imagem principal
  }

  // Adiciona evento de clique em cada miniatura
  thumbImages.forEach(thumb => {
    thumb.addEventListener('click', changeMainImage);
  });
});
