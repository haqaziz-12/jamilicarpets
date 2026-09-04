// ===== Collection Page Logic =====
(function() {
  const params = new URLSearchParams(window.location.search);
  const collectionKey = params.get('c') || 'classic';
  const collection = COLLECTIONS[collectionKey];
  const products = PRODUCTS.filter(p => p.collection === collectionKey);

  // Update page title and description
  if (collection) {
    document.getElementById('collectionEyebrow').textContent = 'Collection';
    document.getElementById('collectionTitle').textContent = collection.name;
    document.getElementById('collectionDesc').textContent = collection.description;
    document.title = collection.name + ' — Jamili Carpets | Handmade Afghan Carpets';
  }

  // Highlight active collection in filter
  document.querySelectorAll('#filterCollection a').forEach(a => {
    if (a.dataset.c === collectionKey) a.style.color = 'var(--gold-dark)';
  });

  // Render products
  const grid = document.getElementById('productsGrid');
  const resultsCount = document.getElementById('resultsCount');

  function renderProducts(items) {
    if (items.length === 0) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--gray);padding:3rem">No products match your filters. Try adjusting your selection.</p>';
      resultsCount.textContent = '0 products';
      return;
    }
    resultsCount.textContent = items.length + ' product' + (items.length !== 1 ? 's' : '');
    grid.innerHTML = items.map(p => `
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

  renderProducts(products);

  // Filter logic
  const sizeFilters = document.querySelectorAll('input[name="size"]');
  const colorFilters = document.querySelectorAll('input[name="color"]');
  const sortSelect = document.getElementById('sortBy');

  function applyFilters() {
    let filtered = products.slice();

    const selectedSizes = Array.from(sizeFilters).filter(c => c.checked).map(c => c.value);
    const selectedColors = Array.from(colorFilters).filter(c => c.checked).map(c => c.value);

    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => p.colors.some(c => selectedColors.includes(c)));
    }

    const sort = sortSelect ? sortSelect.value : 'newest';
    if (sort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'featured') {
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    renderProducts(filtered);
  }

  sizeFilters.forEach(c => c.addEventListener('change', applyFilters));
  colorFilters.forEach(c => c.addEventListener('change', applyFilters));
  if (sortSelect) sortSelect.addEventListener('change', applyFilters);
})();
