let cart = JSON.parse(localStorage.getItem('cart')) || [];


fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(data => {
    displayProducts(data.products);
  })
  .catch(error => {
    console.error('Error fetching products:', error);
    
  });

function displayProducts(products) {
  const productsContainer = document.getElementById('products-container');
  productsContainer.innerHTML = ''; // Kosongkan kontainer produk
  products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      productElement.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}">
          <div class="product-details">
              <h3>${product.title}</h3>
              <p>Rp. ${product.price}</p>
          </div>
          <div class="button-container">
              <button onclick="addToCart(${product.id})">+</button>
          </div>
      `;
      productsContainer.appendChild(productElement);
  });
}

function addToCart(productId) {
  const isProductInCart = cart.some(product => product.id === productId);
  
  if (isProductInCart) {
    alert('Produk ini sudah ada di dalam keranjang.');
    return;
  }

  fetch(`https://dummyjson.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart)); 
      displayCartItems(); 
      updateCartCount(); 
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
    
    });
}

function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items-container');
  const totalPriceElement = document.getElementById('total-price');
  const totalCountElement = document.getElementById('total-count');
  
  cartItemsContainer.innerHTML = ''; 
  let totalPrice = 0;

  cart.forEach((product, index) => {
      const cartItemElement = document.createElement('div');
      cartItemElement.className = 'cart-item';
      cartItemElement.innerHTML = `
          <div class="cart-item-content">
              <img src="${product.thumbnail}" alt="${product.title}" class="cart-item-image">
              <div class="product-details">
                  <h3>${product.title}</h3>
                  <p>Rp. ${product.price}</p>
              </div>
          </div>
          <button class="remove-button" onclick="removeFromCart(${index})">-</button> <!-- Tombol dengan desain yang sama -->
      `;

      totalPrice += product.price; 
      cartItemsContainer.appendChild(cartItemElement);
  });

  totalPriceElement.innerText = totalPrice; 
  totalCountElement.innerText = cart.length;
}


function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); 
    displayCartItems(); 
}

function clearCart() {
    cart = []; 
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); 
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
}

updateCartCount();
