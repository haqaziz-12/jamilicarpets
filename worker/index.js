/**
 * Jamili Carpets — Worker Backend API
 * 
 * Handles: product CRUD, inquiry management, message management, admin auth
 * Database: Cloudflare D1
 * Storage: Cloudflare R2 (images)
 * Sessions: Cloudflare KV
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // ===== Auth =====
      if (path === '/api/admin/login' && method === 'POST') {
        return await handleLogin(request, env, corsHeaders);
      }

      // All other /api/admin/* routes require auth
      if (path.startsWith('/api/admin')) {
        const auth = await verifyAuth(request, env);
        if (!auth.ok) {
          return jsonResponse({ error: 'Unauthorized' }, 401, corsHeaders);
        }
      }

      // ===== Products =====
      if (path === '/api/products' && method === 'GET') {
        return await getProducts(env, corsHeaders);
      }
      if (path === '/api/admin/products' && method === 'POST') {
        return await createProduct(request, env, corsHeaders);
      }
      if (path.startsWith('/api/admin/products/') && method === 'PUT') {
        return await updateProduct(request, env, path, corsHeaders);
      }
      if (path.startsWith('/api/admin/products/') && method === 'DELETE') {
        return await deleteProduct(env, path, corsHeaders);
      }

      // ===== Inquiries =====
      if (path === '/api/inquiries' && method === 'POST') {
        return await createInquiry(request, env, corsHeaders);
      }
      if (path === '/api/admin/inquiries' && method === 'GET') {
        return await getInquiries(env, corsHeaders);
      }
      if (path.startsWith('/api/admin/inquiries/') && method === 'DELETE') {
        return await deleteInquiry(env, path, corsHeaders);
      }
      if (path.startsWith('/api/admin/inquiries/') && method === 'PUT') {
        return await updateInquiryStatus(request, env, path, corsHeaders);
      }

      // ===== Messages =====
      if (path === '/api/messages' && method === 'POST') {
        return await createMessage(request, env, corsHeaders);
      }
      if (path === '/api/admin/messages' && method === 'GET') {
        return await getMessages(env, corsHeaders);
      }
      if (path.startsWith('/api/admin/messages/') && method === 'DELETE') {
        return await deleteMessage(env, path, corsHeaders);
      }
      if (path.startsWith('/api/admin/messages/') && method === 'PUT') {
        return await updateMessageStatus(request, env, path, corsHeaders);
      }

      // ===== Image Upload =====
      if (path === '/api/admin/upload' && method === 'POST') {
        return await uploadImage(request, env, corsHeaders);
      }

      return jsonResponse({ error: 'Not found' }, 404, corsHeaders);
    } catch (err) {
      return jsonResponse({ error: 'Server error', message: err.message }, 500, corsHeaders);
    }
  }
};

// ===== Helper Functions =====
function jsonResponse(data, status = 200, cors = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}

async function verifyAuth(request, env) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return { ok: false };
  const session = await env.ADMIN_SESSIONS.get('session:' + token);
  if (!session) return { ok: false };
  return { ok: true, user: session };
}

async function handleLogin(request, env, cors) {
  const { username, password } = await request.json();
  const admin = await env.DB.prepare('SELECT * FROM admin_users WHERE username = ? AND password = ?')
    .bind(username, password).first();
  if (!admin) {
    return jsonResponse({ error: 'Invalid credentials' }, 401, cors);
  }
  const token = crypto.randomUUID();
  await env.ADMIN_SESSIONS.put('session:' + token, username, { expirationTtl: 86400 });
  return jsonResponse({ token, user: username }, 200, cors);
}

// ===== Products =====
async function getProducts(env, cors) {
  const { results } = await env.DB.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
  return jsonResponse(results, 200, cors);
}

async function createProduct(request, env, cors) {
  const p = await request.json();
  const id = 'p-' + Date.now();
  await env.DB.prepare(
    `INSERT INTO products (id, name, collection, size, quality, origin, pile, description, colors, img_front, img_back, img_detail, featured, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
  ).bind(id, p.name, p.collection, p.size, p.quality, p.origin, p.pile, p.description,
    JSON.stringify(p.colors || []), p.imgFront || '', p.imgBack || '', p.imgDetail || '',
    p.featured ? 1 : 0).run();
  return jsonResponse({ id, success: true }, 201, cors);
}

async function updateProduct(request, env, path, cors) {
  const id = path.split('/').pop();
  const p = await request.json();
  await env.DB.prepare(
    `UPDATE products SET name=?, collection=?, size=?, quality=?, origin=?, pile=?, description=?, colors=?, img_front=?, img_back=?, img_detail=?, featured=? WHERE id=?`
  ).bind(p.name, p.collection, p.size, p.quality, p.origin, p.pile, p.description,
    JSON.stringify(p.colors || []), p.imgFront || '', p.imgBack || '', p.imgDetail || '',
    p.featured ? 1 : 0, id).run();
  return jsonResponse({ success: true }, 200, cors);
}

async function deleteProduct(env, path, cors) {
  const id = path.split('/').pop();
  await env.DB.prepare('DELETE FROM products WHERE id=?').bind(id).run();
  return jsonResponse({ success: true }, 200, cors);
}

// ===== Inquiries =====
async function createInquiry(request, env, cors) {
  const i = await request.json();
  await env.DB.prepare(
    `INSERT INTO inquiries (id, name, email, phone, country, product, message, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'new', datetime('now'))`
  ).bind('i-' + Date.now(), i.name, i.email, i.phone || '', i.country || '', i.product || '', i.message).run();
  return jsonResponse({ success: true }, 201, cors);
}

async function getInquiries(env, cors) {
  const { results } = await env.DB.prepare('SELECT * FROM inquiries ORDER BY created_at DESC').all();
  return jsonResponse(results, 200, cors);
}

async function deleteInquiry(env, path, cors) {
  const id = path.split('/').pop();
  await env.DB.prepare('DELETE FROM inquiries WHERE id=?').bind(id).run();
  return jsonResponse({ success: true }, 200, cors);
}

async function updateInquiryStatus(request, env, path, cors) {
  const id = path.split('/').pop();
  const { status } = await request.json();
  await env.DB.prepare('UPDATE inquiries SET status=? WHERE id=?').bind(status, id).run();
  return jsonResponse({ success: true }, 200, cors);
}

// ===== Messages =====
async function createMessage(request, env, cors) {
  const m = await request.json();
  await env.DB.prepare(
    `INSERT INTO messages (id, name, email, phone, subject, message, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, 'new', datetime('now'))`
  ).bind('m-' + Date.now(), m.name, m.email, m.phone || '', m.subject, m.message).run();
  return jsonResponse({ success: true }, 201, cors);
}

async function getMessages(env, cors) {
  const { results } = await env.DB.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
  return jsonResponse(results, 200, cors);
}

async function deleteMessage(env, path, cors) {
  const id = path.split('/').pop();
  await env.DB.prepare('DELETE FROM messages WHERE id=?').bind(id).run();
  return jsonResponse({ success: true }, 200, cors);
}

async function updateMessageStatus(request, env, path, cors) {
  const id = path.split('/').pop();
  const { status } = await request.json();
  await env.DB.prepare('UPDATE messages SET status=? WHERE id=?').bind(status, id).run();
  return jsonResponse({ success: true }, 200, cors);
}

// ===== Image Upload to R2 =====
async function uploadImage(request, env, cors) {
  const formData = await request.formData();
  const file = formData.get('image');
  if (!file) return jsonResponse({ error: 'No file provided' }, 400, cors);
  const filename = 'products/' + Date.now() + '-' + file.name;
  await env.IMAGES.put(filename, file.stream(), {
    httpMetadata: { contentType: file.type },
  });
  return jsonResponse({ url: '/images/' + filename, success: true }, 201, cors);
}
