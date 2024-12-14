// Função para carregar os produtos na home e na página de produtos
export function loadProducts(productList, load) {
  productList.forEach((produto) => {
    const valParcela = (produto.preco / 5).toFixed(2);
    const html = `
      <div class="product-card idprod" id="${produto.codigoProduto}">
        <div>
          <img src="${produto.imagemProduto.img1}" alt="${produto.tituloProduto}" />
        </div>
        <div class="product-card-info-container">
          <h2 class="product-card-title" title="${produto.tituloProduto}">${produto.tituloProduto}</h2>
          <h4 class="product-card-reference">Cod. ${produto.codigoProduto}</h4>
          <h3 class="product-card-price">R$ ${produto.preco.toFixed(2)}</h3>
          <h4 class="product-card-installment">5x de R$ ${valParcela}</h4>
        </div>
        <a href="./product.html">
          <button class="product-card-btn">Comprar</button>
        </a>
      </div>`;
    load.innerHTML += html;
  });
}

// Função para capturar o código do produto e armazenar no localStorage
export function getProdId() {
  const produtos = document.querySelectorAll(".idprod");
  produtos.forEach(item => {
    item.addEventListener('click', (evento) => {
      const prodID = evento.target.id;
      localStorage.setItem('prodId', prodID);
    });
  });
}

// Função para localizar um produto pelo ID na lista
export function findProduct(productList, productId) {
  return productList.find(produto => produto.codigoProduto === productId);
}

// Função para carregar o produto na página do produto
export function loadProduct(produto, selecaoProduto) {
  selecaoProduto.innerHTML = `
    <div class="product_images_container">
      <div class="images_selector">
        <i class="bi bi-chevron-double-up"></i>
        <ul>
          ${[produto.imagemProduto.img1, produto.imagemProduto.img2, produto.imagemProduto.img3, produto.imagemProduto.img4]
            .map(img => `<li><img src="${img}" alt="" class="product_thumb"></li>`).join('')}
        </ul>
        <i class="bi bi-chevron-double-down"></i>
      </div>
      <div class="images_main">
        <img src="${produto.imagemProduto.img1}" alt="">
      </div>
    </div>
    <div class="product_description_container">
      <h3 class="main-text">Descrição</h3>
      <p class="product_description">${produto.descricao}</p>
    </div>`;

  const priceContainer = document.querySelector(".product_price_container");
  const parcela = (produto.preco / 10).toFixed(2);
  priceContainer.children[0].innerText = `R$ ${produto.preco.toFixed(2)}`;
  priceContainer.children[1].innerText = `Ou em até 10x sem juros de R$ ${parcela} no cartão de crédito`;

  // Atualiza a categoria do produto
  document.querySelector("#product-category").innerText = produto.categoriaProduto;

  // Atualiza o título do produto
  const productTitle = document.querySelector("#product-title");
  productTitle.children[0].innerText = `COD: ${produto.codigoProduto}`;
  productTitle.children[1].innerText = produto.tituloProduto;
}

// Função para calcular o total do carrinho
function cartTotal(cartItens) {
  return cartItens.reduce((total, item) => total + (item.preco * item.quantity), 0);
}

// Função para carregar os itens no carrinho
export function loadCartItem(cartItens, cartItensHTML) {
  if (!cartItens.length) {
    cartItensHTML.innerHTML = "Seu carrinho está vazio";
    return;
  }

  cartItensHTML.innerHTML = "";
  cartItens.forEach(item => {
    cartItensHTML.innerHTML += `
      <div class="cart_item" id="${item.codigoProduto}">
        <div class="cart_item_main_img"><img src="${item.imagemProduto.img1}" alt=""></div>
        <div class="cart_item_info">
          <p>${item.tituloProduto}</p>
          <p>R$ ${item.preco} <span>Un.</span></p>
          <h3 class="item-total-price">R$ ${(item.preco * item.quantity).toFixed(2)}</h3>
          <div class="cart_item_qtd_selector">
            <div class="cart_item_qtd_selector_container">
              <i class="bi bi-dash"></i>
              <span class="quantity">${item.quantity}</span>
              <i class="bi bi-plus"></i>
            </div>
            <button class="remove">Remover</button>
          </div>
        </div>
      </div>`;

    // Adiciona a funcionalidade para alterar quantidade e remover item
    const itemElement = document.getElementById(item.codigoProduto);
    const quantityElement = itemElement.querySelector('.quantity');
    const totalPriceElement = itemElement.querySelector('.item-total-price');
    const plusButton = itemElement.querySelector('.bi-plus');
    const minusButton = itemElement.querySelector('.bi-dash');

    // Aumentar a quantidade
    plusButton.addEventListener('click', () => {
      item.quantity++;
      quantityElement.textContent = item.quantity;
      totalPriceElement.textContent = `R$ ${(item.preco * item.quantity).toFixed(2)}`;
      updateCartTotal(cartItens);
      localStorage.setItem('listaCompras', JSON.stringify(cartItens));
    });

    // Diminuir a quantidade
    minusButton.addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity--;
        quantityElement.textContent = item.quantity;
        totalPriceElement.textContent = `R$ ${(item.preco * item.quantity).toFixed(2)}`;
        updateCartTotal(cartItens);
        localStorage.setItem('listaCompras', JSON.stringify(cartItens));
      }
    });

    // Remover item do carrinho
    const removeButton = itemElement.querySelector('.remove');
    removeButton.addEventListener('click', () => {
      const index = cartItens.findIndex(i => i.codigoProduto === item.codigoProduto);
      cartItens.splice(index, 1);
      localStorage.setItem('listaCompras', JSON.stringify(cartItens));
      loadCartItem(cartItens, cartItensHTML); // Recarrega o carrinho após remoção
      updateCartTotal(cartItens); // Atualiza o total
    });
  });

  updateCartTotal(cartItens);
}

// Função para atualizar o total do carrinho
function updateCartTotal(cartItens) {
  const subtotal = cartTotal(cartItens);
  const frete = 15.0;
  const total = subtotal + frete;

  localStorage.setItem('totalValue', total.toFixed(2));

  // Atualiza o total na página
  document.querySelector('.total.container-flex:nth-child(1) h3:nth-child(2)').innerText = `R$ ${subtotal.toFixed(2)}`;
  document.querySelector('.total.container-flex:nth-child(2) h3:nth-child(2)').innerText = `R$ ${frete.toFixed(2)}`;
  document.querySelector('.total.container-flex:nth-child(3) h3:nth-child(2)').innerText = `R$ ${total.toFixed(2)}`;
}

// Função para finalizar a compra
export function shop(pedidos) {
  const form = document.querySelector('#billing form');
  const inputs = form.querySelectorAll('input, select');
  const inputValues = {};
  inputs.forEach((input) => {
    if (input.type !== 'submit' && input.type !== 'button') {
      inputValues[input.name] = input.value;
    }
  });

  const order = {
    id: pedidos.length ? pedidos[pedidos.length - 1].id + 1 : 1,
    address: inputValues,
    items: JSON.parse(localStorage.getItem("listaCompras")),
    totalValue: parseFloat(localStorage.getItem("totalValue"))
  };

  pedidos.push(order);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  alert("Pedido realizado com sucesso");

  // Limpar o carrinho
  localStorage.removeItem("listaCompras");
  localStorage.removeItem("totalValue");

  window.location = "./index.html";
}
