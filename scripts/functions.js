// Função para carregar os produtos
export function loadProducts(productList, load) {
  /* carrega os produtos na home e na página de produtos*/

  productList.forEach((produto) => {
    const valParcela = (produto.preco / 5).toFixed(2);
    const html = `
      <div class="product-card idprod" id="${produto.codigoProduto}">
        <div>
          <img id="${produto.codigoProduto}"
            src="${produto.imagemProduto.img1}"
            alt="${produto.tituloProduto}"
          />
        </div>
        <div class="product-card-info-container">
          <h2 class="product-card-title" title="${produto.tituloProduto}">
            ${produto.tituloProduto}
          </h2>
          <h4 class="product-card-reference">Cod. ${produto.codigoProduto}</h4>
          <h3 class="product-card-price">R$ ${produto.preco.toFixed(2)}</h3>
          <h4 class="product-card-installment">
            5x de R$ ${valParcela}
          </h4>
        </div>
        <a href="./product.html">
          <button id="${produto.codigoProduto}" class="product-card-btn">Comprar</button>
        </a>
      </div>
    `;
    load.innerHTML += html;
  });
}

// Função para capturar o código/id do produto
export function getProdId() {
  let itens = document.querySelectorAll(".idprod");
  console.log(itens);
  itens.forEach(item => item.addEventListener('click', (evento) => {
    let prodID = evento.target.id;
    localStorage.setItem('prodId', prodID);
  }));
}

// Função para localizar o produto na base de dados
export function findProduct(productList, productId) {
  let produto = productList.find(produto => produto.codigoProduto == productId);
  return produto;
}

// Função para carregar o produto na página do produto
export function loadProduct(produto, selecaoProduto) {
  const productCategory = document.querySelector("#product-category");
  productCategory.innerText = `${produto.categoriaProduto}`;

  const productTitle = document.querySelector("#product-title");

  productTitle.children[0].innerText = `COD: ${produto.codigoProduto}`;
  productTitle.children[1].innerText = `${produto.tituloProduto}`;

  const HTML = `
    <div class="product_images_container">
      <div class="images_selector">
        <i class="bi bi-chevron-double-up"></i>
        <ul>
          <li><img src="${produto.imagemProduto.img1}" alt="" class="product_thumb"></li>
          <li><img src="${produto.imagemProduto.img2}" alt="" class="product_thumb"></li>
          <li><img src="${produto.imagemProduto.img3}" alt="" class="product_thumb"></li>
          <li><img src="${produto.imagemProduto.img4}" alt="" class="product_thumb"></li>
        </ul>
        <i class="bi bi-chevron-double-down"></i>
      </div>
      <div class="images_main">
        <img src="${produto.imagemProduto.img1}" alt="">
      </div>
    </div>

    <div class="product_description_container">
      <h3 class="main-text">
        Descrição
      </h3>
      <p class="product_description">
        ${produto.descricao}
      </p>
    </div>
  `;

  selecaoProduto.innerHTML = HTML;

  const price = document.querySelector(".product_price_container");
  const parcela = (produto.preco / 10).toFixed(2);
  price.children[0].innerText = `R$ ${produto.preco.toFixed(2)}`;
  price.children[1].innerText = `Ou em até 10x sem juros de R$ ${parcela} no cartão de crédito`;
}

// Função para calcular o total do carrinho
function cartTotal(cartItens) {
  return cartItens.reduce((total, item) => total + item.preco * item.quantity, 0);
}

