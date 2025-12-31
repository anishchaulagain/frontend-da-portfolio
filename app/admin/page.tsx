'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Edit2, Plus, LogOut } from 'lucide-react';

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '', price: '', description: '', image: '', category: 'Crochet'
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsLoading(false);
      fetchProducts();
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await fetch(`${apiUrl}/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const url = editingProduct 
        ? `${apiUrl}/api/products/${editingProduct._id}`
        : `${apiUrl}/api/products`;
      
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({ name: '', price: '', description: '', image: '', category: 'Crochet' });
        fetchProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setIsModalOpen(true);
  };

  const openAdd = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', description: '', image: '', category: 'Crochet' });
    setIsModalOpen(true);
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Dashboard</h1>
        <div className="flex gap-4">
          <button onClick={handleLogout} className="px-4 py-2 bg-neutral-800 text-white font-bold rounded-lg flex items-center gap-2 hover:bg-neutral-700 transition-colors">
            <LogOut size={18} /> Logout
          </button>
          <button onClick={openAdd} className="px-4 py-2 bg-primary text-black font-bold rounded-lg flex items-center gap-2">
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-muted-foreground">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Category</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t border-white/5 hover:bg-white/5">
                <td className="p-4">
                  <div className="w-12 h-12 bg-neutral-800 rounded overflow-hidden">
                    {product.image && <img src={product.image} className="w-full h-full object-cover" />}
                  </div>
                </td>
                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4 flex gap-3">
                  <button onClick={() => openEdit(product)} className="text-blue-400 hover:text-blue-300"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(product._id)} className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 p-8 rounded-2xl w-full max-w-lg border border-white/10">
            <h2 className="text-2xl font-bold mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-neutral-950 border border-white/10 rounded-lg" required />
              <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-3 bg-neutral-950 border border-white/10 rounded-lg" required />
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 bg-neutral-950 border border-white/10 rounded-lg">
                <option value="Crochet">Crochet</option>
                <option value="Plushies">Plushies</option>
                <option value="Wearable">Wearable</option>
                <option value="Digital">Digital Design</option>
              </select>
              <input type="text" placeholder="Image URL" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full p-3 bg-neutral-950 border border-white/10 rounded-lg" required />
              <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 bg-neutral-950 border border-white/10 rounded-lg" rows={3} required></textarea>
              
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-neutral-800 rounded-lg font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-primary text-black font-bold rounded-lg">{editingProduct ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
