'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });

  useEffect(() => {
    const cartData = searchParams.get('cart');
    if (cartData) setCart(JSON.parse(cartData));
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const sendEmail = async () => {
    await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...formData, cart})
    });
    alert('Order placed and email sent!');
  };

  const whatsappUrl = () => {
    const items = cart.map(p => `${p.name} (Rs.${p.price})`).join(', ');
    const msg = `Order from ${formData.name}, Email: ${formData.email}, Address: ${formData.address}, Items: ${items}`;
    return `https://wa.me/923001234567?text=${encodeURIComponent(msg)}`;
  };

  return (
    <main className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={(e) => { e.preventDefault(); sendEmail(); }} className="flex flex-col gap-4">
        <input required name="name" onChange={handleChange} className="border p-2 rounded" placeholder="Name" />
        <input required name="email" onChange={handleChange} className="border p-2 rounded" placeholder="Email" />
        <textarea required name="address" onChange={handleChange} className="border p-2 rounded" placeholder="Address" />
        <button type="submit" className="bg-red-600 text-white py-2 rounded">Place Order (COD)</button>
      </form>
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="block mt-4 text-center bg-green-600 text-white py-2 rounded">
        Checkout via WhatsApp
      </a>
    </main>
  );
}