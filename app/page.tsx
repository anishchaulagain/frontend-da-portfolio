'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import HeroScene from '@/components/3d/HeroScene';
import ProductCard from '@/components/shop/ProductCard';
import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/api/products`);
        if (res.ok) {
          const data = await res.json();
          // Limit to 3 products for the homepage
          setProducts(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <HeroScene />
        
        {/* Content */}
        <div className="container relative z-10 px-6">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="mb-6 flex items-center space-x-2">
              <span className="h-[1px] w-8 bg-primary"></span>
              <span className="text-sm uppercase tracking-widest text-primary font-medium">Computer Engineering Student</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40">
              Hi! <br />
              <span className="italic">I'm</span> Dipika Acharya.
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed">
              Focusing on Quality Assurance, Cyber Security, AWS Cloud, and Full Stack Web Development.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link href="/portfolio" className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  View Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
              <Link href="/shop" className="px-8 py-4 glass rounded-full font-semibold hover:bg-white/10 transition-colors">
                Shop Products
              </Link>
            </motion.div>

          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1, duration: 1 } }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-sm"
        >
          <span>Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* Selected Work Section */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Selected Work</h2>
            <p className="text-muted-foreground">Curated projects for premium brands.</p>
          </div>
          <Link href="/portfolio" className="hidden md:flex items-center gap-2 text-sm hover:text-primary transition-colors">
            View All Projects <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Mock Project 1 */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/3] bg-neutral-900 rounded-2xl overflow-hidden mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 to-neutral-700 group-hover:scale-105 transition-transform duration-700"></div>
              {/* Image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-neutral-500 font-mono">Project Image 01</div>
            </div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Lumina Interface</h3>
            <p className="text-muted-foreground">UI/UX Design • Frontend Dev</p>
          </div>

          {/* Mock Project 2 */}
          <div className="group cursor-pointer md:mt-16">
            <div className="aspect-[4/3] bg-neutral-900 rounded-2xl overflow-hidden mb-6 relative">
               <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/20 to-purple-900/20 group-hover:scale-105 transition-transform duration-700"></div>
               <div className="absolute inset-0 flex items-center justify-center text-neutral-500 font-mono">Project Image 02</div>
            </div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Nexus Brand</h3>
            <p className="text-muted-foreground">Identity • 3D Motion</p>
          </div>
        </div>
      </section>

      {/* Hobbies & Shop Section */}
      <section className="py-32 bg-neutral-900/30 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">My Hobbies & Passions</h2>
             <p className="text-muted-foreground text-lg">
               When I'm not coding secure systems, I love creating adorable crochet plushies. 
               Check out some of my handmade creations below!
             </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
             {products.length > 0 ? (
               products.map((product) => (
                 <ProductCard key={product._id} product={product} />
               ))
             ) : (
               <div className="col-span-full text-center py-12 text-muted-foreground">
                 <p>Loading products or no products found...</p>
               </div>
             )}
          </div>
          
          <div className="mt-16 text-center">
             <Link href="/shop" className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4">
                View all creations <ArrowRight size={16} />
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
