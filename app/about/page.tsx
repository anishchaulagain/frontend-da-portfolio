import Link from "next/link";
import { ArrowRight, Code, ShieldCheck, Cloud, Database, Cpu, ShoppingBag, GraduationCap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-24 flex flex-col gap-32">
        
        {/* --- Hero Section --- */}
        <section className="max-w-5xl">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-widest uppercase border border-primary/30 rounded-full text-primary">
            About Me
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-10 leading-[0.9]">
            The intersection of <br />
            <span className="text-muted-foreground/40">logic</span> & <span className="text-primary italic font-serif">imagination.</span>
          </h1>
          <p className="text-xl md:text-3xl leading-relaxed text-muted-foreground max-w-3xl">
            I am a multidisciplinary <span className="text-foreground font-medium">Computer Engineer</span> obsessed with quality. 
            I believe that while good design is invisible, great engineering is <span className="underline decoration-primary/50 underline-offset-4">felt</span>.
          </p>
        </section>

        {/* --- Skills Grid --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold sticky top-24">Technical <br/>Stack</h2>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: <ShieldCheck className="text-primary" />, title: "Cyber Security", desc: "Penetration testing and secure system architecture." },
              { icon: <Cloud className="text-primary" />, title: "AWS Cloud", desc: "Scalable infrastructure and serverless deployments." },
              { icon: <Code className="text-primary" />, title: "Web Dev", desc: "Full-stack apps using Next.js, Node, and TypeScript." },
              { icon: <Database className="text-primary" />, title: "Databases", desc: "NoSQL architecture with MongoDB and optimization." },
              { icon: <Cpu className="text-primary" />, title: "QA Automation", desc: "End-to-end testing with Selenium and CI/CD." },
            ].map((skill, i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
                <div className="mb-4 p-3 bg-primary/10 w-fit rounded-lg group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Study Roadmap (Vertical Timeline) --- */}
        <section className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Journey</h2>
            <p className="text-muted-foreground italic">Academic milestones and growth.</p>
          </div>
          
          <div className="relative border-l border-white/10 ml-4 md:ml-0 md:left-1/2">
            {[
              { year: '2021 - Present', role: 'Bachelor in Computer Engineering', company: 'University of Technology' },
              { year: '2019 - 2021', role: 'High School (Science)', company: 'National Science School' },
              { year: '2009 - 2019', role: 'Secondary Education', company: 'Local Public School' },
            ].map((edu, i) => (
              <div key={i} className="mb-12 relative">
                {/* Dot */}
                <div className="absolute -left-[9px] md:left-[-9px] w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                
                <div className={`ml-8 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right md:-translate-x-full' : 'md:pl-12'}`}>
                  <span className="text-primary font-mono text-sm mb-2 block">{edu.year}</span>
                  <h4 className="text-2xl font-bold">{edu.role}</h4>
                  <p className="text-muted-foreground flex items-center gap-2 md:justify-end">
                    {i % 2 !== 0 && <GraduationCap size={16} />}
                    {edu.company}
                    {i % 2 === 0 && <GraduationCap size={16} className="hidden md:block" />}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Hobbies (Featured Card) --- */}
        <section className="relative overflow-hidden rounded-[2rem] bg-zinc-900 border border-white/5 p-8 md:p-16">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[1px] w-12 bg-primary"></span>
                <h2 className="text-primary font-bold uppercase tracking-widest text-sm">Beyond the Terminal</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 italic font-serif">Stitching Logic into Art</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                When I'm not debugging code, I'm debugging crochet patterns. Building software and crafting yarn share a beautiful commonality: 
                <span className="text-foreground"> starting from a single loop and scaling it into a complex, functional system.</span>
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {['Plushies', 'Wearables', 'Home Decor', 'Custom Commissions'].map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <Link href="/shop" className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 transition-all">
                <ShoppingBag size={20} />
                Visit Crochet Shop 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex-1 w-full aspect-square bg-zinc-800 rounded-2xl flex items-center justify-center border border-white/10 relative overflow-hidden group">
               {/* Placeholder for an actual image */}
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
               <p className="text-white/20 font-bold text-lg group-hover:scale-110 transition-transform cursor-default">
                 [ Showcase Image or Carousel ]
               </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}