// Função para carregar os itens do carrinho
export function loadCartItem(cartItens, cartItensHTML) {
  if (cartItens.length == [] || cartItens.length == []) {
    cartItensHTML.innerHTML = "Seu carrinho está vazio";
  } else {
    cartItensHTML.innerHTML = ""; // Limpa o conteúdo antes de adicionar novos itens

    cartItens.forEach(item => {
      let html = `
      <div class="cart_item" id="${item.codigoProduto}">
        <div class="cart_item_main_img">
            <img src="${item.imagemProduto.img1}" alt="">
        </div>
        <div class="cart_item_info">
            <p>${item.tituloProduto}</p>
            <p>
                R$ ${item.preco}
                <span>Un.</span>
            </p>
            <h3 class="item-total-price">R$ ${(item.preco) * (item.quantity)}</h3>
            <div class="cart_item_qtd_selector">
              <div class="cart_item_qtd_selector_container">
                  <i class="bi bi-dash"></i>
                  <span class="quantity">${item.quantity}</span>
                  <i class="bi bi-plus"></i>
              </div>
              <button id="${item.codigoProduto}" class="remove">remover</button>
            </div>
        </div>
      </div>
    `;
      cartItensHTML.innerHTML += html;

      // Referências dos elementos de aumentar e diminuir a quantidade
      const itemElement = document.getElementById(item.codigoProduto);
      const quantityElement = itemElement.querySelector('.quantity');
      const totalPriceElement = itemElement.querySelector('.item-total-price');
      const plusButton = itemElement.querySelector('.bi-plus');
      const minusButton = itemElement.querySelector('.bi-dash');

      // Aumenta a quantidade
      plusButton.addEventListener('click', () => {
        item.quantity++;
        quantityElement.textContent = item.quantity;
        totalPriceElement.textContent = `R$ ${(item.preco * item.quantity).toFixed(2)}`; // Atualiza o total do item
        updateCartTotal(cartItens); // Atualiza o total do carrinho
        localStorage.setItem('listaCompras', JSON.stringify(cartItens)); // Salva no localStorage
      });

      // Diminui a quantidade
      minusButton.addEventListener('click', () => {
        if (item.quantity > 1) {
          item.quantity--;
          quantityElement.textContent = item.quantity;
          totalPriceElement.textContent = `R$ ${(item.preco * item.quantity).toFixed(2)}`; // Atualiza o total do item
          updateCartTotal(cartItens); // Atualiza o total do carrinho
          localStorage.setItem('listaCompras', JSON.stringify(cartItens)); // Salva no localStorage
        }
      });
    });

    // Atualiza o total do carrinho
    updateCartTotal(cartItens);
  }
}

// Função para atualizar o total do carrinho
function updateCartTotal(cartItens) {
  const subtotal = cartTotal(cartItens); // Calcula o subtotal
  localStorage.setItem('totalValue', subtotal.toFixed(2)); // Salva o subtotal no localStorage

  // Atualiza o subtotal na página
  const priceSub = document.querySelector('.total.container-flex:nth-child(1) h3:nth-child(2)');
  priceSub.innerHTML = `R$ ${subtotal.toFixed(2)}`;

  // Definindo o valor do frete
  const frete = 15.0;
  localStorage.setItem('totalValue', (subtotal + frete).toFixed(2)); // Atualiza o total no localStorage
  const priceFrete = document.querySelector('.total.container-flex:nth-child(2) h3:nth-child(2)');
  priceFrete.innerHTML = `R$ ${frete.toFixed(2)}`;

  // Calculando o total final
  const total = subtotal + frete;
  const priceTotal = document.querySelector('.total.container-flex:nth-child(3) h3:nth-child(2)');
  priceTotal.innerHTML = `R$ ${total.toFixed(2)}`;
}

// Função para remover o item do carrinho
export function removeCartItem(sacolaCompras) {
  let botaoDel = document.querySelectorAll("button.remove"); // remover produto do carrinho
  let cartItens = document.querySelector(".grid_col_1");
  botaoDel.forEach(botao => botao.addEventListener('click', (event) => {
    let item = event.target.parentElement.parentElement.parentElement;
    cartItens.removeChild(item);
    let index = sacolaCompras.findIndex(i => i.codigoProduto == item.id);
    sacolaCompras.splice(index, 1);
    localStorage.setItem('listaCompras', JSON.stringify(sacolaCompras));

    // Atualiza o preço total após a remoção do item
    const total = cartTotal(sacolaCompras);
    localStorage.setItem('totalValue', total);
    const price = document.querySelector('.total.container-flex:nth-child(1) h3:nth-child(2)');
    price.innerHTML = `R$ ${total.toFixed(2)}`;
  }));
}

// Função para realizar o pedido
export function shop(pedidos) {
  const form = document.querySelector('#billing form');
  const inputs = form.querySelectorAll('input,select');
  const inputValues = {};
  inputs.forEach((input) => {
    if (input.type !== 'submit' && input.type !== 'button') {
      inputValues[input.name] = input.value;
    }
  });

  const order = {
    id: pedidos.length > 0 ? pedidos[pedidos.length - 1].id + 1 : 1,
    address: { ...inputValues },
    items: JSON.parse(localStorage.getItem("listaCompras")),
    totalValue: parseFloat(localStorage.getItem("totalValue"))
  };

  pedidos.push(order);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  alert("Pedido realizado com sucesso");
  localStorage.removeItem("listaCompras");
  localStorage.removeItem("totalValue");
  window.location = "./index.html";
}
