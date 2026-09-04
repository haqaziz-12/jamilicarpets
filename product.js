// ===== Product Detail Page Logic =====
(function() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  // Update breadcrumb
  document.getElementById('breadcrumbCollection').textContent = COLLECTIONS[product.collection].name;
  document.getElementById('breadcrumbCollection').href = '/collection.html?c=' + product.collection;
  document.getElementById('breadcrumbProduct').textContent = product.name;

  // Update product info
  document.getElementById('productCollection').textContent = COLLECTIONS[product.collection].name;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productShortDesc').textContent = product.description;
  document.getElementById('productFullDesc').textContent = product.description + ' Each carpet is a unique, one-of-a-kind piece, handwoven by master Afghan artisans using premium Ghazni wool and natural plant-based dyes. The carpet you see in the images is the exact piece you will receive.';

  // Update specs
  document.getElementById('specCollection').textContent = COLLECTIONS[product.collection].name;
  document.getElementById('specSize').textContent = product.size;
  document.getElementById('specQuality').textContent = product.quality;
  document.getElementById('specOrigin').textContent = product.origin;
  document.getElementById('specPile').textContent = product.pile;

  // Update WhatsApp link
  const waLink = document.getElementById('whatsappOrder');
  const waText = encodeURIComponent(`Hello Jamili Carpets, I'm interested in: ${product.name} (${COLLECTIONS[product.collection].name}, ${product.size}, ${product.quality}, ${product.pile} pile). Could you please provide pricing and shipping details?`);
  waLink.href = `https://wa.me/+93777697777?text=${waText}`;

  // Update quote modal product reference
  document.getElementById('quoteProduct').textContent = `Product: ${product.name} — ${COLLECTIONS[product.collection].name}`;

  // Gallery thumbnail switching
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const mainImg = document.getElementById('galleryMain');
  const labels = { front: 'Front View', back: 'Back View', detail: 'Detail / Close-up' };
  const colors = {
    front: 'linear-gradient(135deg,#1F2A44,#3A4A6C)',
    back: 'linear-gradient(135deg,#2A3A5C,#1F2A44)',
    detail: 'linear-gradient(135deg,#C6A75E,#1F2A44)'
  };

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const imgType = thumb.dataset.img;
      mainImg.innerHTML = `<div style="height:100%;background:${colors[imgType]};display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.7);font-size:1.1rem;border-radius:12px">${labels[imgType]}</div>`;
    });
  });

  // Update page title
  document.title = `${product.name} — Jamili Carpets | ${COLLECTIONS[product.collection].name}`;

  // Related products (same collection, excluding current)
  const related = PRODUCTS.filter(p => p.collection === product.collection && p.id !== product.id).slice(0, 3);
  const relatedGrid = document.getElementById('relatedGrid');
  if (relatedGrid) {
    relatedGrid.innerHTML = related.map(p => `
      <div class="product-card">
        <a href="/product.html?id=${p.id}" style="display:block">
          <div class="product-card-img">${p.name} — Front View</div>
        </a>
        <div class="product-card-info">
          <span class="product-card-tag">${COLLECTIONS[p.collection].name}</span>
          <h3>${p.name}</h3>
          <p>${p.size}</p>
          <div class="product-card-meta">
            <span class="product-card-size">${p.quality} · ${p.pile}</span>
            <a href="/product.html?id=${p.id}" class="product-card-btn">View Details</a>
          </div>
        </div>
      </div>
    `).join('');
  }
})();

// ===== Quote Modal =====
function openQuoteForm() {
  document.getElementById('quoteModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuoteForm() {
  document.getElementById('quoteModal').classList.remove('active');
  document.body.style.overflow = '';
}

// Close on overlay click
document.getElementById('quoteModal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeQuoteForm();
});

// Quote form submit
document.getElementById('quoteForm').addEventListener('submit', e => {
  e.preventDefault();
  e.target.style.display = 'none';
  document.getElementById('quoteSuccess').classList.add('show');
});

// ===== Share Functions =====
function sharePage(platform) {
  const url = window.location.href;
  const text = encodeURIComponent('Check out this handmade Afghan carpet from Jamili Carpets');
  if (platform === 'whatsapp') window.open(`https://wa.me/?text=${text}%20${encodeURIComponent(url)}`, '_blank');
  else if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  else if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank');
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('Link copied to clipboard!');
  });
}
