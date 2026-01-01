import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, color = "text-primary" }: StatsCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-xl p-6 flex flex-col justify-between hover:border-white/10 transition-colors"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
        </div>
        <div className={`p-3 bg-white/5 rounded-lg ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      {trend && (
        <div className="text-xs text-green-400 flex items-center gap-1">
          <span>{trend}</span>
        </div>
      )}
    </motion.div>
  );
}
