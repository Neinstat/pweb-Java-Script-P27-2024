// Inisialisasi cart dari localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fetch API untuk mendapatkan data produk
fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(data => {
    displayProducts(data.products);
  })
  .catch(error => {
    console.error('Error fetching products:', error);
    alert('Gagal memuat produk. Silakan coba lagi nanti.');
  });

// Menampilkan produk di katalog
function displayProducts(products) {
  const productsContainer = document.getElementById('products-container');
  productsContainer.innerHTML = ''; // Kosongkan kontainer produk
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>Rp. ${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsContainer.appendChild(productElement);
  });
}

// Fungsi untuk menambah produk ke dalam cart
function addToCart(productId) {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
      alert('Gagal menambahkan item ke keranjang.');
    });
}

// Fungsi untuk memperbarui jumlah item di keranjang
function updateCartCount() {
  document.getElementById('cart-count').innerText = cart.length;
}

// Panggil fungsi untuk memperbarui hitungan keranjang saat pertama kali load
updateCartCount();
