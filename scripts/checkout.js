// Importação das funções necessárias para manipular o carrinho
import { loadCartItem, removeCartItem } from "./functions.js";

// Recupera os itens do carrinho e os pedidos armazenados no localStorage
let cartItems = JSON.parse(localStorage.getItem("listaCompras")) || []; // Garante que o carrinho tenha um valor inicial vazio
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || []; // Garante que a lista de pedidos tenha um valor inicial vazio

// Se a lista de itens do carrinho estiver vazia, podemos informar o usuário ou esconder a seção
if (cartItems.length === 0) {
    console.log("Carrinho vazio"); // Pode exibir uma mensagem no HTML se necessário
}

// Seleciona o elemento HTML onde os itens do carrinho serão carregados
let cartItemsHTML = document.querySelector('#checkout .grid_col_1');

// Carrega os itens no carrinho
loadCartItem(cartItems, cartItemsHTML);

// Adiciona a funcionalidade para remover itens do carrinho
removeCartItem(cartItems);
