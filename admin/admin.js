// ===== Admin Panel JavaScript =====

// Auth check
function checkAuth() {
  const auth = sessionStorage.getItem('jamili_admin');
  if (!auth) {
    window.location.href = '/admin/index.html';
    return;
  }
  const user = JSON.parse(auth);
  const userEl = document.getElementById('adminUser');
  if (userEl) userEl.textContent = user.user;
}

// Logout
function logout() {
  sessionStorage.removeItem('jamili_admin');
  window.location.href = '/admin/index.html';
}

// Toggle sidebar (mobile)
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// Close modal
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// ===== Data Management (localStorage-based demo) =====
// In production, replace with Cloudflare Workers API calls

function getProducts() {
  const stored = localStorage.getItem('jamili_products');
  if (stored) return JSON.parse(stored);
  if (typeof PRODUCTS !== 'undefined') {
    localStorage.setItem('jamili_products', JSON.stringify(PRODUCTS));
    return PRODUCTS;
  }
  return [];
}

function saveProducts(products) {
  localStorage.setItem('jamili_products', JSON.stringify(products));
}

function getInquiries() {
  const stored = localStorage.getItem('jamili_inquiries');
  return stored ? JSON.parse(stored) : [];
}

function saveInquiries(inquiries) {
  localStorage.setItem('jamili_inquiries', JSON.stringify(inquiries));
}

function getMessages() {
  const stored = localStorage.getItem('jamili_messages');
  return stored ? JSON.parse(stored) : [];
}

function saveMessages(messages) {
  localStorage.setItem('jamili_messages', JSON.stringify(messages));
}

// ===== Dashboard =====
function loadDashboard() {
  const products = getProducts();
  const inquiries = getInquiries();
  const messages = getMessages();

  document.getElementById('totalProducts').textContent = products.length;
  document.getElementById('totalInquiries').textContent = inquiries.length;
  document.getElementById('totalMessages').textContent = messages.length;

  const collections = ['classic', 'contemporary', 'mamluk', 'kilim', 'geometric'];
  collections.forEach(c => {
    const count = products.filter(p => p.collection === c).length;
    const el = document.getElementById('count' + c.charAt(0).toUpperCase() + c.slice(1));
    if (el) el.textContent = count;
  });

  const recentInq = inquiries.slice(0, 5);
  const inqBody = document.getElementById('recentInquiries');
  if (inqBody) {
    if (recentInq.length === 0) {
      inqBody.innerHTML = '<tr><td colspan="5" class="loading">No inquiries yet</td></tr>';
    } else {
      inqBody.innerHTML = recentInq.map(i => `
        <tr>
          <td>${i.name}</td>
          <td>${i.email}</td>
          <td>${i.product || '—'}</td>
          <td>${i.date}</td>
          <td><span class="status-badge status-${i.status}">${i.status}</span></td>
        </tr>
      `).join('');
    }
  }

  const recentMsg = messages.slice(0, 5);
  const msgBody = document.getElementById('recentMessages');
  if (msgBody) {
    if (recentMsg.length === 0) {
      msgBody.innerHTML = '<tr><td colspan="5" class="loading">No messages yet</td></tr>';
    } else {
      msgBody.innerHTML = recentMsg.map(m => `
        <tr>
          <td>${m.name}</td>
          <td>${m.email}</td>
          <td>${m.subject}</td>
          <td>${m.date}</td>
          <td><span class="status-badge status-${m.status}">${m.status}</span></td>
        </tr>
      `).join('');
    }
  }
}

