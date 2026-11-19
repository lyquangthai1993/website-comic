const products = [
  {id:'mua-he', title:'Mùa Hè Trong Hộp Diêm', author:'Phan Thảo Nguyên', genre:'Tâm lý', price:149000, className:'cover-one', cover:'MÙA HÈ\nTRONG HỘP DIÊM'},
  {id:'sau-lung', title:'Sau Lưng Mặt Trăng', author:'Lê Minh Hà', genre:'Phiêu lưu', price:179000, className:'cover-two', cover:'SAU LƯNG\nMẶT TRĂNG'},
  {id:'cho-meo', title:'Chó, Mèo & Những Ngày Mưa', author:'Huyền Chi', genre:'Hài hước', price:129000, className:'cover-three', cover:'CHÓ, MÈO\n& NGÀY MƯA'},
  {id:'tang-hinh', title:'Tàng Hình Ở Quận 3', author:'Nguyễn Trí', genre:'Tâm lý', price:159000, className:'cover-four', cover:'TÀNG HÌNH\nỞ QUẬN 3'},
  {id:'tram-cuoi', title:'Chuyến Tàu Cuối Cùng', author:'Đỗ Hoàng', genre:'Phiêu lưu', price:189000, className:'cover-five', cover:'CHUYẾN TÀU\nCUỐI CÙNG'},
  {id:'ngoai-o', title:'Ngoài Ô Cửa Sổ Là Biển', author:'Mai Khuê', genre:'Hài hước', price:139000, className:'cover-six', cover:'NGOÀI Ô CỬA\nLÀ BIỂN'}
];
let cart = [];
const money = value => new Intl.NumberFormat('vi-VN').format(value) + 'đ';
const productGrid = document.querySelector('#productGrid');
const cartItems = document.querySelector('#cartItems');
const cartCount = document.querySelector('#cartCount');
const cartTitleCount = document.querySelector('#cartTitleCount');
const cartTotal = document.querySelector('#cartTotal');
function renderProducts(filter='Tất cả') {
  productGrid.innerHTML = products.filter(p => filter === 'Tất cả' || p.genre === filter).map(p => `<article class="product-card"><div class="product-cover ${p.className}"><div><small>${p.genre.toUpperCase()} / MỰC & KHUNG</small><h3>${p.cover.replace('\n','<br>')}</h3></div></div><div class="product-meta"><div><h3>${p.title}</h3><p>${p.author} · ${p.genre}</p></div><span class="price">${money(p.price)}</span></div><button class="add-button" data-add="${p.id}">+ Thêm vào giỏ</button></article>`).join('');
}
function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = count; cartTitleCount.textContent = `(${count})`;
  cartTotal.textContent = money(cart.reduce((sum, item) => sum + item.price * item.qty, 0));
  cartItems.innerHTML = cart.length ? cart.map(item => `<div class="cart-item"><div class="cart-thumb ${item.className}"></div><div><h3>${item.title}</h3><p>${money(item.price)}</p><div class="qty"><button data-action="decrease" data-id="${item.id}" aria-label="Giảm số lượng">−</button><span>${item.qty}</span><button data-action="increase" data-id="${item.id}" aria-label="Tăng số lượng">+</button><button data-action="remove" data-id="${item.id}" aria-label="Xoá ${item.title}">×</button></div></div><strong>${money(item.price * item.qty)}</strong></div>`).join('') : '<p class="empty-cart">Giỏ hàng đang trống.<br>Chọn một câu chuyện để bắt đầu nhé.</p>';
}
function changeCart(id, action) { const item = cart.find(i => i.id === id); if (!item) return; if (action === 'increase') item.qty++; if (action === 'decrease') item.qty--; if (action === 'remove' || item.qty < 1) cart = cart.filter(i => i.id !== id); renderCart(); }
function openCart(open) { document.querySelector('#cartDrawer').classList.toggle('open', open); document.querySelector('#overlay').classList.toggle('open', open); document.querySelector('#cartDrawer').setAttribute('aria-hidden', String(!open)); }
productGrid.addEventListener('click', event => { const button = event.target.closest('[data-add]'); if (!button) return; const product = products.find(p => p.id === button.dataset.add); const existing = cart.find(i => i.id === product.id); existing ? existing.qty++ : cart.push({...product, qty:1}); renderCart(); openCart(true); });
cartItems.addEventListener('click', event => { const button = event.target.closest('[data-action]'); if (button) changeCart(button.dataset.id, button.dataset.action); });
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => { document.querySelector('.filter.active').classList.remove('active'); button.classList.add('active'); renderProducts(button.dataset.filter); }));
document.querySelector('#cartTrigger').addEventListener('click', () => openCart(true)); document.querySelector('#closeCart').addEventListener('click', () => openCart(false)); document.querySelector('#overlay').addEventListener('click', () => openCart(false));
document.querySelector('#checkout').addEventListener('click', () => alert('Demo — chưa kết nối thanh toán thật. Cảm ơn bạn đã ủng hộ truyện tranh độc lập!'));
document.querySelector('#newsletterForm').addEventListener('submit', event => { event.preventDefault(); const email = new FormData(event.target).get('email'); document.querySelector('#formMessage').textContent = `Đã đăng ký ${email}. Hẹn gặp bạn trong lá thư tới!`; event.target.reset(); });
renderProducts(); renderCart(); console.assert(products.length === 6 && cart.length === 0, 'Storefront data should start with six products and an empty cart');
