/* --- DATA --- */
const products = [
  {
    id: 1,
    name: "Neural Headphones",
    price: 299,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    desc: "Studio quality sound with noise cancellation.",
  },
  {
    id: 2,
    name: "Minimalist Watch",
    price: 150,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    desc: "Precision engineering on your wrist.",
  },
  {
    id: 3,
    name: "Cotton Hoodie",
    price: 75,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    desc: "Premium organic cotton for daily wear.",
  },
  {
    id: 4,
    name: "Smart Speaker",
    price: 120,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1589003020612-61a011756034?w=500",
    desc: "High fidelity audio with voice assistant.",
  },
  {
    id: 5,
    name: "Leather Backpack",
    price: 140,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
    desc: "Handcrafted leather for modern nomads.",
  },
  {
    id: 6,
    name: "Designer Sunglasses",
    price: 95,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
    desc: "UV protection meets high street style.",
  },
];

let cart = JSON.parse(localStorage.getItem("swiftshop_cart")) || [];
let currentCat = "all";

/* --- LOGIN LOGIC --- */
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-pass").value;

  if (email && pass) {
    document.getElementById("login-page").style.display = "none";
    document.getElementById("app-content").style.display = "block";
    showSection("home");
  }
}

/* --- THEME --- */
function toggleTheme() {
  const body = document.body;
  const isDark = body.getAttribute("data-theme") === "dark";
  body.setAttribute("data-theme", isDark ? "light" : "dark");
  document.getElementById("theme-btn").innerText = isDark ? "🌙" : "☀️";
}

/* --- NAVIGATION --- */
function showSection(id) {
  document
    .querySelectorAll("section")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);
  if (id === "home") renderGrid("featured-grid", products.slice(0, 3));
  if (id === "shop") renderGrid("shop-grid", products);
  if (id === "cart") renderCart();
}

/* --- RENDERERS --- */
function renderGrid(targetId, list) {
  const grid = document.getElementById(targetId);
  grid.innerHTML = list
    .map(
      (p) => `
                <div class="product-card">
                    <div class="image-box">
                        <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/300x220?text=No+Image'">
                    </div>
                    <p style="font-size: 0.75rem; color: var(--secondary);">${p.category}</p>
                    <h3 style="margin: 5px 0;">${p.name}</h3>
                    <p style="font-weight: 700; color: var(--primary); margin-bottom: 15px;">$${p.price}</p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <button class="btn btn-outline" style="padding: 8px;" onclick="viewDetails(${p.id})">Details</button>
                        <button class="btn btn-primary" style="padding: 8px;" onclick="addToCart(${p.id}, this)">Add</button>
                    </div>
                </div>
            `,
    )
    .join("");
}

function viewDetails(id) {
  const p = products.find((x) => x.id === id);
  document.getElementById("detail-content").innerHTML = `
                <button class="btn btn-outline" style="margin-bottom: 20px;" onclick="showSection('shop')">← Back</button>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; align-items: center;">
                    <div class="image-box" style="height: 400px;"><img src="${p.image}"></div>
                    <div>
                        <h2>${p.name}</h2>
                        <p style="margin: 20px 0; opacity: 0.8;">${p.desc}</p>
                        <h2 style="color: var(--primary); margin-bottom: 20px;">$${p.price}</h2>
                        <button class="btn btn-primary" onclick="addToCart(${p.id}, this)">Add to Shopping Bag</button>
                    </div>
                </div>
            `;
  showSection("product-detail");
}

/* --- FILTERS --- */
function filterCategory(cat, btn) {
  currentCat = cat;
  document
    .querySelectorAll("#cat-filters .btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  filterProducts();
}

function filterProducts() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const filtered = products.filter(
    (p) =>
      (currentCat === "all" || p.category === currentCat) &&
      p.name.toLowerCase().includes(query),
  );
  renderGrid("shop-grid", filtered);
}

/* --- CART LOGIC --- */
function addToCart(id, btnElement) {
  const item = cart.find((x) => x.id === id);
  if (item) item.qty++;
  else cart.push({ id, qty: 1 });
  updateCart();

  // UI FEEDBACK: Change "Add" to "Added!"
  const originalText = btnElement.innerText;
  btnElement.innerText = "Added!";
  btnElement.style.background = "#10b981"; // Green success color

  setTimeout(() => {
    btnElement.innerText = originalText;
    btnElement.style.background = ""; // Revert to CSS default
  }, 1000);
}

function updateCart() {
  localStorage.setItem("swiftshop_cart", JSON.stringify(cart));
  document.getElementById("cart-count").innerText = cart.reduce(
    (a, b) => a + b.qty,
    0,
  );
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const summary = document.getElementById("cart-summary");
  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align:center; padding: 40px;">Your cart is empty.</p>`;
    summary.innerHTML = "";
    return;
  }

  let subtotal = 0;
  container.innerHTML = cart
    .map((item) => {
      const p = products.find((x) => x.id === item.id);
      subtotal += p.price * item.qty;
      return `
                    <div style="display: flex; align-items: center; gap: 20px; padding: 15px 0; border-bottom: 1px solid var(--border);">
                        <img src="${p.image}" style="width: 60px; height: 60px; border-radius: 10px; object-fit: cover;">
                        <div style="flex: 1;"><h4>${p.name}</h4><p>$${p.price}</p></div>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <button class="btn" style="padding: 5px 10px;" onclick="changeQty(${p.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="btn" style="padding: 5px 10px;" onclick="changeQty(${p.id}, 1)">+</button>
                        </div>
                    </div>
                `;
    })
    .join("");

  summary.innerHTML = `
                <div style="display:flex; justify-content:space-between; font-weight:bold; font-size: 1.3rem;">
                    <span>Total</span><span>$${subtotal}</span>
                </div>
                <button class="btn btn-primary" style="margin-top: 20px;" onclick="showSection('checkout')">Proceed to Checkout</button>
            `;
}

function changeQty(id, delta) {
  const item = cart.find((x) => x.id === id);
  item.qty += delta;
  if (item.qty < 1) cart = cart.filter((x) => x.id !== id);
  updateCart();
  renderCart();
}

function handleOrder(e) {
  e.preventDefault();
  cart = [];
  updateCart();
  showSection("success");
}

// Init
updateCart();
