import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function About() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleMode = () => setIsDarkMode(!isDarkMode);

    const values = [
        {
            title: "Safe",
            desc: "Every chauffeur is background-checked and professionally trained. Your safety is our non-negotiable priority, backed by real-time GPS tracking.",
            icon: "🛡️",
            color: "blue"
        },
        {
            title: "Comfortable",
            desc: "Experience climate-controlled interiors, ergonomic leather seating, and a whisper-quiet ride designed for total relaxation or productivity.",
            icon: "🛋️",
            color: "blue"
        },
        {
            title: "Clean",
            desc: "Our fleet undergoes a multi-point sanitization process before every single ride. Immaculate, showroom-condition vehicles, always.",
            icon: "✨",
            color: "blue"
        },
        {
            title: "Affordable",
            desc: "Luxury doesn't always mean overpriced. We offer competitive, transparent flat rates with no hidden fees or surge pricing.",
            icon: "🏷️",
            color: "blue"
        }
    ];

    return (
        <div className={`${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} min-h-screen transition-colors duration-700 font-sans selection:bg-blue-600`}>
            <Head title="About Us | Canada's Elite Transport" />

            {/* Navigation (Home sayfasındakiyle aynı tutarlılıkta) */}
            <nav className={`fixed w-full z-[100] border-b transition-all duration-500 ${isDarkMode ? 'bg-slate-950/80 border-white/5' : 'bg-white/80 border-slate-200'} backdrop-blur-md`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white">C</div>
                        <span className="font-black tracking-tighter text-2xl uppercase italic">Canada<span className="text-blue-600">Limo</span></span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <button onClick={toggleMode} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-900'}`}>
                            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                        </button>
                        <Link href="/booking" className="hidden md:block px-8 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all">
                            Book Now
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-48 pb-24 px-6 relative overflow-hidden">
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <h2 className="text-blue-500 text-[11px] font-black uppercase tracking-[0.5em] mb-6">Our DNA</h2>
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.9] mb-12">
                        The Gold Standard <br /> of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">Canadian Travel.</span>
                    </h1>
                    <p className={`text-xl max-w-2xl mx-auto font-medium leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        More than just a ride. We are a commitment to quality, a promise of punctuality, and your premier partner in luxury transportation.
                    </p>
                </div>
                {/* Background Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full z-0"></div>
            </section>

            {/* Values Grid - Safe, Comfortable, Clean, Affordable */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <div key={i} className={`group p-10 rounded-[3rem] border transition-all duration-500 hover:-translate-y-4 ${
                                isDarkMode 
                                ? 'bg-slate-900 border-white/5 hover:border-blue-500/50 shadow-2xl shadow-black' 
                                : 'bg-white border-slate-200 hover:border-blue-500 shadow-xl shadow-slate-200'
                            }`}>
                                <div className="text-5xl mb-8 group-hover:scale-125 transition-transform duration-500 inline-block">{v.icon}</div>
                                <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 italic">{v.title}</h3>
                                <p className={`text-sm leading-relaxed font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story / Detail Section */}
            <section className={`py-32 px-6 ${isDarkMode ? 'bg-slate-900/30' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                    <div className="relative rounded-[4rem] overflow-hidden h-[600px] shadow-2xl">
                        <img 
                            src="https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=1500" 
                            className="w-full h-full object-cover"
                            alt="Luxury Chauffeur"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent"></div>
                    </div>
                    <div className="text-left">
                        <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-8">Why Canada Limo?</h2>
                        <div className="space-y-6 opacity-80 font-medium leading-relaxed">
                            <p>Founded in the heart of Toronto, we recognized a gap in the market for a transportation service that combines high-end luxury with absolute reliability.</p>
                            <p>Whether it’s a high-stakes corporate meeting, a red-carpet event, or a stress-free airport transfer, we treat every journey as a mission. Our chauffeurs are not just drivers; they are trained professionals dedicated to the art of service.</p>
                            <p>Today, we proudly serve all major Canadian hubs, ensuring that wherever you land, a premium experience is waiting for you.</p>
                        </div>
                        <div className="mt-12 flex gap-10">
                            <div>
                                <p className="text-4xl font-black text-blue-600 mb-1">10k+</p>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Rides Completed</p>
                            </div>
                            <div>
                                <p className="text-4xl font-black text-blue-600 mb-1">99%</p>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-50">On-Time Rate</p>
                            </div>
                            <div>
                                <p className="text-4xl font-black text-blue-600 mb-1">24/7</p>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-50">VIP Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-6">
                <div className={`max-w-7xl mx-auto p-20 rounded-[5rem] text-center relative overflow-hidden shadow-2xl ${isDarkMode ? 'bg-blue-600 shadow-blue-500/20' : 'bg-slate-900 shadow-slate-900/20'}`}>
                    <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter uppercase italic text-white">Ready for a better ride?</h2>
                    <Link href="/booking" className="inline-block px-14 py-6 bg-white text-slate-950 rounded-[2rem] font-black tracking-[0.3em] uppercase transition-all hover:bg-blue-500 hover:text-white active:scale-95 text-xs shadow-2xl">
                        Reserve Now
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className={`py-12 text-center border-t ${isDarkMode ? 'border-white/5' : 'border-slate-200 opacity-60'}`}>
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">© 2026 Canada Premium Limo Services</p>
            </footer>
        </div>
    );
}