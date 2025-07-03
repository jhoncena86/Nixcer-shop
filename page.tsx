'use client';
import { useState } from 'react';
import Link from 'next/link';

const products = [
  { id: 1, name: 'Red Lipstick', price: 799, image: '/products/lipstick-red-1.jpg' },
  { id: 2, name: 'Face Cream', price: 1199, image: '/products/cream-1.jpg' }
];

export default function ProductsPage() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-xl shadow p-4">
            <img src={product.image} className="h-48 w-full object-cover rounded mb-2" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm">Rs. {product.price}</p>
            <button onClick={() => addToCart(product)} className="bg-red-600 text-white mt-2 px-4 py-1 rounded">Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Link href={{ pathname: '/checkout', query: { cart: JSON.stringify(cart) } }} className="bg-green-600 text-white px-4 py-2 rounded">
          Go to Checkout ({cart.length} items)
        </Link>
      </div>
    </main>
  );
}