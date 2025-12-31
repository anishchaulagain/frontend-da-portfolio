'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const PROJECTS = [
  { id: 1, title: 'Lumina Interface', category: 'UI/UX', year: '2024', size: 'col-span-1 md:col-span-2', bg: 'bg-neutral-900' },
  { id: 2, title: 'Nexus Brand', category: 'Identity', year: '2023', size: 'col-span-1', bg: 'bg-stone-900' },
  { id: 3, title: 'Aero App', category: 'Mobile', year: '2024', size: 'col-span-1', bg: 'bg-zinc-800' },
  { id: 4, title: 'Void Motion', category: 'Animation', year: '2023', size: 'col-span-1 md:col-span-2', bg: 'bg-slate-900' },
  { id: 5, title: 'Zenith', category: 'Web Dev', year: '2024', size: 'col-span-1', bg: 'bg-neutral-800' },
];

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <header className="mb-24">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 break-words">
          Work <span className="text-muted-foreground text-3xl md:text-5xl align-top font-normal">(Selected)</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROJECTS.map((project, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            key={project.id}
            className={`${project.size} group cursor-pointer`}
          >
            <Link href={`/portfolio/${project.id}`}>
              <div className={`aspect-[4/3] rounded-sm overflow-hidden mb-3 relative ${project.bg}`}>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center text-neutral-600 font-mono text-xl group-hover:scale-110 transition-transform duration-700">
                  {project.title} Preview
                </div>
              </div>
              <div className="flex justify-between items-baseline border-b border-white/10 pb-4 group-hover:border-primary transition-colors">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
