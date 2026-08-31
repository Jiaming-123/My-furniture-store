"use client";

import { useMemo, useState } from "react";

const img = (id: string, w = 900, h = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=88`;
const rooms = [
  { name: "Bedroom", image: img("photo-1616486338812-3dadae4b4ace") },
  { name: "Living", image: img("photo-1618220179428-22790b461013") },
  { name: "Dining", image: img("photo-1604578762246-41134e37f9cc") },
  { name: "Office", image: img("photo-1497366754035-f200968a6e72") },
];
const products = [
  { name: "Shiloah 3+2 seater PU leather sofa lounge set - brown", price: 4849, old: 5999, saving: "Save $1,150", category: "Living", image: img("photo-1555041469-a586c61ea9bc"), badge: "SALE" },
  { name: "Sonoma 3 seater sofa", price: 1999, old: 0, saving: "", category: "Living", image: img("photo-1550254478-ead40cc54513") },
  { name: "Rhianne fabric upholstered accent chair - beige", price: 999, old: 1200, saving: "Save $300", category: "Living", image: img("photo-1598300042247-d088f8ab3a91"), badge: "SALE" },
  { name: "Alvarado (Aussie made) highline bookcase", price: 1999, old: 0, saving: "", category: "Office", image: img("photo-1594620302200-9a762244a156") },
  { name: "Tribeca buttoned 3 seater sofa", price: 2399, old: 0, saving: "", category: "Living", image: img("photo-1586023492125-27b2c045efd7") },
  { name: "Marlow solid timber bedside", price: 499, old: 0, saving: "", category: "Bedroom", image: img("photo-1505693416388-ac5ce068fe85") },
];
const reviews = [
  { quote: "Outstanding customer service and faster delivery than expected. The Tribeca sofa feels beautifully made and looks even better in our living room.", name: "Anna", city: "Melbourne", image: img("photo-1555041469-a586c61ea9bc") },
  { quote: "The Shiloah lounge arrived carefully packed, and the team kept us updated from purchase to delivery. Excellent quality for a busy family home.", name: "Marcus", city: "Geelong", image: img("photo-1550254478-ead40cc54513") },
  { quote: "Helpful advice in store, straightforward checkout and a genuinely comfortable sofa. We would happily shop here again.", name: "Priya", city: "Sydney", image: img("photo-1598300042247-d088f8ab3a91") },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<typeof products>([]);
  const [selected, setSelected] = useState<(typeof products)[number] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const filtered = useMemo(() => products.filter((p) => (category === "All" || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase())), [category, query]);
  const addToCart = (product: (typeof products)[number]) => setCart((current) => current.some((item) => item.name === product.name) ? current : [...current, product]);
  return <main>
    <div className="announcement">FREE DELIVERY WITH EVERY CUSTOMISED AUSTRALIAN MADE ORDER</div>
    <header className="site-header"><a className="brand" href="#top" aria-label="Furniture Store home"><span className="brand-mark">M</span><span>FURNITURE<br /><b>STORE</b></span></a><nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">{rooms.map((room) => <a key={room.name} href={`#${room.name.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{room.name}</a>)}<button className="nav-sale" onClick={() => { setCategory("All"); document.getElementById("new-arrivals")?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); }}>Sale</button></nav><div className="header-actions"><label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search furniture" aria-label="Search furniture" /></label><button className="icon-button" aria-label="Wishlist">♡</button><button className="bag-button" onClick={() => document.getElementById("bag")?.classList.add("visible")}>Bag · {cart.length}</button><button className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen((v) => !v)}>☰</button></div></header>
    <section className="hero" id="top"><div className="hero-copy"><span className="eyebrow">AUSTRALIAN MADE</span><h1>Furniture made for<br />the way you live.</h1><p>Warm materials, considered proportions and timeless pieces for every room.</p><div className="hero-actions"><a className="button primary" href="#new-arrivals">SHOP LIVING</a><a className="button light" href="#rooms">EXPLORE COLLECTIONS</a></div></div></section>
    <section className="section rooms-section" id="rooms"><div className="section-heading"><h2>Shop by room</h2><span>Find your feeling</span></div><div className="room-grid">{rooms.map((room) => <a className="room-card" id={room.name.toLowerCase()} href="#new-arrivals" key={room.name}><img src={room.image} alt={`${room.name} furniture`} /><span>{room.name}</span></a>)}</div></section>
    <section className="promo section"><div className="promo-copy"><span className="eyebrow">CUSTOM FURNITURE, MADE LOCALLY</span><h2>EXPLORE <span>→</span></h2><p>Australian-made pieces with complimentary delivery on every customised order.</p></div><img src={img("photo-1618221195710-dd6b41faaea6", 1400, 580)} alt="Australian furniture showroom" /></section>
    <section className="section" id="new-arrivals"><div className="section-heading"><div><h2>New arrivals</h2><p>Fresh pieces, familiar warmth.</p></div><div className="filters" role="group" aria-label="Filter products">{["All", "Living", "Bedroom", "Office"].map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div></div><div className="product-grid">{filtered.map((product) => <article className="product-card" key={product.name}><button className="product-image" onClick={() => setSelected(product)} aria-label={`View ${product.name}`}><img src={product.image} alt="" />{product.badge && <span className="sale-badge">{product.badge}</span>}<span className="quick-view">Quick view</span></button><div className="product-body"><h3>{product.name}</h3><div className="price-row"><strong>${product.price.toLocaleString()}</strong>{product.old > 0 && <del>${product.old.toLocaleString()}</del>}</div>{product.saving && <span className="saving">{product.saving}</span>}<button className="add-button" onClick={() => addToCart(product)}>ADD TO CART <span>＋</span></button></div></article>)}</div>{filtered.length === 0 && <p className="empty">No pieces match that search yet.</p>}</section>
    <section className="reviews section"><div className="section-heading"><div><h2>What our customers say</h2><p>Real homes, considered choices and service people remember.</p></div><span className="drag-hint">DRAG TO EXPLORE →</span></div><div className="review-viewport"><div className="review-track" style={{ transform: `translateX(-${reviewIndex * 100}%)` }}>{reviews.map((review) => <article className="review-card" key={review.name}><div><div className="stars" aria-label="5 out of 5 stars">★★★★★</div><p>“{review.quote}”</p><strong>{review.name} — {review.city}</strong></div><img src={review.image} alt={`${review.name}'s home`} /></article>)}</div></div><div className="review-dots" aria-label="Review slides">{reviews.map((review, i) => <button key={review.name} className={i === reviewIndex ? "active" : ""} aria-label={`Show review ${i + 1}`} onClick={() => setReviewIndex(i)} />)}</div></section>
    <footer className="footer"><div className="footer-brand">FURNITURE<br /><b>STORE</b></div><div><b>Shop</b><a href="#living">Living</a><a href="#bedroom">Bedroom</a><a href="#rooms">Dining</a><a href="#office">Office</a></div><div><b>Help</b><a href="#top">Delivery</a><a href="#top">Returns</a><a href="#top">FAQ</a><a href="#top">Contact us</a></div><div><b>Visit</b><a href="#rooms">Australian made</a><a href="#top">About us</a><a href="#top">Become a customer</a></div><small>Secure payments · Australian owned · Customer support</small></footer>
    <aside className="bag-drawer" id="bag" aria-label="Shopping bag"><button className="close" onClick={() => document.getElementById("bag")?.classList.remove("visible")}>×</button><h2>Your bag</h2>{cart.length ? <>{cart.map((item) => <div className="bag-item" key={item.name}><img src={item.image} alt="" /><div><strong>{item.name}</strong><span>${item.price.toLocaleString()}</span></div></div>)}<button className="checkout">CHECKOUT · ${cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</button></> : <p>Your bag is ready for something considered.</p>}</aside>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="product-modal" onClick={(e) => e.stopPropagation()}><button className="close" onClick={() => setSelected(null)}>×</button><img src={selected.image} alt="" /><div><span className="eyebrow">{selected.category}</span><h2>{selected.name}</h2><strong className="modal-price">${selected.price.toLocaleString()}</strong><p>Thoughtfully made for everyday living, with delivery arranged by our local team.</p><button className="button primary" onClick={() => { addToCart(selected); setSelected(null); }}>ADD TO BAG</button></div></div></div>}
  </main>;
}
