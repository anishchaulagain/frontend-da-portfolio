export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-20 min-h-[80vh] flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            Let's build <br /> something <br /> <span className="text-primary">iconic</span>.
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Open for freelance opportunities and collaborations.
          </p>

          <div className="space-y-6">
            <a href="mailto:hello@nanu.design" className="block text-2xl hover:text-primary transition-colors">
              hello@nanu.design
            </a>
            <div className="flex gap-6 text-muted-foreground">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

        <form className="space-y-6 glass-card p-8 rounded-2xl">
          <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-sm text-muted-foreground">Name</label>
               <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
             </div>
             <div className="space-y-2">
               <label className="text-sm text-muted-foreground">Email</label>
               <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
             </div>
          </div>
          <div className="space-y-2">
             <label className="text-sm text-muted-foreground">Budget</label>
             <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white [&>option]:text-black">
                <option>Select a range</option>
                <option>$5k - $10k</option>
                <option>$10k - $25k</option>
                <option>$25k+</option>
             </select>
          </div>
          <div className="space-y-2">
             <label className="text-sm text-muted-foreground">Message</label>
             <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 h-32 resize-none focus:outline-none focus:border-primary transition-colors" placeholder="Tell me about your project..."></textarea>
          </div>
          <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-neutral-200 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
