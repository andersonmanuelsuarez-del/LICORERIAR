// Formateador de moneda
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// Elementos Globales
const grid = document.getElementById('grid-productos');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const cartSidebar = document.getElementById('cart-sidebar');
const cartCount = document.querySelectorAll('#cart-count');

// Variables de Estado
let cart = [];
let currentProductSelection = null;
let timerInterval = null;
let discountApplied = false;

// 1. RENDERIZAR CATÁLOGO
function renderCatalog() {
  if(!grid) return;
  productos.forEach(prod => {
    const defaultSize = prod.tamanos[0];
    const card = document.createElement('div');
    card.className = 'producto-card';
    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" class="producto-img">
      <h3>${prod.nombre}</h3>
      <p class="capacidad">Desde ${defaultSize.capacidad}</p>
      <p class="precio">${formatter.format(defaultSize.precio)}</p>
    `;
    
    card.addEventListener('click', () => openModal(prod));
    grid.appendChild(card);
  });
}

// 2. LÓGICA DEL MODAL
function openModal(prod) {
  if(!modal) return;
  
  const mTitulo = document.getElementById('modal-titulo');
  const mImg = document.getElementById('modal-img');
  const mDesc = document.getElementById('modal-desc');
  const mSku = document.getElementById('modal-sku');
  const mPrecioUnidad = document.getElementById('modal-precio-unidad');
  const sizeSelector = document.getElementById('size-selector');
  const btnAddCart = document.getElementById('btn-add-cart');
  const citySelect = document.getElementById('modal-city');

  mTitulo.textContent = prod.nombre;
  mImg.src = prod.imagen;
  mDesc.textContent = prod.descripcion;
  citySelect.value = ""; // Reset city
  
  sizeSelector.innerHTML = '';
  
  const updateSize = (tamanoInfo, btnEl) => {
    mPrecioUnidad.textContent = formatter.format(tamanoInfo.precio);
    mSku.textContent = `Cod: ${tamanoInfo.sku}`;
    
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');

    // Guardar selección actual
    currentProductSelection = {
      id: prod.id,
      nombre: prod.nombre,
      imagen: prod.imagen,
      tamano: tamanoInfo.capacidad,
      precio: tamanoInfo.precio
    };
  };

  prod.tamanos.forEach((tamano, index) => {
    const btn = document.createElement('button');
    btn.className = 'size-btn';
    btn.textContent = tamano.capacidad;
    if(index === 0) btn.classList.add('active');
    
    btn.addEventListener('click', () => updateSize(tamano, btn));
    sizeSelector.appendChild(btn);
  });

  // Init
  updateSize(prod.tamanos[0], sizeSelector.firstChild);

  // Botón Añadir al carrito (remover event listeners anteriores)
  const newBtnAddCart = btnAddCart.cloneNode(true);
  btnAddCart.parentNode.replaceChild(newBtnAddCart, btnAddCart);
  
  newBtnAddCart.addEventListener('click', () => {
    const city = citySelect.value;
    if(!city) {
      alert("Por favor, selecciona tu ciudad antes de añadir al carrito.");
      return;
    }
    
    addToCart({...currentProductSelection, ciudad: city});
    modal.classList.remove('active');
  });

  modal.classList.add('active');
}

// 3. CARRITO DE COMPRAS
function addToCart(item) {
  cart.push(item);
  updateCartUI();
  toggleCart(new Event('click'), true);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function toggleCart(e, forceOpen = false) {
  if(e) e.preventDefault();
  if(!cartSidebar) return;
  
  if(forceOpen) {
    cartSidebar.classList.add('open');
  } else {
    cartSidebar.classList.toggle('open');
  }
}

function updateCartUI() {
  if(!cartSidebar) return;
  
  // Update badges
  cartCount.forEach(el => el.textContent = cart.length);
  
  const container = document.getElementById('cart-items-container');
  const totalPriceEl = document.getElementById('cart-total-price');
  const discountBanner = document.getElementById('discount-banner');
  
  container.innerHTML = '';
  let total = 0;
  
  cart.forEach((item, index) => {
    total += item.precio;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}">
      <div class="cart-item-info">
        <h4>${item.nombre}</h4>
        <p>${item.tamano} - Sede: ${item.ciudad}</p>
        <p class="cart-price">${formatter.format(item.precio)}</p>
        <span class="remove-item" onclick="removeFromCart(${index})">Eliminar</span>
      </div>
    `;
    container.appendChild(div);
  });

  // Activar Descuento y Temporizador si hay items
  if(cart.length > 0) {
    discountBanner.classList.add('active');
    startTimer();
    
    // Aplicar descuento visual
    let totalConDescuento = total - 3.00;
    if(totalConDescuento < 0) totalConDescuento = 0;
    
    totalPriceEl.innerHTML = `
      <span style="text-decoration: line-through; font-size:1rem; color:#888; margin-right:10px;">${formatter.format(total)}</span>
      <span style="color:#25D366;">${formatter.format(totalConDescuento)}</span>
    `;
    discountApplied = true;
  } else {
    discountBanner.classList.remove('active');
    clearInterval(timerInterval);
    timerInterval = null;
    totalPriceEl.textContent = formatter.format(0);
    discountApplied = false;
  }
}

