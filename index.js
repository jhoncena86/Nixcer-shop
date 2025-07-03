
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
      <h1>Welcome to Nixcer</h1>
      {products.map(p => (
        <div key={p.id} className={styles.product}>
          <h3>{p.name}</h3>
          <div className={styles.imageSlider}>
            <img src={p.image1} alt={p.name} />
            <img src={p.image2} alt={p.name} />
          </div>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={(e) => setForm({...form, name: e.target.value})} />
        <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
        <textarea placeholder="Message" onChange={(e) => setForm({...form, message: e.target.value})}></textarea>
        <button type="submit">Checkout via Email</button>
      </form>
      <button onClick={whatsappCheckout}>Checkout via WhatsApp</button>
    </div>
  );
}
