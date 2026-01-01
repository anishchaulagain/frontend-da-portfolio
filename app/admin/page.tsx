'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Trash2, Edit2, Plus, LogOut, Search, Filter, 
  Package, DollarSign, Layers, X, Upload 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StatsCard } from '@/components/admin/StatsCard';

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '', price: '', description: '', image: '', category: 'Crochet'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/products`);
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
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

  useEffect(() => {
    let result = products;
    
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'All') {
      result = result.filter(p => p.category === categoryFilter);
    }

    setFilteredProducts(result);
  }, [searchTerm, categoryFilter, products]);

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

  // Stats Calculations
  const totalValue = products.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
  const categories = Array.from(new Set(products.map(p => p.category))).length;

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Layers size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
          </div>
          <button 
            onClick={handleLogout} 
            className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-red-400 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard 
            title="Total Products" 
            value={products.length} 
            icon={Package} 
            color="text-blue-400"
          />
          <StatsCard 
            title="Portfolio Value" 
            value={`Rs. ${totalValue.toLocaleString()}`} 
            icon={DollarSign} 
            color="text-green-400"
          />
          <StatsCard 
            title="Active Categories" 
            value={categories} 
            icon={Layers} 
            color="text-purple-400"
          />
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center bg-neutral-900/50 p-4 rounded-xl border border-white/5">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-neutral-950 border border-white/10 rounded-lg focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-neutral-950 border border-white/10 rounded-lg focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Crochet">Crochet</option>
                <option value="Plushies">Plushies</option>
                <option value="Wearable">Wearable</option>
                <option value="Digital">Digital Design</option>
              </select>
            </div>
          </div>
          <button 
            onClick={openAdd} 
            className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-neutral-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-muted-foreground border-b border-white/5">
              <tr>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-neutral-800 rounded-lg overflow-hidden shrink-0 border border-white/10">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Package size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white group-hover:text-primary transition-colors">{product.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1 max-w-[200px]">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium border border-white/10">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 font-medium">Rs. {product.price}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                       <button onClick={() => openEdit(product)} className="p-2 hover:bg-blue-500/10 text-muted-foreground hover:text-blue-400 rounded-lg transition-colors" title="Edit">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="p-2 hover:bg-red-500/10 text-muted-foreground hover:text-red-400 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-neutral-900/50 border border-white/10 rounded-xl overflow-hidden p-4 flex gap-4">
              <div className="w-20 h-20 bg-neutral-800 rounded-lg overflow-hidden shrink-0 border border-white/10">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <Package size={24} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-white truncate">{product.name}</h3>
                  <span className="font-bold text-primary">Rs. {product.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => openEdit(product)} className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 rounded text-xs font-medium text-white transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="flex-1 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded text-xs font-medium transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
           {filteredProducts.length === 0 && (
            <div className="p-8 text-center text-muted-foreground bg-neutral-900/50 border border-white/10 rounded-xl">
              No products found.
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-neutral-900 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-white"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-white">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Product Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Cute Plushie" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      className="w-full p-3 bg-neutral-950 border border-white/10 rounded-lg focus:border-primary/50 focus:outline-none transition-colors" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Price (Rs.)</label>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      value={formData.price} 
                      onChange={e => setFormData({...formData, price: e.target.value})} 
                      className="w-full p-3 bg-neutral-950 border border-white/10 rounded-lg focus:border-primary/50 focus:outline-none transition-colors" 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Category</label>
                  <select 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})} 
                    className="w-full p-3 bg-neutral-950 border border-white/10 rounded-lg focus:border-primary/50 focus:outline-none transition-colors appearance-none"
                  >
                    <option value="Crochet">Crochet</option>
                    <option value="Plushies">Plushies</option>
                    <option value="Wearable">Wearable</option>
                    <option value="Digital">Digital Design</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Image URL</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="https://..." 
                      value={formData.image} 
                      onChange={e => setFormData({...formData, image: e.target.value})} 
                      className="flex-1 p-3 bg-neutral-950 border border-white/10 rounded-lg focus:border-primary/50 focus:outline-none transition-colors" 
                      required 
                    />
                    <div className="w-12 h-12 bg-neutral-950 border border-white/10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                       {formData.image ? (
                          <img src={formData.image} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                       ) : (
                          <Upload size={18} className="text-muted-foreground" />
                       )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Description</label>
                  <textarea 
                    placeholder="Describe your product..." 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                    className="w-full p-3 bg-neutral-950 border border-white/10 rounded-lg focus:border-primary/50 focus:outline-none transition-colors resize-none" 
                    rows={4} 
                    required
                  ></textarea>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="flex-1 py-3 bg-neutral-800 rounded-lg font-bold hover:bg-neutral-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                  >
                    {editingProduct ? 'Update Product' : 'Create Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
