'use client'

import { useState } from 'react'

type Product = {
  id: string
  title: string
  author: string
  genre: 'Tâm lý' | 'Phiêu lưu' | 'Hài hước'
  price: number
  className: string
  cover: string
}

type CartItem = Product & { qty: number }

const products: Product[] = [
  { id: 'mua-he', title: 'Mùa Hè Trong Hộp Diêm', author: 'Phan Thảo Nguyên', genre: 'Tâm lý', price: 149000, className: 'cover-one', cover: 'MÙA HÈ\nTRONG HỘP DIÊM' },
  { id: 'sau-lung', title: 'Sau Lưng Mặt Trăng', author: 'Lê Minh Hà', genre: 'Phiêu lưu', price: 179000, className: 'cover-two', cover: 'SAU LƯNG\nMẶT TRĂNG' },
  { id: 'cho-meo', title: 'Chó, Mèo & Những Ngày Mưa', author: 'Huyền Chi', genre: 'Hài hước', price: 129000, className: 'cover-three', cover: 'CHÓ, MÈO\n& NGÀY MƯA' },
  { id: 'tang-hinh', title: 'Tàng Hình Ở Quận 3', author: 'Nguyễn Trí', genre: 'Tâm lý', price: 159000, className: 'cover-four', cover: 'TÀNG HÌNH\nỞ QUẬN 3' },
  { id: 'tram-cuoi', title: 'Chuyến Tàu Cuối Cùng', author: 'Đỗ Hoàng', genre: 'Phiêu lưu', price: 189000, className: 'cover-five', cover: 'CHUYẾN TÀU\nCUỐI CÙNG' },
  { id: 'ngoai-o', title: 'Ngoài Ô Cửa Sổ Là Biển', author: 'Mai Khuê', genre: 'Hài hước', price: 139000, className: 'cover-six', cover: 'NGOÀI Ô CỬA\nLÀ BIỂN' },
]

const money = (value: number) => new Intl.NumberFormat('vi-VN').format(value) + 'đ'

