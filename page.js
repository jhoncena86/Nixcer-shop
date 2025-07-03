
'use client';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [cart, setCart] = useState([]);
  const products = [
    { id: 1, name: 'Lipstick', image1: '/product1a.jpg', image2: '/product1b.jpg' },
    { id: 2, name: 'Foundation', image1: '/product2a.jpg', image2: '/product2b.jpg' },
  ];

  const addToCart = (product) => setCart([...cart, product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.success ? "Email sent!" : "Failed to send");
  };

  const whatsappCheckout = () => {
    const summary = cart.map(p => p.name).join(', ');
    const msg = encodeURIComponent(`Hi! I want to buy: ${summary}`);
    window.open(`https://wa.me/923001234567?text=${msg}`, '_blank');
  };

  return (
    <div className={styles.container}>
      <h1>Nixcer Shop</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required />
        <textarea placeholder="Address/Message" onChange={e => setForm({ ...form, message: e.target.value })} required />
        <button type="submit">Submit</button>
      </form>
      <h2>Products</h2>
      <div className={styles.products}>
        {products.map(product => (
          <div key={product.id} className={styles.product}>
            <img src={product.image1} alt={product.name} onMouseOver={e => e.currentTarget.src = product.image2} onMouseOut={e => e.currentTarget.src = product.image1} />
            <p>{product.name}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <button onClick={whatsappCheckout}>Checkout on WhatsApp</button>
    </div>
  );
}