// ===== Products Management =====
function renderProducts() {
  const products = getProducts();
  const filterCol = document.getElementById('filterCollection');
  const search = document.getElementById('searchProducts');
  const colVal = filterCol ? filterCol.value : 'all';
  const searchVal = search ? search.value.toLowerCase() : '';

  let filtered = products;
  if (colVal !== 'all') filtered = filtered.filter(p => p.collection === colVal);
  if (searchVal) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchVal));

  const body = document.getElementById('productsTableBody');
  if (filtered.length === 0) {
    body.innerHTML = '<tr><td colspan="8" class="loading">No products found</td></tr>';
    return;
  }
  body.innerHTML = filtered.map(p => `
    <tr>
      <td><div style="width:40px;height:40px;background:linear-gradient(135deg,var(--navy),var(--navy-light));border-radius:6px"></div></td>
      <td><strong>${p.name}</strong></td>
      <td>${COLLECTIONS[p.collection] ? COLLECTIONS[p.collection].name : p.collection}</td>
      <td>${p.size}</td>
      <td>${p.quality}</td>
      <td>${p.pile}</td>
      <td>${p.featured ? '⭐ Yes' : '—'}</td>
      <td>
        <button class="btn-edit" onclick="editProduct('${p.id}')">Edit</button>
        <button class="btn-delete" onclick="deleteProduct('${p.id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

function openProductModal() {
  document.getElementById('productModalTitle').textContent = 'Add Product';
  document.getElementById('productForm').reset();
  document.getElementById('editId').value = '';
  document.getElementById('productModal').classList.add('active');
}

function editProduct(id) {
  const products = getProducts();
  const p = products.find(x => x.id === id);
  if (!p) return;
  document.getElementById('productModalTitle').textContent = 'Edit Product';
  document.getElementById('editId').value = p.id;
  document.getElementById('pName').value = p.name;
  document.getElementById('pCollection').value = p.collection;
  document.getElementById('pSize').value = p.size;
  document.getElementById('pQuality').value = p.quality;
  document.getElementById('pOrigin').value = p.origin;
  document.getElementById('pPile').value = p.pile;
  document.getElementById('pDescription').value = p.description;
  document.getElementById('pColors').value = (p.colors || []).join(', ');
  document.getElementById('pFeatured').value = p.featured ? 'true' : 'false';
  document.getElementById('pImgFront').value = p.imgFront || '';
  document.getElementById('pImgBack').value = p.imgBack || '';
  document.getElementById('pImgDetail').value = p.imgDetail || '';
  document.getElementById('productModal').classList.add('active');
}

function saveProduct(e) {
  e.preventDefault();
  const products = getProducts();
  const id = document.getElementById('editId').value;
  const product = {
    id: id || 'p-' + Date.now(),
    name: document.getElementById('pName').value,
    collection: document.getElementById('pCollection').value,
    size: document.getElementById('pSize').value,
    quality: document.getElementById('pQuality').value,
    origin: document.getElementById('pOrigin').value,
    pile: document.getElementById('pPile').value,
    description: document.getElementById('pDescription').value,
    colors: document.getElementById('pColors').value.split(',').map(c => c.trim()).filter(Boolean),
    featured: document.getElementById('pFeatured').value === 'true',
    imgFront: document.getElementById('pImgFront').value,
    imgBack: document.getElementById('pImgBack').value,
    imgDetail: document.getElementById('pImgDetail').value
  };
  if (id) {
    const idx = products.findIndex(p => p.id === id);
    if (idx >= 0) products[idx] = product;
  } else {
    products.push(product);
  }
  saveProducts(products);
  closeProductModal();
  renderProducts();
}

function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return;
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  renderProducts();
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
}

// ===== Inquiries Management =====
function renderInquiries() {
  const inquiries = getInquiries();
  const filterStatus = document.getElementById('filterStatus');
  const search = document.getElementById('searchInquiries');
  const statusVal = filterStatus ? filterStatus.value : 'all';
  const searchVal = search ? search.value.toLowerCase() : '';

  let filtered = inquiries;
  if (statusVal !== 'all') filtered = filtered.filter(i => i.status === statusVal);
  if (searchVal) filtered = filtered.filter(i => i.name.toLowerCase().includes(searchVal) || i.email.toLowerCase().includes(searchVal));

  const body = document.getElementById('inquiriesTableBody');
  if (filtered.length === 0) {
    body.innerHTML = '<tr><td colspan="8" class="loading">No inquiries found</td></tr>';
    return;
  }
  body.innerHTML = filtered.map((i, idx) => `
    <tr>
      <td><strong>${i.name}</strong></td>
      <td>${i.email}</td>
      <td>${i.phone || '—'}</td>
      <td>${i.product || '—'}</td>
      <td>${i.country || '—'}</td>
      <td>${i.date}</td>
      <td><span class="status-badge status-${i.status}">${i.status}</span></td>
      <td>
        <button class="btn-view" onclick="viewInquiry(${idx})">View</button>
        <button class="btn-delete" onclick="deleteInquiry(${idx})">Delete</button>
      </td>
    </tr>
  `).join('');
}

function viewInquiry(idx) {
  const inquiries = getInquiries();
  const i = inquiries[idx];
  if (!i) return;
  if (i.status === 'new') {
    i.status = 'read';
    saveInquiries(inquiries);
    renderInquiries();
  }
  const detail = document.getElementById('inquiryDetail');
  detail.innerHTML = `
    <div class="detail-row"><div class="detail-label">Name</div><div class="detail-value">${i.name}</div></div>
    <div class="detail-row"><div class="detail-label">Email</div><div class="detail-value">${i.email}</div></div>
    <div class="detail-row"><div class="detail-label">Phone</div><div class="detail-value">${i.phone || '—'}</div></div>
    <div class="detail-row"><div class="detail-label">Country</div><div class="detail-value">${i.country || '—'}</div></div>
    <div class="detail-row"><div class="detail-label">Product</div><div class="detail-value">${i.product || '—'}</div></div>
    <div class="detail-row"><div class="detail-label">Date</div><div class="detail-value">${i.date}</div></div>
    <div class="detail-row"><div class="detail-label">Status</div><div class="detail-value"><span class="status-badge status-${i.status}">${i.status}</span></div></div>
    <div class="detail-message"><strong>Message:</strong><br>${i.message}</div>
    <div style="margin-top:1.5rem;display:flex;gap:.5rem">
      <a href="https://wa.me/${(i.phone||'').replace(/[^0-9]/g,'')}" target="_blank" class="btn-save" style="text-decoration:none;display:inline-block;padding:.6rem 1.2rem">Reply on WhatsApp</a>
      <a href="mailto:${i.email}" class="btn-cancel" style="text-decoration:none;display:inline-block;padding:.6rem 1.2rem">Reply by Email</a>
    </div>
  `;
  document.getElementById('inquiryModal').classList.add('active');
}

function deleteInquiry(idx) {
  if (!confirm('Delete this inquiry?')) return;
  let inquiries = getInquiries();
  inquiries.splice(idx, 1);
  saveInquiries(inquiries);
  renderInquiries();
}

// ===== Messages Management =====
function renderMessages() {
  const messages = getMessages();
  const filterStatus = document.getElementById('filterStatus');
  const search = document.getElementById('searchMessages');
  const statusVal = filterStatus ? filterStatus.value : 'all';
  const searchVal = search ? search.value.toLowerCase() : '';

  let filtered = messages;
  if (statusVal !== 'all') filtered = filtered.filter(m => m.status === statusVal);
  if (searchVal) filtered = filtered.filter(m => m.name.toLowerCase().includes(searchVal) || m.email.toLowerCase().includes(searchVal));

  const body = document.getElementById('messagesTableBody');
  if (filtered.length === 0) {
    body.innerHTML = '<tr><td colspan="6" class="loading">No messages found</td></tr>';
    return;
  }
  body.innerHTML = filtered.map((m, idx) => `
    <tr>
      <td><strong>${m.name}</strong></td>
      <td>${m.email}</td>
      <td>${m.subject}</td>
      <td>${m.date}</td>
      <td><span class="status-badge status-${m.status}">${m.status}</span></td>
      <td>
        <button class="btn-view" onclick="viewMessage(${idx})">View</button>
        <button class="btn-delete" onclick="deleteMessage(${idx})">Delete</button>
      </td>
    </tr>
  `).join('');
}

function viewMessage(idx) {
  const messages = getMessages();
  const m = messages[idx];
  if (!m) return;
  if (m.status === 'new') {
    m.status = 'read';
    saveMessages(messages);
    renderMessages();
  }
  const detail = document.getElementById('messageDetail');
  detail.innerHTML = `
    <div class="detail-row"><div class="detail-label">Name</div><div class="detail-value">${m.name}</div></div>
    <div class="detail-row"><div class="detail-label">Email</div><div class="detail-value">${m.email}</div></div>
    <div class="detail-row"><div class="detail-label">Phone</div><div class="detail-value">${m.phone || '—'}</div></div>
    <div class="detail-row"><div class="detail-label">Subject</div><div class="detail-value">${m.subject}</div></div>
    <div class="detail-row"><div class="detail-label">Date</div><div class="detail-value">${m.date}</div></div>
    <div class="detail-row"><div class="detail-label">Status</div><div class="detail-value"><span class="status-badge status-${m.status}">${m.status}</span></div></div>
    <div class="detail-message"><strong>Message:</strong><br>${m.message}</div>
    <div style="margin-top:1.5rem">
      <a href="mailto:${m.email}" class="btn-save" style="text-decoration:none;display:inline-block;padding:.6rem 1.2rem">Reply by Email</a>
    </div>
  `;
  document.getElementById('messageModal').classList.add('active');
}

function deleteMessage(idx) {
  if (!confirm('Delete this message?')) return;
  let messages = getMessages();
  messages.splice(idx, 1);
  saveMessages(messages);
  renderMessages();
}

// ===== Settings =====
function saveSettings(e) {
  e.preventDefault();
  alert('Settings saved successfully! (Demo mode — in production this saves to the database.)');
}

function changePassword(e) {
  e.preventDefault();
  const newPass = document.getElementById('newPass').value;
  const confirmPass = document.getElementById('confirmPass').value;
  if (newPass !== confirmPass) {
    alert('Passwords do not match.');
    return;
  }
  alert('Password changed successfully! (Demo mode)');
  e.target.reset();
}