export default function Storefront() {
  const [filter, setFilter] = useState('Tất cả')
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setCartOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const visibleProducts = products.filter((product) => filter === 'Tất cả' || product.genre === filter)
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      return existing ? current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...current, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }

  function changeQuantity(id: string, delta: number) {
    setCart((current) => current.flatMap((item) => item.id === id ? (item.qty + delta > 0 ? [{ ...item, qty: item.qty + delta }] : []) : [item]))
  }

  function submitNewsletter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(`Đã đăng ký ${email}. Hẹn gặp bạn trong lá thư tới!`)
    setEmail('')
  }

  return (
    <>
      <div className="topline">Đọc một chương. Giữ lại một thế giới. <span>Miễn phí giao hàng từ 350.000đ</span></div>
      <header className="site-header">
        <a className="logo" href="#top" aria-label="Mực và Khung về đầu trang"><span>MỰC</span><i>&</i><span>KHUNG</span></a>
        <nav className="main-nav" aria-label="Điều hướng chính"><a href="#collection">Bộ sưu tập</a><a href="#about">Về chúng tôi</a></nav>
        <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label="Mở giỏ hàng">Giỏ hàng <b>{itemCount}</b></button>
      </header>

      <main id="top">
        <section className="hero shell">
          <div className="hero-copy"><p className="eyebrow">Nhà xuất bản truyện tranh độc lập <span>✳</span></p><h1>Những câu chuyện<br /><em>có dư âm.</em></h1><p className="hero-text">Từ những con hẻm quen đến các thiên hà rất xa, chúng tôi tìm những trang truyện khiến bạn muốn đọc lại ngay từ trang cuối.</p><a className="button button-dark" href="#collection">Khám phá bộ sưu tập <span>↘</span></a><div className="hero-note"><span className="scribble">✹</span><span>Truyện mới mỗi tháng<br /><strong>Chọn lọc từ tác giả Việt</strong></span></div></div>
          <div className="hero-art" aria-label="Bìa truyện Mùa Hè Trong Hộp Diêm"><div className="burst">MỚI<br />RA MẮT</div><div className="cover-shadow" /><div className="cover cover-featured"><small>MỰC & KHUNG / 012</small><div><span>MÙA HÈ</span><strong>TRONG<br />HỘP DIÊM</strong></div><footer>một truyện dài của<br /><b>Phan Thảo Nguyên</b></footer></div><div className="art-caption">01 / 06 <span>Chạm để mở</span></div></div>
        </section>

        <section className="collection shell" id="collection"><div className="section-heading"><div><p className="eyebrow">Cửa hàng / 06 tựa truyện</p><h2>Đọc gì hôm nay?</h2></div><div className="filters" role="group" aria-label="Lọc theo thể loại">{['Tất cả', 'Phiêu lưu', 'Tâm lý', 'Hài hước'].map((name) => <button key={name} className={`filter ${filter === name ? 'active' : ''}`} onClick={() => setFilter(name)}>{name}</button>)}</div></div><div className="product-grid">{visibleProducts.map((product) => <article className="product-card" key={product.id}><div className={`product-cover ${product.className}`}><div><small>{product.genre.toUpperCase()} / MỰC & KHUNG</small><h3>{product.cover.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h3></div></div><div className="product-meta"><div><h3>{product.title}</h3><p>{product.author} · {product.genre}</p></div><span className="price">{money(product.price)}</span></div><button className="add-button" onClick={() => addToCart(product)}>+ Thêm vào giỏ</button></article>)}</div></section>

        <section className="manifesto" id="about"><div className="shell manifesto-inner"><p className="eyebrow">Tại sao là Mực & Khung?</p><h2>Không chỉ là<br /><em>một cuốn truyện.</em></h2><p>Chúng tôi tin một trang giấy đẹp có thể làm một ngày bình thường trở nên khác đi. Mỗi tựa truyện được in số lượng vừa đủ, đóng gói bằng tay và gửi đi từ một xưởng nhỏ ở Sài Gòn.</p><a href="#newsletter" className="text-link">Nhận thư từ xưởng in <span>↗</span></a></div><div className="manifesto-stamp">ĐỌC<br />CHẬM<br />NHỚ<br />LÂU</div></section>
        <section className="testimonial shell"><div className="quote-mark">“</div><blockquote>Đọc xong mà cứ thấy thành phố ngoài kia vẽ bằng mực nước, còn mình thì đang đi trong một khung truyện chưa có ô thoại.</blockquote><p>— Minh Anh, độc giả tháng 07</p></section>
        <section className="newsletter shell" id="newsletter"><div><p className="eyebrow">Thư từ trang giấy</p><h2>Mỗi tháng một<br /><em>điều đáng đọc.</em></h2></div><form onSubmit={submitNewsletter}><label htmlFor="email">Email của bạn</label><div className="email-row"><input id="email" name="email" type="email" placeholder="ban@example.com" required value={email} onChange={(event) => setEmail(event.target.value)} /><button className="button button-red" type="submit">Đăng ký <span>↗</span></button></div><p className="form-message" role="status">{message}</p></form></section>
      </main>
      <footer className="footer shell"><a className="logo" href="#top"><span>MỰC</span><i>&</i><span>KHUNG</span></a><p>© 2024 Mực & Khung. In bằng tình yêu.</p><div><a href="#collection">Instagram</a><a href="#about">Liên hệ</a></div></footer>

      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`} aria-label="Giỏ hàng" aria-hidden={!isCartOpen}><div className="cart-head"><h2>Giỏ của bạn <span>({itemCount})</span></h2><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Đóng giỏ hàng">×</button></div><div className="cart-items">{cart.length ? cart.map((item) => <div className="cart-item" key={item.id}><div className={`cart-thumb ${item.className}`} /><div><h3>{item.title}</h3><p>{money(item.price)}</p><div className="qty"><button onClick={() => changeQuantity(item.id, -1)} aria-label="Giảm số lượng">−</button><span>{item.qty}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label="Tăng số lượng">+</button><button onClick={() => changeQuantity(item.id, -item.qty)} aria-label={`Xoá ${item.title}`}>×</button></div></div><strong>{money(item.price * item.qty)}</strong></div>) : <p className="empty-cart">Giỏ hàng đang trống.<br />Chọn một câu chuyện để bắt đầu nhé.</p>}</div><div className="cart-foot"><div><span>Tạm tính</span><strong>{money(total)}</strong></div><button className="button button-dark full" onClick={() => window.alert('Demo — chưa kết nối thanh toán thật. Cảm ơn bạn đã ủng hộ truyện tranh độc lập!')}>Tiến hành đặt hàng <span>↗</span></button><small>Demo — chưa kết nối thanh toán thật.</small></div></aside><div className={`overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setCartOpen(false)} />
    </>
  )
}