// 4. TEMPORIZADOR
function startTimer() {
  if(timerInterval) return; // Ya está corriendo
  
  const timerEl = document.getElementById('cart-timer');
  let time = 300; // 5 minutos en segundos
  
  timerInterval = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (time <= 0) {
      clearInterval(timerInterval);
      timerEl.textContent = "00:00";
      // Opcional: Podrías quitar el descuento al llegar a cero, pero por ventas es mejor dejarlo como urgencia visual.
    }
    time--;
  }, 1000);
}

// 5. CHECKOUT (WhatsApp)
function checkout() {
  if(cart.length === 0) return;
  
  const numWA = "593963381805";
  let mensaje = "Hola Licorería R, quiero hacer el siguiente pedido:\n\n";
  let subtotal = 0;
  
  cart.forEach((item, i) => {
    subtotal += item.precio;
    mensaje += `${i+1}. ${item.nombre} (${item.tamano}) - ${item.ciudad} - ${formatter.format(item.precio)}\n`;
  });
  
  mensaje += `\nSubtotal: ${formatter.format(subtotal)}`;
  
  if(discountApplied) {
    let totalFinal = subtotal - 3.00;
    if(totalFinal < 0) totalFinal = 0;
    mensaje += `\n*Cupón Promocional Activado: -$3.00*`;
    mensaje += `\n*TOTAL A PAGAR: ${formatter.format(totalFinal)}*`;
  } else {
    mensaje += `\n*TOTAL A PAGAR: ${formatter.format(subtotal)}*`;
  }
  
  mensaje += "\n\nPor favor, confirmarme el pedido y el método de pago.";
  
  window.open(`https://wa.me/${numWA}?text=${encodeURIComponent(mensaje)}`, "_blank");
}

// 6. SISTEMA DE TOASTS (Notificaciones Promocionales)
const promociones = [
  "🔥 Descuento de 15% en tu primera compra",
  "📦 Para precio al mayor al número de contacto!",
  "🥃 Compra 4 whiskey y el 5to a mitad de precio"
];
let currentPromo = 0;

function showToast() {
  const container = document.getElementById('toast-container');
  if(!container) return;
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const msg = promociones[currentPromo];
  toast.innerHTML = `
    <div class="toast-icon">🎁</div>
    <div>${msg} <br><small style="color:var(--gold);">Haz clic para activar</small></div>
  `;
  
  // Acción al hacer clic en la promo
  toast.addEventListener('click', () => {
    const numWA = "593963381805";
    const msjPromo = `Hola Licorería R, vengo desde la página web y me interesa aplicar esta promoción: "${msg}"`;
    window.open(`https://wa.me/${numWA}?text=${encodeURIComponent(msjPromo)}`, "_blank");
  });
  
  container.appendChild(toast);
  
  // Animar entrada
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Remover después de 6 segundos
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 6000);
  
  currentPromo = (currentPromo + 1) % promociones.length;
}

// 7. INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  
  // Iniciar notificaciones (cada 12 segundos)
  if(document.getElementById('toast-container')) {
    setTimeout(showToast, 3000); // Primer toast a los 3 seg
    setInterval(showToast, 12000); // Luego cada 12 seg
  }
  
  // Cerrar modal y cart
  if(closeModal) {
    closeModal.addEventListener('click', () => modal.classList.remove('active'));
  }
  if(modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
});
