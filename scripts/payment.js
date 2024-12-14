// Importação da função para processar a compra
import { shop } from "./functions.js";

// Recupera o conteúdo da sacola de compras e o valor total do localStorage
let sacolaCompras = JSON.parse(localStorage.getItem("listaCompras"));
let totalValue = parseFloat(localStorage.getItem("totalValue"));

// Verifica se o valor total foi recuperado corretamente
if (isNaN(totalValue)) {
  totalValue = 0; // Garantir que o valor total seja 0 caso não tenha sido definido
}

// Exibe o valor total na tela
const price = document.querySelector('.total.container-flex:nth-child(1) h3:nth-child(2)');
price.innerHTML = `R$ ${totalValue.toFixed(2)}`;

// Recupera a lista de pedidos do localStorage ou inicializa uma lista vazia caso não exista
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

// Adiciona o evento de clique no botão de checkout
const shopBtn = document.querySelector("button.checkout_btn");
shopBtn.addEventListener("click", () => {
    // Chama a função shop para processar o pedido
    shop(pedidos);
});
